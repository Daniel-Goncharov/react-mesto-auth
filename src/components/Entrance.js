import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

export default function Entrance({
  title,
  signupText,
  buttonText,
  isRegister,
  linkText,
  handleLoginSubmit,
  handleRegisterSubmit,
  isLoggedIn
}) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState({ errorMessage: '' })
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState({ errorMessage: '' })
  const [isEmailValid, setIsEmailValid] = useState(false)
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const isFormValid = isEmailValid && isPasswordValid;

  useEffect(() => {
    setEmailError({ errorMessage: '' });
    setPasswordError({ errorMessage: '' });
    setEmail('');
    setPassword('');
    setIsEmailValid(false);
    setIsPasswordValid(false);
  }, [])

  function handleEmailChange(evt) {
    setEmail(evt.target.value);

    if (!evt.target.validity.valid) {
      setEmailError({ errorMessage: evt.target.validationMessage });
      setIsEmailValid(false)
    } else {
      setEmailError({ errorMessage: '' });
      setIsEmailValid(true)
    }
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);

    if (!evt.target.validity.valid) {
      setPasswordError({ errorMessage: evt.target.validationMessage });
      setIsPasswordValid(false);
    } else {
      setPasswordError({ errorMessage: '' });
      setIsPasswordValid(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (isRegister) {
      handleRegisterSubmit(email, password);
    } else {
      handleLoginSubmit(email, password);
    }
  }

  if (isLoggedIn) {
    return (
      <Redirect to="/"/>
    )
  }

  return (
      <section className="entrance">
        <h2 className="form__title form__title_type_inverted">{title}</h2>
        <form className="form form_type_entrance" onSubmit={handleSubmit} noValidate>
          <input
            onChange={handleEmailChange}
            className={`form__input form__input_type_inverted`}
            placeholder="Email"
            name="email"
            type="email"
            required
            value={email || ""}
          />
          <span className={`form__error placeName-input-error ${!isEmailValid ? "form__error_visible" : ""}`}>{emailError.errorMessage}</span>
          <input
            onChange={handlePasswordChange}
            className={`form__input form__input_type_inverted`}
            placeholder="Пароль"
            name="password"
            type="password"
            minLength="6"
            maxLength="40"
            required
            value={password || ""}
          />
          <span className={`form__error placeName-input-error ${!isPasswordValid ? "form__error_visible" : ""}`} >{passwordError.errorMessage}</span>
          <button
            disabled={!isFormValid}
            className={`form__submit-button form__submit-button_type_inverted ${!isFormValid ? 'form__submit-button_disabled' : ''}`}
            type="submit"
          >
            {buttonText}
          </button>
          {isRegister && (
            <div className="entrance__signup">
              <p className="entrance__signup_text">{signupText}</p>
              <Link to="sign-in" className="entrance__signup_link">
              {linkText}
              </Link>
            </div>)}
        </form>
      </section>
  );
}