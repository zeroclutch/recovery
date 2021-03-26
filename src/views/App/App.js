import React, { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'
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
  const [userItems, setUserItems] = useState([])
  const [userSettings, setUserSettings] = useState({})
  const [userNutriments, setUserNutriments] = useState({})
  const [userInitialNutriments, setUserInitialNutriments] = useState({})
  const [productData, setProductData] = useState({})

  function handleUserItemUpdate(newItems) {
    setUserItems(newItems)
  }

  function handleUserSettingsUpdate(settings) {
    function convertLbsToKg(lbs) {
      return (lbs * 0.453592)
    }

    setUserSettings(settings)
    let userData = Object.assign({}, settings)
    if(userData.unit === 'lbs') {
      userData.weight = convertLbsToKg(userData.weight)
    } else if(userData.sex === 'Other') {
      userData.sex = 'Male' // Use Male for fallback calculations
    }
    console.log(settings)
    calculateInitial(userData, false)
  }

  function handleProductChange(newProductData) {
    updateUserNutriments(newProductData.type, newProductData.id || newProductData.code || newProductData.fdcid)
    addUserItem(newProductData)
  }

  function addUserItem(newProductData) {
    const currentUserItems = userItems.concat(newProductData)
    setUserItems(currentUserItems)
    console.log(currentUserItems)
  }

  function updateUserNutriments(type, id) {
    const data = {
      nutrients: userNutriments,
      food: {
        type,
        id: `${id}`
      }
    }
    fetch(process.env.REACT_APP_API_ENDPOINT + '/item/add', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(json => {
      setUserNutriments(json)
    }).catch(console.log)
  }

  function calculateInitial(settingsOverride, isInital) {
    // Fetch initial data
    fetch(process.env.REACT_APP_API_ENDPOINT + '/calculate/initial', {
      method: 'POST',
      body: JSON.stringify(settingsOverride || userSettings),
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log(userNutriments)
      console.log(userInitialNutriments)
      setUserInitialNutriments(data) 
      if(isInital) { 
        setUserNutriments(data) 
      }
      else {
        let newData = userNutriments
        Object.keys(userNutriments).forEach(nutriment => {
          // console.log(nutriment, userNutriments[nutriment]["min"], data[nutriment]["min"], userInitialNutriments[nutriment]["min"])
          newData[nutriment]["min"] = (userNutriments[nutriment]["min"] || 0) + (data[nutriment]["min"] || 0) - (userInitialNutriments[nutriment]["min"] || 0)
          newData[nutriment]["max"] = (userNutriments[nutriment]["max"] || 0) + (data[nutriment]["max"] || 0) - (userInitialNutriments[nutriment]["max"] || 0)
          newData[nutriment]["unit"] = data[nutriment]["unit"]
        })
        console.log(newData)
        setUserNutriments(newData)
      }
    })
    .catch(err => console.log('There was an error loading user data.', err))
  }

  useEffect(() => {
    let initialUserSettings = {"sex": "Male", "weight": 60, "unit": "kg"}

    setUserSettings(initialUserSettings)
    // setUserInitialNutriments(initialUserNutriments)
    calculateInitial(initialUserSettings, true)
    console.log(userInitialNutriments, userNutriments)
  }, [])

  return (
    <div class="app">
    <HashRouter history={history}>
      <Switch>
        {/* Landing page for uninstalled users */}
        <Route exact path="/">
          <LandingPage productData={productData} />
        </Route>
        {/* App pages */}
        <Route path="/home" >
          <HomePage userItems={userItems} userNutriments={userNutriments} handleUserItemUpdate={handleUserItemUpdate}/>
        </Route>
        <Route path="/analysis">
          <Analysis userNutriments={userNutriments} userInitialNutriments={userInitialNutriments}/>
        </Route>
        <Route path="/search/barcode">
          <SearchBarcode history={history} handleProductChange={handleProductChange} />
        </Route>
        <Route path="/settings">
          <Settings userSettings={userSettings} handleUserSettingsUpdate={handleUserSettingsUpdate} />
        </Route>
        
        <Route path="/search/text">
          <SearchText history={history} handleProductChange={handleProductChange} />
        </Route>
      </Switch>
    </HashRouter>
    </div>
  )
}

export default App