import React from 'react'
// import logo from './logo.svg'
import '../../styles/bulma.sass'
import './LandingPage.scss'
import { Link } from 'react-router-dom'
import ConfirmAddItem from "../../components/ConfirmAddItem/ConfirmAddItem";


function LandingPage(props) {
  return (
    <div className="LandingPage has-text-centered">
      <div class="header-hero">
        <h1 class="main-title">
          <span class="glass">re</span>
          <span class="glow">cov</span>
          <span class="glass">ery</span>
        </h1>
      </div>
    </div>
  )
}

export default LandingPage;
