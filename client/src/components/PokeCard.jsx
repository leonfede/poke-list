import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deletePokemon } from '../redux/pokemons';
import './styles/PokeCard.css';

export default function PokeCard( { data } ) {
  const dispatch = useDispatch();
  const {
    id = '0',
    name = 'MISSINGNO',
    image = 'https://upload.wikimedia.org/wikipedia/commons/6/62/MissingNo.png',
    types = [],
    origin = 'external'
  } = data;
  
  return (
    <div className='pokeCard'>
      <span className='pokeName'>{ name.charAt(0).toUpperCase() + name.slice(1) }</span>
      <div className='imageContainer'>
        <img className='pokeImg' src={image} alt={name}></img>
      </div>
      <div className='typesContainer'>
        {
        types ? types.map(type => (
          <p className='pokeType' key={type.id}>{ type.name.charAt(0).toUpperCase() + type.name.slice(1) }</p>
        )) : null
      }
      </div>
      <Link className='detailsLink' to={{
        pathname: '/details',
        state: {
          id,
          origin,
          queryType: 'ID'
        }
      }}>
        <span className='material-icons-sharp'>
          info
        </span>
      </Link>
      {
        origin === 'db' ? (
        <div className='deleteButton' onClick={e => dispatch(deletePokemon(id)) }>
          <span className='material-icons-sharp'>
            delete
          </span>
        </div>
        ) : null
      }
    </div>
  );
}