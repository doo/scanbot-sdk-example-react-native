import {
  deleteAllConfirmationAlert,
  errorMessageAlert,
  infoMessageAlert,
  resultMessageAlert,
  removePageConfirmationAlert,
} from './Alerts';
import {selectPDFFileUri} from './FileUtils';
import {selectImagesFromLibrary, selectImageFromLibrary} from './ImageUtils';
import {
  checkLicense,
  FILE_ENCRYPTION_ENABLED,
  IMAGE_FILE_FORMAT,
} from './SDKUtils';
import {GenericDocumentUtils} from './GenericDocumentUtils';
import {
  CheckRecognizerResultScreenRouteProp,
  DocumentDataExtractionResultScreenRouteProp,
  MedicalCertificateResultScreenRouteProp,
  MrzResultScreenRouteProp,
  PlainDataResultParam,
  PlainDataResultScreenRouteProp,
  CreditCardResultScreenRouteProp,
  PrimaryRouteNavigationProp,
  PrimaryRoutesParamList,
  DocumentPageResultScreenRouteProp,
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
  selectImageFromLibrary,
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
  DocumentDataExtractionResultScreenRouteProp,
  PlainDataResultScreenRouteProp,
  PlainDataResultParam,
  DocumentPageResultScreenRouteProp,
  CreditCardResultScreenRouteProp,
};
