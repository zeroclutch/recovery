import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './LoadingActionSheet.scss'

class LoadingActionSheet extends Component {
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
                <div class="overlay-background">
                </div>
                <div class="action-sheet has-background-white p-5">
                    <h2 class="text-style-header-4 my-2 mb-3 has-text-black has-text-centered">Loading...</h2>
                </div>
            </div>
        );
    }
}
 
export default LoadingActionSheet;