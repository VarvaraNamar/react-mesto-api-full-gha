import React from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like-button ${isLiked && 'element__like-button_active'}` 
  );

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
		onCardDelete(card);
	};

  function handleLikeClick() {
		onCardLike(card);
	}

  return (
    <div id="card-template">
      <article className="element">
        <img
          className="element__image"
          src={card ? card.link : '#'}
          alt={card ? card.name : ''}
          onClick={handleClick}
        />
        {isOwn &&<button className="element__delete-button" aria-label="Удалить карточку" type="button" onClick={handleDeleteClick}/>}
        <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
          <div className="element__like-container">
            <button 
              className={cardLikeButtonClassName} 
              aria-label="Поставить лайк" 
              type="button" 
              onClick={handleLikeClick}
            />
            <span className="element__like-count">{card.likes.length}</span>
          </div>
        </div>
      </article>
    </div>
  );
}

export default Card;
