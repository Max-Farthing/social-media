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
        <div>
            <p>{user.user.userName}</p>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <p>{post.title}</p>
                        <p>{post.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
