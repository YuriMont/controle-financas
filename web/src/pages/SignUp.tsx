import { Eye, EyeSlash, Spinner } from "phosphor-react";
import { ToastContainer, toast } from "react-toastify";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export function SignUp() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmitLoginForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    api
      .post("/auth/register", {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      })
      .then(() => {
        navigate("/sign");
      })
      .catch((err) => {
        toast.error(err.response.data, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "light",
        });
      });
    setIsLoading(false);
  }
  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <ToastContainer />
      <form
        onSubmit={handleSubmitLoginForm}
        className="p-16 bg-white rounded-md shadow-md flex flex-col gap-6"
      >
        <h1 className="text-center font-bold text-3xl">Crie sua conta</h1>
        <div className="relative">
          <input
            placeholder="Valor"
            className="peer px-3 py-2 placeholder:text-transparent rounded-md border-2 outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
            type="text"
            name="name"
          />
          <label className="absolute -top-[0.70rem] peer-focus:-top-[0.70rem] text-zinc-500 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:bg-white bg-white peer-focus:text-green-600 peer-placeholder-shown:top-[0.6rem] text-sm peer-focus:text-sm left-2 px-2 transition-all">
            Nome
          </label>
        </div>
        <div className="relative">
          <input
            placeholder="Valor"
            className="peer px-3 py-2 placeholder:text-transparent rounded-md border-2 outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
            type="email"
            name="email"
          />
          <label className="absolute -top-[0.70rem] peer-focus:-top-[0.70rem] text-zinc-500 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:bg-white bg-white peer-focus:text-green-600 peer-placeholder-shown:top-[0.6rem] text-sm peer-focus:text-sm left-2 px-2 transition-all">
            Email
          </label>
        </div>
        <div className="relative">
          <input
            placeholder="Valor"
            className="peer px-3 py-2 placeholder:text-transparent rounded-md border-2 outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
            type={isVisible ? "password" : "text"}
            name="password"
          />
          <label className="absolute -top-[0.70rem] peer-focus:-top-[0.70rem] text-zinc-500 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:bg-white bg-white peer-focus:text-green-600 peer-placeholder-shown:top-[0.6rem] text-sm peer-focus:text-sm left-2 px-2 transition-all">
            Senha
          </label>
          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="absolute right-4 top-2"
          >
            {isVisible ? (
              <Eye size={28} weight="thin" />
            ) : (
              <EyeSlash size={28} weight="thin" />
            )}
          </button>
        </div>
        <span className="text-sm font-light text-center">Já tem uma conta? <Link className="text-blue-600 cursor-pointer" to="/sign">voltar</Link></span>
        <button
          type="submit"
          className="relative py-2 px-3 text-lg font-bold text-white rounded-md shadow-md bg-green-500 hover:bg-green-600 transition-colors"
        >
          {isLoading ? <Spinner /> : "Entrar"}
        </button>
      </form>
    </div>
  );
}
