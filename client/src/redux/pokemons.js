import axios from 'axios';

// TYPES
const FETCH_ALL_POKEMONS = 'FETCH_ALL_POKEMONS';
const FETCH_SINGLE_POKEMON = 'FECTH_SINGLE_POKEMON';
const FETCH_TYPES = 'FETCH_TYPES';
const SET_FILTER = 'SET_FILTER';
const SET_SORT = 'SET_SORT';

// INITIAL STATE
const initialState = {
  fullPokemonData: {},
  pokemons: [],
  types: [],
  filter: 'ALL',
  sort: 'NONE',
};

// REDUCERS
export default function pokemonReducer(state = initialState, action = {}) {
  switch(action.type) {
    case FETCH_ALL_POKEMONS:
      return { ...state, pokemons: action.payload };
    case FETCH_TYPES:
      return { ...state, types: action.payload };
    case FETCH_SINGLE_POKEMON:
      return { ...state, fullPokemonData: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case SET_SORT:
      return { ...state, sort: action.payload };
    default:
      return state;
  }
}

// ACTIONS
export const fetchPokemons = () => async (dispatch, getState) => {
  try {
    const response = await axios.get('http://localhost:3001/pokemons');
    dispatch({
      type: FETCH_ALL_POKEMONS,
      payload: response.data
    });
  } catch (error) {
    console.error(error);
  }
}

export const fetchPokemonFromId = (id, origin) => async (dispatch, getState) => {
  try {
    const response = await axios.get(`http://localhost:3001/pokemons/${id}?origin=${origin}`);
    dispatch({
      type: FETCH_SINGLE_POKEMON,
      payload: response.data
    });
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

export const fetchPokemonFromName = name => async (dispatch, getState) => {
  try {
    const response = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
    dispatch({
      type: FETCH_SINGLE_POKEMON,
      payload: response.data
    });
  } catch (error) {
    alert(error);
    console.log(error);
  }
}

export const createPokemon = (createdPokemon) => async (dispatch, getState) => {
  try {
    const pokemonNamesArray = getState().pokemons.pokemons.map(pokemon => pokemon.name.toUpperCase());
    if(pokemonNamesArray.includes(createdPokemon.name.toUpperCase())) throw Error(`Ya existe un pokemon llamado "${createdPokemon.name}"`);
    await axios.post('http://localhost:3001/pokemons', createdPokemon);
    const fetchRequest = await axios.get('http://localhost:3001/pokemons');
    dispatch({
      type: FETCH_ALL_POKEMONS,
      payload: fetchRequest.data
    });
    alert('Pokemon creado!');
  } catch (error) {
    alert(error);
    console.error(error);
  }
}

export const deletePokemon = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/pokemons/${id}`);
    const fetchRequest = await axios.get('http://localhost:3001/pokemons');
    dispatch({
      type: FETCH_ALL_POKEMONS,
      payload: fetchRequest.data
    })
  } catch(error) {
    alert('Error al eliminar el pokemon');
    console.error(error);
  }
}

export const fetchTypes = () => async (dispatch) => {
  try {
    const fetchRequest = await axios.get('http://localhost:3001/types');
    dispatch({
      type: FETCH_TYPES,
      payload: fetchRequest.data
    });
  } catch(error) {
    console.error(error);
  }
}

export const changeFilter = filter => dispatch => {
  dispatch({
    type: SET_FILTER,
    payload: filter
  })
}

export const changeSort = sort => dispatch => {
  dispatch({
    type: SET_SORT,
    payload: sort
  })
} 