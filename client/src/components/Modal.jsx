import React from 'react';
import './Modal.css';

export default function Modal({ onClose, children }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
