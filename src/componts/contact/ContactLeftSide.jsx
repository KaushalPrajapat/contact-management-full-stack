import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AuthUserServices from '../../services/AuthUserServices';
import { useNavigate } from 'react-router-dom';

export default function ContactLeftSide() {
    const navigate = useNavigate()
    const handleSignOut = async (e) => {
        try {
            await AuthUserServices.handleSignOut();
        } catch (error) {
            console.log(error + " This error occured");
        } finally {
            navigate("/")
        }
    }
    return (
        <Container>
            <Row className='my-4 py-0'>
                {/* <Col className='col-4'> */}
                <a className='btn btn-outline-secondary my-1' href="/contacts">WelCome at Contact</a>
                <a className='btn btn-outline-secondary my-1' href="/contacts/add-contact">Add New Contact</a>
                <a className='btn btn-outline-secondary my-1' href="/contacts/all-contacts">All Contacts</a>
                <a className='btn btn-outline-secondary my-1' href="/about">About</a>
                <a className='btn btn-outline-secondary my-1' href="/contact-us">Contact us</a>
                {/* </Col> */}
            </Row>
        </Container>
    )
}