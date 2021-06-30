import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import pokemonReducer from './pokemons';

const mainReducer = combineReducers({
  pokemons: pokemonReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(mainReducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
}