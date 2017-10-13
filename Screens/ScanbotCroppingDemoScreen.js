import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  View,
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import { ScanbotCroppingView } from 'react-native-scanbot-sdk';
import { DemoConstants } from '.';

export default class ScanbotCroppingDemoScreen extends Component {

  constructor() {
    super();

    this.croppingView = null;
    this.state = {
      spinnerVisible: false
    };
  }

  render() {
    return (
        <View style={styles.container}>
          <Spinner visible={this.state.spinnerVisible}
                   textContent={"Processing image..."}
                   textStyle={{color: '#FFF'}}
                   cancelable={false} />
          <Button onPress={this.applyChangesButtonTapped.bind(this)} title="Save" />
          <ScanbotCroppingView
              ref={view => this.croppingView = view}
              style={styles.container}
              imageFileUri={this.props.imageFileUri}
              imageCompressionQuality={DemoConstants.JPG_QUALITY}
              edgeColor={'#0000ff'}
              onChangesAppliedWithPolygon={this.props.onChangesAppliedWithPolygon}
              onChangesCanceled={this.props.onChangesCanceled} />
          <Button onPress={this.rotateButtonTapped.bind(this)} title="Rotate" />
        </View>
    );
  }

  applyChangesButtonTapped() {
    this.setState({
      spinnerVisible: true
    });
    this.croppingView.applyCroppingChanges();
  }

  rotateButtonTapped() {
    this.croppingView.rotateImageClockwise();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
