import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_zoom-image ${props.card ? 'popup_opened' : ''}`}>
      <div className="popup__zoom-container">
        <img
          className="popup__zoom-image"
          src={props.card ? props.card.link : '#'}
          alt={props.card ? props.card.name : ''}
        />
        <p className="popup__zoom-title">{props.card ? props.card.name : ''}</p>
        <button
          className="popup__close-button"
          aria-label="Закрыть"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
