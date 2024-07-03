import React, { useEffect, useState } from 'react'

function App() {
  const [state, setState] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then(res => res.json())
      .then(data => {
        setState(data)
      })
  }, [])

  return (
    <div>
      <ul>
        {typeof state.users === 'undefined' ? <p>Loading...</p> : 
          state.users.map((user, i) => (
            <p key={i}>{user}</p>
          ))
        }
      </ul>
    </div>
  )
}

export default App
