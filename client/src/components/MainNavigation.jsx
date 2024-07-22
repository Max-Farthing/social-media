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
        <header className='header'>
            <ul className='navigation'>
                <li>
                    <NavLink to="/" className={({isActive}) => isActive ? 'nav-link-active' : undefined}>
                        Feed
                    </NavLink>
                </li>
                {isAuthenticated && <li>
                    <NavLink to="/profile/:userId" className={({isActive}) => isActive ? 'nav-link-active' : undefined}>
                        Profile
                    </NavLink>
                </li>}
                {isAuthenticated && <li>
                    <button onClick={handleLogOut}>
                        Logout
                    </button>
                </li>}
                {!isAuthenticated && <li>
                    <NavLink to="/login" className={({isActive}) => isActive ? 'nav-link-active' : undefined}>
                        Login
                    </NavLink>
                </li>}
            </ul>
            <hr />
        </header>
    )
}
