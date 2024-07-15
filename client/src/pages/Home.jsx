import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import { useAuth } from '../store/AuthContext'

export default function HomePage() {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const [posts, setPosts] = useState([{}])
  const [selectedPost, setSelectedPost] = useState({})
  const [showModal, setShowModal] = useState(false)
  const { isAuthenticated, login, user } = useAuth()

  //loads the initial state
  useEffect(() => {
    fetch("http://localhost:5000/feed/post")
      .then(res => res.json())
      .then(data => {
        setPosts(data)
      })
      .catch(err => console.log(err))
  }, []) //need dependency change

  

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
    const userId = localStorage.getItem('userId')

    fetch(`http://localhost:5000/feed/post/${id}/${userId}?`, {
      method: "DELETE",
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        setPosts(oldPosts => {
          const newPosts = { ...oldPosts }
          newPosts.posts.splice(index, 1)
          return newPosts
        })
        setShowModal(false)
      })
      .catch(err => console.log(err))

  }

  function toggleLike(post) {
    let index = posts.posts.findIndex(p => p._id === post._id)
    const id = post._id

    fetch(`http://localhost:5000/feed/post/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json()
      .then(data => {
        setPosts(oldPosts => {
          const newPosts = { ...oldPosts }
          newPosts.posts[index] = data.post
          return newPosts
        })
        setShowModal(false)
      }))
      .catch(err => console.log(err))
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
              <button onClick={() => toggleLike(post)}>Like</button>
              <p>Likes: {post.likes}</p>
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
