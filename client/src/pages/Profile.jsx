import React from 'react'

export default function ProfilePage({ userName, posts }) {
    return (
        <div>
            <p>{userName}</p>
            <ul>
                {posts.map(post => (
                    <li>
                        <p>{post.title}</p>
                        <p>{post.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
