import React, {useCallback, useContext, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import ScanbotSDK, {Page} from 'react-native-scanbot-sdk/src';
import PreviewImage from '../ui/PreviewImage';
import {ScrollView} from 'react-native-gesture-handler';
import {PageContext} from '../context/usePages';
import {PrimaryRouteNavigationProp, Screens} from '../utils/Navigation';
import {BottomActionBar} from '../components/BottomActionBar';
import {useDocumentScanner} from '../hooks/examples/useDocumentScanner';
import {errorMessageAlert, infoMessageAlert} from '../utils/Alerts';
import {SavePagesModal} from '../components/SavePagesModal';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../theme/Theme';

const GALLERY_CELL_PADDING = 20;

export function ImageResultScreen() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {pageList, deleteAllPages, isPageListEmpty} = useContext(PageContext);
  const [modalVisible, setModalVisible] = useState(false);
  const documentScanner = useDocumentScanner();
  const dimensions = useWindowDimensions();

  const onSelect = useCallback(
    (page: Page) => {
      navigation.navigate(Screens.IMAGE_DETAILS, page);
    },
    [navigation],
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
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.gallery}>
          {pageList.map(page => (
            <TouchableOpacity onPress={() => onSelect(page)} key={page.pageId}>
              <PreviewImage
                imageUri={page.documentPreviewImageFileUri}
                style={[
                  styles.galleryCell,
                  styles.containImage,
                  {
                    width: (dimensions.width - 4 * GALLERY_CELL_PADDING) / 3,
                    height: (dimensions.width - 4 * GALLERY_CELL_PADDING) / 3,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <BottomActionBar
        buttonOneTitle={'ADD'}
        buttonTwoTitle={'SAVE'}
        buttonThreeTitle={'DELETE ALL'}
        onButtonOne={documentScanner}
        onButtonTwo={onSave}
        onButtonThree={onDelete}
      />
      <SavePagesModal onDismiss={onDismiss} isVisible={modalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 64,
  },
  galleryCell: {
    marginLeft: GALLERY_CELL_PADDING,
    marginTop: GALLERY_CELL_PADDING,
    backgroundColor: COLORS.LIGHT_GRAY,
  },
  containImage: {
    resizeMode: 'contain',
  },
});
