import React from 'react'
// import logo from './logo.svg'
import '../../styles/bulma.sass'
import './Header.scss'

function Header(props) {
  return (
    <div class="header-wrapper">
    <div className="header columns p-4 pt-6 is-gapless is-marginless is-mobile">
      <div className="column has-text-primary-light left-text has-text-weight-bold has-text-left">{props.left || 'User'}</div>
      <div className="column has-text-white has-text-weight-bold has-text-centered">{props.title}</div>
      <div className="column has-text-primary-light has-text-weight-bold has-text-right">{props.right || 'Edit'}</div>
    </div>
    <div class="header-padder"></div>
    </div>
  )
}

export default Header
