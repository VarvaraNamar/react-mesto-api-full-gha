import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef('');
  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_avatar-link"
        id="avatar-link-input"
        type="url"
        name="avatar"
        required
        placeholder="Ссылка на картинку"
        ref={avatarRef}
      />
      <span className="popup__error avatar-link-input-error">Вы пропустили это поле</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;