import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import generateStore from './redux/store';
import { Provider } from 'react-redux';

import HomeButton from './components/HomeButton.jsx';
import CreateButton from './components/CreateButton.jsx';
import FilterBar from './components/FilterBar.jsx';
import SearchBar from './components/SearchBar.jsx';
import Home from './components/Home.jsx';
import Create from './components/Create.jsx';
import PokemonDetails from './components/PokemonDetails.jsx';

import './App.css';

function App() {
  const store = generateStore();
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='appContainer'>
          <HomeButton />
          <CreateButton />
          <SearchBar />
          <FilterBar />
        <Switch>
          <Route path='/create'>
            <Create />
          </Route>
          <Route path='/details'>
            <PokemonDetails />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
        </div>   
      </BrowserRouter>
    </Provider>
  );
}

export default App;
