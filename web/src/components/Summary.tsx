import { CurrencyDollar, TrendDown, TrendUp } from "phosphor-react";

export interface SummaryItemsProps {
  balance: number | undefined;
  incomes: number | undefined;
  costs: number | undefined;
}

export function Summary({balance, incomes, costs}:SummaryItemsProps) {   
  
  return (
    <div className="grid grid-flow-col max-[640px]:grid-flow-row w-full gap-6 max-[640px]:gap-4">
      <div className="bg-white shadow-md rounded-md flex flex-col py-3 px-6 items-center justify text-center">
        <div className="flex items-center justify-around gap-2 text-green-500 font-semibold uppercase">
          <span>Entrada</span>
          <TrendUp size={24} />
        </div>
        <p className="text-black font-bold text-xl tracking-wider">
          R$ {incomes}
        </p>
      </div>
      <div className="bg-white shadow-md rounded-md flex flex-col py-3 px-6 items-center justify text-center">
        <div className="flex items-center justify-around gap-2 text-red-500 font-semibold uppercase">
          <span>Saída</span>
          <TrendDown size={24} />
        </div>
        <p className="text-black font-bold text-xl tracking-wider">
          R$ {costs}
        </p>
      </div>
      <div className="bg-white rounded-md shadow-md flex flex-col py-3 px-6 items-center justify text-center">
        <div className="flex items-center justify-around gap-2 text-black font-semibold uppercase">
          <span>Saldo</span>
          <CurrencyDollar size={22} />
        </div>
        <p className={`text-black font-bold text-xl tracking-wider ${balance != undefined && balance < 0? 'text-red-500' : 'text-black'}`}>
          R$ {balance}
        </p>
      </div>
    </div>
  );
}
