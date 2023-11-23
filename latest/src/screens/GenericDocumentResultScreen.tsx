import React from 'react';
import {DeDriverLicenseBackDocument} from 'react-native-scanbot-sdk';
import {useRoute} from '@react-navigation/native';
import {GenericDocumentResultScreenRouteProp} from '../utils/Navigation';
import {ScanResultSectionList} from '../components/ScanResultSectionList';
import {
  ImageFieldWrapper,
  TextFieldWrapper,
  ValidatedTextFieldWrapper,
} from 'react-native-scanbot-sdk/src/internal/gdr/gdr-base-wrappers';
import {
  CategoriesDocument,
  DeDriverLicenseFrontDocument,
  DeIdCardBackDocument,
  DeIdCardFrontDocument,
  DePassportDocument,
  GenericDocumentResultType,
  MRZDocument,
} from 'react-native-scanbot-sdk/src/internal/gdr/gdr-wrappers';

export function GenericDocumentResultScreen() {
  const {params: genericDocumentResult} =
    useRoute<GenericDocumentResultScreenRouteProp>();

  return (
    <ScanResultSectionList
      sectionData={
        genericDocumentResult.documents?.map(documentResult => ({
          title: documentResult.document.type.name,
          data: transformData(documentResult),
        })) ?? []
      }
    />
  );
}

const transformData = (result: GenericDocumentResultType) => {
  let fields: Array<{key: string; value?: string; image?: string}> = [];

  switch (result.documentType) {
    case 'DeDriverLicenseBack':
      fields.push(
        ...getDriverLicenseBackFields(result as DeDriverLicenseBackDocument),
      );
      break;
    case 'DeDriverLicenseBack_categories':
      fields.push(
        ...getDriverLicenseBackCategoryFields(result as CategoriesDocument),
      );
      break;
    case 'DeDriverLicenseFront':
      fields.push(
        ...getDriverLicenseFrontFields(result as DeDriverLicenseFrontDocument),
      );
      break;
    case 'DeIdCardBack':
      fields.push(...getDeIdCardBackFields(result as DeIdCardBackDocument));
      break;
    case 'DeIdCardFront':
      fields.push(...getDeIdCardFrontFields(result as DeIdCardFrontDocument));
      break;
    case 'DePassport':
      fields.push(...getDePassportFields(result as DePassportDocument));
      break;
  }

  return fields;
};

// Common Display Utility Method
const getImageField = (field: ImageFieldWrapper) => ({
  key: field.type.name,
  image: field.image,
});

const getTextField = (field: TextFieldWrapper | ValidatedTextFieldWrapper) => ({
  key: field.type.name,
  value: field.value
    ? `${field.value.text} (confidence: ${(
        field.value.confidence * 100.0
      ).toFixed(0)}%)`
    : '-',
  image: field.image,
});

// Common Display Utility Method - for optional field wrappers
const getOptTextField = (
  field: TextFieldWrapper | ValidatedTextFieldWrapper | undefined,
  defaultName: string,
) => (field ? getTextField(field) : {key: defaultName, value: 'not detected'});

// MRZ Document Display Utility Method
const getMrzFields = (document: MRZDocument) =>
  [
    getTextField(document.birthDate),
    getTextField(document.givenNames),
    getTextField(document.surname),
    getOptTextField(document.issuingAuthority, 'Issuing Authority'),
    getOptTextField(document.languageCode, 'Language Code'),
    getOptTextField(document.nationality, 'Nationality'),
    getOptTextField(document.officeOfIssuance, 'Office Of Issuance'),
    getOptTextField(document.optional1, 'Optional1'),
    getOptTextField(document.optional2, 'Optional2'),
    getOptTextField(document.personalNumber, 'Personal Number'),
    getOptTextField(document.pinCode, 'Pin Code'),
    getOptTextField(document.travelDocType, 'Travel Doc Type'),
    getOptTextField(document.versionNumber, 'Version Number'),
    getOptTextField(document.checkDigitBirthDate, 'Check Digit Birth Date'),
    getOptTextField(document.checkDigitGeneral, 'Check Digit General'),
    getOptTextField(document.travelDocTypeVariant, 'Travel Doc Type Variant'),
    getOptTextField(document.checkDigitExpiryDate, 'Check Digit Expiry Date'),
    getOptTextField(document.dateOfIssuance, 'Date Of Issuance'),
    getOptTextField(document.documentNumber, 'Document Number'),
    getOptTextField(document.documentTypeCode, 'Document Type Code'),
    getOptTextField(document.expiryDate, 'Expiry Date'),
    getOptTextField(document.gender, 'Gender'),
    getOptTextField(
      document.checkDigitDocumentNumber,
      'Check Digit Document Number',
    ),
    getOptTextField(
      document.checkDigitPersonalNumber,
      'Check Digit Personal Number',
    ),
  ].map(entry => ({
    key: `MRZ - ${entry.key}`,
    value: entry.value,
  }));

