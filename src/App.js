import React, { useState } from 'react';
import './App.css';
import PokemonList from './componentes/PokemonList';
import SearchForm from './componentes/SearchForm';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  return (
    <div className="container">
      <img className="logo" src="/assets/imgs/pokemon-logo.png" alt="Pokémon Logo" />
      <SearchForm onSearch={handleSearch} />
      <PokemonList searchTerm={searchTerm} />
      <button id="btnTop" title="Voltar ao topo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Topo
      </button>
    </div>
  );
}

export default App;
