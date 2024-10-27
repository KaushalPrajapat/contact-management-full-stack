import React, { useState } from 'react'
import { CardBody, CardTitle, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BiSolidEnvelope, BiCommentDetail, BiSolidPhone, BiSolidUserPin } from 'react-icons/bi'
import ContactServices from '../../services/ContactServices'
export default function Contact(props) {

    const handleDelete = async (cid) => {
        console.log("Log from handle delete");
        try {
            const token = localStorage.getItem("token")
            const response = ContactServices.deleteContact(token, cid)
            console.log(response);
        } catch (error) {
            console.log("Any Error from Contact delete place : " + error);
        } 
        finally {
            location.reload();
        }
        // await axios.delete(delete_uri + props.user.phone).then((res) => {
        //     location.reload();
        // })
    }

    return (
        <div>
            <Row>
                <Col className='end justify-content-end'>
                    <div className='card my-1 p-1 text-center'>
                        <div className='mx-0 my-0'>
                            <b>
                                <span>  <BiSolidUserPin /> {props.contact.firstName + " " + props.contact.lastName}</span> &nbsp;
                            </b>
                        </div>
                        <div className='mx-0 my-0'>
                            <i className='mx-2'><BiSolidPhone />  : {props.contact.phone}</i>
                            <i className='mx-2'> <BiSolidEnvelope /> {props.contact.email}</i>
                        </div>
                        {props.contact.comment &&
                            <i className='mx-2'> <BiCommentDetail /> {props.contact.comment}</i>
                        }
                        {!props.contact.comment &&
                            <i className='mx-2'> <BiCommentDetail /> No Comment ...</i>
                        }

                        <div className='mx-0 my-0'>
                            <Link className='btn btn-sm btn-outline-secondary my-0' to={`/contacts/update/${props.contact.contactId}`}>Update</Link>
                            
                            <button
                                className="btn btn-sm btn-danger mx-2"
                                onClick={() => handleDelete(props.contact.contactId)}
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                </Col>
            </Row>
        </div >
    )
}
