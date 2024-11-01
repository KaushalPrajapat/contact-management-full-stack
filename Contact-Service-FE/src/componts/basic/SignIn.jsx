import React, { useState } from 'react'
import { BsEnvelopeAt } from 'react-icons/bs'
import { FaLock } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import BasicServices from '../../services/BasicServices'

export default function SignIn(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isCodeValidated, setIsCodeValidated] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email == '' || password == '') {
            setError("Fill Email and Password both")
            setTimeout(() => {
                setError('')
            }, 3000);
        }
        else {
            try {
                const userData = await BasicServices.login(email, password)
                console.log(userData)
                if (userData.token == null) {
                    setError(userData.message)
                    if (userData.message && userData.message.includes("code")) {
                        setIsCodeValidated(false);
                    }
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else if (userData.token) {
                    localStorage.setItem('token', userData.token)
                    localStorage.setItem('name', userData.name)
                    localStorage.setItem('email', userData.email)
                    localStorage.setItem('phone', userData.phone)
                    localStorage.setItem('role', userData.role)
                    navigate('/contacts/profile')
                    location.reload()
                } else {
                    setError(userData.message)
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
                <h4>{props.loggedOut && <p className='text-success'>{props.loggedOut}</p>}</h4>
                <h2>Login</h2>
                {error && <p className="error-message text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group text-center my-2">
                        <label><BsEnvelopeAt /></label> &nbsp;
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
                    </div>
                    <div className="form-group  text-center my-2 mx-2">
                        <label><FaLock /></label> &nbsp;
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password Goes Here' />
                    </div>
                    <button type="submit" className='btn btn-primary my-2 '>Login</button>
                    <a className='btn btn-outline-secondary my-2 mx-2' href='/forgot-password'>Forgot Password</a>
                    {
                        !isCodeValidated && <div><a className='btn btn-outline-secondary mx-1' href="/validation">Validate Code</a></div>
                    }
                </form>
            </div>
        </div>
    )
}
