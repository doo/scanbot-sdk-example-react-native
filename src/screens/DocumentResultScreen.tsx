import React, {useCallback, useContext, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {COLORS} from '@theme';
import {
  BottomActionBar,
  ExportDocumentModal,
  LoadingIndicator,
  PreviewImage,
} from '@components';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp, Screens} from '@utils';
import {useAddDocumentPage, useContinueDocumentScanning} from '@hooks';
import {PageData} from 'react-native-scanbot-sdk';
import {DocumentContext} from '../context/useDocument.ts';

const GALLERY_CELL_PADDING = 20;

export function DocumentResultScreen() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const {document} = useContext(DocumentContext);
  const [modalVisible, setModalVisible] = useState(false);
  const continueDocumentScanning = useContinueDocumentScanning();
  const addDocumentPage = useAddDocumentPage();
  const dimensions = useWindowDimensions();

  const onDisplayModal = useCallback((displayModal: boolean) => {
    return () => {
      setModalVisible(displayModal);
    };
  }, []);

  const onContinueDocumentScanning = useCallback(async () => {
    if (document !== undefined) {
      await continueDocumentScanning(document.uuid);
    }
  }, [document, continueDocumentScanning]);

  const onAddPage = useCallback(async () => {
    if (document !== undefined) {
      await addDocumentPage(document.uuid);
    }
  }, [document, addDocumentPage]);

  const onPagePress = useCallback(
    (page: PageData) => {
      return function () {
        if (document !== undefined) {
          navigation.navigate(Screens.DOCUMENT_PAGE_RESULT, {
            pageID: page.uuid,
          });
        }
      };
    },
    [document, navigation],
  );

  if (document === undefined) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingIndicator loading={true} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.gallery}>
          {document.pages.map(page => (
            <TouchableOpacity key={page.uuid} onPress={onPagePress(page)}>
              <PreviewImage
                key={`${page.uuid}?${Date.now()}`}
                imageUri={page.documentImageURI ?? page.originalImageURI}
                style={[
                  styles.galleryCell,
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
        buttonOneTitle={'Continue Scanning'}
        buttonTwoTitle={'Add Page'}
        buttonThreeTitle={'Export'}
        onButtonOne={onContinueDocumentScanning}
        onButtonTwo={onAddPage}
        onButtonThree={onDisplayModal(true)}
      />
      <ExportDocumentModal
        isVisible={modalVisible}
        documentID={document.uuid}
        onDismiss={onDisplayModal(false)}
      />
    </SafeAreaView>
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
    resizeMode: 'contain',
  },
});
