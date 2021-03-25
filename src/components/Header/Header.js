import React from 'react'
import { Link } from 'react-router-dom'
import CustomLink from '../CustomLink/CustomLink'
// import logo from './logo.svg'
import '../../styles/bulma.sass'
import './Header.scss'

function Header(props) {
  return (
    <div class="header-wrapper">
    <div className="header columns p-4 pt-6 is-gapless is-marginless is-mobile">
      <CustomLink tag='div' to={props.leftLink} className="column has-text-primary-light left-text has-text-weight-bold has-text-left">{props.left || 'User'}</CustomLink>
      <div className="column has-text-white has-text-weight-bold has-text-centered">{props.title}</div>
      <CustomLink tag='div' to={props.rightLink} className="column has-text-primary-light has-text-weight-bold has-text-right">{props.right || 'Edit'}</CustomLink>
    </div>
    <div class="header-padder"></div>
    </div>
  )
}

export default Header
