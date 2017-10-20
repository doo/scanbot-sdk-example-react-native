import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import { ScanbotCameraView } from 'react-native-scanbot-sdk';
import { DemoConstants } from '.';

export default class ScanbotCameraDemoScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      spinnerVisible: false
    };

    this.textResBundle = {
      autosnapping_hint_do_not_move: "Don't move",
      autosnapping_hint_move_closer: "Move closer",
      autosnapping_hint_bad_angles: "Perspective",
      autosnapping_hint_nothing_detected: "No document",
      autosnapping_hint_too_noisy: "Background too noisy",
      autosnapping_hint_too_dark: "Poor light"
    };
  }

  render() {
    return (
        <View style={styles.container}>
          <Spinner visible={this.state.spinnerVisible}
                   textContent={"Processing image..."}
                   textStyle={{color: '#FFF'}}
                   cancelable={false} />
          <ScanbotCameraView
              style={styles.container}
              autoSnappingEnabled='true'
              autoSnappingSensitivity={0.5}
              imageCompressionQuality={DemoConstants.JPG_QUALITY}
              edgeColor={'#0000ff'}
              onStartCapturingImage={this.onStartCapturingImage.bind(this)}
              onImageCaptured={this.onImageCaptured.bind(this)}
              onDocumentImageCaptured={this.onDocumentImageCaptured.bind(this)}
              textResBundle={this.textResBundle} />
        </View>
    );
  }

  onImageCaptured(event: Event) {
    this.setState({
      spinnerVisible: false
    });

    if (this.props.onImageCaptured) {
      this.props.onImageCaptured(event);
    }
  }

  onDocumentImageCaptured(event: Event) {
    this.setState({
      spinnerVisible: false
    });

    if (this.props.onDocumentImageCaptured) {
      this.props.onDocumentImageCaptured(event);
    }
  }

  onStartCapturingImage(event: Event) {
    this.setState({
      spinnerVisible: true
    });
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
