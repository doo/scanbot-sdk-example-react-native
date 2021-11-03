import React from 'react';
import { ActivityIndicator, Modal, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Pages } from '../model/Pages';
import ScanbotSDK, { DocumentScannerConfiguration, Page } from 'react-native-scanbot-sdk/src';
import { Styles } from '../model/Styles';
import { SDKUtils } from '../utils/SDKUtils';
import { ViewUtils } from '../utils/ViewUtils';
import { Navigation } from '../utils/Navigation';
import { BaseScreen } from '../utils/BaseScreen';
import PreviewImage from '../ui/PreviewImage';
import { ScrollView } from 'react-native-gesture-handler';

export class ImageResultScreen extends BaseScreen {
  onScreenFocused() {
    this.refresh();
  }

  modalVisible = false;

  render() {
    return (
      <>
        <SafeAreaView style={Styles.INSTANCE.imageResults.container}>
          <ActivityIndicator
            size="large"
            color={Styles.SCANBOT_RED}
            style={Styles.INSTANCE.common.progress}
            animating={this.progressVisible}
          />
          <ScrollView style={Styles.INSTANCE.imageResults.scrollView}>
            <View style={Styles.INSTANCE.imageResults.gallery}>
              {Pages.getAllPages().map(page => (
                <TouchableOpacity onPress={() => this.onGalleryItemClick(page)} key={page.pageId}>
                  <PreviewImage
                    page={page}
                    style={[
                      Styles.INSTANCE.imageResults.galleryCell,
                      Styles.INSTANCE.common.containImage,
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          <View style={Styles.INSTANCE.common.bottomBar}>
            <Text
              style={Styles.INSTANCE.common.bottomBarButton}
              onPress={() => this.addButtonPress()}
            >
              ADD
            </Text>
            <Text
              style={Styles.INSTANCE.common.bottomBarButton}
              onPress={() => this.saveButtonPress()}
            >
              SAVE
            </Text>
            <Text
              style={[Styles.INSTANCE.common.bottomBarButton, Styles.INSTANCE.common.alignRight]}
              onPress={() => this.deleteAllButtonPress()}
            >
              DELETE ALL
            </Text>
          </View>
        </SafeAreaView>

        <Modal animationType="slide" transparent={true} visible={this.modalVisible}>
          <View style={Styles.INSTANCE.modal.centeredView}>
            <View style={Styles.INSTANCE.modal.modalView}>
              <Text style={Styles.INSTANCE.modal.text}>How would you like to save the pages?</Text>
              <Text
                style={[Styles.INSTANCE.modal.button, Styles.INSTANCE.modal.actionButton]}
                onPress={() => this.onSaveAsPDF()}
              >
                PDF
              </Text>
              <Text
                style={[Styles.INSTANCE.modal.button, Styles.INSTANCE.modal.actionButton]}
                onPress={() => this.onSaveAsPDFWithOCR()}
              >
                PDF with OCR
              </Text>
              <Text
                style={[Styles.INSTANCE.modal.button, Styles.INSTANCE.modal.actionButton]}
                onPress={() => this.onSaveAsTIFF(true)}
              >
                TIFF (1-bit B&W)
              </Text>
              <Text
                style={[Styles.INSTANCE.modal.button, Styles.INSTANCE.modal.actionButton]}
                onPress={() => this.onSaveAsTIFF(false)}
              >
                TIFF (color)
              </Text>
              <Text
                style={[Styles.INSTANCE.modal.button, Styles.INSTANCE.modal.closeButton]}
                onPress={() => this.onModalClose()}
              >
                Cancel
              </Text>
            </View>
          </View>
        </Modal>
      </>
    );
  }

  async addButtonPress() {
    if (!(await SDKUtils.checkLicense())) {
      return;
    }
    const config: DocumentScannerConfiguration = {
      // Customize colors, text resources, etc..
      cameraPreviewMode: 'FIT_IN',
      orientationLockMode: 'PORTRAIT',
      multiPageEnabled: false,
      multiPageButtonHidden: true,
      ignoreBadAspectRatio: true,
      // See further config properties ...
    };
    const result = await ScanbotSDK.UI.startDocumentScanner(config);
    if (result.status === 'OK') {
      await Pages.addList(result.pages);
      this.refresh();
    }
  }

  saveButtonPress() {
    if (Pages.isEmpty()) {
      ViewUtils.showAlert('You have no images to save. Please scan a few documents first.');
    }
    this.modalVisible = true;
    this.refresh();
  }

  async deleteAllButtonPress() {
    try {
      await ScanbotSDK.cleanup();
      await Pages.deleteAllPages();
      this.refresh();
      ViewUtils.showAlert('All pages have been deleted succesfully!');
    } catch (e) {
      ViewUtils.showAlert('ERROR: ' + JSON.stringify(e));
    }
  }

  private onGalleryItemClick(page: Page) {
    Pages.selectedPage = page;
    this.props.navigation.push(Navigation.IMAGE_DETAILS);
  }

  private onModalClose() {
    this.modalVisible = false;
    this.refresh();
  }

  async onSaveAsPDF() {
    this.onModalClose();
    if (!(await SDKUtils.checkLicense())) {
      return;
    }
    try {
      this.showProgress();
      const result = await ScanbotSDK.createPDF(Pages.getImageUris(), 'FIXED_A4');
      ViewUtils.showAlert('PDF file created: ' + result.pdfFileUri);
    } catch (e) {
      ViewUtils.showAlert('ERROR: ' + JSON.stringify(e));
    } finally {
      this.hideProgress();
    }
  }

  async onSaveAsPDFWithOCR() {
    this.onModalClose();
    if (!(await SDKUtils.checkLicense())) {
      return;
    }
    try {
      this.showProgress();
      const result = await ScanbotSDK.performOCR(Pages.getImageUris(), ['en'], {
        outputFormat: 'FULL_OCR_RESULT',
      });
      ViewUtils.showAlert('PDF with OCR layer created: ' + result.pdfFileUri);
    } catch (e) {
      ViewUtils.showAlert('ERROR: ' + JSON.stringify(e));
    } finally {
      this.hideProgress();
    }
  }

  async onSaveAsTIFF(binarized: boolean) {
    this.onModalClose();
    if (!(await SDKUtils.checkLicense())) {
      return;
    }
    if (SDKUtils.FILE_ENCRYPTION_ENABLED) {
      // TODO encryption for TIFF files currently not supported
      ViewUtils.showAlert(
        'Encryption for TIFF files currently not supported. ' +
          'In order to test TIFF please disable image file encryption.'
      );
      return;
    }
    try {
      this.showProgress();
      const result = await ScanbotSDK.writeTIFF(Pages.getImageUris(), {
        oneBitEncoded: binarized, // "true" means create 1-bit binarized black and white TIFF
        dpi: 300, // optional DPI. default value is 200
        compression: binarized ? 'CCITT_T6' : 'ADOBE_DEFLATE', // optional compression. see documentation!
      });
      ViewUtils.showAlert('TIFF file created: ' + result.tiffFileUri);
    } catch (e) {
      ViewUtils.showAlert('ERROR: ' + JSON.stringify(e));
    } finally {
      this.hideProgress();
    }
  }
}
