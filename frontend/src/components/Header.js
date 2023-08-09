import React from 'react';
import headerLogo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header({ email, onSignOut, isLoggedIn }) {
  const location = useLocation();

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип" />
      {isLoggedIn ? (
        <>
          <div className="header__user">
            <p className="header__email">{email}</p>
            <button onClick={onSignOut} className="header__link header__button">
              Выйти
            </button>
          </div>
        </>
      ) : (
        <>
          {location.pathname !== "/sign-up" ? (
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          ) : (
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          )}
        </>
      )}
    </header>
  );
}
export default Header;
