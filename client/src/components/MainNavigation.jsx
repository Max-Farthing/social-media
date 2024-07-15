import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'

export default function MainNavigation() {
    const { isAuthenticated, user, logout } = useAuth()

    function handleLogOut() {
        logout()
        localStorage.clear()
    }

    return (
        <header>
            <ul>
                <li>
                    <NavLink to="/">
                        Feed
                    </NavLink>
                </li>
                {isAuthenticated && <li>
                    <NavLink to="/profile/:userId">
                        Profile
                    </NavLink>
                </li>}
                {isAuthenticated && <li>
                    <button onClick={handleLogOut}>
                        Logout
                    </button>
                </li>}
                {!isAuthenticated && <li>
                    <NavLink to="/login">
                        Login
                    </NavLink>
                </li>}
            </ul>
        </header>
    )
}
