import { Response, Request } from "express";
import { prisma } from "../lib/prisma";

interface CreateTransactionParams {
  description: string;
  value: number;
  type: "increment" | "decrement";
}

export async function createTransaction(req: Request, res: Response) {
  const bodyParams: CreateTransactionParams = req.body;
  const params = req.params;

  const account = await prisma.account.findUniqueOrThrow({
    where: {
      userId: params.id,
    },
  });

  const { value, description, type } = bodyParams;

  await prisma.transactions.create({
    data: {
      value,
      accountId: account.id,
      description,
      type: type == "increment" ? true : false,
    },
  });

  await prisma.account.update({
    where: {
      id: account.id,
    },
    data: {
      balance:
        type == "increment" ? account.balance + value : account.balance - value,
    },
  });

  return res.status(200).send("Transação realizada com sucesso!");
}
