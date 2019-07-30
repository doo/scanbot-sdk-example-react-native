import React, { Component } from 'react';
import { Alert, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { Button, Container, Content, Text, Footer, Right, Left } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import ScanbotSDK, { Page } from "react-native-scanbot-sdk";

import {
  ScannedPagesState,
  ACTION_ADD_PAGES,
  ACTION_REMOVE_ALL_PAGES, ACTION_REMOVE_PAGE, ACTION_UPDATE_OR_ADD_PAGE
} from '../ScannedPagesStore';


const mapStateToProps = (state: ScannedPagesState) => {
  return {
    scannedPages: state.pages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addScannedPages: (pages: Page[]) => dispatch({ type: ACTION_ADD_PAGES, pages: pages }),
    removeAllScannedPages: () => dispatch({ type: ACTION_REMOVE_ALL_PAGES }),
    removeScannedPage: (page: Page) => dispatch({ type: ACTION_REMOVE_PAGE, page: page }),
    updateScannedPage: (page: Page) => dispatch({ type: ACTION_UPDATE_OR_ADD_PAGE, page: page }),
  };
};


class ImageResultsScreen extends Component {
  static navigationOptions = {
    title: 'Image Results',
  };

  constructor(props) {
    super(props);

    this.state = {
      spinnerVisible: false,
    };
  }

  componentDidMount() {
    //
  }

  render() {
    const {scannedPages} = this.props;
    return (
        <Container>
          <Content>
            <Spinner visible={this.state.spinnerVisible}
                     textContent={'Processing ...'}
                     textStyle={{color: '#FFF'}}
                     cancelable={false} />
            <View style={styles.content}>
              {this.renderThumbnails(scannedPages)}
            </View>
          </Content>
          <Footer>
            <Left>
              <Button transparent onPress={this.saveAsPdfButtonTapped}>
                <Text>Save as PDF</Text>
              </Button>
            </Left>
            <Left>
              <Button transparent onPress={this.saveAsTiffButtonTapped}>
                <Text>Save as TIFF</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={this.deleteAllButtonTapped}>
                <Text>Delete All</Text>
              </Button>
            </Right>
          </Footer>
        </Container>
    );
  }

  renderThumbnails(pages: Page[]) {
    if (pages) {
      return pages.map((p, i) =>
          <TouchableOpacity key={i} onPress={() => this.gotoImageView(p)}>
            <Image style={styles.galleryImage} source={{uri: `${p.documentPreviewImageFileUri}?${Date.now()}`}} />
          </TouchableOpacity>);
    }
  }

  showSpinner() {
    this.setState({spinnerVisible: true});
  }

  hideSpinner() {
    this.setState({spinnerVisible: false});
  }

  gotoImageView = (page: Page) => {
    this.props.navigation.push('ImageView', {page: page});
  };

  saveAsPdfButtonTapped = async () => {
    // if (!(await ScanbotSDK.isLicenseValid())) { return; } // TODO
    if (!this.checkImages()) { return; }

    const {scannedPages} = this.props;
    this.showSpinner();
    try {
      const imageUris = scannedPages.map(p => p.documentImageFileUri || p.originalImageFileUri);
      const result = await ScanbotSDK.createPDF(imageUris, 'FIXED_A4');
      this.showAlert('PDF file created', result.pdfFileUri, true);
    } finally {
      this.hideSpinner();
    }
  };

  saveAsTiffButtonTapped = async () => {
    // if (!(await ScanbotSDK.isLicenseValid())) { return; } // TODO
    if (!this.checkImages()) { return; }

    const {scannedPages} = this.props;
    this.showSpinner();
    try {
      const imageUris = scannedPages.map(p => p.documentImageFileUri || p.originalImageFileUri);
      const result = await ScanbotSDK.writeTIFF(imageUris, {oneBitEncoded: true});
      this.showAlert('TIFF file created', result.tiffFileUri, true);
    } finally {
      this.hideSpinner();
    }
  };

  deleteAllButtonTapped = async () => {
    this.props.removeAllScannedPages();
    await ScanbotSDK.cleanup();
  };

  checkImages(): boolean {
    const {scannedPages} = this.props;
    if (scannedPages.length > 0) {
      return true;
    }
    this.showAlert('Info', 'Please scan some images via Document Scanner or import from Photo Library.');
    return false;
  }

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
    flexWrap: 'wrap',
    flexDirection: 'row',
    margin: 10,
  },
  galleryImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    margin: 10,
  },
  spinner: {
    flex: 1,
    alignSelf: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ImageResultsScreen);
