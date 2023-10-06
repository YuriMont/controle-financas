import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

interface CreateUserParams {
    name: string;
    email: string;
    password: string;
}

export async function createUser(req: Request, res: Response){
    const params: CreateUserParams = req.body;
  
    const { name, email, password } = params;
  
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  
    if (userExists) {
      return res.status(400).send("Email já cadastrado!");
    }
  
    const salt = await bcrypt.genSalt(12);
    const passwordEncrypted = await bcrypt.hash(password, salt);
  
    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordEncrypted,
        account: {
          create: {
              balance: 0
            }
        },
      },
    });
  
    return res.status(201).json({ msg: "Usuário criado com sucesso!" });
}