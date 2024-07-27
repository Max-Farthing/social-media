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
  const [likedPosts, setLikedPosts] = useState(new Set())
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const { user } = useAuth()

  const apiUrl = import.meta.env.VITE_API_URL

  //loads the initial state
  useEffect(() => {
    fetch(`${apiUrl}/feed/post`)
      .then(res => res.json())
      .then(data => {
        setPosts(data)
      })
      .catch(err => console.log(err))
  }, [showModal, shouldRefresh])

  useEffect(() => {
    if (navigate.state?.refresh) {
      setShouldRefresh(true) // Set refresh trigger
    }
  }, [navigate.state])

  function handleClickNewPost() {
    setShowModal(false)
    navigate('/post', { state: { refresh: true } })
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

    fetch(`${apiUrl}/feed/post/${id}/${userId}?`, {
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
    if (likedPosts.has(post._id)) {
      return
    }

    let index = posts.posts.findIndex(p => p._id === post._id)
    const id = post._id

    fetch(`${apiUrl}/feed/post/${id}`, {
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

      setLikedPosts(prevLikedPosts => new Set(prevLikedPosts).add(post._id))
  }

  return (
    <>
      <button id='create-button' onClick={handleClickNewPost}>New Post &#9993;</button>
      <div className='posts'>
        {typeof posts.posts === 'undefined' || posts.posts.length === 0 ? (
          <p>Feed Empty</p>
        ) : (
          posts.posts.map(post => (
            <li className='post' onClick={() => handleClickPost(post)} key={post._id}>
              <p className='userName'>{post.userName || 'Anonymous'}</p>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <button onClick={(e) => { 
                e.stopPropagation()
                toggleLike(post) 
                }}>
                &#10084; {post.likes}
              </button>
            </li>
          ))
        )}
      </div>
      {showModal && <Modal onClose={handleCloseModal}>
        <p className='userName'>{selectedPost.userName || 'Anonymous'}</p>
        <h1>{selectedPost.title}</h1>
        <p>{selectedPost.description}</p>
        {user && selectedPost.userName === user.user.userName && <button onClick={handleDeletePost}>Delete Post</button>}
      </Modal>}
    </>
  )
}
