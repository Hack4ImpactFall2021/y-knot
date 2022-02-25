import React, { useState } from 'react';
import NetworkManager, { Endpoints } from '../../network/NetworkManager';

import './ResetPassword.css';

const ResetPassword = () => {

    const [message, setMessage] = useState<string>('');
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleClick = async () => {
        setIsLoading(true);
        setMessage('')

        const regexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
        if (!regexp.test(email)) {
            setMessage("Email address is invalid");
            setIsLoading(false);
            return;
        } 

        try {
            await NetworkManager.makeRequest(Endpoints.SendPasswordResetEmail, {email: email});
        } catch(error) {
            // console.log(error);
        } finally {
            setIsLoading(false);
            setMessage('If the account associated with the email exists, instructions will be sent to reset the password.')
        }
    }
    
    return (
        <div className='reset-password'>
            <div className='reset-password-container'>
                <h1>Reset Password</h1>
                <h3>Enter your email address, and we will send you instructions on how to reset your password.</h3>
                <p>Email: </p>
                <div className='email-input'>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)}/>       
                    <button disabled={isLoading} onClick={handleClick}>Reset</button>
                </div>
                
                {
                    message.length > 0 ? 
                    <div className='message-container'>
                        <p>{message}</p>
                    </div>
                    : null
                }
                <a href='/login'>Back To Login</a>

            </div>
        </div>
    )
}

export default ResetPassword;