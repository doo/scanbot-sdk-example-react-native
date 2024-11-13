import React, {useCallback, useContext, useMemo, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {BottomActionBar, ImageFilterModal, PreviewImage} from '@components';
import {ParametricFilter} from 'react-native-scanbot-sdk';
import {
  DocumentPageResultScreenRouteProp,
  removePageConfirmationAlert,
} from '@utils';
import {useRoute} from '@react-navigation/native';
import {useCropDocumentPage, useModifyPage, useRemovePage} from '@hooks';
import {DocumentContext} from '@context';

export function DocumentPageResultScreen() {
  const {pageID} = useRoute<DocumentPageResultScreenRouteProp>().params;
  const {document} = useContext(DocumentContext);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const cropDocumentPage = useCropDocumentPage();
  const modifyPage = useModifyPage();
  const removePage = useRemovePage();

  const page = useMemo(
    () => document?.pages.find(p => p.uuid === pageID),
    [document?.pages, pageID],
  );

  const onCropAndRotate = useCallback(async () => {
    if (document?.uuid !== undefined) {
      await cropDocumentPage({
        documentID: document.uuid,
        pageID: pageID,
      });
    }
  }, [cropDocumentPage, document, pageID]);

  const toggleFilterModal = useCallback(
    () => setFilterModalVisible(p => !p),
    [],
  );

  const onFilterSelect = useCallback(
    async (filter: ParametricFilter) => {
      if (document?.uuid !== undefined) {
        await modifyPage({
          documentID: document.uuid,
          pageID: pageID,
          parametricFilter: filter,
        });
      }
    },
    [document, modifyPage, pageID],
  );

  const onRemovePage = useCallback(async () => {
    if (document?.uuid !== undefined) {
      await removePage({documentID: document.uuid, pageID: pageID});
    }
  }, [document, pageID, removePage]);

  const onDelete = useCallback(() => {
    removePageConfirmationAlert(onRemovePage);
  }, [onRemovePage]);

  if (!page) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <PreviewImage
        key={`${page.uuid}?${page.filters?.map(f => f._type).join(',')}`}
        imageUri={page.documentImageURI ?? page.originalImageURI}
        style={styles.imageDetails}
      />
      <BottomActionBar
        buttonOneTitle={'CROP & ROTATE'}
        buttonTwoTitle={'FILTER'}
        buttonThreeTitle={'Remove'}
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
