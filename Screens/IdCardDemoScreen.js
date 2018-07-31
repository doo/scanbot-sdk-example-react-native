import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Button,
  View,
  ScrollView,
  Image,
  Text,
  FlatList
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import ScanbotSDK, { Page, MrzRecognitionResult } from 'react-native-scanbot-sdk';

const Side = { front: 'front', back: 'back' };
Object.freeze(Side);

export default class IdCardDemoScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      spinnerVisible: false,
      frontImagePage: null,
      backImagePage: null,
      mrzData: []
    };
  }

  render() {
    return (
        <ScrollView onLayout={this.onLayout}>

          <Spinner visible={this.state.spinnerVisible}
                   textContent={"Recognizing ..."}
                   textStyle={{color: '#FFF'}}
                   cancelable={false} />

          <Text style={styles.instructions}>
            Please scan both sides of your ID Card.
          </Text>

          <View style={styles.container}>
            {this.renderFrontImage()}
          </View>
          {this.renderEditButtons(Side.front)}

          <View style={styles.container}>
            {this.renderBackImage()}
          </View>
          {this.renderEditButtons(Side.back)}

          <View style={styles.container}>
            {this.renderMrzData()}
          </View>

        </ScrollView>
    );
  }

  onLayout = evt => {
    const {width} = evt.nativeEvent.layout;
    this.setState({width});
  };

  renderFrontImage() {
    let {frontImagePage} = this.state;
    if (frontImagePage) {
      return <Image
          style={styles.documentImage}
          source={{uri: frontImagePage.documentPreviewImageFileUri}}
      />;
    } else {
      return (
          <View style={styles.imagePlaceholder}>
            <Button
                onPress={() => this.scanIdCardSide(Side.front)}
                style={styles.scanButton}
                title="1. Scan the FRONT SIDE" />
          </View>
      );
    }
  }

  renderBackImage() {
    let {backImagePage} = this.state;
    if (backImagePage) {
      return <Image
          style={styles.documentImage}
          source={{uri: backImagePage.documentPreviewImageFileUri}}
      />;
    } else {
      return (
          <View style={styles.imagePlaceholder}>
            <Button
                onPress={() => this.scanIdCardSide(Side.back)}
                style={styles.scanButton}
                title="2. Scan the BACK SIDE" />
          </View>
      );
    }
  }

  renderEditButtons(side: Side) {
    let page = (side === Side.front ? this.state.frontImagePage : this.state.backImagePage);
    if (page) {
      return (
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 10}}>
            <Button
                title="Re-Scan"
                onPress={() => this.scanIdCardSide(side)} />
            <Button
                title="Re-Crop"
                onPress={() => this.startCropping(page, side)} />
          </View>
      );
    }
  }

  renderMrzData() {
    let {mrzData} = this.state;
    if (mrzData && mrzData.length > 0) {
      return (
          <View style={styles.container}>
            <FlatList
                data={mrzData}
                renderItem={({item}) => <Text style={styles.mrzFieldItem}>{item.key}: {item.value}</Text>}
            />
          </View>
      );
    }
  }

  scanIdCardSide = async (side: Side) => {
    const result = await this.startSinglePageDocumentScanner();
    if (result.status === "OK") {
      let page = result.pages[0];
      if (side === Side.front) {
        this.setState({ frontImagePage: page });
      }
      else if (side === Side.back) {
        this.setState({ backImagePage: page });
        // run MRZ rocognition on back side image
        await this.recognizeMrz(page);
      }
    }
  };

  startSinglePageDocumentScanner = async () => {
    return await ScanbotSDK.UI.startDocumentScanner({
      autoSnappingEnabled: false,
      autoSnappingButtonHidden: true,
      multiPageButtonHidden: true,
      multiPageEnabled: false,
      flashEnabled: false,
      flashButtonHidden: true
    });
  };

  recognizeMrz = async (page: Page) => {
    try {
      this.showSpinner();
      const result = await ScanbotSDK.recognizeMrz(page.documentImageFileUri);
      console.log("MRZ result: " + JSON.stringify(result));
      if (result && result.fields && result.fields.length > 0) {
        this.setState({ mrzData: this.prepareMrzData(result) });
      } else {
        this.delayedAlert("Info", "No MRZ data recognized.\nPlease re-scan or re-crop the back side of the ID Card.");
      }
    } finally {
      this.hideSpinner();
    }
  };

  prepareMrzData(mrzResult: MrzRecognitionResult) {
    let mrzData = [];

    if (mrzResult) {
      mrzData.push({key: "recognitionSuccessful", value: ""+mrzResult.recognitionSuccessful});
      mrzData.push({key: "documentType", value: mrzResult.documentType});
      mrzData.push({key: "checkDigitsCount", value: mrzResult.checkDigitsCount});
      mrzData.push({key: "validCheckDigitsCount", value: mrzResult.validCheckDigitsCount});

      // get the fields
      if (mrzResult.fields && mrzResult.fields.length > 0) {
        mrzResult.fields.forEach((item, index) => {
          mrzData.push({key: item.name, value: item.value}); // item.confidence
        });
      }
    }

    return mrzData;
  }

  startCropping = async (page: Page, side: Side) => {
    const result = await ScanbotSDK.UI.startCroppingScreen(page, {});
    if (result.status === "OK") {
      let page = result.page;
      if (side === Side.front) {
        this.setState({ frontImagePage: page });
      }
      else if (side === Side.back) {
        this.setState({ backImagePage: page });
        // re-run MRZ rocognition on back side image
        await this.recognizeMrz(page);
      }
    }
  };

  showSpinner() {
    this.setState({spinnerVisible: true});
  }

  hideSpinner() {
    this.setState({spinnerVisible: false});
  }

  delayedAlert(title: string, message: string) {
    setTimeout(() => {Alert.alert(title, message);}, 500);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
    margin: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 200,
    margin: 10,
    borderRadius:10,
    backgroundColor: 'blue'
  },
  scanButton: {
    color: '#fff'
  },
  documentImage: {
    width: 300,
    height: 300,
    resizeMode: Image.resizeMode.contain,
  },
  mrzFieldItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

});
