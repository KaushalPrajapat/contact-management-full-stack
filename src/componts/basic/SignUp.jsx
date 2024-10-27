import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import BasicServices from '../../services/BasicServices';
import ValidationForm from './ValidationForm';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData.password);
        console.log(formData.confirmPassword);
        if (formData.password != formData.confirmPassword) {
            setMessage("Password is not same")
            setTimeout(() => {
                setMessage('')
            }, 4000);
        }
        else {
            try {
                let response = await BasicServices.signup(
                    formData.firstName,
                    formData.lastName,
                    formData.email,
                    formData.password,
                    formData.phone,
                )
                console.log(response);
                if (response.statusCode == 500) {
                    setMessage(response.message)
                    // setMessage
                    setTimeout(() => {
                        setMessage("")
                    }, 3000);
                } else {
                    navigate("/validation")
                }
            } catch (error) {
                console.log(error + " Errors");
            }
        }

    };

    return (
        <>
            <div className='my-2 py-2'>
                <div className="container">
                    {message && <p className='text-center text-warning'>{message}</p>}
                    <div className="row">
                        <h2>Sign Up</h2>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <Form.Group controlId="firstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter first name"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="lastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter last name"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="phone">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter phone number"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            minLength={10}
                                            maxLength={10}
                                            required
                                        />
                                        <Form.Text className="text-muted">Don't start with +XX</Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
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
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            minLength={6}
                                            required
                                        />
                                    </Form.Group>
                                </Col>

                            </Row>
                            <Button variant="primary" type="submit" className='py-1 my-2'>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
