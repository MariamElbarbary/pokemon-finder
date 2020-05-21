import React from 'react';


const PokeDetails = ({ id , pokemon }) => {
    console.log(pokemon)
return (
    <div className="poke-details">
        <img alt='NA'
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        />
        <p>{pokemon.forms[0].name}</p>
        <h3>Abilities </h3>
        <div>
            {pokemon.abilities.map(ability => {
               return <p>ability.name</p>
           })}
        </div>
    </div>
);
}


export default PokeDetails;