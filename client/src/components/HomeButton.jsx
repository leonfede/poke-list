import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/HomeButton.css';

export default function HomeButton() {
  return (
      <NavLink exact to='/' className='homeButtonContainer' activeClassName='selected'>
        <acronym title='Pagina de Inicio'>
          <span className='material-icons-sharp md-48'>
            home
          </span>
        </acronym>
      </NavLink>
  );
}