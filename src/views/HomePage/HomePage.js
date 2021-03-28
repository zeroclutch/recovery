import React from 'react'
import { Link } from 'react-router-dom'
// import logo from './logo.svg'
import '../../styles/bulma.sass'
import './HomePage.css'
import Header from '../../components/Header/Header'
import ButtonAddItem from '../../components/ButtonAddItem/ButtonAddItem'
import ButtonAnalyze from '../../components/ButtonAnalyze/ButtonAnalyze'
import SearchActionSheet from '../../components/SearchActionSheet/SearchActionSheet'
import FoodCard from '../../components/FoodCard/FoodCard'

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      formInput: {
        addingItem: false,
        searchInput: ''
      }
    }
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleUserItem = this.handleUserItem.bind(this);
  }

  handleFormInputChange = (e) => {
    const [name, value] = e.target
    this.setState(prevState => ({
      ...prevState, formInput: {
        [name]: value
      }
    }))
  }
  handleAddItem = (e) => {
    this.setState(prevState => ({
      ...prevState, formInput: {
        addingItem: !this.state.formInput.addingItem
      }
    }))
  }

  handleUserItem = () => {
    let userItems = ["Strawberry Cheesecake"]
    userItems.push(...this.props.userItems)
    this.props.handleUserItemUpdate(userItems)
  }

  render() { 
    console.log("USER ITEMS:", this.props.userItems)
    return ( 
      <div className="HomePage">
        <Header leftLink="/settings" right=" " title="Add Items"></Header>
        <ButtonAddItem handleClick = {(e) => this.handleAddItem(e)} />
        
        {this.props.userItems.map((userItem, index) => {
          let product = userItem.product
          return (<FoodCard key={index}
            index={index}
            handleDeleteItem={this.props.handleDeleteItem}
            isDeletable={true}
            name={product.product_name || product.generic_name}
            calories={`${product.serving_quantity || '--'} ${product.serving_quantity_unit}` || 'amt.'}
            nova={product.nova_group ? `${product.nova_group} NOVA` : `${product.nutriments.calcium} ${product.units.calories}`}
            nutriScore={product.nutriscore_grade ? `${product.nutriscore_grade.toUpperCase()} Nutri-Score` : `${product.nutriments.iron}${product.units.iron} iron`} />
          )})}
        <Link to="/analysis"><ButtonAnalyze /></Link>
        {this.state.formInput.addingItem && <SearchActionSheet handleClick = {(e) => this.handleAddItem(e)} handleAddItem = {() => this.handleUserItem()}/>}
      </div>
    );
  }
}
 
export default HomePage;
