import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

export default function Post() {
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    function createPost() {
        // console.log("title: " + title)
        // console.log("description: " + description)
        let userId = localStorage.getItem('userId')
        // console.log(userId)

        const newPost = {
            title,
            description,
            userId
        }

        //creates new post in database
        fetch("http://localhost:5000/feed/post", {
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
            console.log(data)
        })
        .catch(err => console.log(err))

        setTitle('')
        setDescription('')
        navigate('/')
    }

    return (
        <div>
            <div>
                <label htmlFor="">Title</label>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div>
                <label htmlFor="">Details</label>
                <textarea value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
            </div>
            <button onClick={createPost}>Create Post</button>
        </div>
    )
}