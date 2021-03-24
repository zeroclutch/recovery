import React from 'react'
import { Link } from 'react-router-dom'
// import logo from './logo.svg'
import './Analysis.scss'
import Header from '../../components/Header/Header'
import NutrientBar from '../../components/NutrientBar/NutrientBar'
import ButtonAddItem from '../../components/ButtonAddItem/ButtonAddItem'

class Analysis extends React.Component {
  constructor(props) {
      super(props)
  }
  render() {
    return (
      <div className="Analysis">
        <Header title="Analysis"></Header>
        <div class="analysis-card m-4 is-cleared-both">
            <div class="analysis-card-header px-5 py-4">
                <div class="has-text-black is-size-3 has-text-weight-bold">Nutrient Progress</div>
                <NutrientBar completed={300} total={200} unit="mg" nutrient="Calories" />
                <NutrientBar completed={100} total={124} unit="mcg" nutrient="Calcium" />
                <NutrientBar completed={20} total={50} unit="g" nutrient="Vitamin C" />
                <NutrientBar completed={40} total={11} unit=" cups" nutrient="Water" />
                <div class="has-text-black is-size-3 has-text-weight-bold py-3">Your meals</div>
                <div class="is-cleared-both">
                  <span class="tag-wrapper  is-floated-right">
                    <span class="tag px-5 food-card-score-tag is-medium is-success is-light">
                        2 NOVA
                    </span>
                    <br />
                    <div class="has-text-centered">
                      <span class="text-style-label-bold has-text-centered">Healthy!</span>
                    </div>
                  </span>
                  <span class="tag-wrapper is-floated-left">
                    <span class="tag px-5 food-card-score-tag is-medium is-danger is-light">
                        A Nutri-Score
                    </span>
                    <br />
                    <div class="has-text-centered">
                      <span class="text-style-label-bold has-text-centered">Healthy!</span>
                    </div>
                  </span>
                </div>
                <div class="is-cleared-both"></div>
            </div>
        </div>

        {/* This should link back to /home */}
        <ButtonAddItem />
      </div>
    )
  }
}

export default Analysis
