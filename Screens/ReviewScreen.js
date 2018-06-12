import React, {Component} from 'react';
import { View, ScrollView, Image, Button } from 'react-native';
import ScanbotSDK, {Page} from 'react-native-scanbot-sdk';

export default class ReviewScreen extends Component {
  constructor() {
    super();
    this.state = {
      pages: []
    };
  }

  componentWillMount() {
    this.updatePages();
  }

  async updatePages() {
    const pages = await ScanbotSDK.getStoredPages();
    this.setState({pages});
  }

  render() {
    const {pages} = this.state;
    return (
      <ScrollView style={{flex:1}}>
        {pages.map((p: Page) => (
          <View style={{flex:1, flexDirection:'row', height: 100}} key={p.pageId}>
            <Image style={{flex:0.45, margin:5, resizeMode:'contain'}} source={{uri:p.originalPreviewImageFileUri}}/>
            <Image style={{flex:0.45, margin:5, resizeMode:'contain'}} source={{uri:p.documentPreviewImageFileUri}}/>
            <Button style={{flex:0.1}} title="Remove" onPress={() => this.removeTapped(p)}/>
          </View>
        ))}
      </ScrollView>
    )
  }

  removeTapped = async (page: Page) => {
    await ScanbotSDK.removePage(page);
    await this.updatePages();
  }
}