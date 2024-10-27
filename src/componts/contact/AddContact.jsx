import React, { useState } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap';
import ContactServices from '../../services/ContactServices';

export default function AddContact() {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        comment: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
        try {
            const token = localStorage.getItem("token")
            response = await ContactServices.addContact(
                token,
                formData.firstName,
                formData.lastName,
                formData.phone,
                formData.email,
                formData.comment
            )
            setMessage(response.message)
            if (response.statusCode == 200) {
                setTimeout(() => {
                    setMessage("");
                    location.reload()
                    navigate("/contacts/all-contacts")
                }, 3000);
            }
        } catch (error) {
            console.log(error + " Errors");
        }finally{
            navigate("/contacts/all-contacts")
        }
    };

    return (
        <>
            <div className='my-2 py-2'>
                <div className="container">
                    {message && <p className='text-center text-warning'>{message}</p>}
                    <div className="row">
                        <h2>Add New Contact</h2>
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
                                            placeholder="Enter phone number(use +XX)"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            minLength={10}
                                            maxLength={15}
                                            required
                                        />
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
                                    </Form.Group>
                                </Col>
                            </Row>


                            <Form.Group controlId="password">
                                <Form.Label>Comments</Form.Label>
                                <Form.Control
                                    type="text-area"
                                    placeholder="Extra About Contact"
                                    name="comment"
                                    value={formData.comment}
                                    onChange={handleChange}
                                    maxLength={100}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit" className='py-1 my-2'>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );

}
