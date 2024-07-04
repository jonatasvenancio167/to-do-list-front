import api from "../../Services/api"
import { Modal } from "../Modal"
import { useToast } from '../../Hooks/useToast';
import { useState } from "react";
import { BeatLoader } from "react-spinners";

interface InfoModalProps {
  setOpenModal: (value: boolean) => void
  description: string
  index: number
}

const InfoModal = ({ setOpenModal, description, index }: InfoModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { notify } = useToast()

  const updateStatus = async () => {
    try {
      setIsLoading(true)

      await api.put(`/updateTask/${index}`, {
        completed: true
      })

      setIsLoading(false)

      notify({
        message: 'Tarefa finalizada com sucesso',
        types: 'success'
      })

      setOpenModal(false)
    } catch(err) {
      return notify({
        message: 'Erro ao finalizar a tarefa',
        types: 'error'
      })
    }
  }

  return (
    <Modal setOpenModal={setOpenModal}>
      <p className="flex justify-center items-center mb-14">{description}</p>
      <div className="flex space-x-4 items-center justify-center md:space-x-6 bg-[#635fc7] p-3 text-white rounded hover:opacity-75">
        <button onClick={() => updateStatus()}>{isLoading ? <BeatLoader color="#fffff" size={10} /> : 'Finalizar Tarefa' }</button>
      </div>
    </Modal>
  )
}

export { InfoModal }