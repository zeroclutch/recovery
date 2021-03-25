// <input accept=”image/*” id=”icon-button-file” type=”file” capture=”environment”/>
// https://medium.com/99xtechnology/how-to-access-the-camera-of-a-mobile-device-using-react-progressive-web-app-pwa-9d77168e5f2d

import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import Header from "../../components/Header/Header";


import './SearchBarcode.scss'

class SearchBarcode extends React.Component {
  constructor (props) {
    super(props)
    this.camera = React.createRef()
    this.box = React.createRef()

    this.state = {
      numberOfCameras: 0,
      mode: 'camera',
      image: false,
      boundingBox: false
    }
  }

  setNumberOfCameras(numberOfCameras) {
    this.setState({numberOfCameras})
  }

  truncateImageData(data) {
    return data.substring(data.indexOf(',') + 1, data.length)
  }

  setImage(base64) {
    // hide video
    this.getBoundingBox()
    this.setState({ mode: 'image' })
    this.setState({ image: base64 })
    this.setState({ boundingBox: this.getBoundingBox() })
  }

  resetImage() {
    // hide video
    this.setState({ mode: 'camera' })
    this.setState({ image: false })
  }

  getBoundingBox() {
    let element = document.querySelector('.overlay-box')
    if (element) {
      let styles = getComputedStyle(element)
      return {
        x: parseInt(styles.left),
        y: parseInt(styles.top)-72,
        height: parseInt(styles.height),
        width: parseInt(styles.width)
      }
    } else {
      return { x: 0, y: 0, height: document.body.height, width: document.body.width}
    }
  }

  sendImage() {
    fetch(process.env.REACT_APP_API_ENDPOINT + '/item/barcode', {
      method: 'POST', 
      body: JSON.stringify({
        image: this.truncateImageData(this.state.image),
        dimensions: this.state.boundingBox
      }),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(this.handleItemConfirmation)
    .catch(err => {
      if(err.code === 400) {
        alert('Barcode not detected. Be sure to align the barcode within the box.')
      } else {
        alert('There appears to be an error with our server. Please try again later.')
      }
    })
  }

  handleItemConfirmation(item) {
    console.log(item)
  }

  render() {
    return (
      <div class="search-barcode">
        <Header left="Cancel" left-link="/home" right=" " title="Scan Barcode"></Header>

        <img src={this.state.image} class="image-preview" alt='Result of scan' hidden={this.state.mode !== 'image'} />
        <Camera ref={this.camera} facingMode='environment' aspectRatio={9/16} hidden={this.state.mode !== 'camera'} />
        <div class="overlay">
          <div ref="box" class="overlay-box"></div>
        </div>

        {/* During Camera operation */}
        <div class="overlay-bottom has-text-centered" hidden={this.state.mode !== 'camera'}>
          <button 
          className='button flip-button is-primary is-large m-4'
            hidden={this.numberOfCameras < 1}
            onClick={() => {
              this.camera.current.switchCamera();
            }}
          >Flip</button>
          <button
          className='button photo-button is-primary is-large m-4'
            onClick={() => {
                this.setImage(this.camera.current.takePhoto());
            }}
          >Scan</button>
        </div>

        {/* After Camera operation */}
        <div class="overlay-bottom has-text-centered" hidden={this.state.mode !== 'image'}>
          <button
          className='button photo-button is-danger is-large m-4'
            onClick={() => {
              this.resetImage()
            }}
          >Retake Image</button>
          <button 
          className='button flip-button is-success is-large m-4'
            hidden={this.numberOfCameras < 1}
            onClick={() => {
              this.sendImage();
            }}
          >Scan Item</button>
        </div>
      </div>
    )
  }
}

export default SearchBarcode;