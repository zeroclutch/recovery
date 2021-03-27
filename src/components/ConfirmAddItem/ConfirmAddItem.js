import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import barcodeIcon from '../../assets/images/barcode-icon.png'
import searchIcon from '../../assets/images/search-icon.png'
import CustomLink from '../CustomLink/CustomLink'
import './ConfirmAddItem.scss'

class ConfirmAddItem extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
        }
    }
    // change html later, defining props to know what to pass through and what is what
    
    // when making Buttons, you can utilize props.handleChoice(choice) => choice can be true or false?
    render() { 
        console.log(this.props)
        return (
            <div class="action-sheet-wrapper">
                <div class="overlay-background" onClick={this.props.handleCancel}>
                </div>
                <div class="action-sheet has-background-white p-5">
                    <h2 class="text-style-header-4 my-2 mb-3 has-text-black has-text-centered">{this.props.productData ? this.props.productData["product_name"] : "No item found."}</h2>
                    <h2 class="text-style-header-5 my-2 ml-1 has-text-light-gray has-text-left">{this.props.productData ? this.props.productData["brands"] : "No brand name found."}</h2>
                    <div class="is-flex is-flex-direction-row serving-quantity">
                        <h2 class="text-style-header-5 ml-1 ">Serving Quantity:</h2>
                        <h2 class="text-style-header-5 mr-2 serving-unit">{this.props.productData ? (this.props.productData["serving_quantity"] || 'unknown') + (this.props.productData["serving_quantity_unit"] || " units") : "N/A"}</h2>
                    </div>
                    <div class="button-list">
                        <div to='/search/barcode' class="button-clickable p-3 mt-2 is-mobile">
                        {
                            (this.props.productData) ? 
                                Object.keys(this.props.productData["nutriments"]).map(nutriment => {
                                    if(nutriment) {
                                        let nutriment_name = nutriment.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
                                        return (
                                            <div class="nutriment-item is-cleared-both mb-1" key={nutriment}>
                                                <span class="is-floated-left text-style-header-5 nutriment-item-name">
                                                    {nutriment_name}
                                                </span>
                                                <span class="is-floated-right text-style-body nutriment-item-name">
                                                    {this.props.productData["nutriments"][nutriment].toPrecision(2) || 0} {this.props.productData["units"][nutriment] || ' units'}
                                                </span>
                                            </div>
                                        )
                                    }
                                })
                                : <div class="has-text-centered p-6"> N/A</div>
                        }

                        </div>
                        <div class="columns is-mobile mt-1 mx-0 button-columns is-cleared-both">
                            <div class="button-wrapper has-text-left column">
                                <div onClick={this.props.handleCancel} class="is-half button is-light is-large is-danger">Cancel</div>
                            </div>
                            <div class="button-wrapper has-text-right column">
                                <Link to="/home" onClick={this.props.handleConfirm} class="is-half button is-light is-large is-success">Confirm</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ConfirmAddItem;