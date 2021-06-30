import React, { useState } from 'react';
import './styles/SearchBar.css';
import { useHistory } from 'react-router-dom';

export default function SearchBar() {
  const [value, setValue] = useState('');
  const history = useHistory();
  
  const search = () => {
    history.push({
      pathname: '/details',
      state: {
        name: value,
        queryType: 'NAME'
      }
    })
  };

  return (
    <div className='searchBarContainer'>
      <input className='searchInput' type='text' value={value} onChange={e => setValue(e.target.value)} />
      <div className='searchButton' onClick={search}>
        <span className='material-icons-sharp'>search</span>
      </div>
    </div>
  );
}