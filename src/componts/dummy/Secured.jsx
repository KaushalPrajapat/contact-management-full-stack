import React, { useEffect, useState } from 'react'
import BasicServices from '../../services/BasicServices';

export default function Secured() {
    const [text, setText] = useState('')
    useEffect(() => {
        securedPage();
    }, []);

    const securedPage = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await BasicServices.secured(token);
            console.log(response);
            setText(response);
        } catch (error) {
            console.error('Error fetching profile information:', error);
        }
    };


    return (
        <div>
            {
                text && <div>Text : {text}</div>
            }
            {
                !text && <div>Nothing to show</div>
            }
        </div>
    )
}
