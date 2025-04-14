import React from 'react';
import './SuccessPopup.css'; // We'll create this for styling

function SuccessPopup({ message, onClose }) {
  return (
    <div className="success-popup-overlay">
      <div className="success-popup-content">
        <p>{message}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SuccessPopup;