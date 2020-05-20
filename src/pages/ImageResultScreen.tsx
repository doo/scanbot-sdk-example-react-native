import React from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Pages} from '../model/Pages';
import ScanbotSDK, {
  DocumentScannerConfiguration,
  Page,
} from 'react-native-scanbot-sdk/src';
import App from '../App';
import {Styles} from '../model/Styles';
import {SDKUtils} from '../utils/SDKUtils';
import {ViewUtils} from '../utils/ViewUtils';

export class ImageResultScreen extends React.Component {
  constructor(props: any) {
    super(props);
  }

  modalVisible = false;

  render() {
    return (
      <>
        <SafeAreaView style={Styles.INSTANCE.imageResults.container}>
          <View style={Styles.INSTANCE.imageResults.gallery}>
            {Pages.list.map((page) => (
              <TouchableOpacity onPress={() => this.onGalleryItemClick(page)}>
                <Image
                  style={Styles.INSTANCE.imageResults.galleryCell}
                  source={{uri: page.documentImageFileUri}}
                  key={page.pageId}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View style={Styles.INSTANCE.common.bottomBar}>
            <Text
              style={Styles.INSTANCE.common.bottomBarButton}
              onPress={() => this.addButtonPress()}>
              ADD
            </Text>
            <Text
              style={Styles.INSTANCE.common.bottomBarButton}
              onPress={() => this.saveButtonPress()}>
              SAVE
            </Text>
            <Text
              style={[
                Styles.INSTANCE.common.bottomBarButton,
                Styles.INSTANCE.common.alignRight,
              ]}
              onPress={() => this.deleteAllButtonPress()}>
              DELETE ALL
            </Text>
          </View>
        </SafeAreaView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.modalVisible}>
          <View style={Styles.INSTANCE.modal.centeredView}>
            <View style={Styles.INSTANCE.modal.modalView}>
              <Text style={Styles.INSTANCE.modal.text}>
                How would you like to save the pages?
              </Text>
              <Text
                style={[
                  Styles.INSTANCE.modal.button,
                  Styles.INSTANCE.modal.actionButton,
                ]}
                onPress={() => this.onSaveAsPDF()}>
                PDF
              </Text>
              <Text
                style={[
                  Styles.INSTANCE.modal.button,
                  Styles.INSTANCE.modal.actionButton,
                ]}
                onPress={() => this.onSaveAsPDFWithOCR()}>
                PDF with OCR
              </Text>
              <Text
                style={[
                  Styles.INSTANCE.modal.button,
                  Styles.INSTANCE.modal.actionButton,
                ]}
                onPress={() => this.onSaveAsTIFF()}>
                TIFF (1-bit B&W)
              </Text>
              <Text
                style={[
                  Styles.INSTANCE.modal.button,
                  Styles.INSTANCE.modal.closeButton,
                ]}
                onPress={() => this.onModalClose()}>
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
      polygonColor: '#00ffff',
      cameraPreviewMode: 'FIT_IN',
      orientationLockMode: 'PORTRAIT',
      pageCounterButtonTitle: '%d Page(s)',
      multiPageEnabled: true,
      ignoreBadAspectRatio: true,
      // documentImageSizeLimit: { width: 1500, height: 2000 },
      // maxNumberOfPages: 3,
      // ...
    };
    const result = await ScanbotSDK.UI.startDocumentScanner(config);
    Pages.addList(result.pages);

    this.forceUpdate();
  }
  saveButtonPress() {
    if (Pages.isEmpty()) {
      ViewUtils.showAlert(
        'You have no images to save. Scan a few documents first, mate!',
      );
    }
    this.modalVisible = true;
    this.forceUpdate();
  }

  deleteAllButtonPress() {
    Pages.list = [];
    this.forceUpdate();
  }

  private onGalleryItemClick(page: Page) {
    Pages.selectedPage = page;
    // @ts-ignore
    this.props.navigation.push(App.IMAGE_DETAILS);
  }

  private onModalClose() {
    this.modalVisible = false;
    this.forceUpdate();
  }

  async onSaveAsPDF() {
    this.onModalClose();
    if (!(await SDKUtils.checkLicense())) {
      return;
    }
    try {
      const result = await ScanbotSDK.createPDF(
        Pages.getImageUris(),
        'FIXED_A4',
      );
      ViewUtils.showAlert('PDF file created: ' + result.pdfFileUri);
    } finally {
    }
  }
  async onSaveAsPDFWithOCR() {
    this.onModalClose();
    if (!(await SDKUtils.checkLicense())) {
      return;
    }
    try {
      const result = await ScanbotSDK.performOCR(Pages.getImageUris(), ['en'], {
        outputFormat: 'FULL_OCR_RESULT',
      });
      ViewUtils.showAlert('PDF file created: ' + result.pdfFileUri);
    } finally {
    }
  }

  async onSaveAsTIFF() {
    this.onModalClose();
    if (!(await SDKUtils.checkLicense())) {
      return;
    }
    try {
      const result = await ScanbotSDK.writeTIFF(Pages.getImageUris(), {
        oneBitEncoded: true,
      });
      ViewUtils.showAlert('TIFF file created: ' + result.tiffFileUri);
    } finally {
    }
  }
}
