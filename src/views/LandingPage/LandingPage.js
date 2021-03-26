import React from 'react'
// import logo from './logo.svg'
import '../../styles/bulma.sass'
import './LandingPage.css'
import { Link } from 'react-router-dom'
import ConfirmAddItem from "../../components/ConfirmAddItem/ConfirmAddItem";


function LandingPage(props) {
  return (
    <div className="LandingPage has-text-centered">
      <Link className="button is-primary" to="/home">Enter the app</Link>
      <ConfirmAddItem nutriments={props.productNutriments}></ConfirmAddItem>
    </div>
  )
}

export default LandingPage;
