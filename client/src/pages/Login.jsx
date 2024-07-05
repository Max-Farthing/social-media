import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
    return (
        <div>
            <div>
                <label htmlFor="">Username</label>
                <input type="text" />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="password" />
            </div>
            <div>
                <button>Login</button>
            </div>
            <Link to="signup">Create an account</Link>
        </div>
    )
}
