import {
  deleteAllConfirmationAlert,
  errorMessageAlert,
  infoMessageAlert,
  resultMessageAlert,
  removePageConfirmationAlert,
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
  CheckRecognizerResultScreenRouteProp,
  GenericDocumentResultScreenRouteProp,
  MedicalCertificateResultScreenRouteProp,
  MrzResultScreenRouteProp,
  PlainDataResultParam,
  PlainDataResultScreenRouteProp,
  PrimaryRouteNavigationProp,
  PrimaryRoutesParamList,
  DocumentV2PageResultScreenRouteProp,
  Screens,
  ScreenTitles,
} from './Navigation';

export {
  errorMessageAlert,
  resultMessageAlert,
  infoMessageAlert,
  deleteAllConfirmationAlert,
  removePageConfirmationAlert,
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
  CheckRecognizerResultScreenRouteProp,
  MrzResultScreenRouteProp,
  MedicalCertificateResultScreenRouteProp,
  GenericDocumentResultScreenRouteProp,
  PlainDataResultScreenRouteProp,
  PlainDataResultParam,
  DocumentV2PageResultScreenRouteProp,
};
