import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {
  useCheckScanner,
  useCleanup,
  useCreateDocumentWithPage,
  useCreditCardScanner,
  useDocumentDataExtractor,
  useDocumentDataExtractorOnImage,
  useDocumentQualityAnalyzer,
  useLicenseInfo,
  useMedicalCertificateScanner,
  useMRZScanner,
  useMultiplePageScanning,
  useOCRConfigs,
  usePerformOCR,
  useRecognizeCheck,
  useRecognizeCreditCard,
  useRecognizeMedicalCertificate,
  useRecognizeMRZ,
  useSinglePageScanning,
  useSinglePageScanningWithFinder,
  useTextPatternScanner,
  useVinScanner,
} from '@hooks';
import {FeatureHeader, FeatureItem, ScanbotLearnMore} from '@components';
import {PrimaryRouteNavigationProp, Screens} from '@utils';
import {useNavigation} from '@react-navigation/native';

export function HomeScreen() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  /** ScanbotSDK Features */
  const onMRZScanner = useMRZScanner();
  const onMedicalCertificateScanner = useMedicalCertificateScanner();
  const onDocumentDataExtractor = useDocumentDataExtractor();
  const onVinScanner = useVinScanner();
  const onCheckScanner = useCheckScanner();
  const onCreditCardScanner = useCreditCardScanner();
  const onTextPatternScanner = useTextPatternScanner();
  const onRecognizeCheckOnImage = useRecognizeCheck();
  const onRecognizeMRZOnImage = useRecognizeMRZ();
  const onRecognizeMedicalCertificateOnImage = useRecognizeMedicalCertificate();
  const onDocumentDataExtractorOnImage = useDocumentDataExtractorOnImage();
  const onRecognizeCreditCard = useRecognizeCreditCard();
  const onPerformOCR = usePerformOCR();
  const onDocumentQualityAnalyzer = useDocumentQualityAnalyzer();
  const onLicenseInfo = useLicenseInfo();
  const onOCRConfigs = useOCRConfigs();
  const onCleanup = useCleanup();
  const onSinglePageScanning = useSinglePageScanning();
  const onSinglePageScanningWithFinder = useSinglePageScanningWithFinder();
  const onMultiplePageScanning = useMultiplePageScanning();
  const onCreateDocument = useCreateDocumentWithPage();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        <FeatureHeader title={'DOCUMENT SCANNING'} />
        <FeatureItem
          onPress={onSinglePageScanning}
          title={'Single Page Scanning'}
        />
        <FeatureItem
          onPress={onSinglePageScanningWithFinder}
          title={'Single Page Scanning with Finder'}
        />
        <FeatureItem
          onPress={onMultiplePageScanning}
          title={'Multi Page Scanning'}
        />
        <FeatureItem
          title={'Create Document from Image'}
          onPress={onCreateDocument}
        />
        <FeatureItem
          title={'Document Scanner View (Classic UI)'}
          onPress={() => navigation.navigate(Screens.DOCUMENT_SCANNER_VIEW)}
        />

        <FeatureHeader title={'DATA DETECTORS'} />
        <FeatureItem onPress={onMRZScanner} title={'Scan MRZ'} />
        <FeatureItem
          onPress={onMedicalCertificateScanner}
          title={'Scan Medical Certificate'}
        />
        <FeatureItem onPress={onCheckScanner} title={'Scan Check'} />
        <FeatureItem onPress={onVinScanner} title={'Scan VIN'} />
        <FeatureItem onPress={onCreditCardScanner} title={'Scan Credit Card'} />
        <FeatureItem
          onPress={onTextPatternScanner}
          title={'Scan Text Pattern'}
        />
        <FeatureItem
          onPress={onDocumentDataExtractor}
          title={'Document Data Extractor'}
        />

        <FeatureHeader title={'DATA DETECTORS ON IMAGES'} />
        <FeatureItem
          onPress={onRecognizeMRZOnImage}
          title={'Recognize MRZ on Image'}
        />
        <FeatureItem
          onPress={onRecognizeMedicalCertificateOnImage}
          title={'Recognize Medical Certificate on Image'}
        />
        <FeatureItem
          onPress={onRecognizeCheckOnImage}
          title={'Recognize Check on Image'}
        />
        <FeatureItem
          onPress={onRecognizeCreditCard}
          title={'Recognize Credit Card on Image'}
        />
        <FeatureItem
          onPress={onDocumentDataExtractorOnImage}
          title={'Extract Document Data from Image'}
        />

        <FeatureHeader title={'MISCELLANEOUS'} />
        <FeatureItem
          onPress={onDocumentQualityAnalyzer}
          title={'Document Quality Analyzer'}
        />
        <FeatureItem title={'Perform OCR on image'} onPress={onPerformOCR} />
        <FeatureItem onPress={onOCRConfigs} title={'OCR Configs'} />
        <FeatureItem onPress={onLicenseInfo} title={'License Info'} />
        <FeatureItem onPress={onCleanup} title={'Clear storage'} />
        <ScanbotLearnMore />
      </ScrollView>
      <Text style={styles.copyrightLabel}>
        Copyright {new Date().getFullYear()} Scanbot SDK GmbH. All rights
        reserved.
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
