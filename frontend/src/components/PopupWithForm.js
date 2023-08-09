import React from 'react';

function PopupWithForm({ name, title, buttonText, isOpen, onClose, onSubmit, ...props }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button 
          className="popup__close-button" 
          aria-label="Закрыть" 
          type="button" 
          onClick={onClose}
        />
        <form className="popup__form popup__form_type_profile" name={name} noValidate onSubmit={onSubmit}>
          {props.children}
          <button className="popup__save-button" type="submit">
          {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
