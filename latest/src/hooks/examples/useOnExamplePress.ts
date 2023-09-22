import {FeatureId} from '../../model/Examples';
import {useDocumentScanner} from './useDocumentScanner';
import {useNavigation} from '@react-navigation/native';
import {PrimaryRouteNavigationProp, Screens} from '../../utils/Navigation';
import {useDetectDocumentFromPage} from './useDetectDocumentFromPage';
import {useDetectDocumentFromImage} from './useDetectDocumentFromImage';
import {useExtractPagesFromPDF} from './useExtractPagesFromPDF';
import {useExtractImagesFromPDF} from './useExtractImagesFromPDF';
import {useScanBarcodes} from './useScanBarcodes';
import {useScanBatchBarcodes} from './useScanBatchBarcodes';
import {useDetectBarcodesOnStillImage} from './useDetectBarcodesOnStillImage';
import {useDetectBarcodesOnStillImages} from './useDetectBarcodesOnStillImages';
import {useMRZScanner} from './useMRZScanner';
import {useScanMedicalCertificate} from './useScanMedicalCertificate';
import {useScanGenericDocument} from './useScanGenericDocument';
import {useScanEHIC} from './useScanEHIC';
import {useLicenseInfo} from './useLicenseInfo';
import {useOCRConfigs} from './useOCRConfigs';
import {useLicensePlateScanner} from './useLicensePlateScanner';
import {useTextDataScanner} from './useTextDataScanner';
import {useCheckRecognizer} from './useCheckRecognizer';
import {useRecognizeCheckOnImage} from './useRecognizeCheckOnImage';

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
    [FeatureId.BarcodeFormatsFilter]: function () {
      navigation.navigate(Screens.BARCODE_FORMATS);
    },
    [FeatureId.BarcodeDocumentFormatsFilter]: function () {
      navigation.navigate(Screens.BARCODE_DOCUMENT_FORMATS);
    },
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
    [FeatureId.BarcodeCameraViewComponent]: function () {
      navigation.navigate(Screens.BARCODE_CAMERA_VIEW);
    },
    [FeatureId.RecognizeCheckOnImage]: useRecognizeCheckOnImage(),
    [FeatureId.ApplyFilterOnImage]: function () {},
  };

  return functionsMap;
}
