import React, { Component } from 'react';
import './ButtonAddItem.scss'

class ButtonAddItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        
        return (
            <div class="button is-primary has-text-weight-bold add-item-button has-text-white has-text-centered p-6 m-4" onClick={this.props.handleClick}>
                { this.props.textOverride || '+ Add new item' } 
            </div>
        )
    }
}

export default ButtonAddItem;