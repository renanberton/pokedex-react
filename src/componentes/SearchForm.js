import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm.toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Pesquise o Pokémon</label>
      <input
        type="text"
        placeholder="Digite aqui"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Pesquisar</button>
    </form>
  );
};

export default SearchForm;
