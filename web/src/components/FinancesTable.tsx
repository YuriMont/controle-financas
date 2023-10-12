import { TrashSimple, TrendDown, TrendUp } from "phosphor-react";
import { EmptyTransactions } from "./EmptyTransactions";

export type Transactions = {
  id: number;
  description: string;
  value: number;
  type: boolean;
}[]

interface TransactionsTableProps{
  transactions: Transactions | null;
  deleteTransaction: (id:number) => void;
}

export function FinancesTable({ transactions, deleteTransaction }: TransactionsTableProps) {

  if(transactions?.length == 0){
    return (<EmptyTransactions />);
  }

  function handleDeleteTransaction(id: number){
    deleteTransaction(id);
  }

  return (
    <table className="w-full shadow-md bg-white rounded-md text-lg">
      <tr className="bg-zinc-300">
        <th className="text-left py-4 px-6 rounded-tl-md">Descrição</th>
        <th className="py-4 px-6">Valor</th>
        <th className="py-4 px-6">Tipo</th>
        <th className="rounded-tr-md"></th>
      </tr>

      {transactions?.map((item) => (
        <tr className="text-center border-b hover:bg-green-100 transition-colors" key={item.id}>
          <td className="text-left px-6 py-4">{item.description}</td>
          <td className="px-6 py-4">{item.value}</td>
          <td
            className={`w-full flex justify-center py-4 ${
              item.type ? "text-green-500" : "text-red-500"
            }`}
          >
            {item.type ? <TrendUp size={24}  weight="bold" /> : <TrendDown size={24}  weight="bold"/>}
          </td>
          <td
            onClick={() => handleDeleteTransaction(item.id)}
            className="p-4 cursor-pointer hover:opacity-80 transition-colors"
          >
            <TrashSimple size={24} weight="fill" />
          </td>
        </tr>
      ))}
    </table>
  );
}
