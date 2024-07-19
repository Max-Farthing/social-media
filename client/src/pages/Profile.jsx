import React, { useEffect, useState } from 'react'
import { useAuth } from '../store/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProfilePage() {
    const { user, isAuthenticated } = useAuth()
    const [posts, setPosts] = useState([])

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    const userId = user.user._id

    useEffect(() => {
        fetch(`http://localhost:5000/feed/profile/${userId}`)
            .then(response => response.json())
            .then(data => {
                setPosts(data)
            })
            .catch(err => console.log(err))
    }, [isAuthenticated])

    return (
        <div className='profile'>
            <h1>{user.user.userName}'s profile</h1>
            <ul>
                {posts.map(post => (
                    <li className='post' key={post._id}>
                        <h3 className='title'>{post.title}</h3>
                        <p>{post.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
