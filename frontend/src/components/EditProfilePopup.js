import React from 'react';
import PopupWithForm from './PopupWithForm'
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleNameChange(evt) {
    setName(evt.target.value)
  }
  
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value)
  }
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          buttonText={isLoading ? "Сохранение..." : "Сохранить"}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input
            className="popup__input popup__input_type_name"
            id="name-input"
            type="text"
            name="name"
            required
            placeholder="Имя"
            minLength={2}
            maxLength={40}
            value={name || ''}
            onChange={handleNameChange}
          />
          <span className="popup__error name-input-error">Вы пропустили это поле</span>
          <input
            className="popup__input popup__input_type_job"
            id="job-input"
            type="text"
            name="about"
            required
            placeholder="О себе"
            minLength={2}
            maxLength={200}
            value={description || ''}
            onChange={handleDescriptionChange}
          />
          <span className="popup__error job-input-error">Вы пропустили это поле</span>
        </PopupWithForm>
  );
}

export default EditProfilePopup;