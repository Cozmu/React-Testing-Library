import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
import renderWithRouter from './Helpers/henderWithRouter';
import App from '../App';

const details = () => {
  const link = screen.getByRole('link', { name: 'More details' });
  return link;
};

describe('7. Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    userEvent.click(details());
    expect(screen.getByRole('heading', { name: 'Pikachu Details', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.')).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    userEvent.click(details());
    expect(screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 })).toBeInTheDocument();

    const img = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(img[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    userEvent.click(details());
    const favorito = screen.getByLabelText('Pokémon favoritado?');
    expect(favorito).toBeInTheDocument();
  });
});
