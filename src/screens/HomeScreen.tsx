import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  useApplyFiltersOnImage,
  useBarcodeScanner,
  useBatchBarcodesScanner,
  useCheckRecognizer,
  useDetectBarcodesOnStillImage,
  useDetectDocumentFromImage,
  useDetectDocumentFromPage,
  useDocumentScanner,
  useEHICScanner,
  useExtractImagesFromPDF,
  useExtractPagesFromPDF,
  useFinderDocumentScanner,
  useGenericDocumentScanner,
  useLicenseInfo,
  useLicensePlateScanner,
  useLicenseValidityCheckWrapper,
  useMedicalCertificateScanner,
  useOCRConfigs,
  useRecognizeCheckOnImage,
  useTextDataScanner,
  useVinScanner,
} from '@hooks';
import {
  FeatureHeader,
  FeatureItem,
  ImageFilterModal,
  ScanbotLearnMore,
} from '@components';
import {PageContext} from '@context';
import {ParametricFilter} from 'react-native-scanbot-sdk';
import {ScrollView} from 'react-native-gesture-handler';
import {
  PrimaryRouteNavigationProp,
  Screens,
  selectImagesFromLibrary,
} from '@utils';
import {useNavigation} from '@react-navigation/native';
import {useMRZScanner} from '../hooks/RTUUI/useMRZScanner';

export function HomeScreen() {
  const {loadPages} = useContext(PageContext);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<string>();
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  /** ScanbotSDK Features */
  const onDocumentScanner = useDocumentScanner();
  const onFinderDocumentScanner = useFinderDocumentScanner();
  const applyImageOnFilter = useApplyFiltersOnImage();
  const onDetectDocumentFromPage = useDetectDocumentFromPage();
  const onDetectDocumentFromImage = useDetectDocumentFromImage();
  const onExtractPagesFromPDF = useExtractPagesFromPDF();
  const onExtractImagesFromPDF = useExtractImagesFromPDF();
  const onBarcodeScanner = useBarcodeScanner();
  const onBatchBarcodesScanner = useBatchBarcodesScanner();
  const onDetectBarcodesOnStillImage = useDetectBarcodesOnStillImage();
  const onMRZScanner = useMRZScanner();
  const onMedicalCertificateScanner = useMedicalCertificateScanner();
  const onGenericDocumentScanner = useGenericDocumentScanner();
  const onEHICScanner = useEHICScanner();
  const onLicensePlateScanner = useLicensePlateScanner();
  const onVinScanner = useVinScanner();
  const onTextDataScanner = useTextDataScanner();
  const onCheckScanner = useCheckRecognizer();
  const onRecognizeCheckOnImage = useRecognizeCheckOnImage();
  const onLicenseInfo = useLicenseInfo();
  const onOCRConfigs = useOCRConfigs();

  useEffect(() => {
    loadPages();
  }, [loadPages]);

  const onClassicComponentScanner = useLicenseValidityCheckWrapper(function () {
    navigation.navigate(Screens.BARCODE_DOCUMENT_FORMATS);
  });

  const onApplyFilterOnImage = useCallback(async () => {
    const selectedImage = await selectImagesFromLibrary();
    if (!selectedImage) {
      return;
    }
    imageRef.current = selectedImage[0];
    setIsVisible(true);
  }, []);

  const onFilterSelect = useCallback(
    async (filter: ParametricFilter) => {
      await applyImageOnFilter(filter, imageRef.current!!);
    },
    [applyImageOnFilter],
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <FeatureHeader title={'DOCUMENT SCANNING'} />
        <FeatureItem onPress={onDocumentScanner} title={'Scan Document'} />
        <FeatureItem
          onPress={onFinderDocumentScanner}
          title={'Scan Document with Finder'}
        />
        <FeatureItem
          onPress={onDetectDocumentFromPage}
          title={'Import Image & Detect Document'}
        />
        <FeatureItem
          onPress={onDetectDocumentFromImage}
          title={'Import Image & Detect Document (JSON)'}
        />
        <FeatureItem
          onPress={onExtractPagesFromPDF}
          title={'Extract pages from PDF'}
        />
        <FeatureItem
          onPress={onExtractImagesFromPDF}
          title={'Extract images from PDF'}
        />
        <FeatureItem
          onPress={() => navigation.navigate(Screens.IMAGE_RESULTS)}
          title={'View Image Results'}
        />

        <FeatureHeader title={'BARCODE DETECTOR'} />
        <FeatureItem onPress={onBarcodeScanner} title={'Scan QR-/Barcode'} />
        <FeatureItem
          onPress={onBatchBarcodesScanner}
          title={'Scan Multiple QR-/Barcode'}
        />
        <FeatureItem
          onPress={onClassicComponentScanner}
          title={'Barcode Camera View (EXPERIMENTAL)'}
        />
        <FeatureItem
          onPress={onDetectBarcodesOnStillImage}
          title={'Detect Barcodes on image'}
        />
        <FeatureItem
          onPress={() => navigation.navigate(Screens.BARCODE_FORMATS)}
          title={'Set Barcode Formats Filter'}
        />
        <FeatureItem
          onPress={() => navigation.navigate(Screens.BARCODE_DOCUMENT_FORMATS)}
          title={'Set Barcode Document Formats Filter'}
        />

        <FeatureHeader title={'DATA DETECTORS'} />
        <FeatureItem onPress={onMRZScanner} title={'Scan MRZ'} />
        <FeatureItem
          onPress={onMedicalCertificateScanner}
          title={'Scan Medical Certificate'}
        />
        <FeatureItem
          onPress={onGenericDocumentScanner}
          title={'Scan Generic Document'}
        />
        <FeatureItem onPress={onCheckScanner} title={'Scan Check'} />
        <FeatureItem
          onPress={onEHICScanner}
          title={'Scan Health Insurance Card'}
        />
        <FeatureItem
          onPress={onLicensePlateScanner}
          title={'Scan Vehicle License Plate'}
        />
        <FeatureItem onPress={onVinScanner} title={'Start VIN Scanner'} />
        <FeatureItem
          onPress={onTextDataScanner}
          title={'Start Text Data Scanner'}
        />

        <FeatureHeader title={'DATA DETECTORS ON IMAGES'} />
        <FeatureItem
          onPress={onRecognizeCheckOnImage}
          title={'Recognize Check on Image'}
        />

        <FeatureHeader title={'MISCELLANEOUS'} />
        <FeatureItem
          onPress={onApplyFilterOnImage}
          title={'Import Image and Apply Filter'}
        />
        <FeatureItem onPress={onLicenseInfo} title={'License Info'} />
        <FeatureItem onPress={onOCRConfigs} title={'OCR Configs'} />
        <ScanbotLearnMore />
      </ScrollView>
      <ImageFilterModal
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        onSelect={onFilterSelect}
      />
      <Text style={styles.copyrightLabel}>
        Copyright {new Date().getFullYear()} doo GmbH. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: '1%',
    marginLeft: '5%',
    height: '90%',
    width: '90%',
  },
  copyrightLabel: {
    textAlign: 'center',
    lineHeight: 40,
    width: '100%',
    height: 40,
    color: 'gray',
    fontSize: 12,
  },
});
