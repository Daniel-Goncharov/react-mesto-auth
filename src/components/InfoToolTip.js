import OkIcon from "../images/Goodrequest.svg";
import FailIcon from "../images/Badrequest.svg";
import React from "react";

export default function InfoToolTip(props) {
  return (
    <div
      className={`popup tooltip_popup ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__tooltip">
        <button type="button" className="popup__closed-button" onClick={props.onClose} />
        {props.isSuccess ? (
          <>
            <img
              src={`${OkIcon}`}
              alt="Регистрация прошла успешно."
              className="popup__tooltip_image"
            />
            <p className="popup__tooltip_message">
              Вы успешно зарегистрировались!
            </p>
          </>
        ) : (
          <>
            <img
              src={`${FailIcon}`}
              alt="Регистрация не была выполнена."
              className="popup__tooltip_image"
            />
            <p className="popup__tooltip_message">
              Что-то пошло не так. Попробуйте ещё раз!
            </p>
          </>
        )}
      </div>
      <div className="popup__overlay" onClick={props.onClose}/>
    </div>
  );
}