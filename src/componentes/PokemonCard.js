import React from 'react';

const PokemonCard = ({ pokemon }) => {
  return (
    <li className={`pokemon-type-${pokemon.typeEnglish.toLowerCase()}`}>
      <h3>{pokemon.name}</h3>
      <img width={'100px'} height={'100px'} src={pokemon.image} alt={pokemon.name} />
      <div className="pokemon-infos">
        <p>HP {pokemon.hp}</p>
        <p> {pokemon.typeTranslated}</p>
        <p>Altura {pokemon.height}</p>
        <p>Peso {pokemon.weight}</p>
        <p>Ataque {pokemon.attack}</p>
        <p>Defesa {pokemon.defense}</p>
        <p>ATK Especial {pokemon.specialAttack}</p>
        <p>DEF Especial {pokemon.specialDefense}</p>
      </div>
    </li>
  );
};

export default PokemonCard;
