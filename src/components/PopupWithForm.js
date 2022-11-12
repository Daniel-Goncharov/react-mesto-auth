import React from 'react';

export default function PopupWithForm({ name, isOpen, onClose, title, children, buttonText, onSubmit, isDisabled }) {
  return(
    <div
      className={`popup ${name}-popup ${isOpen === true ? 'popup_opened' : ''}`}
    >
      <div className={`popup__container popup__container_type_${name}`}>
        <button className="popup__closed-button" type="button" onClick={onClose}></button>
        <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name} method="post"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button className={`popup__button ${isDisabled ? 'popup__button_disabled' : ''}`}
                  onClick={onSubmit} type="submit">{buttonText}</button>
        </form>
      </div>
      <div className="popup__overlay" onClick={onClose}/>
    </div>
  )
}