import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteConformationPopup from './DeleteConformationPopup';
import Spinner from './Spinner';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/auth";
import InfoToolTip from "./InfoToolTip";
import MenuBurger from './MenuBurger';

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cards, setCards] = useState([])
  const [cardDelete, setCardDelete] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupLoading, setIsPopupLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isShowMenu, setIsShowMenu] = useState('menu-burger_type_close');
  const [classHeaderMenu, setClassHeaderMenu] = useState('header__menu_type_closed');
  const location = useLocation();
  const history = useHistory();
  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteCardClick(card) {
    setCardDelete(card);
    setIsConfirmPopupOpen(true);
  }
  function onCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setInfoToolTipPopupOpen(false);
  }

  function handleEsc(evt) {
    if (evt.key === 'Escape') {
      closeAllPopups()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });

  function onUpdateUser(userData) {
    setIsPopupLoading(true);
    api.setUserInfoApi(userData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsPopupLoading(false);
      })
  }

  function onUpdateAvatar(userData) {
    setIsPopupLoading(true);
    api.changeAvatar(userData)
      .then((data) => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsPopupLoading(false);
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete() {
    setIsPopupLoading(true);
    api.deleteCard(cardDelete._id)
    .then(() => {
      setCards(cards.filter((item) => item._id !== cardDelete._id));
      closeAllPopups();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setIsPopupLoading(false);
    })
  }

  function handleAddPlaceSubmit(cardData) {
    setIsPopupLoading(true);
    api.addCardServer(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsPopupLoading(false);
      })
  }

  useEffect(() => {
    setIsLoading(true)
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([initialUserInfo, initialCards]) => {
        setCurrentUser(initialUserInfo);
        setCards(initialCards);
        setIsLoading(false)
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => {
          if (err.status === 401) {
            console.log("401 — Токен не передан или передан не в том формате");
          }
          console.log("401 — Переданный токен некорректен");
        });
    }
  }, [history]);

  function handleRegisterSubmit(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setInfoToolTipPopupOpen(true);
        setIsSuccess(true);
        history.push("/sign-in");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - некорректно заполнено одно из полей");
        }
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  }

  function handleLoginSubmit(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        setEmail(email);
        history.push("/");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - пользователь с email не найден");
        }
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    history.push("/sign-in");
  }

  function showMenu() {
    if (isShowMenu === 'menu-burger_type_close') {
      setIsShowMenu('menu-burger_type_open');
    } else {
      setIsShowMenu('menu-burger_type_close');
    }

    if (classHeaderMenu === 'header__menu_type_opened') {
      setClassHeaderMenu('header__menu_type_closed');
    } else {
      setClassHeaderMenu('header__menu_type_opened');
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isLoggedIn
      && <MenuBurger
        email={email}
        signOut={handleSignOut}
        isShowMenu={isShowMenu}
      />
      }
      <Header
        isLoggedIn={isLoggedIn}
        locaction={location}
        email={email}
        signOut={handleSignOut}
        showMenu={showMenu}
        classHeaderMenu={classHeaderMenu}
      />
        <Switch>
          {isLoading ? <Spinner /> : <ProtectedRoute
            exact
            path="/"
            isLoggedIn={isLoggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={onCardClick}
            handleCardLike={handleCardLike}
            handleCardDelete={handleCardDelete}
            onCardDelete={handleDeleteCardClick}
            cards={cards}
            component={Main}
            isLoading={isLoading}
          >
          </ProtectedRoute>}
          <Route path="/sign-in">
            <Login
              handleLoginSubmit={handleLoginSubmit}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route path="/sign-up">
            <Register
              handleRegisterSubmit={handleRegisterSubmit}
              isLoggedIn={isLoggedIn}
            />
          </Route>
          <Route>
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        {isLoggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={onUpdateUser}
          isPopupLoading={isPopupLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isPopupLoading={isPopupLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={onUpdateAvatar}
          isPopupLoading={isPopupLoading}
        />
        <DeleteConformationPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isPopupLoading={isPopupLoading}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
        />
    </CurrentUserContext.Provider>
  );
}
