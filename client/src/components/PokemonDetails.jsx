import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPokemonFromId, fetchPokemonFromName } from '../redux/pokemons';
import './styles/PokemonDetails.css';

export default function PokemonDetails(props) {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { fullPokemonData } = useSelector(store => store.pokemons);

  useEffect(() => {
    switch(state.queryType) {
      case 'ID':
        dispatch(fetchPokemonFromId(state.id, state.origin));
        break;
      case 'NAME':
        dispatch(fetchPokemonFromName(state.name));
        break;
      default:
        break;
    }
    
  }, [dispatch, state.id, state.origin, state.queryType, state.name]);

  return (
    <div className='container'>
      {
        fullPokemonData ? (
          <React.Fragment>
            <h1 className='name'>Detalles de { fullPokemonData.name.charAt(0).toUpperCase() + fullPokemonData.name.slice(1) }</h1>
            <ul>
              <li><b>Vida: </b>{ fullPokemonData.health }</li>
              <li><b>Ataque: </b>{ fullPokemonData.attack }</li>
              <li><b>Defensa: </b>{ fullPokemonData.defense }</li>
              <li><b>Ataque Especial: </b>{ fullPokemonData.specialAttack }</li>
              <li><b>Defensa Especial:</b> { fullPokemonData.specialDefense }</li>
              <li><b>Velocidad: </b>{ fullPokemonData.speed }</li>
              <li><b>Altura: </b>{ fullPokemonData.height }<i> pies</i></li>
              <li><b>Peso: </b>{ fullPokemonData.weight }<i> libras</i></li>
            </ul>
            <div className='imgContainer'>
              <img className='pokeImage' src={ fullPokemonData.image } alt={ fullPokemonData.name} />
            </div>
            <div className='pokeTypesContainer'>
            <span><b>Tipos: </b></span>
            {
              fullPokemonData.types ? fullPokemonData.types.map(type => (
                <p className='pokeTypee' key={type.id}>{ type.name.charAt(0).toUpperCase() + type.name.slice(1) }</p>
              )) : null
            }
            </div>
          </React.Fragment>
        ) : null
      }
    </div>
  );
}