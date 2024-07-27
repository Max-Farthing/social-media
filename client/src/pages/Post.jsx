import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useAuth } from '../store/AuthContext'

export default function Post() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const { user } = useAuth()

    function createPost() {
        let userId = localStorage.getItem('userId')

        const newPost = {
            title,
            description,
            userId,
            userName: user?.user?.userName
        }

        const apiUrl = import.meta.env.VITE_API_URL;
        //creates new post in database
        fetch(`${apiUrl}/feed/post`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        })
            .then(response => {
                return response.json()
            })
            .then(data => {

            })
            .catch(err => console.log(err))

        setTitle('')
        setDescription('')
        navigate('/', { state: { refresh: true } })
    }

    return (
        <div className='post-creation'>
            <div>
                <label htmlFor="">Title</label>
                <input placeholder='Title (e.g., How to Learn JavaScript in 30 Days)' type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div>
                <label htmlFor="">Details</label>
                <textarea
                    placeholder='Description (e.g., This guide will help you learn JavaScript from scratch...)'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}>
                </textarea>
            </div>
            <button onClick={createPost}>Create Post</button>
        </div>
    )
}