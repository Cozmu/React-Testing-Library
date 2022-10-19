import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './Helpers/henderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('3. Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha pokémons favoritos;', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it.skip('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    // voltar aqui e tentar fazer (nao e necessario para passar)
  });
});
