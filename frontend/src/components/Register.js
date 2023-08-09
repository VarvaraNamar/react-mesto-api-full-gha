import React, { useState } from 'react';
import StartPage from './StartPage';

function Register ({onRegister}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(email, password);
  }

  return(
    <section className="register">
      <StartPage
        title="Регистрация"
        name="register"
        onSubmit={handleSubmit}
        buttonText="Зарегистрироваться"
        >
          <input
            className="register__input"
            id="email-input"
            type="email"
            name="email"
            required
            placeholder="Email"
            value={email || ''}
            onChange={handleEmailChange}
          />
          <input
            className="register__input"
            id="password-input"
            type="password"
            name="password"
            required
            placeholder="Пароль"
            value={password || ''}
            onChange={handlePasswordChange}
          />
      </StartPage>
    </section>
  )
}

export default Register;