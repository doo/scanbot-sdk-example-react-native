import {
  deleteConfirmationAlert,
  errorMessageAlert,
  infoMessageAlert,
  resultMessageAlert,
} from './Alerts';
import {selectPDFFile} from './FileUtils';
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
  MrzResultScreenRouteProp,
  PlainDataResultParam,
  PlainDataResultScreenRouteProp,
  CreditCardResultScreenRouteProp,
  PrimaryRouteNavigationProp,
  PrimaryRoutesParamList,
  DocumentPageResultScreenRouteProp,
  Screens,
  ScreenTitles,
  CroppingViewScreenRouteProp,
} from './Navigation';

export {
  errorMessageAlert,
  resultMessageAlert,
  infoMessageAlert,
  deleteConfirmationAlert,
  selectPDFFile,
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
  DocumentDataExtractionResultScreenRouteProp,
  PlainDataResultScreenRouteProp,
  PlainDataResultParam,
  DocumentPageResultScreenRouteProp,
  CreditCardResultScreenRouteProp,
  CroppingViewScreenRouteProp,
};
