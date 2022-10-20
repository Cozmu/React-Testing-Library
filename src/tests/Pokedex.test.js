import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './Helpers/henderWithRouter';
import App from '../App';
// import data from '../data';

/* const colocaPokemonDaTela = ({ name, type, averageWeight }) => {
  const { value, measurementUnit } = averageWeight;
  expect(screen.getByText(name)).toBeInTheDocument();
  expect(screen.getByText(type, { ignore: 'button' })).toBeInTheDocument();
  const weightRegex = `Average weight: ${value} ${measurementUnit}`;
  const pokemonAverageWeight = screen.getByText(weightRegex);
  expect(pokemonAverageWeight).toBeInTheDocument();
};

const retiraPokemonDaTela = ({ name, type, averageWeight }) => {
  const { value, measurementUnit } = averageWeight;
  expect(screen.getByText(name)).not.toBeInTheDocument();
  expect(screen.getByText(type, { ignore: 'button' })).not.toBeInTheDocument();
  const weightRegex = `Average weight: ${value} ${measurementUnit}`;
  const pokemonAverageWeight = screen.getByText(weightRegex);
  expect(pokemonAverageWeight).not.toBeInTheDocument();
}; */

const nextPokemon = () => {
  const button = screen.getByRole('button', { name: 'Próximo pokémon' });
  expect(button).toBeInTheDocument();
  userEvent.click(button);
};

describe('5. Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(title).toBeInTheDocument();
  });

  /* it('Teste se é exibido o primeiro pokémon da lista ao carregar a página', () => {
    renderWithRouter(<App />);
    const firstPokemon = data[0];
    const { name, type, averageWeight: { value, measurementUnit } } = firstPokemon;
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(type, { ignore: 'button' })).toBeInTheDocument();
    const weightRegex = `Average weight: ${value} ${measurementUnit}`;
    const pokemonAverageWeight = screen.getByText(weightRegex);
    expect(pokemonAverageWeight).toBeInTheDocument();
  }); */

  it('Teste se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Electric', { ignore: 'button' })).toBeInTheDocument();
    const weightRegexFirst = 'Average weight: 6.0 kg';
    const firstPokemonAverageWeight = screen.getByText(weightRegexFirst);
    expect(firstPokemonAverageWeight).toBeInTheDocument();

    nextPokemon();

    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getByText('Fire', { ignore: 'button' })).toBeInTheDocument();
    const weightRegexSecond = 'Average weight: 8.5 kg';
    const secondPokemonAverageWeight = screen.getByText(weightRegexSecond);
    expect(secondPokemonAverageWeight).toBeInTheDocument();

    // const firstPokemon = data[0];
    // const secondPokemon = data[1];
    // const lastPokemon = data[data.length - 1];
    // retiraPokemonDaTela(firstPokemon);
    // colocaPokemonDaTela(secondPokemon);
    // userEvent.click(button);
    // retiraPokemonDaTela(lastPokemon);
    // colocaPokemonDaTela(firstPokemon);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterBtn = screen.queryAllByTestId('pokemon-type-button');
    filterBtn.forEach((btns) => {
      const botoes = screen.getByRole('button', { name: btns.innerHTML });
      expect(botoes).toBeInTheDocument();
    });
  });

  it('Testa se ao clicar no botão de filtragem exibe os pokemons corretamente', () => {
    renderWithRouter(<App />);
    const btnFire = screen.queryAllByTestId('pokemon-type-button');
    // console.log(btnFire[1]);
    expect(btnFire[4]).toBeInTheDocument();
    userEvent.click(btnFire[4]);

    expect(screen.getByText('Alakazam')).toBeInTheDocument();
    expect(screen.getByText('Psychic', { ignore: 'button' })).toBeInTheDocument();
    const weightRegexFirst = 'Average weight: 48.0 kg';
    const firstPokemonAverageWeight = screen.getByText(weightRegexFirst);
    expect(firstPokemonAverageWeight).toBeInTheDocument();

    nextPokemon();

    expect(screen.getByText('Mew')).toBeInTheDocument();
    expect(screen.getByText('Psychic', { ignore: 'button' })).toBeInTheDocument();
    const weightRegexSecond = 'Average weight: 4.0 kg';
    const secondPokemonAverageWeight = screen.getByText(weightRegexSecond);
    expect(secondPokemonAverageWeight).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Electric', { ignore: 'button' })).toBeInTheDocument();
    const weightRegexFirst = 'Average weight: 6.0 kg';
    const firstPokemonAverageWeight = screen.getByText(weightRegexFirst);
    expect(firstPokemonAverageWeight).toBeInTheDocument();

    nextPokemon();

    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getByText('Fire', { ignore: 'button' })).toBeInTheDocument();
    const weightRegexSecond = 'Average weight: 8.5 kg';
    const secondPokemonAverageWeight = screen.getByText(weightRegexSecond);
    expect(secondPokemonAverageWeight).toBeInTheDocument();
  });
});
