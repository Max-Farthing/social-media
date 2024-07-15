import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'
// import { useAuth } from '../store/AuthContext'

export default function RootLayout() {
  // const { isAuthenticated, user, login } = useAuth()

  // useEffect(() => {
  //   const savedUser = localStorage.getItem('user')
  //   if(savedUser) {
  //     login()
  //     console.log(user)
  //   }
  // }, [isAuthenticated])

  return (
    <>
        <MainNavigation />
        <main>
            <Outlet />
        </main>
    </>
  )
}
