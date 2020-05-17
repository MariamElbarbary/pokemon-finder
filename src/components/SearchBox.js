import React, { Fragment } from 'react';
import './styles/Search.css'

const SearchBox = ({ searchChange }) => {
    return (
        <Fragment>
            <input type='search'
                placeholder='search pokemons'
                onChange={searchChange}
            />
        </Fragment>
    );
}

export default SearchBox;