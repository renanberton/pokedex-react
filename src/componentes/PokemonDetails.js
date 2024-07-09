// components/PokemonDetails.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const PokemonDetails = ({ match }) => {
    const [pokemon, setPokemon] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonDetails = async () => {
            const pokemonName = match.params.pokemon; // Captura o parâmetro de rota (nome do Pokémon)
            setLoading(true);
            try {
                const response = await axios.get(`/search-pokemon?pokemon=${pokemonName}`);
                const pokemonDetails = {
                    ...response.data,
                    typeTranslated: translateType(response.data.typeEnglish)
                };
                setPokemon(pokemonDetails);
            } catch (error) {
                console.error('Pokemon not found:', error);
                // Redirecionar ou tratar erro de forma adequada
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonDetails();
    }, [match.params.pokemon]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!pokemon) {
        return <div>Pokémon não encontrado.</div>;
    }

    return (
        <div className="pokemon-details">
            <h2>Detalhes do Pokémon: {pokemon.name}</h2>
            <div className={`pokemon-type-${pokemon.typeEnglish.toLowerCase()}`}>
                <img src={pokemon.image} alt={`Pokémon ${pokemon.name}`} width="200px" height="200px" />
                <p>Nome: {pokemon.name}</p>
                <p>HP: {pokemon.hp}</p>
                <p>Tipo: {pokemon.typeTranslated}</p>
                <p>Peso: {pokemon.weight} Kgs</p>
            </div>
        </div>
    );
};

export default PokemonDetails;
