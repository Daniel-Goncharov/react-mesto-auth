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
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState({
    classInput: '',
    classError: '',
    errorMessage: ''
  })
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState({
    classInput: '',
    classError: '',
    errorMessage: ''
  })

  useEffect(() => {
    setEmailError({
      classInput: '',
      classError: '',
      errorMessage: ''
    });
    setPasswordError({
      classInput: '',
      classError: '',
      errorMessage: ''
    });
  }, [])

  function handleEmailChange(evt) {
    setEmail(evt.target.value);

    if (!evt.target.validity.valid) {
      setEmailError({
        classInput: 'form__input_type_error',
        classError: 'form__error_visible',
        errorMessage: evt.target.validationMessage
      });
    } else {
      setEmailError({
        classInput: '',
        classError: '',
        errorMessage: ''
      });
    }
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value);

    if (!evt.target.validity.valid) {
      setPasswordError({
        classInput: 'form__input_type_error',
        classError: 'form__error_visible',
        errorMessage: evt.target.validationMessage
      });
    } else {
      setPasswordError({
        classInput: '',
        classError: '',
        errorMessage: ''
      });
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
    return <>{isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</>;
  }

  return (
      <section className="entrance">
        <h2 className="form__title form__title_type_inverted">{title}</h2>
        <form className="form form_type_entrance" onSubmit={handleSubmit} noValidate>
          <input
            onChange={handleEmailChange}
            className={`form__input form__input_type_inverted ${emailError.classInput}`}
            placeholder="Email"
            name="email"
            type="email"
            required
            value={email || ""}
          />
          <span className={`form__error ${emailError.classError}`} >{emailError.errorMessage}</span>
          <input
            onChange={handlePasswordChange}
            className={`form__input form__input_type_inverted ${passwordError.classInput}`}
            placeholder="Пароль"
            name="password"
            type="password"
            minLength="6"
            maxLength="40"
            required
            value={password || ""}
          />
          <span className={`form__error ${passwordError.classError}`} >{passwordError.errorMessage}</span>
          <button className="form__submit-button form__submit-button_type_inverted" type="submit">
            {buttonText}
          </button>
          {isRegister && (<div className="entrance__signup">
            <p className="entrance__signup_text">{signupText}</p>
            <Link to="sign-in" className="entrance__signup_link">
            {linkText}
            </Link>
          </div>)}
        </form>
      </section>
  );
}