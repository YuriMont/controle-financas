import { Response, Request } from "express";
import { prisma } from "../lib/prisma";

export async function getSummary(req: Request, res: Response) {
  const { id } = req.params;

  const account = await prisma.account.findUniqueOrThrow({
    where: {
      userId: id,
    },
  });

  const incomes = await prisma.transactions.aggregate({
    _sum: {
      value: true
    },
    where: {
      accountId: account.id,
      type: true
    },
  });

  const costs = await prisma.transactions.aggregate({
    _sum: {
      value: true
    },
    where: {
      accountId: account.id,
      type: false
    },
  });

  return res.status(200).json({
    balance: account.balance,
    incomes: incomes._sum.value ? incomes._sum.value : 0,
    costs: costs._sum.value ? costs._sum.value : 0
  });
}
