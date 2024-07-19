import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {COLORS} from '@theme';
import {useCreatePDF, useWriteTIFF} from '@hooks';

export function SavePagesModal({
  isVisible,
  onDismiss,
}: {
  isVisible: boolean;
  onDismiss: () => void;
}) {
  const savePDF = useCreatePDF();
  const writeTiff = useWriteTIFF();

  const onSavePDF = useCallback(
    (sandwichedPDF: boolean) => {
      return async () => {
        onDismiss();
        await savePDF(sandwichedPDF);
      };
    },
    [onDismiss, savePDF],
  );

  const saveTiff = useCallback(
    (binarized: boolean) => {
      return async () => {
        onDismiss();
        await writeTiff(binarized);
      };
    },
    [onDismiss, writeTiff],
  );

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.text}>How would you like to save the pages?</Text>
          <Text
            style={[styles.button, styles.actionButton]}
            onPress={onSavePDF(false)}>
            PDF
          </Text>
          <Text
            style={[styles.button, styles.actionButton]}
            onPress={onSavePDF(true)}>
            PDF with OCR ( SandwichedPDF )
          </Text>
          <Text
            style={[styles.button, styles.actionButton]}
            onPress={saveTiff(true)}>
            TIFF (1-bit B&W)
          </Text>
          <Text
            style={[styles.button, styles.actionButton]}
            onPress={saveTiff(false)}>
            TIFF (color)
          </Text>
          <Text style={[styles.button, styles.closeButton]} onPress={onDismiss}>
            Cancel
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    width: 200,
    marginTop: 10,
    textAlign: 'center',
    lineHeight: 40,
    overflow: 'hidden',
  },
  actionButton: {
    color: 'white',
    backgroundColor: COLORS.SCANBOT_RED,
    fontWeight: 'bold',
  },
  closeButton: {
    borderColor: 'gray',
    borderWidth: 1,
  },
});
