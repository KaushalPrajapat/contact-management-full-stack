import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { Button, Col, Form, Row } from 'react-bootstrap';
import ContactServices from '../../services/ContactServices';

export default function UpdateContact() {
    const navigate = useNavigate();
    const [message, setMessage] = useState();

    const { cid } = useParams();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        comment: ''
    });

    useEffect(() => {
        findContactById()
    }, [])


    const findContactById = async () => {
        const token = localStorage.getItem("token")
        let response = await ContactServices.getContactById(
            token,
            cid,
        )
        console.log(response);
        setFormData(response)
    }


    //-------------------
    
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(formData);
    //     console.log(cid + " cid");
    //     const token = localStorage.getItem("token")
    //     try {
    //         let response = await ContactServices.updateContact(
    //             token,
    //             formData.firstName,
    //             formData.lastName,
    //             formData.phone,
    //             formData.email,
    //             formData.comment,
    //             cid
    //         );

    //         setMessage(response.message)
    //         if (response.statusCode == 200) {
    //             setTimeout(() => {
    //                 setMessage("");
    //             }, 3000);
    //         }
    //     } catch (error) {
    //         console.log(error + " Errors");
    //     } finally {
    //         navigate("/contacts/all-contacts")
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let response;
        try {
            const token = localStorage.getItem("token")
            response = await ContactServices.updateContact(
                token,
                formData.firstName,
                formData.lastName,
                formData.phone,
                formData.email,
                formData.comment,
                cid
            )
            setMessage(response.message)
            if (response.statusCode == 200) {
                setTimeout(() => {
                    setMessage("");
                    location.reload()
                    navigate("/contacts/all-contacts")
                    location.reload()
                }, 3000);
            }
        } catch (error) {
            console.log(error + " Errors");
        }
    };



    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parentName, childName] = name.split('.');
            setFormData(prevState => ({
                ...prevState,
                [parentName]: {
                    ...prevState[parentName],
                    [childName]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
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
                                            placeholder="Enter phone number"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            minLength={10}
                                            maxLength={10}
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
                                    type="text"
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


    )
}
