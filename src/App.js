import React from 'react';
import './App.css';
import PokemonList from './componentes/PokemonList';
import SearchForm from './componentes/SearchForm';

function App() {
  return (
    <div className="container">
      <img className="logo" src="/assets/imgs/pokemon-logo.png" alt="Pokémon Logo" />
      <SearchForm />
      <PokemonList />
      <button id="btnTop" title="Voltar ao topo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Topo
      </button>
    </div>
  );
}

export default App;
