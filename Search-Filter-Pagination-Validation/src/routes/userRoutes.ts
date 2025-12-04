import { Router } from "express";
import { prisma } from "../prisma.js";
import bcrypt from 'bcrypt';

const router = Router();

//=========Create User==========//
router.post("/", async (req, res) => {
  const { name, age, email, password } = req.body;

  try {
    /////==========VALIDATIONS=========//
    if (!name || !age || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }
    if(age <= 18){
        return res.status(400).json({
            error: "Age must be greater than 18."
        });
    }

    if(!email.endsWith("@gmail.com")){
        return res.status(400).json({
            error: "Email must end with @gmail.com"
        });
    };

    const existingUser = await prisma.user.findUnique({
        where: {email}
    });
    if(existingUser){
       return res.status(400).json({
             error: "Email already exists. Please use another email."
        });
    }

    const startsWithCapital = /^[A-Z]/.test(password);
    if(!startsWithCapital){
        return res.status(400).json({
            error: "Password must start with a capital letter."
        });
    }

    const hasSpecialChar = /[!@#$%^&*(),.?;:'"{}|<>]/.test(password);
    if(!hasSpecialChar){
        return res.status(400).json({
            error: "Password must contain at least one special character."
        });
    }

//=============HASH PASSWORD USING BCRYPT===============///////
const hashedPassword = await bcrypt.hash(password, 10);   //10 - salt around: number of iterations bcrypt uses when generating password

//==========CREATE A USER================//
    const user = await prisma.user.create({
      data: { name, age, email, password: hashedPassword },
    });
    res.status(201).json({ message: "User Created!", user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//===========GET ALL USERS============//
router.get("/", async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//=============SEARCH AND FILTER USERS===========//
router.get('/search', async(req,res)=>{

    try{
        //get query parameters
        const {name, email, minAge, maxAge, page, pageSize} = req.query;

        //Build Prism "where" object dynamically
        const where: any = {};

        if(name){
            where.name = {contains: String(name), mode: "insensitive"};
        }

        if(email){
            where.email = {contains: String(email), mode: "insensitive"};
        }

        if(minAge || maxAge){
            where.age = {};

            if(minAge) where.age.gte = Number(minAge);
            if(maxAge) where.age.lte = Number(maxAge);
        }

        //========PAGINATION=========//
        const pageNum = Number(page) || 1;
        const size = Number(pageSize) || 10;
        const users = await prisma.user.findMany({
            where,
            skip: (pageNum -1) * size,
            take: size,
            orderBy: {name: "asc"},
        });

        res.json({count: users.length, users});
    }catch(error: any){
        res.status(500).json({error: error.message});
    }
});

//==========GET USER BY ID===============//
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(400).json({ message: "User not found" });

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//=================UPDATE USER==================//
router.put("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, age, email, password } = req.body;

  try {

    const dateToUpdate: any = {name, age, email};

    if(password){
        const hashedPassword = await bcrypt.hash(password, 10);
        dateToUpdate.password = hashedPassword;
    }
    const user = await prisma.user.update({
      where: { id },
      data: dateToUpdate,
    });
    res.json({ message: "User updated!", user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

//=================DELETE USER==============//
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.user.delete({ where: { id } });
    res.json({ message: "User deleted!" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
    
export default router;