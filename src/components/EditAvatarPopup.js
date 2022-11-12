import React, { useState, useEffect, useRef } from 'react'
import PopupWithForm from './PopupWithForm'

export default function EditAvatarPopup(props) {
  const avatarRef = useRef()

  const [urlError, setUrlError] = useState({
    classInput: '',
    classError: '',
    errorMessage: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setUrlError({
      classInput: '',
      classError: '',
      errorMessage: ''
    });
    setIsFormValid(false);
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleChange() {
    const avatar = avatarRef.current;

    if (!avatar.validity.valid) {
      setUrlError({
        classInput: 'popup__input_type_error',
        classError: 'popup__error_visible',
        errorMessage: avatar.validationMessage
      });
      setIsFormValid(false);
    } else {
      setUrlError({
        classInput: '',
        classError: '',
        errorMessage: ''
      });
      setIsFormValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    })
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonText={props.isPopupLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
    >
      <input
        className={`popup__input popup__input_data_place-url ${urlError.classInput}`}
        id="avatar-input"
        type="url"
        name="avatar-url"
        placeholder="Укажите ссылку на аватар"
        required
        ref={avatarRef}
        onChange={handleChange}
      />
      <span className={`popup__error ${urlError.classError}`} >{urlError.errorMessage}</span>
    </PopupWithForm>
  )
}