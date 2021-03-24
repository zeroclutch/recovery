import React, { Component } from 'react';
import './FoodCard.scss'

function FoodCard(props) {
    return (
        <div class="food-card m-4">
            <div class="food-card-header px-5 py-4">
                    <div class="clear-both pb-2">
                        <span class="food-card-food-calories ">{props.calories || '380 cal.'}</span>
                        <span class="food-card-food-name ">{props.name || 'Strawberry Cheesecake'}</span>
                        
                    </div>
                    <div class="clear-both">
                        <span class="tag px-5 is-floated-right food-card-score-tag is-medium is-success is-light">
                            {props.nova || '5 NOVA'}
                        </span>
                        <span class="tag px-5 food-card-score-tag is-medium is-danger is-light">
                            {props.nutriScore || '5 Nutri-Score'}
                        </span>
                    </div>
            </div>
        </div>
    )
}

export default FoodCard;