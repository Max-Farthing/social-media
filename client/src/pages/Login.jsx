import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    const [error, setError] = useState(null)

    function handleLogin(event) {
        event.preventDefault()

        const fd = new FormData(event.target)
        const acqChannel = fd.getAll('acquistion')
        const data = Object.fromEntries(fd.entries())
        data.acquisition = acqChannel

        const info = {
            userName: data.userName,
            password: data.password
        }

        fetch('http://localhost:5000/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        })
        .then(response => {
            if(!response.ok) {
                setError('Login Failed')
                throw new Error('Login Failed')
            }
            return response.json()
        })
        .then(data => {
            console.log(data)
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.userId)
        })
        .catch(err => console.log(err))

        event.target.reset()
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor="userName">Username</label>
                <input type="text" id='userName' name='userName' required />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password' required />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}            
            <div>
                <button type='submit'>Login</button>
            </div>
            <Link to="signup">Create an account</Link>
        </form>
    )
}
