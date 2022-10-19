import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './Helpers/henderWithRouter';
import NotFound from '../pages/NotFound';

describe('4. Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const title = screen.getByRole('heading', { name: 'Page requested not found', level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem: URL', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const gif = getByAltText('Pikachu crying because the page requested was not found');
    expect(gif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
