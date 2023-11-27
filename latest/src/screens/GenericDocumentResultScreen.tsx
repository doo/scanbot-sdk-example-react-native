import React from 'react';
import {DeDriverLicenseBackDocument} from 'react-native-scanbot-sdk';
import {useRoute} from '@react-navigation/native';
import {GenericDocumentResultScreenRouteProp} from '../utils/Navigation';
import {ScanResultSectionList} from '../components/ScanResultSectionList';
import {
  CategoriesDocument,
  DeDriverLicenseFrontDocument,
  DeIdCardBackDocument,
  DeIdCardFrontDocument,
  DePassportDocument,
  GenericDocumentResultType,
  MRZDocument,
} from 'react-native-scanbot-sdk/src/internal/gdr/gdr-wrappers';
import {GenericDocumentUtils} from '../utils/GenericDocumentUtils';
import {TextFieldWrapper} from 'react-native-scanbot-sdk/src/internal/gdr/gdr-base-wrappers';

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

// MRZ Document Display Utility Method
const getMrzFields = (document: MRZDocument) =>
  [
    GenericDocumentUtils.getTextField(document.birthDate),
    GenericDocumentUtils.getTextField(document.givenNames),
    GenericDocumentUtils.getTextField(document.surname),
    GenericDocumentUtils.getOptTextField(
      document.issuingAuthority,
      'Issuing Authority',
    ),
    GenericDocumentUtils.getOptTextField(
      document.languageCode,
      'Language Code',
    ),
    GenericDocumentUtils.getOptTextField(document.nationality, 'Nationality'),
    GenericDocumentUtils.getOptTextField(
      document.officeOfIssuance,
      'Office Of Issuance',
    ),
    GenericDocumentUtils.getOptTextField(document.optional1, 'Optional1'),
    GenericDocumentUtils.getOptTextField(document.optional2, 'Optional2'),
    GenericDocumentUtils.getOptTextField(
      document.personalNumber,
      'Personal Number',
    ),
    GenericDocumentUtils.getOptTextField(document.pinCode, 'Pin Code'),
    GenericDocumentUtils.getOptTextField(
      document.travelDocType,
      'Travel Doc Type',
    ),
    GenericDocumentUtils.getOptTextField(
      document.versionNumber,
      'Version Number',
    ),
    GenericDocumentUtils.getOptTextField(
      document.checkDigitBirthDate,
      'Check Digit Birth Date',
    ),
    GenericDocumentUtils.getOptTextField(
      document.checkDigitGeneral,
      'Check Digit General',
    ),
    GenericDocumentUtils.getOptTextField(
      document.travelDocTypeVariant,
      'Travel Doc Type Variant',
    ),
    GenericDocumentUtils.getOptTextField(
      document.checkDigitExpiryDate,
      'Check Digit Expiry Date',
    ),
    GenericDocumentUtils.getOptTextField(
      document.dateOfIssuance,
      'Date Of Issuance',
    ),
    GenericDocumentUtils.getOptTextField(
      document.documentNumber,
      'Document Number',
    ),
    GenericDocumentUtils.getOptTextField(
      document.documentTypeCode,
      'Document Type Code',
    ),
    GenericDocumentUtils.getOptTextField(document.expiryDate, 'Expiry Date'),
    GenericDocumentUtils.getOptTextField(document.gender, 'Gender'),
    GenericDocumentUtils.getOptTextField(
      document.checkDigitDocumentNumber,
      'Check Digit Document Number',
    ),
    GenericDocumentUtils.getOptTextField(
      document.checkDigitPersonalNumber,
      'Check Digit Personal Number',
    ),
  ].map(entry => ({
    key: `MRZ - ${entry.key}`,
    value: entry.value,
  }));

// German Passport - Display Utility Method
const getDePassportFields = (passportDocument: DePassportDocument) => [
  GenericDocumentUtils.getImageField(passportDocument.signature),
  GenericDocumentUtils.getImageField(passportDocument.photo),
  GenericDocumentUtils.getTextField(passportDocument.birthDate),
  GenericDocumentUtils.getTextField(passportDocument.birthplace),
  GenericDocumentUtils.getTextField(passportDocument.countryCode),
  GenericDocumentUtils.getTextField(passportDocument.expiryDate),
  GenericDocumentUtils.getTextField(passportDocument.gender),
  GenericDocumentUtils.getTextField(passportDocument.givenNames),
  GenericDocumentUtils.getOptTextField(
    passportDocument.maidenName,
    'Maiden Name',
  ),
  GenericDocumentUtils.getTextField(passportDocument.surname),
  GenericDocumentUtils.getTextField(passportDocument.id),
  GenericDocumentUtils.getTextField(passportDocument.issueDate),
  GenericDocumentUtils.getTextField(passportDocument.issuingAuthority),
  GenericDocumentUtils.getTextField(passportDocument.nationality),
  GenericDocumentUtils.getTextField(passportDocument.passportType),
  GenericDocumentUtils.getTextField(passportDocument.rawMRZ),
  ...getMrzFields(passportDocument.mrz),
];

// German ID Card (FRONT) - Display Utility Method
const getDeIdCardFrontFields = (idCardDocument: DeIdCardFrontDocument) => [
  GenericDocumentUtils.getImageField(idCardDocument.signature),
  GenericDocumentUtils.getImageField(idCardDocument.photo),
  GenericDocumentUtils.getTextField(idCardDocument.birthDate),
  GenericDocumentUtils.getTextField(idCardDocument.birthplace),
  GenericDocumentUtils.getTextField(idCardDocument.expiryDate),
  GenericDocumentUtils.getTextField(idCardDocument.givenNames),
  GenericDocumentUtils.getTextField(idCardDocument.id),
  GenericDocumentUtils.getTextField(idCardDocument.nationality),
  GenericDocumentUtils.getTextField(idCardDocument.pin),
  GenericDocumentUtils.getTextField(idCardDocument.surname),
  GenericDocumentUtils.getOptTextField(
    idCardDocument.maidenName,
    'Maiden Name',
  ),
];

// German ID Card (BACK) - Display Utility Method
const getDeIdCardBackFields = (idCardDocument: DeIdCardBackDocument) => [
  GenericDocumentUtils.getTextField(idCardDocument.address),
  GenericDocumentUtils.getTextField(idCardDocument.eyeColor),
  GenericDocumentUtils.getTextField(idCardDocument.height),
  GenericDocumentUtils.getTextField(idCardDocument.issuingAuthority),
  GenericDocumentUtils.getTextField(idCardDocument.pseudonym),
  GenericDocumentUtils.getTextField(idCardDocument.rawMRZ),
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
  GenericDocumentUtils.getImageField(document.photo),
  GenericDocumentUtils.getImageField(document.signature),
  GenericDocumentUtils.getTextField(document.givenNames),
  GenericDocumentUtils.getTextField(document.surname),
  GenericDocumentUtils.getTextField(document.birthDate),
  GenericDocumentUtils.getTextField(document.birthplace),
  GenericDocumentUtils.getTextField(document.id),
  GenericDocumentUtils.getTextField(document.issueDate),
  GenericDocumentUtils.getTextField(document.issuingAuthority),
  GenericDocumentUtils.getTextField(document.licenseCategories),
];

// Driver License (BACK) - Display Utility Method
const getDriverLicenseBackFields = (document: DeDriverLicenseBackDocument) => {
  const fields: Array<{key: string; value: string}> = [];

  // Restrictions
  fields.push(GenericDocumentUtils.getTextField(document.restrictions));

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
