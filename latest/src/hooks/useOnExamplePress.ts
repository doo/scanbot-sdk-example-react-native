import {FeatureId} from '../utils/Examples';
import {useDocumentScanner} from './examples/useDocumentScanner';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp, Screens} from '../utils/Navigation';
import {useDetectDocumentFromPage} from './examples/useDetectDocumentFromPage';
import {useDetectDocumentFromImage} from './examples/useDetectDocumentFromImage';
import {useExtractPagesFromPDF} from './examples/useExtractPagesFromPDF';
import {useExtractImagesFromPDF} from './examples/useExtractImagesFromPDF';
import {useBarcodeScanner} from './examples/useBarcodeScanner';
import {useBatchBarcodesScanner} from './examples/useBatchBarcodesScanner';
import {useDetectBarcodesOnStillImage} from './examples/useDetectBarcodesOnStillImage';
import {useDetectBarcodesOnStillImages} from './examples/useDetectBarcodesOnStillImages';
import {useMRZScanner} from './examples/useMRZScanner';
import {useMedicalCertificateScanner} from './examples/useMedicalCertificateScanner';
import {useGenericDocumentScanner} from './examples/useGenericDocumentScanner';
import {useEHICScanner} from './examples/useEHICScanner';
import {useLicenseInfo} from './examples/useLicenseInfo';
import {useOCRConfigs} from './examples/useOCRConfigs';
import {useLicensePlateScanner} from './examples/useLicensePlateScanner';
import {useTextDataScanner} from './examples/useTextDataScanner';
import {useCheckRecognizer} from './examples/useCheckRecognizer';
import {useRecognizeCheckOnImage} from './examples/useRecognizeCheckOnImage';
import {useLicenseValidityCheckWrapper} from './useLicenseValidityCheck';
import {useFinderDocumentScanner} from './examples/useFinderDocumentScanner';
import {useVinScanner} from './examples/useVinScanner';

export function useOnExamplePress() {
  const navigation = useNavigation<PrimaryRouteNavigationProp>();
  const functionsMap: Record<FeatureId, () => Promise<void> | void> = {
    [FeatureId.DocumentScanner]: useDocumentScanner(),
    [FeatureId.FinderDocumentScanner]: useFinderDocumentScanner(),
    [FeatureId.DetectDocumentFromPage]: useDetectDocumentFromPage(),
    [FeatureId.DetectDocumentFromImage]: useDetectDocumentFromImage(),
    [FeatureId.ExtractPagesFromPdf]: useExtractPagesFromPDF(),
    [FeatureId.ExtractImagesFromPdf]: useExtractImagesFromPDF(),
    [FeatureId.ViewPages]: function () {
      navigation.navigate(Screens.IMAGE_RESULTS);
    },
    [FeatureId.ScanBarcodes]: useBarcodeScanner(),
    [FeatureId.ScanBatchBarcodes]: useBatchBarcodesScanner(),
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
    [FeatureId.ScanMedicalCertificate]: useMedicalCertificateScanner(),
    [FeatureId.ScanGenericDocument]: useGenericDocumentScanner(),
    [FeatureId.ScanEHIC]: useEHICScanner(),
    [FeatureId.LicenseInfo]: useLicenseInfo(),
    [FeatureId.OcrConfigs]: useOCRConfigs(),
    [FeatureId.LicensePlateScannerML]: useLicensePlateScanner('ML_BASED'),
    [FeatureId.LicensePlateScannerClassic]: useLicensePlateScanner('CLASSIC'),
    [FeatureId.VinScanner]: useVinScanner(),
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
