import React, { useState } from 'react'
import { Route, Switch } from 'react-router'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
// import logo from './logo.svg'
import './App.scss'


import LandingPage from '../LandingPage/LandingPage'
import HomePage from '../HomePage/HomePage'
import Analysis from '../Analysis/Analysis'
import SearchBarcode from '../SearchBarcode/SearchBarcode'
import SearchText from '../SearchText/SearchText'
import Settings from '../Settings/Settings'

const history = createBrowserHistory()
const FR = new FileReader();
// import Analysis from './views/Analysis'
// import Settings from './views/Settings'
// import SearchBarcode from './views/SearchBarcode'
// import SearchText from './views/SearchText'

/*
FIRST:
{
    "code": "0079400455352",
    "box": {
        left: 37,
        top: 550,
        width: 324,
        height: 76
    },
    "product": {
        "generic_name": "Rice Noodles",
        "quantity": "155 g",
        "brands": "Thai Kitchen,Simply Asia",
        "nutriscore_grade": "c",
        "nova_group": 4
    }
}
THEN: JSON with nutriments
*/

function App() {
  const [userItems, setUserItems] = useState([]) // May discard later
  const [productNutriments, setProductNutriments] = useState([])

  function handleUserItemUpdate(newItems) {
    setUserItems(newItems)
  }
  function handleBarcodeChange(e) {
    const imageFile = e.target.files[0]
    FR.addEventListener("load", function() {
      let newObject = URL.createObjectURL(imageFile)
      console.log(FR.result)
    })
    FR.readAsDataURL(imageFile)
  }

  return (
    <div class="app">
    <Router history={history}>
      <Switch>
      {/* Landing page for uninstalled users */}
      <Route exact path="/">
        <LandingPage />
      </Route>
      {/* App pages */}
      <Route path="/home" >
        <HomePage userItems={userItems} productNutriments = {productNutriments} handleUserItemUpdate={handleUserItemUpdate}/>
      </Route>
      <Route path="/analysis">
        <Analysis />
      </Route>
      <Route path="/search/barcode">
        <SearchBarcode handleChange = {handleBarcodeChange}/>
      </Route>
      <Route path="/settings">
        <Settings/>
      </Route>
      
      <Route path="/search/text">
        <SearchText/>
      </Route>
    </Switch>
  </Router>
  </div>
  )
}

export default App