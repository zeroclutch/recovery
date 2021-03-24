// <input accept=”image/*” id=”icon-button-file” type=”file” capture=”environment”/>
// https://medium.com/99xtechnology/how-to-access-the-camera-of-a-mobile-device-using-react-progressive-web-app-pwa-9d77168e5f2d

import Camera from 'react-html5-camera-photo';

function SearchBarcode(props) {
    function handleTakePhoto (dataUri) {
        // Do stuff with the photo...
        console.log('takePhoto');
      }
     
      return (
        <Camera
          onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
        />
      );
}

export default SearchBarcode;