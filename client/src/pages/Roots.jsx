import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'
import { useAuth } from '../store/AuthContext'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function RootLayout() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    const token = localStorage.getItem('token')
    if(userId && token) {
      const decodedToken = jwtDecode(token)
      const currentTime = Date.now() / 1000
      if(decodedToken.exp < currentTime) {
        console.log('Token expired')
        localStorage.clear()
        navigate('/')
      } else {
        fetch(`http://localhost:5000/auth/${userId}`, {
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(user => {
          login(user)
        })
      }
    }
  }, [isAuthenticated])

  return (
    <>
        <MainNavigation />
        <main>
            <Outlet />
        </main>
    </>
  )
}
