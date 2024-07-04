import { useForm } from 'react-hook-form'
import api from '../../Services/api';
import { useToast } from '../../Hooks/useToast';
import { BeatLoader } from 'react-spinners';
import { useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import { Modal } from '../Modal';

interface BoardModalProps {
  setOpenModal: (value: boolean) => void
  type?: any
}

interface TaskProps {
  title: string
  description: string
}

const BoardModal = ({ setOpenModal, type  }: BoardModalProps) => {

  const { register, handleSubmit } = useForm()
  const { notify } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const { user } = useAuth()

  const requestTask = async ({description, title }: TaskProps) => {
    try {
      setIsLoading(true)

      await api.post('tasks', {
        title,
        description,
        user_id: user.id.toString()
      })


      notify({
        message: 'Tarefa criada com sucesso',
        types: 'success'
      })

      setIsLoading(false)
      setOpenModal(false)

    }catch(err) {
      console.log(err)
    }
  }

  const onSubmit = (data: any) => {
    requestTask({ ...data })
  }

  return (
    <Modal setOpenModal={setOpenModal}>
      <h3 className='text-lg'>
        { type === 'edit' ? 'Editar' : 'Criar Nova'} Tarefa
      </h3>

      <div className='mt-8'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='w-full flex flex-col'>
            <label className='text-sm  text-gray-500'>
              Tarefa
            </label>
            <input 
              className='bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] outline-1 ring-0 mb-3' 
              placeholder='Comprar Leite'
              {...register('title')}
            />
            <label className='text-sm  text-gray-500'>
              Descrição
            </label>
            <input 
              className='bg-transparent px-4 py-2 rounded-md text-sm border border-gray-600 focus:outline-[#635fc7] outline-1 ring-0' 
              placeholder='Estou na última caixa do leite'
              {...register('description')}
            />
          </div>
      
          <button
            type='submit'
            className='w-full items-center hover:opacity-75 bg-[#635fc7] mt-8 relative text-white py-2 rounded-full'
          >
            {isLoading ? <BeatLoader color="#fffff" size={10} /> : 'Criar nova tarefa' }
          </button>
        </form>
      </div>
    </Modal>
  )
}

export { BoardModal }