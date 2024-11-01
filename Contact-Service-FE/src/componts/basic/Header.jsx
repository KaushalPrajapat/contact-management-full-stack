import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import Jumbotron, { Col, Row, button } from 'react-bootstrap/'
import AuthUserServices from '../../services/AuthUserServices'
import { useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();

    const handleSignOut = async (e) => {
        try {
            await AuthUserServices.handleSignOut();
        } catch (error) {
            console.log(error + " This error occured");
        } finally {
            navigate("/")
        }
    }

    const handleUserData = () => {
        navigate('/contacts/profile')
    }
    return (
        <div className="jumbotron shadow border my-1 bg-secondary-subtle">
            <div>
                <Row>
                    <Col className='col-9'>
                        <h1 className="display-4 text-center text-info">Welcome to Contact App</h1>
                    </Col>
                    <Col className='col-3'>
                        <div className='container d-flex my-2'>
                            {!localStorage.getItem("token") &&
                                <span>
                                    <a href="/sign-in" className='btn btn-outline-warning mx-2 my-2'>Sign In</a>
                                    <a href="/sign-up" className='btn btn-outline-warning mx-2 my-2'>Sign Up</a>
                                </span>
                            }
                            {
                                localStorage.getItem("token") &&
                                <a href="/sign-out" className='btn btn-outline-warning mx-2 my-2' onClick={handleSignOut}>SignOut</a>
                            }
                            {
                                localStorage.getItem("token") &&
                                <div>
                                    <button className='btn btn-outline-info mx-2 my-2' onClick={handleUserData}>show user</button>
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
