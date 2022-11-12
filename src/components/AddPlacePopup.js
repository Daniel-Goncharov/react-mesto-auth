import React, { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup(props) {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState({
    classInput: '',
    classError: '',
    errorMessage: ''
  })
  const [link, setLink] = useState('')
  const [linkError, setLinkError] = useState({
    classInput: '',
    classError: '',
    errorMessage: ''
  })
  const [isNameValid, setIsNameValid] = useState(false)
  const [isLinkValid, setIsLinkValid] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)

  useEffect(() => {
    if (isNameValid && isLinkValid) setIsFormValid(true);

    return () => {
      setIsFormValid(false);
    };
  }, [isNameValid, isLinkValid]);

  useEffect(() => {
    setNameError({
      classInput: '',
      classError: '',
      errorMessage: ''
    });
    setLinkError({
      classInput: '',
      classError: '',
      errorMessage: ''
    });
    setName('');
    setLink('');
    setIsNameValid(false);
    setIsLinkValid(false);
  }, [props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value)

    if (!evt.target.validity.valid) {
      setNameError({
        classInput: 'popup__input_type_error',
        classError: 'popup__error_visible',
        errorMessage: evt.target.validationMessage
      });
      setIsNameValid(false);
    } else {
      setNameError({
        classInput: '',
        classError: '',
        errorMessage: ''
      });
      setIsNameValid(true);
    }
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value)

    if (!evt.target.validity.valid) {
      setLinkError({
        classInput: 'popup__input_type_error',
        classError: 'popup__error_visible',
        errorMessage: evt.target.validationMessage
      });
      setIsLinkValid(false);
    } else {
      setLinkError({
        classInput: '',
        classError: '',
        errorMessage: ''
      });
      setIsLinkValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      name: name,
      link: link
    })
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      buttonText={props.isPopupLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
    >
      <input
        className={`popup__input popup__input_data_place-name ${nameError.classInput}`}
        id="placeName-input"
        type="text"
        name="name"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        pattern="^[a-zA-Zа-яА-я-\s]+$"
        required
        value={name}
        onChange={handleNameChange}
      />
      <span className={`popup__error placeName-input-error ${nameError.classError}`} >{nameError.errorMessage}</span>
      <input
        className={`popup__input popup__input_data_place-url ${linkError.classInput}`}
        id="placeUrl-input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className={`popup__error placeUrl-input-error ${linkError.classError}`} >{linkError.errorMessage}</span>
    </PopupWithForm>
  )
}