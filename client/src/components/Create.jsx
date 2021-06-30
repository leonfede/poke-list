import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPokemon } from '../redux/pokemons';
import './styles/Create.css';

export default function Create() {
  const dispatch = useDispatch();
  const { types } = useSelector(store => store.pokemons);
  
  const [name, setName] = useState('Henry');
  const [health, setHealth] = useState('35');
  const [attack, setAttack] = useState('55');
  const [defense, setDefense] = useState('40');
  const [specialAttack, setSpecialAttack] = useState('50');
  const [specialDefense, setSpecialDefense] = useState('50');
  const [speed, setSpeed] = useState('90');
  const [height, setHeight] = useState('4');
  const [weight, setWeight] = useState('60');
  const [image, setImage] = useState('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png');
  const [selectedTypes, setSelectedTypes] = useState(['2']);
  
  const handleSubmit = e => {
    dispatch(createPokemon({
      name, health, attack, defense, specialAttack, specialDefense,
      speed, height, weight, image, selectedTypes
    }));
    e.preventDefault();
  }

  return (
      <div className='createForm'>
        <form className='form' onSubmit={handleSubmit}>
          <h1>Creacion de pokemon</h1>
          <label htmlFor='nameInput'><b>Nombre </b></label><br />
          <input size={32} value={name} onChange={e => setName(e.target.value)} id='nameInput' type='text'></input><br />
          <label htmlFor='healthInput'><b>Vida </b></label>
          <input value={health} onChange={e => setHealth(e.target.value)} id='healthInput' type='number' min='1'></input><br />
          <label htmlFor='attackInput'><b>Ataque </b></label>
          <input value={attack} onChange={e => setAttack(e.target.value)} id='attackInput' type='number' min='1'></input><br />
          <label htmlFor='defenseInput'><b>Defensa </b></label>
          <input value={defense} onChange={e => setDefense(e.target.value)} id='defenseInput' type='number' min='1'></input><br />
          <label htmlFor='specialAttackInput'><b>Ataque Especial </b></label>
          <input value={specialAttack} onChange={e => setSpecialAttack(e.target.value)} id='specialAttackInput' type='number' min='1'></input><br />
          <label htmlFor='specialDefenseInput'><b>Defensa Especial </b></label>
          <input value={specialDefense} onChange={e => setSpecialDefense(e.target.value)} id='specialDefenseInput' type='number' min='1'></input><br />
          <label htmlFor='speedInput'><b>Velocidad </b></label>
          <input value={speed} onChange={e => setSpeed(e.target.value)} id='speedInput' type='number' min='1'></input><br />
          <label htmlFor='heightInput'><b>Altura </b></label>
          <input value={height} onChange={e => setHeight(e.target.value)} id='heightInput' type='number' step='0.1' min='0.1'></input><br />
          <label htmlFor='weightInput'><b>Peso </b></label>
          <input value={weight} onChange={e => setWeight(e.target.value)} id='weightInput' type='number' step='0.1' min='0.1'></input><br />
          <label htmlFor='imageInput'><b>Imagen (URL) </b></label>
          <input size={72} value={image} onChange={e => setImage(e.target.value)} id='imageInput' type='text'></input><br /><br />
          <span><b>Tipos:</b></span><br />
          <select multiple={true} value={selectedTypes} onChange={e => setSelectedTypes([...e.target.selectedOptions].map(option => option.value))}>
          {
            types.map(type => (
              <option key={type.id} value={type.id}>{ type.name }</option>
            ))    
          }
          </select>
          <input className='createButton' value='Crear' type='submit'></input>
        </form>
      </div>
  );
}