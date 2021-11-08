import React from 'react'
import './Button.css'

interface ButtonProps {
  type: string
  onClick: () => void;
}

interface ButtonStyle {
  backgroundColor: string
}
const Button: React.FC<ButtonProps> = (props) => {

  const getStyle = ():ButtonStyle => {
    if (props.type === 'ACCEPT') return {backgroundColor: '#117A54'} 
    else if (props.type === 'REJECT') return {backgroundColor: '#F44250'}
    else return {backgroundColor: '#ccc'}
  }
  return (
    <div>
      <button style={getStyle()} className='profile-header-action-btn' onClick={props.onClick}>
        {props.children}
      </button>
    </div>
  )
}

export default Button
