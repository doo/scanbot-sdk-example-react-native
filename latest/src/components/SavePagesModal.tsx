import {Modal, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {Colors} from '../model/Colors';
import {FILE_ENCRYPTION_ENABLED} from '../utils/SDKUtils';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {errorMessageAlert, infoMessageAlert} from '../utils/Alerts';
import {ActivityIndicatorContext} from '../context/useLoading';
import {PageContext} from '../context/usePages';
import {useLicenseValidityCheckWrapper} from '../hooks/useLicenseValidityCheck';

export function SavePagesModal({
  isVisible,
  onDismiss,
}: {
  isVisible: boolean;
  onDismiss: () => void;
}) {
  const {setLoading} = useContext(ActivityIndicatorContext);
  const {getImageUriFromPages} = useContext(PageContext);

  const onSavePDF = useLicenseValidityCheckWrapper(async () => {
    onDismiss();
    try {
      setLoading(true);
      const result = await ScanbotSDK.createPDF(
        getImageUriFromPages(),
        'FIXED_A4',
      );
      infoMessageAlert('PDF file created: ' + result.pdfFileUri);
    } catch (e) {
      errorMessageAlert('ERROR: ' + JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  });

  const onSavePDFWithOCR = useLicenseValidityCheckWrapper(async () => {
    onDismiss();
    try {
      setLoading(true);
      const result = await ScanbotSDK.performOCR(
        getImageUriFromPages(),
        ['en'],
        {
          outputFormat: 'FULL_OCR_RESULT',
        },
      );
      infoMessageAlert('PDF with OCR layer created: ' + result.pdfFileUri);
    } catch (e) {
      errorMessageAlert('ERROR: ' + JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  });

  const onSaveAsTiff = async (binarized: boolean) => {
    onDismiss();
    if (FILE_ENCRYPTION_ENABLED) {
      // TODO encryption for TIFF files currently not supported
      infoMessageAlert(
        'Encryption for TIFF files currently not supported. ' +
          'In order to test TIFF please disable image file encryption.',
      );
      return;
    }
    try {
      setLoading(true);
      const result = await ScanbotSDK.writeTIFF(getImageUriFromPages(), {
        oneBitEncoded: binarized, // "true" means create 1-bit binarized black and white TIFF
        dpi: 300, // optional DPI. default value is 200
        compression: binarized ? 'CCITT_T6' : 'ADOBE_DEFLATE', // optional compression. see documentation!
      });
      infoMessageAlert('TIFF file created: ' + result.tiffFileUri);
    } catch (e) {
      errorMessageAlert('ERROR: ' + JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  };
  const saveTiffOneBit = useLicenseValidityCheckWrapper(onSaveAsTiff, [true]);
  const saveTiffColor = useLicenseValidityCheckWrapper(onSaveAsTiff, [false]);

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
            onPress={() => saveTiffOneBit()}>
            TIFF (1-bit B&W)
          </Text>
          <Text
            style={[styles.button, styles.actionButton]}
            onPress={() => saveTiffColor()}>
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
    backgroundColor: Colors.SCANBOT_RED,
    fontWeight: 'bold',
  },
  closeButton: {
    borderColor: 'gray',
    borderWidth: 1,
  },
});
