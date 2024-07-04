import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { Card } from "../../Components/Card/index"
import { Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import { useToast } from '../../Hooks/useToast';

interface RequestLoginProps {
  email: string
  password: string
  passwordConfirmation: string
}

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { signIn } = useAuth();
  const { notify } = useToast()

  const handleLogin = async ({ email, password, passwordConfirmation }: RequestLoginProps) => {      
    try {
      setIsLoading(true)
      await signIn({
        email,
        password,
        passwordConfirmation
      });

      notify({
        message: 'Seja-bem vindo',
        types: 'success'
      })
      setIsLoading(false)
    } catch (error) {
      notify({
        message: 'Falha na autenticação',
        types: 'error'
      })
    }
  };

  const { handleSubmit, register } = useForm()

  const onSubmit = (data: any) => {
    handleLogin(data)
  }

  return (
    <Card>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Faça login em nossa plataforma</h3>
        <div>
          <label className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Seu email</label>
          <input 
            type="email" 
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" 
            {...register('email')}
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Sua senha</label>
          <input 
            type="password" 
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
            {...register('password')}
          />
        </div>
    
        <button 
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {isLoading ? <BeatLoader color="#fffff" size={10} />  : 'Login com sua conta'}
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300 justify-center items-center flex">
          Sem registro? <Link to='register' className="text-blue-700 hover:underline dark:text-blue-500">Criar conta</Link>
        </div>
      </form>
    </Card>
  );
}

export { Login };
