import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProfilePage() {
    const { user, isAuthenticated } = useAuth()
    const [posts, setPosts] = useState([])

    const apiUrl = import.meta.env.VITE_API_URL
    useEffect(() => {
        if (isAuthenticated && user) {
            const userId = user.user._id
            fetch(`${apiUrl}/feed/profile/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setPosts(data)
                })
                .catch(err => console.log(err))
        }
    }, [isAuthenticated])

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" />
    }


    return (
        <div className='profile'>
            <h1>{user.user.userName}</h1>
            {posts.length === 0 ? <p>No Posts Yet</p> : <ul className='profile-posts'>
                {posts.map(post => (
                    <li className='post' key={post._id}>
                        <h3 className='title'>{post.title}</h3>
                        <p>{post.description}</p>
                        <button>&#10084; {post.likes}</button>
                    </li>
                ))}
            </ul>}
        </div>
    )
}
