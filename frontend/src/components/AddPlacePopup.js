import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({ isOpen, onAddPlace, onClose, isLoading }) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleNameChange(evt) {
    setName(evt.target.value)
  }
  
  function handleLinkChange(evt) {
    setLink(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddPlace({
      name: name,
      link: link,
    })
  }

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [isOpen])

  return (
    <PopupWithForm
          name="card"
          title="Новое место"
          buttonText={isLoading ? "Создание..." : "Создать"}
          isOpen={isOpen}
		      onClose={onClose}
		      onSubmit={handleSubmit}
        >
          <input
            className="popup__input popup__input_type_card-title"
            id="card-title-input"
            type="text"
            name="name"
            required
            placeholder="Название"
            minLength={2}
            maxLength={30}
            value={name || ''}
            onChange={handleNameChange}
          />
          <span className="popup__error card-title-input-error">Вы пропустили это поле</span>
          <input
            className="popup__input popup__input_type_card-link"
            id="card-link-input"
            type="url"
            name="link"
            required
            placeholder="Ссылка на картинку"
            value={link || ''}
            onChange={handleLinkChange}
          />
          <span className="popup__error card-link-input-error">Вы пропустили это поле</span>
        </PopupWithForm>
  );
}

export default AddPlacePopup;