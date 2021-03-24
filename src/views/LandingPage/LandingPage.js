import React from 'react'
// import logo from './logo.svg'
import '../../styles/bulma.sass'
import './LandingPage.css'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="LandingPage has-text-centered">
      <Link className="button is-primary" to="/home">Enter the app</Link>
    </div>
  )
}

export default LandingPage;
