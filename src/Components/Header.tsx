import { useState } from "react"
import { BoardModal } from "./BoardModal"

const Header = () => {
  const [openModal, setOpenModal] = useState(false)

  return(
    <div className="p-4 fixed left-0  z-50 right-0">
      <header className="flex justify-between items-center">
        <div>
          <div>
            <h3 className="truncate max-w-[200px] md:text-2xl text-xl fond-bold text-white md:ml-2 font-sans">Organize<strong className="text-[#635fc7]">Me</strong></h3>
          </div>
        </div>
        <div className="flex space-x-4 items-center md:space-x-6 bg-[#635fc7] p-3 text-white rounded hover:opacity-75">
          <button className="button" 
            onClick={() => setOpenModal(true)}
          >
            Adicionar Nova Tarefa <strong>+</strong>
          </button>
        </div>
      </header>

      { 
        openModal && <BoardModal setOpenModal={setOpenModal}/>
      }
    </div>
  )
}

export default Header