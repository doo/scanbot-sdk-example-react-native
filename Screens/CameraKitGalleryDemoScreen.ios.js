import React, {Component} from 'react';
import { View } from 'react-native';

import {
  CameraKitGalleryView,
  CameraKitGallery
} from 'react-native-camera-kit';

export default class CameraKitGalleryDemoScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      album: this.props.albumName,
      presentedImage: undefined,
      selectedImages: [],
      showPresentedImage: false
    }
  }

  render() {
    return (
        <View style={{flex: 1}}>
          <CameraKitGalleryView
              style={{flex:1, margin: 0, marginTop: 50}}
              albumName={this.state.album}
              minimumInteritemSpacing={10}
              minimumLineSpacing={10}
              columnCount={3}
              selection={{
                //selectedImage: require('../images/hugging.png'),
                imagePosition: 'top-right',
              }}
              onTapImage={event => this.onTapImage(event)}
              remoteDownloadIndicatorType={'progress-pie'} //spinner / progress-bar / progress-pie
              remoteDownloadIndicatorColor={'white'}
          />
        </View>
    )
  }

  async onTapImage(event) {
    const image = await CameraKitGallery.getImageForTapEvent(event.nativeEvent);
    console.log('Tapped on an image: ' + image.imageUri);

    if (this.props.onImageSelected) {
      this.props.onImageSelected(image.imageUri);
    }
  }

}