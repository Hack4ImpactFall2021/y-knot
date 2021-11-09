import React from 'react'
import './Button.css'

interface ButtonProps {
  text: string,
  isDisabled?: boolean,
  onClick: () => void;
}


export const LoginButton: React.FC<ButtonProps> = ({text, isDisabled, onClick}) => {
  return (
    <button className='login-btn' disabled={isDisabled} onClick={onClick}>{text}</button>
  )
}

export default LoginButton
