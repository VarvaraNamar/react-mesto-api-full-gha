import React from 'react'
import { Link } from 'react-router-dom';

function StartPage ({title, name, onSubmit, children, buttonText}) {
  return (
    <div className="start-page">
      <h2 className="start-page__title">{title}</h2>
        <form className="start-page__form" name={name} noValidate onSubmit={onSubmit}>
          {children}
          <button className="start-page__button" type="submit">
            {buttonText}
          </button>
          {name === "register" &&
            <Link className="start-page__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
          }
        </form>
    </div>
  )
}

export default StartPage;