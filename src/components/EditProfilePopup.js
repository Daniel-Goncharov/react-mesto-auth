import React, { useEffect, useState, useContext } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onUpdateUser, isEditProfilePopupLoading, onClose}) {
  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState({ errorMessage: '' })
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState({ errorMessage: '' })
  const [isNameValid, setIsNameValid] = useState(false)
  const [isDescriptionValid, setIsDescriptionValid] = useState(false)
  const isFormValid = isNameValid && isDescriptionValid;

  useEffect(() => {
    setNameError({ errorMessage: '' });
    setDescriptionError({ errorMessage: '' });
    setName(currentUser.name);
    setDescription(currentUser.about);
    setIsNameValid(true);
    setIsDescriptionValid(true);
  }, [currentUser, isOpen])

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

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value)

    if (!evt.target.validity.valid) {
      setDescriptionError({ errorMessage: evt.target.validationMessage });
      setIsDescriptionValid(false);
    } else {
      setDescriptionError({ errorMessage: '' });
      setIsDescriptionValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({
      name: name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText={isEditProfilePopupLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
    >
      <input
        className={`form__input form__input_data_name`}
        id="name-imput"
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        pattern="^[a-zA-Zа-яА-я-\s]+$"
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className={`form__error ${!isFormValid ? "form__error_visible" : ""}`} >{nameError.errorMessage}</span>
      <input
        className={`form__input form__input_data_job`}
        id="job-imput"
        type="text"
        name="job"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        pattern="^[a-zA-Zа-яА-я-\s]+$"
        value={description || ''}
        onChange={handleDescriptionChange}
      />
      <span className={`form__error ${!isDescriptionValid ? "form__error_visible" : ""}`} >{descriptionError.errorMessage}</span>
    </PopupWithForm>
  )
}