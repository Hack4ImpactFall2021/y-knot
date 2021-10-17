
import React from 'react';
import './LoginTextField.css'
interface TextFieldProps{
  header: string
}

const LoginTextField:React.FC<TextFieldProps> = props => {
  return (
    <div className="input-group">
        <label>{props.header}</label> <br/>
        <input type="text"/>
    </div>
  )
}

export default LoginTextField;