import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetchData();
  }, [offset]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);
      const results = response.data.results;
      const detailedPokemonPromises = results.map(async (pokemon) => {
        const detailedPokemonResponse = await axios.get(pokemon.url);
        return {
          id: detailedPokemonResponse.data.id,
          name: detailedPokemonResponse.data.name,
          hp: detailedPokemonResponse.data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
          image: detailedPokemonResponse.data.sprites.other['dream_world']['front_default'],
          typeEnglish: detailedPokemonResponse.data.types[0].type.name,
          typeTranslated: translateType(detailedPokemonResponse.data.types[0].type.name), // Função para traduzir o tipo
          weight: detailedPokemonResponse.data.weight,
        };
      });
      const detailedPokemonData = await Promise.all(detailedPokemonPromises);
      setPokemonList((prevList) => [...prevList, ...detailedPokemonData]);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const translateType = (type) => {
    switch (type) {
        case 'normal':
            return 'normal';
        case 'fighting':
            return 'lutador';
        case 'flying':
            return 'voador';
        case 'poison':
            return 'venenoso';
        case 'ground':
            return 'terra';
        case 'rock':
            return 'pedra';
        case 'bug':
            return 'inseto';
        case 'ghost':
            return 'fantasma';
        case 'steel':
            return 'aço';
        case 'fire':
            return 'fogo';
        case 'water':
            return 'água';
        case 'grass':
            return 'grama';
        case 'electric':
            return 'elétrico';
        case 'psychic':
            return 'psíquico';
        case 'ice':
            return 'gelo';
        case 'dragon':
            return 'dragão';
        case 'dark':
            return 'sombrio';
        case 'fairy':
            return 'fada';
        default:
            return type;
    }
};


  const loadMorePokemon = () => {
    setOffset((prevOffset) => prevOffset + 20);
  };

  return (
    <div>
      <ul className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </ul>
      <button id="loadMore" onClick={loadMorePokemon}>
        Carregar Mais Pokémon
      </button>
    </div>
  );
};

export default PokemonList;
