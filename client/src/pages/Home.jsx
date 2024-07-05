import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <>
      <button><Link to='post'>Create a new post</Link></button>
      <div>Feed Empty</div>
    </>
  )
}
