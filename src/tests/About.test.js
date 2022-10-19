import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './Helpers/henderWithRouter';
import About from '../pages/About';

describe('2. Teste o componente <About.js />.', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    expect(screen.getByRole('heading', { name: 'About Pokédex' })).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons')).toBeInTheDocument();
    expect(screen.getByText('One can filter Pokémons by type, and see more details for each one of them')).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const img = getByAltText('Pokédex');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
