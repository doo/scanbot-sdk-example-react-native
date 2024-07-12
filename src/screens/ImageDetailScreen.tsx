import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import ScanbotSDK, {ImageFilterType} from 'react-native-scanbot-sdk';
import {BottomActionBar} from '../components/BottomActionBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ImageDetailScreenRouteProp,
  PrimaryRouteNavigationProp,
} from '../utils/Navigation';
import {PageContext} from '../context/usePages';
import {ImageFilterModal} from '../components/ImageFilterModal';
import {PreviewImage} from '../components/PreviewImage';
import {deleteAllConfirmationAlert} from '../utils/Alerts';
import {useCroppingScreen} from '../hooks/RTUUI/useCroppingScreen';
import {useApplyImageFilterOnPage} from '../hooks/Operations/useApplyImageFilterOnPage';

export function ImageDetailScreen() {
  const route = useRoute<ImageDetailScreenRouteProp>();
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {deletePage, updatePage} = useContext(PageContext);
  const [page, setPage] = useState(route.params);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const cropAndRotate = useCroppingScreen();
  const applyImageFilterOnPage = useApplyImageFilterOnPage();

  const onCropAndRotate = useCallback(async () => {
    const result = await cropAndRotate(page);
    if (result) {
      setPage(result);
      updatePage(result);
    }
  }, [cropAndRotate, page, updatePage]);

  const toggleFilterModal = useCallback(
    () => setFilterModalVisible(p => !p),
    [],
  );

  const onFilterSelect = useCallback(
    async (filter: ImageFilterType) => {
      const updated = await applyImageFilterOnPage(page, filter);
      if (updated) {
        setPage(updated);
        updatePage(updated);
      }
    },
    [applyImageFilterOnPage, page, updatePage],
  );

  const onDeletePage = useCallback(async () => {
    try {
      await ScanbotSDK.removePage(page);
      deletePage(page);
      navigation.pop();
    } catch (e) {
      console.log(e);
    }
  }, [deletePage, navigation, page]);

  const onDelete = useCallback(() => {
    deleteAllConfirmationAlert(onDeletePage);
  }, [onDeletePage]);

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
