import React, { useState, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'

export default function AddPlacePopup({ isOpen, onAddPlace, isAddPlacePopupLoading, onClose}) {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState({ errorMessage: '' })
  const [link, setLink] = useState('')
  const [linkError, setLinkError] = useState({ errorMessage: '' })
  const [isNameValid, setIsNameValid] = useState(false)
  const [isLinkValid, setIsLinkValid] = useState(false)
  const isFormValid = isNameValid && isLinkValid;

  useEffect(() => {
    setNameError({ errorMessage: '' });
    setLinkError({ errorMessage: '' });
    setName('');
    setLink('');
    setIsNameValid(false);
    setIsLinkValid(false);
  }, [isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value)

    if (!evt.target.validity.valid) {
      setNameError({ errorMessage: evt.target.validationMessage });
      setIsNameValid(false);
    } else {
      setNameError({ errorMessage: '' });
      setIsNameValid(true);
    }
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value)

    if (!evt.target.validity.valid) {
      setLinkError({ errorMessage: evt.target.validationMessage });
      setIsLinkValid(false);
    } else {
      setLinkError({ errorMessage: '' });
      setIsLinkValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: name,
      link: link
    })
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="card"
      buttonText={isAddPlacePopupLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
    >
      <input
        className={`form__input form__input_data_place-url`}
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
      <span className={`form__error placeName-input-error ${!isNameValid ? "form__error_visible" : ""}`} >{nameError.errorMessage}</span>
      <input
        className={`form__input form__input_data_place-url`}
        id="placeUrl-input"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleLinkChange}
      />
      <span className={`form__error placeUrl-input-error ${!isLinkValid ? "form__error_visible" : ""}`} >{linkError.errorMessage}</span>
    </PopupWithForm>
  )
}