import React from 'react'

import './LoginButton.css'

interface ButtonProps {
  text: string
  onClick: () => void;
}



export const LoginButton: React.FC<ButtonProps> = (props) => {
  return (
    <button className='login-btn' onClick={props.onClick}>{props.text}</button>
  )
}

export default LoginButton
