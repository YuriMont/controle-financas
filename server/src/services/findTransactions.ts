import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export async function findTransactions(req: Request, res: Response) {
  const params = req.params;
  
  const account = await prisma.account.findUniqueOrThrow({
    where: {
      userId: params.id,
    },
  });

  const transactions = await prisma.transactions.findMany({
    where: {
      accountId: account?.id,
    },
    orderBy: {
      creatAt: 'asc'
    }
  });

  return res.status(200).json(transactions);
}
