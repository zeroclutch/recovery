import React from 'react'
import { Link } from 'react-router-dom'
// import logo from './logo.svg'
import '../../styles/bulma.sass'
import './SearchText.scss'
import Header from '../../components/Header/Header'
import FoodCard from '../../components/FoodCard/FoodCard'

class SearchText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.search       = this.search.bind(this);
  }

  get resultCount() {
    return this.state.results.length
  }

  search(e) {
    e.preventDefault()
    console.log('searching ' + this.state.query)
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/item/search?query=${encodeURIComponent(this.state.query)}`)
    .then(res => res.json())
    .then(data => this.setState({ results: data.foods }))
  }

  handleChange(event) {
    this.setState({query: event.target.value});
  }

  getNutrient(searchResult, nutrient) {
    if(searchResult && searchResult.foodNutrients)
      return searchResult.foodNutrients.find(n => n.nutrientName === nutrient).value
      return '--'
    }
 
  render() {
    return (
      <div className="SearchText">
        <Header title="Search" left="" right="Done" leftLink="/settings" rightLink="/home"></Header>
        <div class="search-box p-5 has-text-centered">
          <form class="" onSubmit={this.search}>
            <input class="input is-small has-text-left" value={this.state.query} onChange={this.handleChange} placeholder="Search" />
            <span class="text-style-label-bold">{this.resultCount > 0 ? `${this.resultCount} results found` : ``}</span>
          </form>
        </div>
        {this.state.results.map(result => (
          <FoodCard
            name={result.description}
            calories={`${this.getNutrient(result, 'Energy')} Cal`}
            nova={`${this.getNutrient(result, 'Total lipid (fat)')}g fat`} 
            nutriScore={`${this.getNutrient(result, 'Protein')}g protein`}
            />
        ))}
      </div>
    )
  }
}

export default SearchText
