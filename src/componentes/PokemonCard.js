import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';


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
        <p>Ataque</p>
        <ProgressBar now={pokemon.attack} min={0} max={255} label={`${pokemon.attack}`} />
        <p>Defesa</p>
        <ProgressBar now={pokemon.defense} min={0} max={255} label={`${pokemon.defense}`} />
        <p>Ataque Especial</p>
        <ProgressBar now={pokemon.specialAttack} min={0} max={255} label={`${pokemon.specialAttack}`} />
        <p>Defesa Especial</p>
        <ProgressBar now={pokemon.specialDefense} min={0} max={255} label={`${pokemon.specialDefense}`} />
      </div>
    </li>
  );
};

export default PokemonCard;
