import React from 'react';

function InfoTooltip({ isOpen, onClose, text, image }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">    
        <img src={image} alt={text} className="popup__image" />
        <h2 className="popup__text">{text}</h2>  
        <button 
          className="popup__close-button" 
          aria-label="Закрыть" 
          type="button" 
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
