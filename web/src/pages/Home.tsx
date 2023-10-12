import { FinancesTable, Transactions } from "../components/FinancesTable";
import { Summary, SummaryItemsProps } from "../components/Summary";
import { NewFinanceForm } from "../components/NewFinanceForm";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/axios";

export function Home() {
  const [summaryItems, setSummaryItems] = useState<SummaryItemsProps>();
  const [transactions, setTransactions] = useState<Transactions | null>(null);

  const navigate = useNavigate();
  const token = Cookies.get("token");

  async function getSummary(){
    await api.get("/user/account/summary", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => {
        setSummaryItems(response.data);
    });
  }

  async function getTransactions(){
    await api
      .get("/user/account", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTransactions(response.data);
      });
  }

  async function createTransaction(description: string, value: number, type: string){
    await api.post(
      "/user/account",
      {
        description,
        value,
        type
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    getSummary();
    getTransactions();
  }

  async function deleteTransaction(transactionId: number) {
    await api.delete(`/user/account/transaction/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    getTransactions();
    getSummary()
  }

  useEffect(() => {
    if (token == undefined) {
      navigate("/sign");
    }
    getSummary();
    getTransactions();
  }, []);

  return (
    <main className="py-16 px-48 max-[640px]:p-8 max-[640px]:mb-16  max-[640px]:gap-8 flex flex-col w-screen min-h-screen items-center gap-6">
      <h1 className="text-center font-bold text-4xl">Sistema de finanças</h1>
      <Summary balance={summaryItems?.balance} costs={summaryItems?.costs} incomes={summaryItems?.incomes}/>
      <NewFinanceForm createTransactions={createTransaction}/>
      <FinancesTable transactions={transactions} deleteTransaction={deleteTransaction} />
    </main>
  );
}
