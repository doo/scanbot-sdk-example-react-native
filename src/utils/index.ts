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
import {
  BarcodeResultScreenRouteProp,
  CheckRecognizerResultScreenRouteProp,
  GenericDocumentResultScreenRouteProp,
  ImageDetailScreenRouteProp,
  MedicalCertificateResultScreenRouteProp,
  MrzResultScreenRouteProp,
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
};
