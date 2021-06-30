import React from 'react';
import './styles/FilterBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, changeSort } from '../redux/pokemons';

export default function FilterBar() {
  const dispatch = useDispatch();
  const { sort } = useSelector(store => store.pokemons);

  return (
    <div className='filterBar'>
      <div onClick={e => dispatch(changeFilter('ALL')) || dispatch(changeSort('NONE'))} className='button'>
        <acronym title='Limpiar filtros'>
          <span className='material-icons-sharp'>
            layers_clear
          </span>
        </acronym>
      </div>
      <div onClick={e => sort === 'AZ' ? dispatch(changeSort('ZA')) : dispatch(changeSort('AZ')) } className='button'>
        <acronym title='Ordenar alfabeticamente'>
          <span className='material-icons-sharp'>
            sort_by_alpha
          </span>
        </acronym>
      </div>
      <div onClick={e => dispatch(changeFilter('ONLY_DB'))} className='button'>
        <acronym title='Filtrar solo Pokemon creados'>
          <span className='material-icons-sharp'>
            drive_file_rename_outline
          </span>
        </acronym>
      </div>
      <div onClick={e => dispatch(changeFilter('ONLY_EXTERNAL'))} className='button'>
        <acronym title='Filtrar solo Pokemon externos'>
          <span className='material-icons-sharp'>
            api
          </span>
        </acronym>
      </div>
    </div>
  );
}