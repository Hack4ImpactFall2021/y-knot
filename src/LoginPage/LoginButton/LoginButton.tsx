import React from 'react'

import './LoginButton.css'

interface ButtonProps {
  text: string
}



export const LoginButton: React.FC<ButtonProps> = (props) => {
  return (
    <button className='login-btn'>{props.text}</button>
  )
}

export default LoginButton
