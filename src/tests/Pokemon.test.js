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

describe('6. Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon:', () => {
    const { getByAltText } = renderWithRouter(<App />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Electric', { ignore: 'button' })).toBeInTheDocument();
    const pesoPokemon = 'Average weight: 6.0 kg';
    const verificaPeso = screen.getByText(pesoPokemon);
    expect(verificaPeso).toBeInTheDocument();
    const img = getByAltText('Pikachu sprite');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(screen.getByRole('img', { name: 'Pikachu sprite' })).toBeInTheDocument();
  });

  it('Teste se o card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon.O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido', () => {
    renderWithRouter(<App />);
    // const link = screen.getByRole('link', { name: 'More details' });
    expect(details()).toBeInTheDocument();
    expect(details()).toHaveAttribute('href', '/pokemons/25');
  });

  it('Teste se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes de pokémon', () => {
    const { history } = renderWithRouter(<App />);
    // const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details());
    expect(screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 })).toBeInTheDocument();
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
    const { getByAltText } = renderWithRouter(<App />);
    // const link = screen.getByRole('link', { name: 'More details' });
    userEvent.click(details());
    const favorito = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(favorito);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    const img = getByAltText('Pikachu is marked as favorite');
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    expect(screen.getByRole('img', { name: 'Pikachu is marked as favorite' })).toBeInTheDocument();
  });
});
