import React, { useEffect, useState } from 'react'

export default function Profile() {


    return (
        <div className='row'>
            {
                !localStorage.getItem("token") &&
                <div className='text-center my-4'>
                    <h2>Please SignIn or SignUp</h2>
                    <div className='my-4'>
                        <a href="/sign-in" className='btn btn-outline-warning mx-2 my-2'>Sign In</a>
                        <a href="/sign-up" className='btn btn-outline-warning mx-2 my-2'>Sign Up</a>
                    </div>
                </div>
            }
            {
                localStorage.getItem("token") &&
                <div>
                    <h1>UserData</h1>
                    <h2>{localStorage.getItem("name")}</h2>
                    <h2>{localStorage.getItem("email")}</h2>
                    <h2>{localStorage.getItem("phone")}</h2>
                </div>
            }
        </div>
    )
}
