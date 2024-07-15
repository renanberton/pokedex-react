import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

const PokemonList = ({ searchTerm }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [error, setError] = useState(false);
  var limit = 20; // Define o limite de pokémons por página

  useEffect(() => {
    if (searchTerm === '') {
      setPokemonList([]); // Limpa a lista ao reiniciar a busca
      setOffset(0); // Reinicia o offset ao reiniciar a busca
      setError(false); // Limpa o estado de erro
      fetchData(0); // Carrega os primeiros 20 pokémons
    } else {
      fetchSearchedPokemon();
    }
  }, [searchTerm]);

  const AllList = () => {
    setPokemonList([]); // Limpa a lista ao reiniciar a busca
    setOffset(20); // Reinicia o offset ao reiniciar a busca
    setError(false); // Limpa o estado de erro
    fetchData(0); // Carrega os primeiros 20 pokémons
  }

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
          attack: detailedPokemonResponse.data.stats.find((stat) => stat.stat.name === 'attack').base_stat,
          defense: detailedPokemonResponse.data.stats.find((stat) => stat.stat.name === 'defense').base_stat,
          specialAttack: detailedPokemonResponse.data.stats.find((stat) => stat.stat.name === 'special-attack').base_stat,
          specialDefense: detailedPokemonResponse.data.stats.find((stat) => stat.stat.name === 'special-defense').base_stat,
          speed: detailedPokemonResponse.data.stats.find((stat) => stat.stat.name === 'speed').base_stat,
          image: detailedPokemonResponse.data.sprites.other['dream_world']['front_default'],
          typeEnglish: detailedPokemonResponse.data.types[0].type.name,
          typeTranslated: translateType(detailedPokemonResponse.data.types[0].type.name),
          weight: detailedPokemonResponse.data.weight,
          height: detailedPokemonResponse.data.height,
          baseExperience: detailedPokemonResponse.data.base_experience,
          abilities: detailedPokemonResponse.data.abilities,
        };
      });
      const detailedPokemonData = await Promise.all(detailedPokemonPromises);
      if (newOffset === 0) {
        setPokemonList(detailedPokemonData); // Define a lista inicial
      } else {
        setPokemonList((prevList) => [...prevList, ...detailedPokemonData]); // Adiciona à lista existente
      }
      setError(false); // Limpa o estado de erro ao ter sucesso na busca
    } catch (error) {
      console.error('Error fetching data: ', error);
      setError(true);
      setPokemonList([]); // Limpa a lista de pokémons em caso de erro
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
        attack: detailedPokemonResponse.stats.find((stat) => stat.stat.name === 'attack').base_stat,
        defense: detailedPokemonResponse.stats.find((stat) => stat.stat.name === 'defense').base_stat,
        specialAttack: detailedPokemonResponse.stats.find((stat) => stat.stat.name === 'special-attack').base_stat,
        specialDefense: detailedPokemonResponse.stats.find((stat) => stat.stat.name === 'special-defense').base_stat,
        speed: detailedPokemonResponse.stats.find((stat) => stat.stat.name === 'speed').base_stat,
        image: detailedPokemonResponse.sprites.other['dream_world']['front_default'],
        typeEnglish: detailedPokemonResponse.types[0].type.name,
        typeTranslated: translateType(detailedPokemonResponse.types[0].type.name),
        weight: detailedPokemonResponse.weight,
        height: detailedPokemonResponse.height,
        baseExperience: detailedPokemonResponse.base_experience,
        abilities: detailedPokemonResponse.abilities,
      };
      setPokemonList([pokemonData]);
      setError(false); // Limpa o estado de erro ao ter sucesso na busca
    } catch (error) {
      console.error('Error fetching data: ', error);
      setError(true);
      setPokemonList([]); // Limpa a lista de pokémons em caso de erro
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
    if(limit < 20) {
      limit = 20;
    } else {
      setOffset((prevOffset) => prevOffset + limit); // Incrementa o offset pelo limite de pokémons
    }
    fetchData(offset);
  };

  return (
    <div className='container'>
      
      <ul className="pokemon-list" style={{ 
        flexDirection: pokemonList.length === 1 ? 'column' : 'row',
        gap: pokemonList.length === 1 ? '0px' : '100px'}}>
        {error ? (
          <div>
            <p>Pokemon não encontrado.<br /> Por favor, digite novamente.</p>
            <button onClick={AllList}>
              Listar Todos
            </button>
          </div>
        ) : (
        pokemonList.length > 0 && (
          <>
            {pokemonList.map((pokemon, index) => (
              <div key={index}>
                <PokemonCard pokemon={pokemon} />
              </div>
              ))}
            {pokemonList.length === 1 && (
              <button onClick={AllList}>
                Listar Todos
              </button>
              )}
            </>
          )
        )}
      </ul>
      {pokemonList.length > 1 && (
        <button id="loadMore" onClick={loadMorePokemon}>
          Carregar Mais Pokémons
        </button>
      )}
    </div>
  );
};

export default PokemonList;