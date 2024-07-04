import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../Hooks/useAuth'


type Props = {
  children?: React.ReactNode // 👈️ type children
}

const PublicRoute = ({ children }: Props) => {
  const { user } = useAuth()

  if(user){
    return <Navigate to='home' />
  }

  return (<>{children}</>)
}

export { PublicRoute }