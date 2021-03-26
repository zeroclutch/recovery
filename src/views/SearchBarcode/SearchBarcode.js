// <input accept=”image/*” id=”icon-button-file” type=”file” capture=”environment”/>
// https://medium.com/99xtechnology/how-to-access-the-camera-of-a-mobile-device-using-react-progressive-web-app-pwa-9d77168e5f2d

import React, { useState, useRef } from "react";
import ReactDom from 'react-dom'
import { useHistory } from "react-router-dom";
import { Camera } from "react-camera-pro";
import Header from "../../components/Header/Header";
import ConfirmAddItem from "../../components/ConfirmAddItem/ConfirmAddItem";


import './SearchBarcode.scss'

class SearchBarcode extends React.Component {
  constructor (props) {
    super(props)
    this.camera = React.createRef()
    this.box = React.createRef()
    this.image = React.createRef()

    this.state = {
      numberOfCameras: 0,
      mode: 'camera',
      image: 'false',
      originalImage: 'false',
      // Stuff for confirmItem
      confirmingItem: false,
      data: null,
      confirmed: false
    }

    this.handleConfirm = this.handleConfirm.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  setNumberOfCameras(numberOfCameras) {
    this.setState({numberOfCameras})
  }

  truncateImageData(data) {
    return data.substring(data.indexOf(',') + 1, data.length)
  }

  async setImage(base64) {
    // hide
    this.setState({ mode: 'image' })
    this.setState({ originalImage: base64 })
    this.setState({ image: await this.getCroppedImage(base64) })
  }

  resetImage() {
    // hide video
    this.setState({ mode: 'camera' })
    this.setState({ image: false })
  }

  getImageDimensions(file) {
    return new Promise (function (resolve, reject) {
      const i = new Image()
      i.onload = function(){
        resolve({
          width: window.innerWidth,
          height: window.innerWidth * 16/9,
          naturalWidth: i.naturalWidth,
          naturalHeight: i.naturalHeight,
          i
        })
      };
      i.src = file
    })
  }

  cropImage(image, dimensions) {
    // create a canvas that will present the output image
    const canvas = document.createElement("canvas");

    // set it to the same size as the image
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // draw our image at position 0, 0 on the canvas
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, -dimensions.x, -dimensions.y);
    return canvas.toDataURL('image/jpeg')
  }

  async getCroppedImage(data) {
    //this.image.current.forceUpdate()
    let image = await this.getImageDimensions(data)
    
    let box = this.box.current
    
    const cY = image.naturalHeight / image.height
    if (box) {
      const width =  Math.floor(image.naturalWidth * 0.8)
      const height = Math.floor(width * 3/4)
      const x = Math.floor((image.naturalWidth - width) / 2)
      const y = Math.floor((((window.innerHeight - 72) - height) / 2) * cY)
      const dimensions = {
        x, y, height, width
      }
      return this.cropImage(image.i, dimensions)
    } else {
      return { x: 0, y: 0, height: document.body.height, width: document.body.width}
   }
  }

  sendImage() {
    fetch(process.env.REACT_APP_API_ENDPOINT + '/item/barcode', {
      method: 'POST', 
      body: JSON.stringify({
        image: this.truncateImageData(this.state.image),
        dimensions: {
          x: 0,
          y: 0,
          width: 999,
          height: 999
        }
      }),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(async res => {
      console.log(res.status)
      if(res.status === 400) {
        throw new Error(await res.text())
      }
      return res.json()
    })
    .then(data => this.setState({
      data,
      confirmingItem: true
    }))
    .catch(err => {
      console.log(err)
      if(err.message.includes('400 Bad Request')) {
        alert('Barcode not detected. Be sure to align the barcode within the box.')
      } else {
        alert('There appears to be an error with our server. Please try again later.')
      }
    })
  }

  
  handleConfirm(e) {
    this.props.handleProductChange(this.state.data)
    this.setState({
      confirmingItem: false,
      mode: 'camera'
    })
    console.log(this.props.history)
  }

  handleCancel(e) {
    this.setState({
      confirmingItem: false,
      mode: 'camera'
    })
  }
  

  render() {
    console.log(this.state.data, this.state.confirmingItem)
    return (
      <div class="search-barcode">
        <Header left="Cancel" leftLink="/home" right=" " title="Scan Barcode"></Header>

        <img src={this.state.originalImage} ref={this.image} class="image-preview" alt='Result of scan' hidden={this.state.mode !== 'image'} />
        <Camera ref={this.camera} facingMode='environment' aspectRatio={9/16} hidden={this.state.mode !== 'camera'} />
        <div class="overlay">
          <div ref={this.box} class="overlay-box"></div>
        </div>

        {/* During Camera operation */}
        <div class="overlay-bottom has-text-centered" hidden={this.state.mode !== 'camera'}>
          <button 
          className='button flip-button is-primary is-inverted is-large m-4'
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
        {this.state.confirmingItem && this.state.data != null && <ConfirmAddItem productData={this.state.data["product"]} handleConfirm={this.handleConfirm} handleCancel={this.handleCancel}></ConfirmAddItem>}
      </div>
    )
  }
}

export default SearchBarcode;