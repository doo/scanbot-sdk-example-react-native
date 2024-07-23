import React, {useCallback, useContext, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ScanbotSDK, {ParametricFilter} from 'react-native-scanbot-sdk';
import {BottomActionBar, ImageFilterModal, PreviewImage} from '@components';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  deleteAllConfirmationAlert,
  ImageDetailScreenRouteProp,
  PrimaryRouteNavigationProp,
} from '@utils';
import {PageContext} from '@context';
import {useApplyImageFiltersOnPage, useCroppingScreen} from '@hooks';

export function ImageDetailScreen() {
  const route = useRoute<ImageDetailScreenRouteProp>();
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {deletePage, updatePage} = useContext(PageContext);
  const [page, setPage] = useState(route.params);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const cropAndRotate = useCroppingScreen();
  const applyImageFilterOnPage = useApplyImageFiltersOnPage();

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
    async (filter: ParametricFilter) => {
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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
