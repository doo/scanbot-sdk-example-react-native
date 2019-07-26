import React, { Component } from 'react';
import { Image, StyleSheet, View, Dimensions } from 'react-native';
import { Container, Content, Text, Header, Body, Title, Button, Left, Right, ListItem, Radio } from 'native-base';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import ScanbotSDK, { Page, ImageFilter } from "react-native-scanbot-sdk";

import {
  ScannedPagesState,
  ACTION_UPDATE_OR_ADD_PAGE
} from '../ScannedPagesStore';


const mapStateToProps = (state: ScannedPagesState) => {
  return {
    scannedPages: state.pages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateScannedPage: (page: Page) => dispatch({ type: ACTION_UPDATE_OR_ADD_PAGE, page: page }),
  };
};


class ImageFilterScreen extends Component {

  filterList = [
    'NONE',
    'COLOR_ENHANCED',
    'GRAYSCALE',
    'BINARIZED',
    'COLOR_DOCUMENT',
    'PURE_BINARIZED',
    'BACKGROUND_CLEAN',
    'BLACK_AND_WHITE',
    'OTSU_BINARIZATION',
    'DEEP_BINARIZATION',
    'EDGE_HIGHLIGHT',
    'LOW_LIGHT_BINARIZATION',
  ];

  constructor(props) {
    super(props);

    const page = this.props.navigation.getParam('page');

    this.state = {
      page: page,
      spinnerVisible: false,
      filteredPreviewUri: null,
      selectedImageFilter: (page.filter || 'NONE')
    };
  }

  componentDidMount() {
    this.showFilteredDocumentPreviewUri(this.state.selectedImageFilter);
  }

  render() {
    return (
        <Container>
          <Header style={styles.header}>
            <Left>
              <Button hasText transparent light onPress={this.cancelButtonTapped}>
                <Text>Cancel</Text>
              </Button>
            </Left>
            <Body>
              <Title style={{color: 'white'}}>Image Filter</Title>
            </Body>
            <Right>
              <Button hasText transparent light onPress={this.applyButtonTapped}>
                <Text>Apply</Text>
              </Button>
            </Right>
          </Header>
          <Content>
            <Spinner visible={this.state.spinnerVisible}
                     textContent={'Processing ...'}
                     textStyle={{color: '#FFF'}}
                     cancelable={false} />
            <View style={styles.content}>
              {this.renderPreviewImage()}
            </View>
            {this.renderFilterSelection()}
          </Content>
        </Container>
    );
  }

  renderPreviewImage() {
    const {filteredPreviewUri} = this.state;
    if (filteredPreviewUri) {
      return <Image style={styles.documentImage} source={{uri: filteredPreviewUri}} />;
    }
  }

  renderFilterSelection() {
    return this.filterList.map((filter, idx) =>
        <ListItem key={idx} onPress={() => this.showFilteredDocumentPreviewUri(filter)}>
          <Left>
            <Text>{filter}</Text>
          </Left>
          <Right>
            <Radio selected={filter === this.state.selectedImageFilter} />
          </Right>
        </ListItem>);
  }

  showFilteredDocumentPreviewUri = async (filter: ImageFilter) => {
    this.setState({selectedImageFilter: filter});
    this.showSpinner();
    try {
      const uri = await ScanbotSDK.getFilteredDocumentPreviewUri(this.state.page, filter);
      this.setState({filteredPreviewUri: uri})
    } finally {
      this.hideSpinner();
    }
  };


  showSpinner() {
    this.setState({spinnerVisible: true});
  }

  hideSpinner() {
    this.setState({spinnerVisible: false});
  }

  cancelButtonTapped = () => {
    this.props.navigation.goBack();
  };

  applyButtonTapped = async () => {
    const {page} = this.state;
    this.showSpinner();
    try {
      const updatedPage = await ScanbotSDK.applyImageFilterOnPage(page, this.state.selectedImageFilter);
      this.props.updateScannedPage(updatedPage);
      this.props.navigation.goBack();
    } finally {
      this.hideSpinner();
    }
  };

}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#b30127',
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageFilterScreen);
