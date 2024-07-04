import { useEffect, useState } from "react"
import api from "../Services/api"
import { useAuth } from "../Hooks/useAuth"
import { InfoModal } from "./InfoModal"

interface TasksProps {
  id: number
  title: string
  description: string
}

function Card(){
  const [tasks, setTasks] = useState([])
  const { user } = useAuth()

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [info, setInfo] = useState<string>('')
  const [index, setIndex] = useState<number>(0)

  useEffect(() => {
    const fetchTasks = async() => {
      try {
        const response = await api.get(`getTasks/${user.id}`);

        setTasks(response.data)
        
      } catch(error) {
        console.error('Error: ', error)
      }
    }

    fetchTasks()
  }, [user])

  return (
    <>
      <div className="w-full max-w-sm p-4 mt-40 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
          Tarefas
        </h5>
        {tasks.length === 0 ? (
          <h1 className="text-gray-500 dark:text-gray-400 flex justify-center items-center">
            Não existe nenhuma tarefa no momento
          </h1>
        ) : (
          <ul className="my-4 space-y-3">
            
            { tasks?.map((task: TasksProps, index) => {
              return(
                <li key={index}>
                  <div onClick={() => {
                      setInfo(task.description) 
                      setOpenModal(true)
                      setIndex(task.id)
                    }} 
                    className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                    <span className="flex-1 ms-3 whitespace-nowrap">{task.title}</span>
                  </div>
                </li>
              )
            }) }
          </ul>
        )}
     </div>

     {
        openModal && <InfoModal setOpenModal={setOpenModal} description={info} index={index} />
     }
    </>
  )

}

export default Card