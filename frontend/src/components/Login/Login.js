import React from 'react'
import Landing from '../../pages/Landing'
import LoginComponent from './LoginComponent'

const Login = () => {
  return (
      <Landing ModalComponent={LoginComponent} />
  )
}

export default Login