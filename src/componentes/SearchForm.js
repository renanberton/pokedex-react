import React from 'react';

const SearchForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica para lidar com a pesquisa
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Pesquise o Pokémon</label>
      <input type="text" placeholder="Digite aqui" />
      <button type="submit">Pesquisar</button>
    </form>
  );
};

export default SearchForm;
