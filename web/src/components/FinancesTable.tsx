import { TrashSimple, TrendDown, TrendUp } from "phosphor-react";
import { EmptyTransactions } from "./EmptyTransactions";
import { useState } from "react";
import { Spinner } from "./Spinner";

export type Transactions = {
  id: number;
  description: string;
  value: number;
  type: boolean;
}[]

interface TransactionsTableProps{
  transactions: Transactions | null;
  deleteTransaction: (id:number) => void;
  getTransaction: () => void;
}

export function FinancesTable({ transactions, deleteTransaction, getTransaction}: TransactionsTableProps) {
  const [isLoading, setIsLoading] = useState(false);

  if(transactions?.length == 0){
    return (<EmptyTransactions />);
  }

  function handleDeleteTransaction(id: number){
    setIsLoading(true);
    deleteTransaction(id);
    getTransaction()
    setIsLoading(false);
  }

  return (
    <table className="w-full shadow-md bg-white rounded-md">
      <tr className="bg-zinc-300">
        <th className="text-left px-3 py-2 rounded-tl-md">Descrição</th>
        <th className="px-3 py-2">Valor</th>
        <th className="px-3 py-2">Tipo</th>
        <th className="py-2 rounded-tr-md"></th>
      </tr>

      {transactions?.map((item) => (
        <tr className="text-center" key={item.id}>
          <td className="text-left px-3 py-2">{item.description}</td>
          <td className="px-3 py-2">{item.value}</td>
          <td
            className={`w-full flex justify-center py-2 ${
              item.type ? "text-green-500" : "text-red-500"
            }`}
          >
            {item.type ? <TrendUp size={24} /> : <TrendDown size={24} />}
          </td>
          <td
            onClick={() => handleDeleteTransaction(item.id)}
            className="p-2 cursor-pointer hover:opacity-80 transition-colors"
          >
            {isLoading ? <Spinner /> : <TrashSimple size={24} weight="fill" />}
          </td>
        </tr>
      ))}
    </table>
  );
}
