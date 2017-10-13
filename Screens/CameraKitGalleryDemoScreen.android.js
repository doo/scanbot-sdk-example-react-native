import React, {Component} from 'react';

import {
  CameraKitGalleryView
} from 'react-native-camera-kit';

export default class CameraKitGalleryDemoScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      album: this.props.albumName,
      images: {},
      shouldRenderCameraScreen: false
    }
  }

  render() {
    return (
        <CameraKitGalleryView
            ref={(gallery) => {
              this.gallery = gallery;
            }}
            style={{flex:1, margin: 0, backgroundColor: '#ffffff', marginTop: 50}}
            albumName={this.state.album}
            minimumInteritemSpacing={10}
            minimumLineSpacing={10}
            columnCount={3}
            selectedImages={Object.keys(this.state.images)}
            onSelected={(result) => {
            }}
            onTapImage={this.onTapImage.bind(this)}
            selection={{
              //selectedImage: require('../images/selected.png'),
              imagePosition: 'bottom-right',
              imageSizeAndroid: 'large',
              enable: (Object.keys(this.state.images).length < 3)
            }}
            fileTypeSupport={{
              supportedFileTypes: ['image/jpeg'],
              unsupportedOverlayColor: "#00000055",
              //unsupportedImage: require('../images/unsupportedImage.png'),
              //unsupportedText: 'JPEG!!',
              unsupportedTextColor: '#ff0000'
            }}
            customButtonStyle={{
              //image: require('../images/openCamera.png'),
              backgroundColor: '#06c4e9'
            }}
            onCustomButtonPress={() => this.setState({shouldRenderCameraScreen: true})}
        />
    )
  }

  onTapImage(event) {
    const imageUri = event.nativeEvent.selected;
    console.log('Tapped on an image: ' + imageUri);

    if (this.props.onImageSelected) {
      this.props.onImageSelected(imageUri);
    }
  }

}