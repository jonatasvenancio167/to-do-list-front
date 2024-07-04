import { useForm } from "react-hook-form"
import { Card } from "../../Components/Card/index"
import { useState } from "react";
import api from "../../Services/api";
import { useToast } from '../../Hooks/useToast';
import { zodResolver } from '@hookform/resolvers/zod'
import { BeatLoader } from "react-spinners";
import { RegisterSchema } from "../../Validation/register";
import { z } from "zod";

interface HandleRegisterProps {
  name: string
  email: string
  password: string
  confirmPassword: string
}

type RegisterData = z.infer<typeof RegisterSchema>

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { notify } = useToast()

  const methods = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema)
  })

  const handleRegister = async ({ name, email, password, confirmPassword }: HandleRegisterProps) => {
    try {
      setIsLoading(true)

      await api.post('users', 
      { 
        name, 
        email, 
        password,
        password_confirmation: confirmPassword
      });

      setIsLoading(false)

      notify({
        message: 'Registro criado com sucesso!',
        types: 'success'
      })
    } catch (error) {
      notify({
        message: 'Falha ao se registrar!',
        types: 'error'
      })
    }
  };


  const { handleSubmit, register, formState: { errors } } = methods

  const onSubmit = (data: any) => {
    handleRegister(data)
  }
  
  return (
    <Card>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">Faça login em nossa plataforma</h3>
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Seu nome</label>
            <input 
              type="name" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
              placeholder="João" 
              {...register('name', { required: errors.name?.message })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Seu email</label>
            <input 
              type="email" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
               placeholder="name@company.com" 
              {...register('email', { required: errors.email?.message })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Sua senha</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
              {...register('password', { required: errors.password?.message })}
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Confirmar senha</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
              {...register('confirmPassword', { required: errors.confirmPassword?.message })}
            />
          </div>
          <button 
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {isLoading ? <BeatLoader color="#fffff" size={10} />  : 'Criar registro'}
          </button>
    
        </form>
    </Card>
  )
}

export { Register }