import { Eye, EyeSlash } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export function Sign() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmitLoginForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    await api
      .post("/auth/login", {
        email: formData.get("email"),
        password: formData.get("password"),
      })
      .then((response) => {
        const expiration = new Date(new Date().getTime() + 4 * 60 * 60 * 1000);
        Cookies.set("token", response.data.token, { expires: expiration });
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.response.data, {
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
        <h1 className="font-bold text-center text-3xl">Finanças</h1>
        <div className="relative">
          <input
            placeholder="Valor"
            className="peer px-3 py-2 placeholder:text-transparent rounded-md border-2 outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
            type="email"
            name="email"
          />
          <label
            className="absolute -top-[0.70rem] peer-focus:-top-[0.70rem] text-zinc-500 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:bg-white bg-white peer-focus:text-green-600 peer-placeholder-shown:top-[0.6rem] text-sm peer-focus:text-sm left-2 px-2 transition-all"
            htmlFor="email"
          >
            Email
          </label>
        </div>
        <div className="relative">
          <input
            placeholder="Valor"
            className="peer px-3 py-2 placeholder:text-transparent rounded-md border-2 outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
            type={!isVisible ? "password" : "text"}
            name="password"
          />
          <label
            className="absolute -top-[0.70rem] peer-focus:-top-[0.70rem] text-zinc-500 peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:bg-white bg-white peer-focus:text-green-600 peer-placeholder-shown:top-[0.6rem] text-sm peer-focus:text-sm left-2 px-2 transition-all"
            htmlFor="password"
          >
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
        <span className="text-sm font-light text-center">Não tem conta? <Link className="text-blue-600 cursor-pointer" to="/signup">crie sua conta</Link></span>
        <button
          disabled={isLoading}
          type="submit"
          className="relative flex items-center justify-center py-2 px-3 text-lg font-bold text-white rounded-md shadow-md bg-green-500 hover:bg-green-600 disabled:bg-green-700 disabled:cursor-wait transition-colors"
        >
          {
            isLoading ? "Entrando...." : "Entrar"
          }
        </button>
      </form>
    </div>
  );
}
