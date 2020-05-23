import React, { Component } from 'react';
import './App.css';
import PokeList from './components/PokeList'
import SearchBox from './components/SearchBox'
import Scroll from './components/Scroll'
import PagButton from './components/PagButton'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import PokeDetails from './components/PokeDetails'
//TODO improve search and add sort functionality

class App extends Component {
  constructor() {
    super();
    this.count = 0;
    this.state = {
      pokemons: [],
      searchfield: '',
      pageOffset: 0,
      pokeName: '',
      pokemon: {}
    }
  }

  onCardClick = (event) => {
    this.setState({ pokeName: event.target.textContent })
    // console.log(event.target.textContent, 'really!!');
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  }

  nextPage = () => {
    if (this.state.pageOffset + 20 <= this.count) {
      this.setState({ pageOffset: this.state.pageOffset + 20 })
      this.fetchPokemonData(this.state.pageOffset + 20);
    }
  }

  prevPage = () => {
    if (this.state.pageOffset - 20 >= 0) {
      this.setState({ pageOffset: this.state.pageOffset - 20 })
      this.fetchPokemonData(this.state.pageOffset - 20);
    }
  }


  homePage = () => {
    const filteredPokemons = this.state.pokemons.filter(poke => {
      return poke.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
    });

    return (
      <div className='App'>
        <h1 className='f1'>Pokemon Finder</h1>
        <SearchBox className='search' searchChange={this.onSearchChange} />
        <Scroll>
          <PokeList pokemons={filteredPokemons} onCardClick={this.onCardClick} />
        </Scroll>
        <div className='pagination'>
          <PagButton page={this.prevPage} text='Previous' />
          <PagButton page={this.nextPage} text='Next' />
        </div>
      </div>
    );
  }

  pokemonPage = ({ match }) => {
    return (
      <div>
        <PokeDetails id={match.params.id} pokemon={this.state.pokemon} />
      </div>
    );
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={this.homePage} />
          <Route path="/pokemons/:id" component={this.pokemonPage} />
        </div>
      </Router>
    );
  }

  componentDidMount() {
    this.fetchPokemonData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pokeName !== this.state.pokeName) {
      console.log(this.state.pokemon);
      this.fetchPokemonDetails();
    }
  }
  // The object is too deep and complex i need to find a way to pass it through
  fetchPokemonDetails = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.pokeName}`)
      .then(response => response.json());

    // console.log(res);
    // const newobj = {name: res.forms[0], ability:res.ability, type:res.type};
    this.setState({
      pokemon: res
    });
  }

  fetchPokemonData = async (page = this.state.pageOffset) => {
    let pokeli = []

    await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${page}&limit=20`)
      .then(response => response.json())
      .then(result => {
        this.count = result['count'];
        return result['results'].map((item, i) => pokeli.push({ id: i + 1 + page, name: item['name'] }))
      })

    this.setState({ pokemons: pokeli });
  }
}

export default App;
