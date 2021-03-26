import React, { Component } from 'react';

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
                    <h2 class="text-style-header-4 my-2 has-text-black has-text-centered">{this.props.productData ? this.props.productData["product_name"] : "No item found."}</h2>
                    <div class="button-list has-text-left">
                        <div to='/search/barcode' class="button-clickable p-2 mt-5 is-mobile ">
                        
                        
                        {
                            (this.props.productData) ? 
                                Object.keys(this.props.productData["nutriments"]).map(nutriment => {
                                    if(nutriment) {
                                        let nutriment_name = nutriment.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
                                        return (
                                            <div class="nutriment-item is-cleared-both" key={nutriment}>
                                                <span class="is-floated-left text-style-header-5 nutriment-item-name">
                                                    {nutriment_name}
                                                </span>
                                                <span class="is-floated-right text-style-header-5 nutriment-item-name">
                                                    {this.props.productData["nutriments"][nutriment] || 0} {this.props.productData["units"][nutriment] || ' units'}
                                                </span>
                                                <span class="is-cleared-both"></span>
                                            </div>
                                        )
                                    }
                                })
                                : <div class="has-text-centered p-6"> N/A</div>
                        }

                        </div>
                        <div class="columns is-mobile mt-4 button-columns is-cleared-both">
                            <div class="button-wrapper column">
                                <div onClick={this.props.handleCancel} class="is-half button is-light is-large is-danger">Cancel</div>
                            </div>
                            <div class="button-wrapper column has-text-right">
                                <div onClick={this.props.handleConfirm} class="is-half button is-light is-large is-success">Confirm</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ConfirmAddItem;