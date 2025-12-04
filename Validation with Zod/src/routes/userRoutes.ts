import { Router } from "express";
import { prisma } from "../prisma.js";
import bcrypt from 'bcrypt';
import { RegisterUserSchema } from "../validators/auth-validator.js";
const router = Router();

//=========Create User==========//
router.post("/", async (req, res) => {
  try {
      const validateUser = RegisterUserSchema.safeParse(req.body);
      if(!validateUser.success){
        return res.status(400).json({error: validateUser.error.issues[0].message});
      }

const {name, age, email, password} = validateUser.data;

const existingUser = await prisma.user.findUnique({where : {email}});
if(existingUser){
    return res.status(400).json({error: "Email already exists. Please use another email."})
}
//=============HASH PASSWORD USING BCRYPT===============///////
const hashedPassword = await bcrypt.hash(password, 10);   //10 - salt around: number of iterations bcrypt uses when generating password

//==========CREATE A USER================//
    const user = await prisma.user.create({
      data: { name, age, email, password: hashedPassword },
    });
    res.json({ message: "User Created!", user });
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

    let hashedPassword = undefined;

    if(password){
        hashedPassword = await bcrypt.hash(password, 10);
    }
    const user = await prisma.user.update({
      where: { id },
      data: { name, age, email, password: hashedPassword},
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