import z from "zod";

export const RegisterUserSchema = z.object({
    name: z.string().trim().min(3).max(30),
    age: z.int().gt(18),
    email: z.string().trim().email({message:"Invalid email format"}),
    password: z.string().min(6).max(15).regex(/^[A-Z]/).regex(/[`!@#$%^&*();:'",./?<>{}]/)
});