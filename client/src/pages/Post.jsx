import React, { useState } from 'react'

export default function Post() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    function createPost() {
        console.log("title: " + title)
        console.log("description: " + description)

        //implement fetch call here

        setTitle('')
        setDescription('')
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