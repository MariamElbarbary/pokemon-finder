import React, { Component } from 'react';
import './styles/App.css';
import PokeList from './PokeList'
import SearchBox from './SearchBox'
import Scroll from './Scroll'
import PagButton from './PagButton'
//TODO improve search and add sort functionality

class App extends Component {
  constructor() {
    super();
    this.count = 0;
    this.state = {
      pokemons: [],
      searchfield: '',
      pageOffset: 0
    }
  }

  onCardClick = (event) => {
      console.log(event.target, event.altKey);
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }

  nextPage = async () => {
    if (this.state.pageOffset + 20 <= this.count) {
      await this.setState({ pageOffset: this.state.pageOffset + 20 })
      await this.fetchPokemonData();
    }
  }

  prevPage = async () => {
    if (this.state.pageOffset - 20 >= 0) {
      await this.setState({ pageOffset: this.state.pageOffset - 20 })
      await this.fetchPokemonData();
    }
  }

  render() {
    const filteredPokemons = this.state.pokemons.filter(poke => {
      return poke.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
    });

    return (
      <div className='App'>
        <h1 className='f1'>Pokemon Finder</h1>
        <SearchBox className='search' searchChange={this.onSearchChange} />
        <Scroll>
          <PokeList pokemons={filteredPokemons} onCardClick={this.onCardClick}/>
        </Scroll>
        <div className='pagination'>
          <PagButton page={this.prevPage} text='Previous' />
          <PagButton page={this.nextPage} text='Next' />

        </div>
      </div>
    );
  }

  componentDidMount() {
    this.fetchPokemonData();
  }

  fetchPokemonData = async () => {
    let pokeli = []

    await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${this.state.pageOffset}&limit=20`)
      .then(response => response.json())
      .then(result => {
        this.count = result['count'];
        return result['results'].map((item, i) => pokeli.push({ id: i + 1 + this.state.pageOffset, name: item['name'] }))
      })

    this.setState({ pokemons: pokeli });
  }
}

export default App;
