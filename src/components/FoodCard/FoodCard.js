import React, { Component, useEffect, useState } from 'react';
import './FoodCard.scss'

function FoodCard(props) {
    const [isDeleting, setIsDeleting] = useState(false)

    function handleDeleteClick(e) {
        props.handleDeleteItem(props.index)
    }

    function handleClick(e) {
        if(props.handleSelectItem) props.handleSelectItem(e)
        if(props.isDeletable) setIsDeleting(!isDeleting)
    }

    function toSentenceCase(str) {
        return str.split(' ').map((part, index) => {
            const LOWERCASE_WORDS = ["as", "at", "by", "for", "in", "of", "off", "on", "per", "to", "up", "via", "and", "but",  "if", "nor", "or", "so", "yet", "a", "an", "the"]
            part = part.toLowerCase()
            if(!LOWERCASE_WORDS.includes(part) || index === 0) {
                part = part.charAt(0).toUpperCase() + part.slice(1)
            }
            return part
        }).join(' ')
    }

    return (
        <div class={`food-card-wrapper p-0 ${isDeleting ? 'is-deleting' : 'is-not-deleting'}`}>
            <div class={`food-card`} onClick={handleClick}>
                <div class="food-card-header px-5 py-4">
                        <div class="clear-both pb-2">
                            <span class="food-card-food-calories ">{props.calories || '-- Cal.'}</span>
                            <span class="food-card-food-name ">{toSentenceCase(props.name) || 'Food Item'}</span>
                        </div>
                        <div class="clear-both">
                            <span class="tag px-5 is-floated-right food-card-score-tag is-medium is-success is-light">
                                {props.nova || '-- NOVA'}
                            </span>
                            <span class="tag px-5 food-card-score-tag is-medium is-info is-light">
                                {props.nutriScore || '-- Nutri-Score'}
                            </span>
                        </div>
                </div>
            </div>
            <div class="food-delete-button" onClick={handleDeleteClick}><span>Delete</span></div>
        </div>
    )
}

export default FoodCard;