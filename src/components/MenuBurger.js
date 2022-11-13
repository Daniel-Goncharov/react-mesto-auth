import React from 'react';

export default function MenuBurger(props) {
  return (
    <div className={`menu-burger__position ${props.isShowMenu}`}>
      <menu className='menu-burger'>
        <span>{props.email}</span>
        <button className='button link header__button-exit menu-burger__exit' onClick={props.signOut}>Выйти</button>
      </menu>
    </div>
  );
}