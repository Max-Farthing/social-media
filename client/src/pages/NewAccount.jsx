import React from 'react'
import { useNavigate } from "react-router-dom"

export default function NewAccount() {
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()

        const fd = new FormData(event.target)
        const acqChannel = fd.getAll('acquistion') //capturing input values
        const data = Object.fromEntries(fd.entries())
        data.acquistion = acqChannel

        const info = {
            userName: data.userName,
            email: data.email,
            password: data.password
        }

        fetch('http://localhost:5000/auth/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))

        // console.log(data)
        event.target.reset()
        navigate('/')
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email</label>
                <input id='email' type="email" name='email' required />
            </div>
            <div>
                <label htmlFor="userName">Username</label>
                <input id='userName' type="text" name='userName' required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id='password' type="password" name='password' required />
            </div>
            <div>
                <label htmlFor="confirm-password">Confirm Password</label>
                <input id='confirm-password' type="password" name='confirm-password' required />
            </div>
            <button type='submit'>Create Account</button>
        </form>
    )
}
