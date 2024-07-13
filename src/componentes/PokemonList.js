import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const PokemonList = ({ searchTerm }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 20; // Define o limite de pokémons por página

  useEffect(() => {
    if (searchTerm === '') {
      setPokemonList([]); // Limpa a lista ao reiniciar a busca
      setOffset(0); // Reinicia o offset ao reiniciar a busca
      fetchData(0); // Carrega os primeiros 20 pokémons
    } else {
      fetchSearchedPokemon();
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm === '' && offset > 0) {
      fetchData(offset); // Carrega mais pokémons quando o offset muda
    }
  }, [offset, searchTerm]);

  const fetchData = async (newOffset) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${newOffset}`);
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
      if (newOffset === 0) {
        setPokemonList(detailedPokemonData); // Define a lista inicial
      } else {
        setPokemonList((prevList) => [...prevList, ...detailedPokemonData]); // Adiciona à lista existente
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const fetchSearchedPokemon = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
      const detailedPokemonResponse = response.data;
      const pokemonData = {
        id: detailedPokemonResponse.id,
        name: detailedPokemonResponse.name,
        hp: detailedPokemonResponse.stats.find((stat) => stat.stat.name === 'hp').base_stat,
        image: detailedPokemonResponse.sprites.other['dream_world']['front_default'],
        typeEnglish: detailedPokemonResponse.types[0].type.name,
        typeTranslated: translateType(detailedPokemonResponse.types[0].type.name),
        weight: detailedPokemonResponse.weight,
      };
      setPokemonList([pokemonData]);
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
    setOffset((prevOffset) => prevOffset + limit); // Incrementa o offset pelo limite de pokémons
  };

  return (
    <div>
      <ul className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </ul>
      {searchTerm === '' && (
        <button id="loadMore" onClick={loadMorePokemon}>
          Carregar Mais Pokémons
        </button>
      )}
    </div>
  );
};

export default PokemonList;
