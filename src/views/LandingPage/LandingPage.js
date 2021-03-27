import React from 'react'
// import logo from './logo.svg'
import '../../styles/bulma.sass'
import './LandingPage.scss'
import { Link } from 'react-router-dom'
import AddToHomeScreen from '@ideasio/add-to-homescreen-react';



function LandingPage(props) {
  return (
    <div className="LandingPage has-text-centered">
      <div class="header-hero">
        <div class="header-content">
          <h1 class="main-title">
            <span class="glass">re</span>
            <span class="glow">cov</span>
            <span class="glass">ery</span>
          </h1>
          <h2 class="subheading glass p-4">the food app for recovering COVID&#8209;19 patients</h2>
          <h2 class="text-style-header-5 has-text-white p-4">Add this webapp to your home screen to use it.</h2>
        
              <AddToHomeScreen
              autostart={ true }
              customPromptContent={ {
                title: 'Do you want to install Recovery on your homescreen?',
                cancelMsg: 'No',
                installMsg: 'Yes, sure!',
                guidanceCancelMsg: 'Dismiss',
              }
              }/>
          <div class="main-content p-4">
            <div class="main-content-holder">
            </div>
          </div>
      </div>
      </div>
    </div>
  )
}

export default LandingPage;
