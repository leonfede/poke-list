import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/CreateButton.css';

export default function CreateButton() {
  return (
    <NavLink exact to='/create' className='createButtonContainer' activeClassName='selected'>
      <acronym title='Crear un nuevo Pokemon'>
        <span className='material-icons-sharp md-48'>
          add
        </span>
      </acronym>
    </NavLink>
  );
}