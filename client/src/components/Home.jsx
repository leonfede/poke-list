import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemons, fetchTypes } from '../redux/pokemons';
import PokeCard from './PokeCard.jsx';
import './styles/Home.css';

export default function Home(props) {
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const { pokemons, filter, sort } = useSelector(store => store.pokemons);
  const cardPages = [];

  const nextPage = event => {
    setIndex(index + 1);
    event.preventDefault();
  }
  
  const prevPage = event => {
    setIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    event.preventDefault();
  }

  let pokemonsArray = pokemons ? (pokemons.map(pokemon => <PokeCard key={pokemon.name} data={pokemon} />)) : null;
  
  if(pokemonsArray.length) {
    switch(filter) {
      case 'ALL':
        pokemonsArray = pokemonsArray.filter(pokemon => pokemon);
        break;
      case 'ONLY_DB':
        pokemonsArray = pokemonsArray.filter(pokemon => pokemon.props.data.origin === 'db');
        break;
      case 'ONLY_EXTERNAL':
        pokemonsArray = pokemonsArray.filter(pokemon => pokemon.props.data.origin === 'external');
        break;
      default:
        break;
    }
    switch(sort) {
      case 'NONE':
      pokemonsArray = pokemonsArray.sort(() => true);
      break;
      case 'AZ':
        pokemonsArray = pokemonsArray.sort((a, b) => a.props.data.name.localeCompare(b.props.data.name));
        break;
      case 'ZA':
        pokemonsArray = pokemonsArray.sort((a, b) => b.props.data.name.localeCompare(a.props.data.name));
        break;
      default:
        break;
    }
    for(let i = 0; i <= pokemonsArray.length; i = i + 15) {
      cardPages.push(pokemonsArray.slice(i, i + 15));
    }
  }


  useEffect(() => {
    dispatch(fetchTypes());
    dispatch(fetchPokemons());
  },[dispatch]);

  return (
    <React.Fragment>
      <div className='cardsContainer'>
          {
            cardPages[index]
          }
      </div>
      <div style= { { display: (index < (cardPages.length - 1) ? 'inline' : 'none') } }
           className='moreButton' 
           onClick= { nextPage }
      >
        <span className='material-icons-sharp md-48'>arrow_right_alt</span>
      </div>
      <div style= { { display: (index < (cardPages.length - 1) ? 'none' : 'inline') } }
           className='moreButton'
           onClick= { prevPage }
      >
        <span className='material-icons-sharp md-48'>subdirectory_arrow_left</span>
      </div>
    </React.Fragment>
  );
}