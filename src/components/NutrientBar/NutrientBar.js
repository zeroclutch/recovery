import React, { Component } from 'react'
import './NutrientBar.scss'

class NutrientBar extends Component {
    constructor(props) {
        super(props)
    }

    get isCompleted() {
        return this.props.completed >= this.props.total
    }

    get width() {
        return `${Math.min(100 * (this.props.completed / this.props.total), 100)}%`
    }

    render() {
        return (
            <div class="NutrientBar py-2 my-2">
                <div class="bar">
                    <div class="bar-background bar-component"></div>
                    <div class={`bar-glow bar-component ${this.isCompleted ? 'success' : 'error'}`} style={{ width: this.width }}></div>
                    <div class={`bar-progress bar-component ${this.isCompleted ? 'success' : 'error'}`} style={{ width: this.width }}></div>
                </div>
                <div class="nutrient-info is-cleared-both py-2">
                    <span class="is-floated-right text-style-label-bold">
                        <span class={`${this.isCompleted ? 'has-text-success' : 'has-text-danger'}`} >{this.props.completed}</span>
                        <span class="has-text-grey-dark"> / {this.props.total}</span>
                        <span class="has-text-grey-dark">{this.props.unit}</span>
                    </span>
                    <span class="is-floated-left text-style-label-bold">{this.props.nutrient}</span>
                </div>
            </div>
        )
    }
}

export default NutrientBar