import {
  deleteAllConfirmationAlert,
  errorMessageAlert,
  infoMessageAlert,
  resultMessageAlert,
} from './Alerts';
import {selectPDFFileUri} from './FileUtils';
import {selectImagesFromLibrary} from './ImageUtils';
import {
  checkLicense,
  FILE_ENCRYPTION_ENABLED,
  IMAGE_FILE_FORMAT,
} from './SDKUtils';
import {GenericDocumentUtils} from './GenericDocumentUtils';
import {
  BarcodeResultScreenRouteProp,
  BarcodeV2ResultScreenRouteProp,
  CheckRecognizerResultScreenRouteProp,
  GenericDocumentResultScreenRouteProp,
  ImageDetailScreenRouteProp,
  MedicalCertificateResultScreenRouteProp,
  MrzResultScreenRouteProp,
  PlainDataResultParam,
  PlainDataResultScreenRouteProp,
  PrimaryRouteNavigationProp,
  PrimaryRoutesParamList,
  Screens,
  ScreenTitles,
} from './Navigation';

export {
  errorMessageAlert,
  resultMessageAlert,
  infoMessageAlert,
  deleteAllConfirmationAlert,
  selectPDFFileUri,
  selectImagesFromLibrary,
  IMAGE_FILE_FORMAT,
  FILE_ENCRYPTION_ENABLED,
  checkLicense,
  Screens,
  ScreenTitles,
  GenericDocumentUtils,
};

export type {
  PrimaryRoutesParamList,
  PrimaryRouteNavigationProp,
  ImageDetailScreenRouteProp,
  CheckRecognizerResultScreenRouteProp,
  MrzResultScreenRouteProp,
  MedicalCertificateResultScreenRouteProp,
  GenericDocumentResultScreenRouteProp,
  BarcodeResultScreenRouteProp,
  BarcodeV2ResultScreenRouteProp,
  PlainDataResultScreenRouteProp,
  PlainDataResultParam,
};
