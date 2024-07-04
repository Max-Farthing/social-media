import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MainNavigation() {
  return (
    <header>
        <ul>
            <li>
                <NavLink to="/">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/">
                    Profile
                </NavLink>
            </li>
            <li>
                <NavLink to="/login">
                    Login
                </NavLink>
            </li>
        </ul>
    </header>
  )
}
