import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {COLORS} from '@theme';
import {usePerformOCR, useSavePDF, useWriteTIFF} from '@hooks';

export function SavePagesModal({
  isVisible,
  onDismiss,
}: {
  isVisible: boolean;
  onDismiss: () => void;
}) {
  const savePDF = useSavePDF();
  const performOCR = usePerformOCR();
  const writeTiff = useWriteTIFF();

  const onSavePDF = useCallback(async () => {
    onDismiss();
    await savePDF();
  }, [onDismiss, savePDF]);

  const onSavePDFWithOCR = useCallback(async () => {
    onDismiss();
    await performOCR();
  }, [onDismiss, performOCR]);

  const saveTiffOneBit = useCallback(async () => {
    onDismiss();
    await writeTiff(true);
  }, [onDismiss, writeTiff]);

  const saveTiffColor = useCallback(async () => {
    onDismiss();
    await writeTiff(false);
  }, [onDismiss, writeTiff]);

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.text}>How would you like to save the pages?</Text>
          <Text
            style={[styles.button, styles.actionButton]}
            onPress={onSavePDF}>
            PDF
          </Text>
          <Text
            style={[styles.button, styles.actionButton]}
            onPress={onSavePDFWithOCR}>
            PDF with OCR
          </Text>
          <Text
            style={[styles.button, styles.actionButton]}
            onPress={saveTiffOneBit}>
            TIFF (1-bit B&W)
          </Text>
          <Text
            style={[styles.button, styles.actionButton]}
            onPress={saveTiffColor}>
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
