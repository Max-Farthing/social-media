import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

export default function HomePage() {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([{}])
  const [selectedPost, setSelectedPost] = useState({})
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetch("http://localhost:5000/feed/post")
      .then(res => res.json())
      .then(data => {
        setPosts(data)
      })
      .catch(err => console.log(err))
  }, [])

  function handleClickNewPost() {
    navigate('/post')
  }

  function handleClickPost(post) {
    setSelectedPost(post)
    setShowModal(true)
  }

  function handleCloseModal() {
    setShowModal(false)
  }

  function handleDeletePost() {
    const id = selectedPost._id
    let index = posts.posts.findIndex(post => post._id === id)
    setPosts(oldPosts => {
      console.log(oldPosts)
      const newPosts = {...oldPosts}
      newPosts.posts.splice(index, 1)
      console.log(newPosts)
      return newPosts
    })
    setShowModal(false)
  }

  return (
    <>
      <button onClick={handleClickNewPost}>Create a new post</button>
      <div>
        {typeof posts.posts === 'undefined' ? (
          <p>Feed Empty</p>
        ) : (
          posts.posts.map(post => (
            <li onClick={() => handleClickPost(post)} key={post._id}>
              <p>{post.title}</p>
              <p>{post.description}</p>
            </li>
          ))
        )}
      </div>
      {showModal && <Modal onClose={handleCloseModal}>
        <p>{selectedPost.title}</p>
        <button onClick={handleDeletePost}>Delete Post</button>
      </Modal>}
    </>
  )
}
