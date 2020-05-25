import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {Pages} from '../model/Pages';
import {Styles} from '../model/Styles';
import ScanbotSDK from 'react-native-scanbot-sdk/src';
import {BaseScreen} from '../utils/BaseScreen';

export class ImageDetailScreen extends BaseScreen {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <>
        <SafeAreaView />
        <Image
          style={[
            Styles.INSTANCE.imageDetails.image,
            Styles.INSTANCE.common.containImage,
          ]}
          source={{uri: Pages.selectedPage.documentImageFileUri}}
          key={Pages.selectedPage.pageId}
        />
        <View style={Styles.INSTANCE.common.bottomBar}>
          <Text
            style={Styles.INSTANCE.common.bottomBarButton}
            onPress={() => this.cropButtonPress()}>
            CROP & ROTATE
          </Text>
          <Text
            style={Styles.INSTANCE.common.bottomBarButton}
            onPress={() => this.filterButtonPress()}>
            FILTER
          </Text>
          <Text
            style={[
              Styles.INSTANCE.common.bottomBarButton,
              Styles.INSTANCE.common.alignRight,
            ]}
            onPress={() => this.deleteButtonPress()}>
            DELETE
          </Text>
        </View>
      </>
    );
  }

  async cropButtonPress() {
    const result = await ScanbotSDK.UI.startCroppingScreen(Pages.selectedPage, {
      doneButtonTitle: 'Apply',
      topBarBackgroundColor: '#b30127',
    });

    if (result.status === 'OK') {
      if (result.page) {
        Pages.update(result.page);
        Pages.selectedPage = result.page;
      }
    }

    this.refresh();
  }
  private filterButtonPress() {}

  private deleteButtonPress() {
    Pages.list.splice(Pages.list.indexOf(Pages.selectedPage), 1);
    // @ts-ignore
    this.props.navigation.pop();
  }
}
