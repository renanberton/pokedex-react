import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const PokemonList = ({ searchTerm }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
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
          typeTranslated: translateType(detailedPokemonResponse.data.types[0].type.name),
          weight: detailedPokemonResponse.data.weight,
        };
      });
      const detailedPokemonData = await Promise.all(detailedPokemonPromises);
      setPokemonList((prevList) => [...prevList, ...detailedPokemonData]);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  }, [offset]);

  const fetchSearchedPokemon = async () => {
    if (!searchTerm) return;
    setLoading(true);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
      const detailedPokemonData = {
        id: response.data.id,
        name: response.data.name,
        hp: response.data.stats.find((stat) => stat.stat.name === 'hp').base_stat,
        image: response.data.sprites.other['dream_world']['front_default'],
        typeEnglish: response.data.types[0].type.name,
        typeTranslated: translateType(response.data.types[0].type.name),
        weight: response.data.weight,
      };
      setPokemonList([detailedPokemonData]);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchSearchedPokemon();
    } else {
      fetchData();
    }
  }, [searchTerm, offset, fetchData]);

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
      {loading && <p>Loading...</p>}
      <ul className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </ul>
      {!searchTerm && (
        <ul className="pokemon-list">
          <button id="loadMore" onClick={loadMorePokemon}>
            Carregar Mais Pokémon
          </button>
        </ul>
      )}
    </div>
  );
};

export default PokemonList;
