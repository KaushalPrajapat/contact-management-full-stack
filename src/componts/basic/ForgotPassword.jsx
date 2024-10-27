import React, { useState } from 'react'
import { BsEnvelopeAt } from 'react-icons/bs'
import { FaLock } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import BasicServices from '../../services/BasicServices'
import { Col, Form, Row } from 'react-bootstrap'

export default function forgotPassword() {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isCodeValidated, setIsCodeValidated] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password);
    console.log(confirmPassword);
    if (email == '' || password == '' || confirmPassword == '') {
      setError("Fill Email and Password both")
      setTimeout(() => {
        setError('')
      }, 3000);
    }
    
    if (password != confirmPassword) {
      setError("Password is not same")
      setTimeout(() => {
        setError('')
      }, 4000);
    }

    else {
      try {
        const userData = await BasicServices.forgotPassword(email, password)
        console.log(userData)
        if (userData.statusCode == 200) {
          setMessage(userData.message)
          setTimeout(() => {
            setError('');
          }, 3000);
          navigate("/validation")
        }else {
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
        <h2>Forgot Password</h2>
        {error && <p className="error-message text-danger">{error}</p>}
        {message && <p className="error-message text-success">{message}</p>}
        <p className='text-warning'>You need to again validate your account</p>
        <Form onSubmit={handleSubmit}>
          <div className="form-group text-center my-2">
            <label><BsEnvelopeAt /></label> &nbsp;
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
          </div>

          <Row>
            <Col>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <button type="submit" className='btn btn-primary my-2 '>Submit</button>
          
        </Form>
      </div>
    </div>
  )
}
