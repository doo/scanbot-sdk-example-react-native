import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ScanbotSDK from 'react-native-scanbot-sdk/src';
import {BottomActionBar} from '../components/BottomActionBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ImageDetailScreenRouteProp,
  PrimaryRouteNavigationProp,
} from '../utils/Navigation';
import {PageContext} from '../context/usePages';
import {useLicenseValidityCheckWrapper} from '../hooks/useLicenseValidityCheck';
import {ImageFilterModal} from '../components/ImageFilterModal';
import {ImageFilterType} from 'react-native-scanbot-sdk';
import {PreviewImage} from '../components/PreviewImage';
import {COLORS} from '../theme/Theme';

export function ImageDetailScreen() {
  const route = useRoute<ImageDetailScreenRouteProp>();
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {deletePage, updatePage} = useContext(PageContext);
  const [page, setPage] = useState(route.params);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const onCropAndRotate = useLicenseValidityCheckWrapper(async () => {
    const result = await ScanbotSDK.UI.startCroppingScreen(page, {
      doneButtonTitle: 'Apply',
      topBarBackgroundColor: COLORS.SCANBOT_RED,
      bottomBarBackgroundColor: COLORS.SCANBOT_RED,
      orientationLockMode: 'NONE',
      swapTopBottomButtons: false,
    });

    if (result.status === 'OK') {
      if (result.page) {
        setPage(result.page);
        updatePage(result.page);
      }
    }
  });

  const toggleFilterModal = useCallback(
    () => setFilterModalVisible(p => !p),
    [],
  );

  const onFilterSelect = useCallback(
    async (filter: ImageFilterType) => {
      try {
        const updated = await ScanbotSDK.applyImageFilterOnPage(page, filter);
        setPage(updated);
        updatePage(updated);
      } catch (e) {
        console.log(e);
      }
    },
    [page, updatePage],
  );

  const onDelete = useCallback(async () => {
    try {
      await ScanbotSDK.removePage(page);
      deletePage(page);
      navigation.pop();
    } catch (e) {
      console.log(e);
    }
  }, [deletePage, navigation, page]);

  return (
    <View style={styles.container}>
      <PreviewImage
        imageUri={page.documentPreviewImageFileUri}
        style={styles.imageDetails}
      />
      <BottomActionBar
        buttonOneTitle={'CROP & ROTATE'}
        buttonTwoTitle={'FILTER'}
        buttonThreeTitle={'DELETE'}
        onButtonOne={onCropAndRotate}
        onButtonTwo={toggleFilterModal}
        onButtonThree={onDelete}
      />
      <ImageFilterModal
        isVisible={filterModalVisible}
        onDismiss={toggleFilterModal}
        onSelect={onFilterSelect}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageDetails: {
    width: '94%',
    height: '70%',
    marginLeft: '3%',
    marginTop: '3%',
    resizeMode: 'contain',
  },
});
