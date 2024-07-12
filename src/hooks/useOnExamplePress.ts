import {FeatureId} from '../utils/Examples';
import {useDocumentScanner} from './RTUUI/useDocumentScanner';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp, Screens} from '../utils/Navigation';
import {useBarcodeScanner} from './RTUUI/useBarcodeScanner';
import {useBatchBarcodesScanner} from './RTUUI/useBatchBarcodesScanner';
import {useMRZScanner} from './RTUUI/useMRZScanner';
import {useMedicalCertificateScanner} from './RTUUI/useMedicalCertificateScanner';
import {useGenericDocumentScanner} from './RTUUI/useGenericDocumentScanner';
import {useEHICScanner} from './RTUUI/useEHICScanner';
import {useLicensePlateScanner} from './RTUUI/useLicensePlateScanner';
import {useTextDataScanner} from './RTUUI/useTextDataScanner';
import {useCheckRecognizer} from './RTUUI/useCheckRecognizer';
import {useLicenseValidityCheckWrapper} from './useLicenseValidityCheck';
import {useFinderDocumentScanner} from './RTUUI/useFinderDocumentScanner';
import {useVinScanner} from './RTUUI/useVinScanner';
import {useDetectDocumentFromPage} from './Operations/useDetectDocumentFromPage';
import {useDetectDocumentFromImage} from './Operations/useDetectDocumentFromImage';
import {useExtractPagesFromPDF} from './Operations/useExtractPagesFromPDF';
import {useExtractImagesFromPDF} from './Operations/useExtractImagesFromPDF';
import {useDetectBarcodesOnStillImage} from './Operations/useDetectBarcodesOnStillImage';
import {useDetectBarcodesOnStillImages} from './Operations/useDetectBarcodesOnStillImages';
import {useLicenseInfo} from './Operations/useLicenseInfo';
import {useOCRConfigs} from './Operations/useOCRConfigs';
import {useRecognizeCheckOnImage} from './Operations/useRecognizeCheckOnImage';

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
