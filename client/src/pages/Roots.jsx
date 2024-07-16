import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'
import { useAuth } from '../store/AuthContext'

export default function RootLayout() {
  const { isAuthenticated, login } = useAuth()

  useEffect(() => {
    const userId = localStorage.getItem('userId')
    if(userId) {
      fetch(`http://localhost:5000/auth/${userId}`)
      .then(response => response.json())
      .then(user => {
        login(user)
      })
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
