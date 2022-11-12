import React, { useEffect, useState, useContext } from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup(props) {
  const [name, setName] = useState('')
  const currentUser = useContext(CurrentUserContext)
  const [nameError, setNameError] = useState({
    classInput: '',
    classError: '',
    errorMessage: ''
  })
  const [description, setDescription] = useState('')
  const [descriptionError, setDescriptionError] = useState({
    classInput: '',
    classError: '',
    errorMessage: ''
  })
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
    setIsFormValid(true);
    setNameError({
      classInput: '',
      classError: '',
      errorMessage: ''
    });
    setDescriptionError({
      classInput: '',
      classError: '',
      errorMessage: ''
    });
  }, [currentUser, props.isOpen])

  function handleNameChange(evt) {
    setName(evt.target.value)

    if (!evt.target.validity.valid) {
      setNameError({
        classInput: 'popup__input_type_error',
        classError: 'popup__error_visible',
        errorMessage: evt.target.validationMessage
      });
      setIsFormValid(false);
    } else {
      setNameError({
        classInput: '',
        classError: '',
        errorMessage: ''
      });
      setIsFormValid(true);
    }
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value)

    if (!evt.target.validity.valid) {
      setDescriptionError({
        classInput: 'popup__input_type_error',
        classError: 'popup__error_visible',
        errorMessage: evt.target.validationMessage
      });
      setIsFormValid(false);
    } else {
      setDescriptionError({
        classInput: '',
        classError: '',
        errorMessage: ''
      });
      setIsFormValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onUpdateUser({
      name: name,
      about: description,
    })
    setIsFormValid(true);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonText={props.isPopupLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
    >
      <input
        className={`popup__input popup__input_data_name ${nameError.classInput}`}
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
      <span className={`popup__error ${nameError.classError}`} >{nameError.errorMessage}</span>
      <input
        className={`popup__input popup__input_data_job ${descriptionError.classInput}`}
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
      <span className={`popup__error ${descriptionError.classError}`} >{descriptionError.errorMessage}</span>
    </PopupWithForm>
  )
}