import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {BottomActionBar, ImageFilterModal, PageImagePreview} from '@components';
import {ParametricFilter} from 'react-native-scanbot-sdk';
import {
  DocumentPageResultScreenRouteProp,
  deleteConfirmationAlert,
} from '@utils';
import {useRoute} from '@react-navigation/native';
import {useCropDocumentPage, useModifyPage, useRemovePage} from '@hooks';
import {DocumentContext} from '@context';

export function DocumentPageResultScreen() {
  const {pageUuid} = useRoute<DocumentPageResultScreenRouteProp>().params;
  const {document} = useContext(DocumentContext);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const cropDocumentPage = useCropDocumentPage();
  const modifyPage = useModifyPage();
  const removePage = useRemovePage();

  const onCropAndRotate = useCallback(async () => {
    if (document?.uuid !== undefined) {
      await cropDocumentPage({
        documentUuid: document.uuid,
        pageUuid: pageUuid,
      });
    }
  }, [cropDocumentPage, document, pageUuid]);

  const toggleFilterModal = useCallback(
    () => setFilterModalVisible(p => !p),
    [],
  );

  const onFilterSelect = useCallback(
    async (filter: ParametricFilter) => {
      if (document?.uuid !== undefined) {
        await modifyPage({
          documentUuid: document.uuid,
          pageUuid: pageUuid,
          parametricFilter: filter,
        });
      }
    },
    [document, modifyPage, pageUuid],
  );

  const onRemovePage = useCallback(async () => {
    if (document?.uuid !== undefined) {
      await removePage({documentUuid: document.uuid, pageUuid: pageUuid});
    }
  }, [document, pageUuid, removePage]);

  const onDelete = useCallback(() => {
    deleteConfirmationAlert(
      'Remove page ?',
      'Remove',
      onRemovePage,
    );
  }, [onRemovePage]);

  return (
    <View style={styles.container}>
      <PageImagePreview pageUuid={pageUuid} style={styles.imageDetails} />
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
