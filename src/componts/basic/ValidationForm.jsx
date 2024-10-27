import React, { useState } from 'react'
import BasicServices from '../../services/BasicServices';
import { useNavigate } from 'react-router-dom';

export default function ValidationForm() {
    const [code, setCode] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        
        e.preventDefault();
        if (code.length == '') {
            setMessage("Fill the code")
            setTimeout(() => {
                setMessage('')
            }, 2000);
            return
        }

        let regex = /^\d+$/;
        if (!regex.test(code)) {
            setMessage("Code only contains numbers")
            setTimeout(() => {
                setMessage('')
            }, 2000);
            return
        }
        if (code.length != 6) {
            setMessage("Code is 6 digit number")
            setTimeout(() => {
                setMessage('')
            }, 2000);
            return
        }
        console.log(code);
        try {
            const userData = await BasicServices.validate(code)
            console.log(userData);
            setMessage(userData.message);

            if (userData.statusCode == 200) {
                setTimeout(() => {
                    navigate("/sign-in")
                }, 2000);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleNewCode = () => {
        console.log("Try to handle this shit");
    }
    return (
        <div>
            <div className='container'>
                <div className="auth-container my-2 text-center">
                    <h2>Validation</h2>
                    {message && <p className="error-message text-warning">{message}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group text-center my-2">
                            <input type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder='Your OTP' />
                        </div>
                        <button type="submit" className='btn btn-primary my-2'>Validate</button>
                        <a className='btn btn-secondary my-2 mx-2' onClick={handleNewCode} href='/new-code'>New Code</a>
                    </form>
                </div>
            </div>


        </div>
    )
}