// German Passport - Display Utility Method
const getDePassportFields = (passportDocument: DePassportDocument) => [
  getImageField(passportDocument.signature),
  getImageField(passportDocument.photo),
  getTextField(passportDocument.birthDate),
  getTextField(passportDocument.birthplace),
  getTextField(passportDocument.countryCode),
  getTextField(passportDocument.expiryDate),
  getTextField(passportDocument.gender),
  getTextField(passportDocument.givenNames),
  getOptTextField(passportDocument.maidenName, 'Maiden Name'),
  getTextField(passportDocument.surname),
  getTextField(passportDocument.id),
  getTextField(passportDocument.issueDate),
  getTextField(passportDocument.issuingAuthority),
  getTextField(passportDocument.nationality),
  getTextField(passportDocument.passportType),
  getTextField(passportDocument.rawMRZ),
  ...getMrzFields(passportDocument.mrz),
];

// German ID Card (FRONT) - Display Utility Method
const getDeIdCardFrontFields = (idCardDocument: DeIdCardFrontDocument) => [
  getTextField(idCardDocument.birthDate),
  getTextField(idCardDocument.birthplace),
  getTextField(idCardDocument.expiryDate),
  getTextField(idCardDocument.givenNames),
  getTextField(idCardDocument.id),
  getTextField(idCardDocument.nationality),
  getTextField(idCardDocument.pin),
  getTextField(idCardDocument.surname),
  getOptTextField(idCardDocument.maidenName, 'Maiden Name'),
  getImageField(idCardDocument.signature),
  getImageField(idCardDocument.photo),
];

// German ID Card (BACK) - Display Utility Method
const getDeIdCardBackFields = (idCardDocument: DeIdCardBackDocument) => [
  getTextField(idCardDocument.address),
  getTextField(idCardDocument.eyeColor),
  getTextField(idCardDocument.height),
  getTextField(idCardDocument.issuingAuthority),
  getTextField(idCardDocument.pseudonym),
  getTextField(idCardDocument.rawMRZ),
  ...getMrzFields(idCardDocument.mrz),
];

// Driver License (BACK - Categories) - Display Utility Method
const getDriverLicenseBackCategoryFields = (categories: CategoriesDocument) => [
  getDriverLicenseCategoryField('A', categories.a),
  getDriverLicenseCategoryField('A1', categories.a1),
  getDriverLicenseCategoryField('A2', categories.a2),
  getDriverLicenseCategoryField('B', categories.b),
  getDriverLicenseCategoryField('B1', categories.b1),
  getDriverLicenseCategoryField('BE', categories.be),
  getDriverLicenseCategoryField('C', categories.c),
  getDriverLicenseCategoryField('C1', categories.c1),
  getDriverLicenseCategoryField('C1E', categories.c1e),
  getDriverLicenseCategoryField('CE', categories.ce),
  getDriverLicenseCategoryField('D', categories.d),
  getDriverLicenseCategoryField('D1', categories.d1),
  getDriverLicenseCategoryField('D1E', categories.d1e),
  getDriverLicenseCategoryField('DE', categories.de),
  getDriverLicenseCategoryField('L', categories.l),
  getDriverLicenseCategoryField('M', categories.m),
  getDriverLicenseCategoryField('T', categories.t),
];

// Driver License (FRONT) - Display Utility Method
const getDriverLicenseFrontFields = (
  document: DeDriverLicenseFrontDocument,
) => [
  getImageField(document.photo),
  getImageField(document.signature),
  getTextField(document.givenNames),
  getTextField(document.surname),
  getTextField(document.birthDate),
  getTextField(document.birthplace),
  getTextField(document.id),
  getTextField(document.issueDate),
  getTextField(document.issuingAuthority),
  getTextField(document.licenseCategories),
];

// Driver License (BACK) - Display Utility Method
const getDriverLicenseBackFields = (document: DeDriverLicenseBackDocument) => {
  const fields: Array<{key: string; value: string}> = [];

  // Restrictions
  fields.push(getTextField(document.restrictions));

  // Categories
  const categories = document.categories;
  fields.push(...getDriverLicenseBackCategoryFields(categories));

  return fields;
};

// Driver License Category - Display Utility Method
const getDriverLicenseCategoryField = (
  displayName: string,
  category?: {
    validFrom: TextFieldWrapper;
    validUntil: TextFieldWrapper;
  },
) => {
  const from = category?.validFrom.value;
  const until = category?.validUntil.value;

  if ((!from && !until) || (!from?.text.length && !until?.text.length)) {
    return {
      key: displayName,
      value: '-',
    };
  }

  const fromText = !from?.text.length ? '-' : from?.text;
  const untilText = !until?.text.length ? '-' : until?.text;

  return {
    key: displayName,
    value: category ? `From ${fromText} to ${untilText}` : 'n/a',
  };
};
