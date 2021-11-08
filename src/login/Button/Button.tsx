import React from 'react'
import './Button.css'

interface ButtonProps {
  text: string
  onClick: () => void;
}


export const LoginButton: React.FC<ButtonProps> = ({text, onClick}) => {
  return (
    <button className='login-btn' onClick={onClick}>{text}</button>
  )
}

export default LoginButton
