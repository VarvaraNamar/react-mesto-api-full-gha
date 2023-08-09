import React from 'react';
import Card from './Card'
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)
  
  return (
    <main className="main-content">
      <section className="profile">
        <div className="profile__container">
          <button
            onClick={onEditAvatar}
            className="profile__avatar-edit-button"
            aria-label="Редактировать аватар"
            type="button"
          >
            <div
              className="profile__avatar"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
            ></div>
          </button>
          <div className="profile__info">
            <div className="profile__edit-bio">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit-button"
                aria-label="Редактировать профиль"
                type="button"
              />
            </div>
            <p className="profile__caption">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          aria-label="Добавить фотографии"
          type="button"
        />
      </section>
      <section className="elements">
      {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            title={card.name}
            likes={card.likes.length}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
