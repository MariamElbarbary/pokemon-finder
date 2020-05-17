import React, { Fragment } from 'react';
import './styles/Cards.css'


const Card = ({ name, id, onCardClick }) => {
    return (
        <Fragment>
            <div className="poke-cell" onClick={onCardClick}>
                <img alt={name}
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                />
                <p>{name}</p>
            </div>
        </Fragment>
    );
}

export default Card;