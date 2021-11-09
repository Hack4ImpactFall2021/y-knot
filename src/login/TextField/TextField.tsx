import React from 'react';
import './TextField.css'

export enum TextFieldTypes {
  password = "password",
  email = "email", 
  text = "text"
}

interface TextFieldProps{
  header: string,
  fieldType: TextFieldTypes,
  isDisabled?: boolean,
  onChange: (val: string) => void;
}

const LoginTextField:React.FC<TextFieldProps> = ({header, fieldType, isDisabled, onChange})=> {
  return (
    <div className="input-group">
        <label>{header}</label> <br/>
        <input 
          disabled = {isDisabled}
          type={fieldType}
          onChange={({ target: { value } }) => onChange(value)}
        />
    </div>
  )
}

export default LoginTextField;