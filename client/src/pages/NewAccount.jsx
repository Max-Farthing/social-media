import React from 'react'

export default function NewAccount() {
    return (
        <div>
            <div>
                <label htmlFor="">Username</label>
                <input type="text" />
            </div>
            <div>
                <label htmlFor="">Email</label>
                <input type="email" />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="password" name="" id="" />
            </div>
            <div>
                <label htmlFor="">Confirm Password</label>
                <input type="password" />
            </div>
            <button>Create Account</button>
        </div>
    )
}
