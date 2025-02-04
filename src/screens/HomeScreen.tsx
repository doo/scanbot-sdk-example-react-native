import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {
  useCheckRecognizer,
  useCleanup,
  useCreateDocumentWithPage,
  useDocumentQualityAnalyzer,
  useEHICScanner,
  useGenericDocumentScanner,
  useLicenseInfo,
  useLicensePlateScanner,
  useMedicalCertificateScanner,
  useMRZScanner,
  useMultiplePageScanning,
  useOCRConfigs,
  usePerformOCR,
  useRecognizeCheck,
  useRecognizeEHIC,
  useRecognizeGenericDocument,
  useRecognizeMedicalCertificate,
  useRecognizeMRZ,
  useSinglePageScanning,
  useSinglePageScanningWithFinder,
  useTextDataScanner,
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
        <FeatureItem title={'Pick from gallery'} onPress={onCreateDocument} />
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
        <FeatureItem
          onPress={onGenericDocumentScanner}
          title={'Scan Generic Document'}
        />
        <FeatureItem onPress={onCheckScanner} title={'Scan Check'} />
        <FeatureItem onPress={onEHICScanner} title={'Scan EHIC'} />
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
