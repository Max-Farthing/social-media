import React, { useEffect } from 'react';
import './Modal.css';

export default function Modal({ onClose, children }) {

  useEffect(() => {
    const handleEscape = (event) => event.key === 'Escape' && onClose()

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  function handleBackDropClick(event) {
    if(event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-backdrop" onClick={handleBackDropClick}>
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
