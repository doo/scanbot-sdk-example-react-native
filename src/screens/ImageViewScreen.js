import React, { Component } from 'react';
import { Image, StyleSheet, View, Dimensions, Alert } from 'react-native';
import { Container, Content, Text, Footer, Button, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ScanbotSDK, { Page } from "react-native-scanbot-sdk";

import {
  ScannedPagesState,
  ACTION_REMOVE_PAGE,
  ACTION_UPDATE_OR_ADD_PAGE
} from '../ScannedPagesStore';


const mapStateToProps = (state: ScannedPagesState) => {
  return {
    scannedPages: state.pages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeScannedPage: (page: Page) => dispatch({ type: ACTION_REMOVE_PAGE, page: page }),
    updateScannedPage: (page: Page) => dispatch({ type: ACTION_UPDATE_OR_ADD_PAGE, page: page }),
  };
};


class ImageViewScreen extends Component {
  static navigationOptions = {
    title: 'Image View',
  };

  constructor(props) {
    super(props);

    this.state = {
      page: this.props.navigation.getParam('page'),
      spinnerVisible: false
    };
  }

  componentDidMount() {
    //
  }

  render() {
    const {page} = this.state;
    return (
        <Container>
          <Content>
            <Spinner visible={this.state.spinnerVisible}
                     textContent={'Processing ...'}
                     textStyle={{color: '#FFF'}}
                     cancelable={false} />
            <View style={styles.content}>
              {/*<Text>Page ID: {page.pageId}</Text>*/}
              <Image source={{uri: `${page.documentPreviewImageFileUri}?${Date.now()}`}} style={styles.documentImage} />
            </View>
          </Content>
          <Footer>
            <Left>
              <Button transparent onPress={this.cropButtonTapped}>
                <Text>Crop</Text>
              </Button>
            </Left>
            <Left>
              <Button transparent onPress={this.gotoImageFilterScreen}>
                <Text>Filter</Text>
              </Button>
            </Left>
            <Left>
              <Button transparent onPress={this.performOcrButtonTapped}>
                <Text>OCR</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={this.deleteButtonTapped}>
                <Text>Delete</Text>
              </Button>
            </Right>
          </Footer>
        </Container>
    );
  }

  showSpinner() {
    this.setState({spinnerVisible: true});
  }

  hideSpinner() {
    this.setState({spinnerVisible: false});
  }

  cropButtonTapped = async () => {
    const {page} = this.state;
    const result = await ScanbotSDK.UI.startCroppingScreen(page, {
      doneButtonTitle: 'Apply',
      topBarBackgroundColor: '#b30127'
    });

    if (result.status === 'OK') {
      this.setState({page: result.page});
      this.props.updateScannedPage(result.page);
    }
  };

  performOcrButtonTapped = async () => {
    // if (!(await ScanbotSDK.isLicenseValid())) { return; } // TODO

    const {page} = this.state;
    this.showSpinner();
    try {
      const imageUris = [page.documentImageFileUri || page.originalImageFileUri];
      const result = await ScanbotSDK.performOCR(imageUris, ['en', 'de'], {outputFormat: 'PLAIN_TEXT'}); // TODO add example of outputFormat: RESULT_JSON
      this.showAlert('OCR Result', result.plainText, true);
    } finally {
      this.hideSpinner();
    }
  };

  deleteButtonTapped = async () => {
    const {page} = this.state;
    this.props.removeScannedPage(page);
    await ScanbotSDK.removePage(page);
    this.gotoImageResults();
  };

  gotoImageFilterScreen = async () => {
    const {page} = this.state;
    // this.props.navigation.push('ImageFilter', {page: page});
    this.props.navigation.navigate('ImageFilter', {page: page});
  };

  gotoImageResults = () => {
    this.props.navigation.pop();
  };

  showAlert(title: string, message: string, delayed: boolean = false) {
    if (delayed) {
      setTimeout(() => {Alert.alert(title, message);}, 200);
    } else {
      Alert.alert(title, message);
    }
  }

}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  documentImage: {
    flex: 1,
    width: (Dimensions.get('window').width - 20),
    height: (Dimensions.get('window').height / 2),
    resizeMode: 'contain',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageViewScreen);
