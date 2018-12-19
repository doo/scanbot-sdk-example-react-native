import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Picker
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import ScanbotSDK, { Page, ImageFilter } from 'react-native-scanbot-sdk';


export default class ImageFilterDemoScreen extends Component {

  static navigatorButtons = {
    rightButtons: [
      {
        title: 'Apply',
        id: 'apply',
        buttonFontSize: 14,
        buttonFontWeight: '600'
      }
    ]
  };

  constructor(props) {
    super(props);

    this.state = {
      spinnerVisible: false,
      filteredPreviewUri: null,
      selectedImageFilter: (this.props.page.filter || "NONE")
    };

    this.props.navigator.setOnNavigatorEvent(evt => {
      switch (evt.id) {
        case 'willAppear':
          this.showFilteredDocumentPreviewUri(this.props.page.filter);
          break;
        case 'apply':
          this.applyImageFilterButtonTapped();
          break;
      }
    });
  }

  render() {
    return (
        <ScrollView onLayout={this.onLayout}>

          <Spinner visible={this.state.spinnerVisible}
                   textContent={"Processing ..."}
                   textStyle={{color: '#FFF'}}
                   cancelable={false} />

          <View style={styles.container}>
            {this.renderDocumentImage()}
          </View>

          <Picker
              selectedValue={this.state.selectedImageFilter}
              style={styles.filterPicker}
              onValueChange={(itemValue, itemIndex) => this.showFilteredDocumentPreviewUri(itemValue)}>
            <Picker.Item label="NONE" value="NONE" />
            <Picker.Item label="COLOR_ENHANCED" value="COLOR_ENHANCED" />
            <Picker.Item label="GRAYSCALE" value="GRAYSCALE" />
            <Picker.Item label="BINARIZED" value="BINARIZED" />
            <Picker.Item label="COLOR_DOCUMENT" value="COLOR_DOCUMENT" />
            <Picker.Item label="PURE_BINARIZED" value="PURE_BINARIZED" />
            <Picker.Item label="BACKGROUND_CLEAN" value="BACKGROUND_CLEAN" />
            <Picker.Item label="BLACK_AND_WHITE" value="BLACK_AND_WHITE" />
          </Picker>

        </ScrollView>
    );
  }

  onLayout = evt => {
    const {width} = evt.nativeEvent.layout;
    this.setState({width});
  };

  applyImageFilterButtonTapped = async () => {
    this.showSpinner();
    try {
      const updatedPage = await ScanbotSDK.applyImageFilterOnPage(this.props.page, this.state.selectedImageFilter);
      await this.props.onImageFilterApplied(updatedPage);
    } finally {
      this.hideSpinner();
    }
  };

  showFilteredDocumentPreviewUri = async (filter: ImageFilter) => {
    this.setState({selectedImageFilter: filter});
    this.showSpinner();
    try {
      const uri = await ScanbotSDK.getFilteredDocumentPreviewUri(this.props.page, filter);
      this.setState({filteredPreviewUri: uri})
    } finally {
      this.hideSpinner();
    }
  };

  renderDocumentImage() {
    let {filteredPreviewUri} = this.state;
    if (filteredPreviewUri) {
      return <Image
          style={styles.documentImage}
          source={{uri: filteredPreviewUri}}
      />;
    }
  }

  showSpinner() {
    this.setState({spinnerVisible: true});
  }

  hideSpinner() {
    this.setState({spinnerVisible: false});
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
  filterPicker: {
    margin: 10,
    width: 300,
    height: 50
  },
  documentImage: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
  },
});
