import { FormEvent } from "react";

interface NewFinanceFormProps{
  createTransactions: (description: string, value: number, type: string) => void;
}

export function NewFinanceForm({createTransactions}:NewFinanceFormProps) {

  function handleSubmitTransactionForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    createTransactions(String(formData.get('description')), Number(formData.get('value')), String(formData.get('type')));

    event.currentTarget.reset()
  }

  return (
    <form onSubmit={handleSubmitTransactionForm} className="bg-white rounded-md shadow-md p-8 w-full flex items-end justify-center gap-4 max-[640px]:flex-col max-[640px]:items-center">
      <div className="relative">
        <input
          required
          placeholder="Valor"
          className="peer px-3 py-2 placeholder:text-transparent rounded-md border-2 outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
          type="text"
          name="description"
        />
        <label
          className="absolute -top-[0.70rem] peer-focus:-top-[0.70rem] text-zinc-500 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:bg-white bg-white peer-focus:text-green-600 peer-placeholder-shown:top-[0.6rem] text-sm peer-focus:text-sm left-2 px-2 transition-all"
          
        >
          Descrição
        </label>
      </div>

      <div className="relative">
        <input
        required
          placeholder="Valor"
          className="peer px-3 py-2 placeholder:text-transparent rounded-md border-2 outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
          type="number"
          name="value"
        />
        <label
          className="absolute -top-[0.70rem] peer-focus:-top-[0.70rem] text-zinc-500 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:bg-white bg-white peer-focus:text-green-600 peer-placeholder-shown:top-[0.6rem] text-sm peer-focus:text-sm left-2 px-2 transition-all"
                 >
          Valor
        </label>
      </div>

      <div className="flex flex-col gap-1 max-[640px]:flex-row max-[640px]:gap-3">
        <span className="flex gap-1">
          <input type="radio" name="type" value="increment" />
          <span>Ganho</span>
        </span>
        <span className="flex gap-1">
          <input type="radio" name="type" value="decrement" />
          <span>Custo</span>
        </span>
      </div>
      <button className="text-white bg-green-600 rounded-md px-3 py-2 text-lg font-bold">
        Adicionar
      </button>
    </form>
  );
}
