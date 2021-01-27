import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {Pages} from '../model/Pages';
import {Styles} from '../model/Styles';
import ScanbotSDK, {Page} from 'react-native-scanbot-sdk/src';
import {BaseScreen} from '../utils/BaseScreen';
// @ts-ignore
import {ActionSheetCustom as ActionSheet} from 'react-native-custom-actionsheet';
import {SDKUtils} from '../utils/SDKUtils';
import {Colors} from '../model/Colors';
import PreviewImage from '../ui/PreviewImage';

const CANCEL_INDEX = 0;

const options = [
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
  'LOW_LIGHT_BINARIZATION',
  'EDGE_HIGHLIGHT',
  'LOW_LIGHT_BINARIZATION_2',
];

export class ImageDetailScreen extends BaseScreen {
  constructor(props: any) {
    super(props);
  }

  actionSheet: any;
  state = {selected: ''};
  getActionSheetRef = (ref: any) => (this.actionSheet = ref);

  handlePress = async (index: number) => {
    this.setState({selected: index});
    const filter = options[index];
    const updated = await ScanbotSDK.applyImageFilterOnPage(
      Pages.selectedPage,
      // @ts-ignore
      filter,
    );
    this.updateCurrentPage(updated);
  };

  render() {
    return (
      <>
        <SafeAreaView />
        <PreviewImage
          page={Pages.selectedPage}
          style={[
            Styles.INSTANCE.imageDetails.image,
            Styles.INSTANCE.common.containImage,
          ]}
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
        <ActionSheet
          ref={this.getActionSheetRef}
          title={'Filters'}
          message="Choose an image filter to see how it enhances the document"
          options={options}
          cancelButtonIndex={CANCEL_INDEX}
          onPress={this.handlePress}
        />
      </>
    );
  }

  async cropButtonPress() {
    if (!(await SDKUtils.checkLicense())) {
      return;
    }
    const result = await ScanbotSDK.UI.startCroppingScreen(Pages.selectedPage, {
      doneButtonTitle: 'Apply',
      topBarBackgroundColor: Colors.SCANBOT_RED,
      bottomBarBackgroundColor: Colors.SCANBOT_RED,
      // See further config properties ...
    });

    if (result.status === 'OK') {
      if (result.page) {
        this.updateCurrentPage(result.page);
      }
    }
  }

  updateCurrentPage(page: Page) {
    Pages.update(page);
    Pages.selectedPage = page;
    this.refresh();
  }
  async filterButtonPress() {
    if (!(await SDKUtils.checkLicense())) {
      return;
    }
    this.actionSheet.show();
  }

  private deleteButtonPress() {
    Pages.list.splice(Pages.list.indexOf(Pages.selectedPage), 1);
    // @ts-ignore
    this.props.navigation.pop();
  }
}
