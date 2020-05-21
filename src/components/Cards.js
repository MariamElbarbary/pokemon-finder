import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import './styles/Cards.css'


const Card = ({ name, id, onCardClick }) => {
    return (
        <Fragment>
            <div className="poke-cell" onClick={onCardClick}>
                <img alt={name}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                />
                <Link to={`/pokemons/${id}`}>{name}</Link>
            </div>
        </Fragment>
    );
}

export default Card;