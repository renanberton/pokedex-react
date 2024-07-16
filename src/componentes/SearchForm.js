import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm.toLowerCase());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite o nome do Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">Pesquisar</button>
    </form>
  );
};

export default SearchForm;
