import { NextFunction, Response, Request, Router } from "express";
import jsonwebtoken from "jsonwebtoken";
import { createUser } from "./services/createUser";
import { loginUser } from "./services/login";
import { findTransactions } from "./services/findTransactions";
import { createTransaction } from "./services/createTransaction";
import { deleteTransaction } from "./services/deleteTransaction";
import { getSummary } from "./services/getSummary";

const routes = Router();

routes.post("/auth/register", createUser);

routes.post("/auth/login", loginUser);

function checkToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Acesso negado" });
  }

  jsonwebtoken.verify(token, String(process.env.SECRET), (err: jsonwebtoken.VerifyErrors | null, decoded?: any) => {
    if(err){
      return res.status(404).send("Token invalido");
    }

    req.params.id = decoded.id;

    next();
  });

}

routes.get("/user/account", checkToken, findTransactions);

routes.post("/user/account", checkToken, createTransaction);

routes.delete("/user/account/transaction/:transactionId",
  checkToken,
  deleteTransaction
);

routes.get("/user/account/summary", checkToken, getSummary);

export default routes;
