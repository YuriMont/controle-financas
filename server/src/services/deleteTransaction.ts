import { Response, Request } from "express";
import { prisma } from "../lib/prisma";

export async function deleteTransaction (req: Request, res: Response){
    const { id, transactionId } = req.params;

    const account = await prisma.account.findUniqueOrThrow({
      where: {
        userId: id,
      },
    });

    const transaction = await prisma.transactions.findUniqueOrThrow({
      where: {
        id: Number(transactionId),
      },
    });

    await prisma.account.update({
      where: {
        id: account.id,
      },
      data: {
        balance: transaction.type
          ? account.balance - transaction.value
          : account.balance + transaction.value,
      },
    });

    await prisma.transactions.delete({
      where: {
        id: Number(transactionId),
      },
    });

    return res.status(200).send("Transação deletada com sucesso!");
  }