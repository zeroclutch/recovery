import React from 'react'
import { Link } from 'react-router-dom'
// import logo from './logo.svg'
import '../../styles/bulma.sass'
import './SearchText.scss'
import Header from '../../components/Header/Header'
import FoodCard from '../../components/FoodCard/FoodCard'
import ConfirmAddItem from '../../components/ConfirmAddItem/ConfirmAddItem'

class SearchText extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      results: [],
      confirmingItem: false,
      confirmedItem: false,
      data: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.search       = this.search.bind(this);
    this.handleCancel     = this.handleCancel.bind(this)
    this.handleConfirm    = this.handleConfirm.bind(this)
    this.handleSelectItem = this.handleSelectItem.bind(this)
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

  handleConfirm(e) {
    this.props.handleProductChange(this.state.data)
    this.setState({
      confirmingItem: false,
      mode: 'camera'
    })
    console.log(this.props.history)
  }

  handleCancel(e) {
    this.setState({
      confirmingItem: false,
      mode: 'camera'
    })
  }

  async handleSelectItem(e, id) {
    console.log(id)
    let res = await fetch(process.env.REACT_APP_API_ENDPOINT + '/item/info?fdcid=' + id)
    let data = await res.json()
    // Fetch by result FDCID
    // set confirmingItem to true
    this.setState({
      confirmingItem: true,
     data,
    })
  }

  getNutrient(searchResult, nutrient) {
    if(searchResult && searchResult.foodNutrients) {
      return (searchResult.foodNutrients.find(n => n.nutrientName === nutrient) || {value: '--'}).value
    }
    return '--'
    }
 
  render() {
    console.log(this.state.data)
    return (
      <div className="SearchText">
        <Header title="Search" left=" " right="Done" leftLink="/settings" rightLink="/home"></Header>
        <div class="search-box p-5 has-text-centered">
          <form class="" onSubmit={this.search}>
            <input class="input is-small has-text-left" value={this.state.query} onChange={this.handleChange} placeholder="Search" />
            <span class="text-style-label-bold">{this.resultCount > 0 ? `${this.resultCount} results found` : ``}</span>
          </form>
        </div>
        {this.state.results.map(result => (
          <FoodCard
            name={result.description}
            key={result.fdcId}
            calories={`${this.getNutrient(result, 'Energy')} Cal`}
            nova={`${this.getNutrient(result, 'Total lipid (fat)')}g fat`} 
            nutriScore={`${this.getNutrient(result, 'Protein')}g protein`}
            handleSelectItem={e => this.handleSelectItem(e, `${result.fdcId}`)}
            data-fdcId={`${result.fdcId}`}
          />
        ))}
        {this.state.confirmingItem && this.state.data != null && <ConfirmAddItem loading={false} productData={this.state.data["product"]} handleConfirm={this.handleConfirm} handleCancel={this.handleCancel}></ConfirmAddItem>}
      </div>

    )
  }
}

export default SearchText
