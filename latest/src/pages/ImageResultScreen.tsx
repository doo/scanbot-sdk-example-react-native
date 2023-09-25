import React, {useCallback, useContext, useState} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';
import ScanbotSDK, {Page} from 'react-native-scanbot-sdk/src';
import {Styles} from '../model/Styles';
import PreviewImage from '../ui/PreviewImage';
import {ScrollView} from 'react-native-gesture-handler';
import {PageContext} from '../context/usePages';
import {PrimaryRouteNavigationProp, Screens} from '../utils/Navigation';
import {BottomActionBar} from '../components/BottomActionBar';
import {useDocumentScanner} from '../hooks/examples/useDocumentScanner';
import {errorMessageAlert, infoMessageAlert} from '../utils/Alerts';
import {SavePagesModal} from '../components/SavePagesModal';
import {useNavigation} from '@react-navigation/native';

export function ImageResultScreen() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {pageList, deleteAllPages, isPageListEmpty, addSelectedPage} =
    useContext(PageContext);
  const [modalVisible, setModalVisible] = useState(false);
  const documentScanner = useDocumentScanner();

  const onSelect = useCallback(
    (page: Page) => {
      addSelectedPage(page);
      navigation.navigate(Screens.IMAGE_DETAILS);
    },
    [addSelectedPage, navigation],
  );

  const onSave = useCallback(() => {
    if (isPageListEmpty()) {
      infoMessageAlert(
        'You have no images to save. Please scan a few documents first.',
      );
    } else {
      setModalVisible(true);
    }
  }, [isPageListEmpty]);

  const onDelete = useCallback(async () => {
    try {
      await ScanbotSDK.cleanup();
      deleteAllPages();
      infoMessageAlert('All pages have been deleted successfully!');
    } catch (e) {
      errorMessageAlert('ERROR: ' + JSON.stringify(e));
    }
  }, [deleteAllPages]);

  const onDismiss = useCallback(() => {
    setModalVisible(false);
  }, []);

  return (
    <SafeAreaView style={Styles.INSTANCE.imageResults.container}>
      <ScrollView style={Styles.INSTANCE.imageResults.scrollView}>
        <View style={Styles.INSTANCE.imageResults.gallery}>
          {pageList.map(page => (
            <TouchableOpacity onPress={() => onSelect(page)} key={page.pageId}>
              <PreviewImage
                imageUri={page.documentPreviewImageFileUri}
                style={[
                  Styles.INSTANCE.imageResults.galleryCell,
                  Styles.INSTANCE.common.containImage,
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <BottomActionBar
        onAdd={documentScanner}
        onSave={onSave}
        onDelete={onDelete}
      />
      <SavePagesModal onDismiss={onDismiss} isVisible={modalVisible} />
    </SafeAreaView>
  );
}
