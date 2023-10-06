import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

interface UserLoginParams {
    email: string;
    password: string;
}

export async function loginUser(req: Request, res: Response){
    const params: UserLoginParams = req.body;
  
    const { email, password } = params;
  
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
  
    if (!userExists) {
      return res.status(401).send("email não encontrado");
    }
  
    const checkPassword = await bcrypt.compare(password, userExists.password);
  
    if (!checkPassword) {
      return res.status(401).send("Senha inválida!");
    }
  
    const token = jsonwebtoken.sign(
      {
        id: userExists.id,
      },
      String(process.env.SECRET),
      {
        expiresIn: "4h",
      }
    );
  
    return res.status(200).json({token: token})
}