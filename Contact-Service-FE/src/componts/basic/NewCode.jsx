import React, { useState } from 'react'
import BasicService from '../../services/BasicServices'
import { BsEnvelopeAt } from 'react-icons/bs'
import { FaLock } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import BasicServices from '../../services/BasicServices'

export default function NewCode() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email == '') {
            setError("Fill Email")
            setTimeout(() => {
                setError('')
            }, 3000);
        }
        else {
            try {
                const newCode = await BasicServices.getNewCode(email)
                console.log(newCode)
                setMessage(newCode.message);
                if (newCode.statusCode == 400) {
                    // setMessage(newCode.message)
                    setTimeout(() => {
                        setMessage("")
                    }, 3000);
                    return
                }
                else{
                    setTimeout(() => {
                        navigate("/validation")
                    }, 2000);
                }
            } catch (error) {
                console.log(error)
                setError(error.message)
                setTimeout(() => {
                    setError('');
                }, 5000);
            }
        }
    }



    return (
        <div className='container'>
            <div className="auth-container my-2 text-center">
                <h2>Get New Code</h2>
                {error && <p className="error-message text-danger">{error}</p>}
                {message && <p className="error-message text-warning">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group text-center my-2">
                        <label><BsEnvelopeAt /></label> &nbsp;
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
                    </div>

                    <button type="submit" className='btn btn-primary my-2 '>Submit</button>

                </form>
            </div>
        </div>
    )

}
