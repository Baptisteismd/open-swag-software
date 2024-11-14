import React from 'react';
import './HomeButton.css';

const HomeButton = ({ image, label, onClick }) => {
  return (
    <button className="button-with-image" onClick={onClick}>
      <img src={image} alt={`${label} icon`} className="button-image" />
      <span className="button-label">{label}</span>
    </button>
  );
};

export default HomeButton;
