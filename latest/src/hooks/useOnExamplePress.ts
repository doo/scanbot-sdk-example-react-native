import {FeatureId} from '../model/Examples';
import {useDocumentScanner} from './examples/useDocumentScanner';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp, Screens} from '../utils/Navigation';
import {useDetectDocumentFromPage} from './examples/useDetectDocumentFromPage';
import {useDetectDocumentFromImage} from './examples/useDetectDocumentFromImage';
import {useExtractPagesFromPDF} from './examples/useExtractPagesFromPDF';
import {useExtractImagesFromPDF} from './examples/useExtractImagesFromPDF';
import {useScanBarcodes} from './examples/useScanBarcodes';
import {useScanBatchBarcodes} from './examples/useScanBatchBarcodes';
import {useDetectBarcodesOnStillImage} from './examples/useDetectBarcodesOnStillImage';
import {useDetectBarcodesOnStillImages} from './examples/useDetectBarcodesOnStillImages';
import {useMRZScanner} from './examples/useMRZScanner';
import {useScanMedicalCertificate} from './examples/useScanMedicalCertificate';
import {useScanGenericDocument} from './examples/useScanGenericDocument';
import {useScanEHIC} from './examples/useScanEHIC';
import {useLicenseInfo} from './examples/useLicenseInfo';
import {useOCRConfigs} from './examples/useOCRConfigs';
import {useLicensePlateScanner} from './examples/useLicensePlateScanner';
import {useTextDataScanner} from './examples/useTextDataScanner';
import {useCheckRecognizer} from './examples/useCheckRecognizer';
import {useRecognizeCheckOnImage} from './examples/useRecognizeCheckOnImage';
import {useLicenseValidityCheckWrapper} from './useLicenseValidityCheck';

export function useOnExamplePress() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const functionsMap: Record<FeatureId, () => Promise<void> | void> = {
    [FeatureId.DocumentScanner]: useDocumentScanner(),
    [FeatureId.DetectDocumentFromPage]: useDetectDocumentFromPage(),
    [FeatureId.DetectDocumentFromImage]: useDetectDocumentFromImage(),
    [FeatureId.ExtractPagesFromPdf]: useExtractPagesFromPDF(),
    [FeatureId.ExtractImagesFromPdf]: useExtractImagesFromPDF(),
    [FeatureId.ViewPages]: function () {
      navigation.navigate(Screens.IMAGE_RESULTS);
    },
    [FeatureId.ScanBarcodes]: useScanBarcodes(),
    [FeatureId.ScanBatchBarcodes]: useScanBatchBarcodes(),
    [FeatureId.DetectBarcodesOnStillImage]: useDetectBarcodesOnStillImage(),
    [FeatureId.DetectBarcodesOnStillImages]: useDetectBarcodesOnStillImages(),
    [FeatureId.BarcodeFormatsFilter]: useLicenseValidityCheckWrapper(
      function () {
        navigation.navigate(Screens.BARCODE_FORMATS);
      },
    ),
    [FeatureId.BarcodeDocumentFormatsFilter]: useLicenseValidityCheckWrapper(
      function () {
        navigation.navigate(Screens.BARCODE_DOCUMENT_FORMATS);
      },
    ),
    [FeatureId.ScanMRZ]: useMRZScanner(),
    [FeatureId.ScanMedicalCertificate]: useScanMedicalCertificate(),
    [FeatureId.ScanGenericDocument]: useScanGenericDocument(),
    [FeatureId.ScanEHIC]: useScanEHIC(),
    [FeatureId.LicenseInfo]: useLicenseInfo(),
    [FeatureId.OcrConfigs]: useOCRConfigs(),
    [FeatureId.LicensePlateScannerML]: useLicensePlateScanner('MlBased'),
    [FeatureId.LicensePlateScannerClassic]: useLicensePlateScanner('Classic'),
    [FeatureId.TextDataScanner]: useTextDataScanner(),
    [FeatureId.CheckRecognizer]: useCheckRecognizer(),
    [FeatureId.BarcodeCameraViewComponent]: useLicenseValidityCheckWrapper(
      function () {
        navigation.navigate(Screens.BARCODE_CAMERA_VIEW);
      },
    ),
    [FeatureId.RecognizeCheckOnImage]: useRecognizeCheckOnImage(),
    [FeatureId.ApplyFilterOnImage]: function () {},
  };

  return functionsMap;
}
