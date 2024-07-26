import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {
  useApplyFilters,
  useCheckRecognizer,
  useDetectBarcodes,
  useDetectDocument,
  useDetectDocumentFromPage,
  useDocumentScanner,
  useEHICScanner,
  useExtractImagesFromPDF,
  useExtractPagesFromPDF,
  useFindAndPickScanning,
  useFinderDocumentScanner,
  useGenericDocumentScanner,
  useLegacyBarcodeScanner,
  useLegacyBatchBarcodesScanner,
  useLicenseInfo,
  useLicensePlateScanner,
  useLicenseValidityCheckWrapper,
  useMedicalCertificateScanner,
  useMRZScanner,
  useMultiScanning,
  useMultiScanningAR,
  useOCRConfigs,
  usePerformOCR,
  useRecognizeCheck,
  useRecognizeEHIC,
  useRecognizeGenericDocument,
  useRecognizeMedicalCertificate,
  useRecognizeMRZ,
  useSingleScanning,
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
import {
  PrimaryRouteNavigationProp,
  Screens,
  selectImagesFromLibrary,
} from '@utils';
import {useNavigation} from '@react-navigation/native';

export function HomeScreen() {
  const {loadPages} = useContext(PageContext);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<string>();
  const navigation = useNavigation<PrimaryRouteNavigationProp>();

  /** ScanbotSDK Features */
  const onDocumentScanner = useDocumentScanner();
  const onFinderDocumentScanner = useFinderDocumentScanner();
  const applyImageOnFilter = useApplyFilters();
  const onDetectDocumentFromPage = useDetectDocumentFromPage();
  const onDetectDocumentFromImage = useDetectDocument();
  const onExtractPagesFromPDF = useExtractPagesFromPDF();
  const onExtractImagesFromPDF = useExtractImagesFromPDF();
  const onBarcodeScanner = useLegacyBarcodeScanner();
  const onBatchBarcodesScanner = useLegacyBatchBarcodesScanner();
  const onSingleScanPress = useSingleScanning();
  const onMultiScanPress = useMultiScanning();
  const onMultiScanARPress = useMultiScanningAR();
  const onFindAndPickScanPress = useFindAndPickScanning();
  const onDetectBarcodesOnStillImage = useDetectBarcodes();
  const onMRZScanner = useMRZScanner();
  const onMedicalCertificateScanner = useMedicalCertificateScanner();
  const onGenericDocumentScanner = useGenericDocumentScanner();
  const onEHICScanner = useEHICScanner();
  const onLicensePlateScanner = useLicensePlateScanner();
  const onVinScanner = useVinScanner();
  const onTextDataScanner = useTextDataScanner();
  const onCheckScanner = useCheckRecognizer();
  const onRecognizeCheckOnImage = useRecognizeCheck();
  const onRecognizeMRZOnImage = useRecognizeMRZ();
  const onRecognizeMedicalCertificateOnImage = useRecognizeMedicalCertificate();
  const onRecognizeEHICOnImage = useRecognizeEHIC();
  const onRecognizeGenericDocument = useRecognizeGenericDocument();
  const onPerformOCR = usePerformOCR();
  const onLicenseInfo = useLicenseInfo();
  const onOCRConfigs = useOCRConfigs();

  useEffect(() => {
    loadPages();
  }, [loadPages]);

  const onClassicComponentScanner = useLicenseValidityCheckWrapper(function () {
    navigation.navigate(Screens.BARCODE_CAMERA_VIEW);
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
    <SafeAreaView style={styles.container}>
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
          onPress={onExtractPagesFromPDF}
          title={'Extract pages from PDF'}
        />
        <FeatureItem
          onPress={() => navigation.navigate(Screens.PAGE_RESULTS)}
          title={'View Page Results'}
        />

        <FeatureHeader title={'BARCODE DETECTOR'} />
        <FeatureItem
          title={'Single Scanning use case'}
          onPress={onSingleScanPress}
        />
        <FeatureItem
          title={'Multi Scanning use case'}
          onPress={onMultiScanPress}
        />
        <FeatureItem
          title={'Multi AR Scanning use case'}
          onPress={onMultiScanARPress}
        />
        <FeatureItem
          title={'Find And Pick Scanning use case'}
          onPress={onFindAndPickScanPress}
        />
        <FeatureItem
          onPress={onDetectBarcodesOnStillImage}
          title={'Detect Barcodes on image'}
        />
        <FeatureItem
          onPress={onClassicComponentScanner}
          title={'Barcode Camera View'}
        />
        <FeatureItem
          onPress={() => navigation.navigate(Screens.BARCODE_FORMATS)}
          title={'Set Barcode Formats Filter'}
        />
        <FeatureItem
          onPress={() => navigation.navigate(Screens.BARCODE_DOCUMENT_FORMATS)}
          title={'Set Barcode Document Formats Filter'}
        />

        <FeatureHeader title={'LEGACY BARCODE DETECTOR'} />
        <FeatureItem onPress={onBarcodeScanner} title={'Scan QR-/Barcode'} />
        <FeatureItem
          onPress={onBatchBarcodesScanner}
          title={'Scan Multiple QR-/Barcode'}
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
        <FeatureItem onPress={onVinScanner} title={'Scan VIN'} />
        <FeatureItem onPress={onTextDataScanner} title={'Scan Text Data'} />

        <FeatureHeader title={'DATA DETECTORS ON IMAGES'} />
        <FeatureItem
          onPress={onRecognizeCheckOnImage}
          title={'Recognize Check on Image'}
        />
        <FeatureItem
          onPress={onRecognizeMRZOnImage}
          title={'Recognize MRZ on Image'}
        />
        <FeatureItem
          onPress={onRecognizeMedicalCertificateOnImage}
          title={'Recognize Medical Certificate on Image'}
        />
        <FeatureItem
          onPress={onRecognizeEHICOnImage}
          title={'Recognize EHIC on Image'}
        />
        <FeatureItem
          onPress={onRecognizeGenericDocument}
          title={'Recognize Generic Document on Image'}
        />

        <FeatureHeader title={'MISCELLANEOUS'} />
        <FeatureItem
          onPress={onApplyFilterOnImage}
          title={'Apply Image Filter'}
        />
        <FeatureItem
          onPress={onDetectDocumentFromImage}
          title={'Detect document from image'}
        />
        <FeatureItem
          onPress={onExtractImagesFromPDF}
          title={'Extract images from PDF'}
        />
        <FeatureItem title={'Perform OCR on image'} onPress={onPerformOCR} />
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
    </SafeAreaView>
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
