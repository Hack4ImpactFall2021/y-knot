
import React from 'react';
import './LoginTextField.css'
interface TextFieldProps{
  header: string
  onChange: (val: string) => void;
}

const LoginTextField:React.FC<TextFieldProps> = ({header, onChange})=> {
  return (
    <div className="input-group">
        <label>{header}</label> <br/>
        <input 
          type="text" 
          onChange={({ target: { value } }) => onChange(value)}
        />
    </div>
  )
}

export default LoginTextField;