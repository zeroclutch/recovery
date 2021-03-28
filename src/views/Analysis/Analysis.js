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
    // Object.keys(this.props.initalUserNutriments).forEach(function(key) {
    //   nutrients.push(this.props.initalUserNutriments[key])
    // })
    // let nutrients = []
    return (
      <div className="Analysis">
        <Header title="Analysis" left=" " right=" "></Header>
        <div class="analysis-card m-4 is-cleared-both">
            <div class="analysis-card-header px-5 py-4">
                <div class="has-text-black is-size-3 has-text-weight-bold">Nutrient Progress</div>
                {
                  this.props.userInitialNutriments ?
                    Object.keys(this.props.userInitialNutriments).map((nutrient) => {
                      // console.log(nutrient)
                      let nutrient_name = nutrient.substring(0, nutrient.lastIndexOf("_"))
                      nutrient_name = nutrient_name.split('_').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ')
                      const { max, min, unit } = this.props.userInitialNutriments[nutrient]
                      var minCompleted = 0, maxCompleted = 0
                      if(this.props.userNutriments) {
                        // console.log(min, min_remaining, this.props.userNutriments[nutrient])
                        minCompleted = min - this.props.userNutriments[nutrient]["min"]
                        maxCompleted = (max || 0) - (this.props.userNutriments[nutrient]["max"] || 0)
                        if(minCompleted % 1 !== 0) minCompleted = minCompleted.toFixed(1)
                        // console.log(minCompleted, maxCompleted)
                      }
                      let goal = (this.props.userInitialNutriments[nutrient]["min"] % 1 == 0) ? this.props.userInitialNutriments[nutrient]["min"] : this.props.userInitialNutriments[nutrient]["min"].toFixed(1)
                      // if(min % 1 != 0) goamin.toFixed(1)
                      return <NutrientBar key={nutrient_name} completed={minCompleted} total={goal} unit={unit} nutrient={nutrient_name} />
                    })
                   : <NutrientBar completed={0} total={1} unit={"g"} nutrient={"N/A"} />
                  }
                {/* <NutrientBar completed={300} total={this.props.userInitialNutriments["calories_remaining"]} unit="mg" nutrient="Calories" />
                <NutrientBar completed={100} total={124} unit="mcg" nutrient="Calcium" />
                <NutrientBar completed={20} total={50} unit="g" nutrient="Vitamin C" />
                <NutrientBar completed={40} total={11} unit=" cups" nutrient="Water" /> */}
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

        {/* This should link back to /home 
            If you want to change to just a customlink we customize, we can change this.
        */}
        <Link to="/home"><ButtonAddItem textOverride="Go back to adding items"/></Link>
      </div>
    )
  }
}

export default Analysis
