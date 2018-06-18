import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Image,
  Button,
  TouchableHighlight,
} from 'react-native';
import ScanbotSDK, {Page} from 'react-native-scanbot-sdk';

export default class ReviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: []
    };

    this.props.navigator.setOnNavigatorEvent(evt => {
      switch (evt.id) {
        case 'willAppear':
          this.updatePages();
          break;
      }
    });
  }

  componentWillMount() {
    this.updatePages();
  }

  async updatePages() {
    const pages = await ScanbotSDK.getStoredPages();
    this.setState({pages});
    console.log(JSON.stringify(pages));
  }

  render() {
    const {pages} = this.state;
    return (
      <ScrollView style={{flex:1}}>
        <View  style={{marginBottom: 5}}>
          <Button title="Remove All" onPress={this.removeAllTapped}/>
        </View>
        {pages.map((p: Page) => (
          <View style={{flex:1, flexDirection:'row', height: 100}} key={p.pageId}>
            <TouchableHighlight style={{flex:0.8}} onPress={() => this.pageTapped(p)}>
              <View style={{flex:1, flexDirection:'row'}}>
                <Image
                  style={{flex:0.5, margin:5, resizeMode:'contain'}}
                  source={{uri:p.originalPreviewImageFileUri}}/>
                <Image
                  style={{flex:0.5, margin:5, resizeMode:'contain'}}
                  source={{uri:p.documentPreviewImageFileUri}}/>
              </View>
            </TouchableHighlight>
  
            <View style={{flex:0.2, alignSelf: 'center', marginRight: 10}}>
              <Button
                title="Remove"
                onPress={() => this.removeTapped(p)}/>
            </View>
          </View>
        ))}
      </ScrollView>
    )
  }

  removeAllTapped = async () => {
    await ScanbotSDK.cleanup();
    await this.updatePages();
  }

  removeTapped = async (page: Page) => {
    await ScanbotSDK.removePage(page);
    await this.updatePages();
  }

  pageTapped = (page: Page) => {
    const {onPageSelected} = this.props;
    onPageSelected && onPageSelected(page);
    this.props.navigator.pop();
  }
}
