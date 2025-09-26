// src/components/BackButton.js
import React from "react";
import './backbutton.css';

function BackButton({ onBack }) {
  return (
    <button onClick={onBack}>
      ⬅ Back
    </button>
  );
}

export default BackButton;
