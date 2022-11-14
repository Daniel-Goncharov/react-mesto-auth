import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header(props) {
  function openAuthInfo() {
    props.showMenu('burger__position');
  }

  const { pathname } = useLocation();
  const linkText = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const linkPath = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

  return (
      <header className='header__position'>
        <div className='header'>
          <div className="header__logo"/>
          {props.isLoggedIn
            ? (<>
                <div className='header__user-info'>
                  <span>{props.email}</span>
                  <button className="button link header__button-exit" onClick={props.signOut}>Выйти</button>
                </div>

                <button
                  className={`header__menu  ${props.classHeaderMenu}`}
                  onClick={openAuthInfo}
                >
                  <span/>
                </button>

              </>
            )
            : (<Link to={linkPath} className="button link header__button-entrance">{linkText}</Link>)
          }
        </div>
      </header>
  );
}

