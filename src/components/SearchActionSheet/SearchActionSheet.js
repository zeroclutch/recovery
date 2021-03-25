import React, { Component, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './SearchActionSheet.scss'

import barcodeIcon from '../../assets/images/barcode-icon.png'
import searchIcon from '../../assets/images/search-icon.png'
import CustomLink from '../CustomLink/CustomLink'

class SearchActionSheet extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div class="action-sheet-wrapper">
                <div class="overlay-background" onClick={this.props.handleClick}>
                </div>
                <div class="action-sheet has-background-white p-5">
                    <h2 class="text-style-header-2 my-2 has-text-black has-text-centered">Add items</h2>
                    <div class="button-list has-text-left">
                        <CustomLink tag='div' to='/search/barcode' class="button-clickable p-2 mt-5 columns is-mobile">
                            <div class="button-icon-holder column is-4">
                            <img alt="Barcode scanning icon" src={barcodeIcon} />
                            </div>
                            <div class="button-text column is-8">
                                <h4 class="text-style-header-5 has-text-black">Barcode</h4>
                                <p class="description">
                                    Scan a barcode and magically add your item.
                                </p>
                            </div>
                        </CustomLink>
                        <CustomLink tag='div' to='/search/text' class="button-clickable p-2 mt-5 columns is-mobile">
                            <div class="button-icon-holder column is-4">
                                <img alt="Magnifying glass icon" src={searchIcon} />
                            </div>
                            <div class="button-text column is-8">
                                <h4 class="text-style-header-5 has-text-black">Lookup</h4>
                                <p class="description">
                                    Search our great big database for your item
                                </p>
                            </div>
                        </CustomLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchActionSheet