import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <li className={`pokemon-type-${pokemon.typeEnglish.toLowerCase()}`}>
      <h3>{pokemon.name}</h3>
      <p>HP: {pokemon.hp}</p>
      <img width={'100px'} height={'100px'} src={pokemon.image} alt={pokemon.name} />
      <p>Tipo: {pokemon.typeTranslated}</p>
      <p>Peso: {pokemon.weight}</p>
    </li>
  );
};

export default PokemonCard;
