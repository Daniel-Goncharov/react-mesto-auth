import React from 'react';

export default function ImagePopup({ isOpen, onClose, card }) {
  return(
    <div className={`popup popup_type_view-picture ${isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container-view-picture">
          <button
          className="popup__closed-button popup__closed-button_type_view-picture"
          type="button"
          aria-label="Закрыть просмотр изображения"
          onClick={onClose}
        />
          <img className="popup__picture" src={card.link} alt={card.name} />
          <h3 className="popup__picture-title">{card.name}</h3>
        </div>
        <div className="popup__overlay" onClick={onClose}/>
      </div>
  );
}
