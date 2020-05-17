import React from 'react';
import Cards from './Cards'
import './styles/PokeList.css';
// import {poke} from '../pokemons'

const PokeList = ({ pokemons, onCardClick }) => {
    const pokemonArray = pokemons.map(pokemon => {
        return <Cards
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            onCardClick={onCardClick} />
    });

    return (
        <section className="poke-list">
            {pokemonArray}
        </section>
    )
}


export default PokeList;