import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import * as auth from '../utils/auth';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import success from '../images/Union.png';
import fail from '../images/Unionx.png';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpened] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpened] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [text, setText] = React.useState('');
  const [image, setImage] = React.useState('');

  const navigate = useNavigate();

  function handleInfoTooltip() {
    setInfoTooltipOpened(true);
  }
  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setImage(success);
        setText("Вы успешно зарегистрировались!");
        navigate('/sign-in', { replace: true });
      })
      .catch(() => {
        setImage(fail);
        setText("Что-то пошло не так! Попробуйте ещё раз.");
      })
      .finally(handleInfoTooltip());
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setEmail(email);
        navigate('/', { replace: true });
      })
      .catch(() => {
        setImage(fail);
        setText("Что-то пошло не так! Попробуйте ещё раз.");
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getToken(jwt)
        .then(res => {
          if (res) {
            setLoggedIn(true);
            navigate('/', { replace: true });
            setEmail(res.data.email);
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in', { replace: true });
  }

  React.useEffect (()=> {
    checkToken();
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    api
      .getStartData()
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch(err => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(state => state.filter(c => c._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpened(true);
  }

  function handleUpdateAvatar(userData) {
    setIsLoading(true);
    api
      .setUserAvatarApi(userData)
      .then(data => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpened(true);
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    api
      .addNewCard(cardData)
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpened(true);
  }

  function handleUpdateUser(userData) {
    setIsLoading(true);
    api
      .setUserInfoApi(userData)
      .then(data => {
        setCurrentUser(data);
      })
      .then(() => closeAllPopups())
      .catch(err => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setEditAvatarPopupOpened(false);
    setAddPlacePopupOpened(false);
    setEditProfilePopupOpened(false);
    setSelectedCard(null);
    setInfoTooltipOpened(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      <Header email={email} onSignOut={handleSignOut} isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
          <Route
            path="/sign-in"
            element={
              <Login onLogin={handleLogin} /> 
            }
          />
          <Route
            path="/sign-up"
            element={
                <Register onRegister={handleRegister} 
                />
            }
          />
          <Route
            path="/"
            element={
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
            }
          />
        </Routes>
        <Footer />     

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

        <InfoTooltip
          name="tooltip"
          text={text}
          image={image}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
