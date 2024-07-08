import React from 'react'

export default function Modal({onClose, children}) {
  return (
    <div>
        <button onClick={onClose}>
            &times;
        </button>
        {children}
    </div>
  )
}
