interface ModalProps {
  children: React.ReactNode
  setOpenModal: (value: boolean) => void
}

const Modal = ({ children, setOpenModal }: ModalProps) => {
  return(
    <div className='fixed right-0 left-0 top-0 bottom-0 px-2 py-4 z-50 justify-center items-center flex bg-[#00000080]'
      onClick={(e) => {
        if(e.target !== e.currentTarget) {
          return
        }
        setOpenModal(false)
      }}
    >
      <div className='max-h-[95vh] bg-white bg[#2b2c37] text-black
        font-bold shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl'>
          {children}
        </div>
    </div>
  )
}

export { Modal }