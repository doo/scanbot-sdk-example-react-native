import React from 'react';
import {useRoute} from '@react-navigation/native';
import {GenericDocumentResultScreenRouteProp} from '../utils/Navigation';
import {
  ScanResultSection,
  ScanResultSectionList,
} from '../components/ScanResultSectionList';
import {
  CategoriesDocument,
  DeDriverLicenseBackDocument,
  DeDriverLicenseFrontDocument,
  DeIdCardBackDocument,
  DeIdCardFrontDocument,
  DePassportDocument,
  Field,
  GenericDocumentRecognizerResult,
} from 'react-native-scanbot-sdk';
import {GenericDocumentUtils} from '../utils/GenericDocumentUtils';

export function GenericDocumentResultScreen() {
  const {params: genericDocumentResult} =
    useRoute<GenericDocumentResultScreenRouteProp>();

  return (
    <ScanResultSectionList sectionData={transformData(genericDocumentResult)} />
  );
}

const transformData = (result: GenericDocumentRecognizerResult) => {
  return result.documents
    .map(document => {
      switch (document.type.name) {
        case 'DeDriverLicenseBack':
          return deDriverLicenseBackFields(
            document as DeDriverLicenseBackDocument,
          );
        case 'DeDriverLicenseFront':
          return deDriverLicenseFrontFields(
            document as DeDriverLicenseFrontDocument,
          );
        case 'DeIdCardBack':
          return deIdCardBackFields(document as DeIdCardBackDocument);
        case 'DeIdCardFront':
          return deIdCardFrontFields(document as DeIdCardFrontDocument);
        case 'DePassport':
          return dePassportFields(document as DePassportDocument);
        default:
          return [];
      }
    })
    .flat(1);
};

// German Passport - Display Utility Method
const dePassportFields = (
  passportDocument: DePassportDocument,
): ScanResultSection[] => [
  {
    title: 'German Passport',
    data: [
      ...GenericDocumentUtils.gdrCommonFields(passportDocument),
      ...GenericDocumentUtils.gdrFields(passportDocument),
    ],
  },
  {
    title: 'Passport MRZ',
    data: [
      ...GenericDocumentUtils.gdrCommonFields(passportDocument.mrz),
      ...GenericDocumentUtils.gdrFields(passportDocument.mrz),
    ],
  },
];

// German ID Card (FRONT) - Display Utility Method
const deIdCardFrontFields = (idCardDocument: DeIdCardFrontDocument) => [
  {
    title: 'German ID Card Front',
    data: [
      ...GenericDocumentUtils.gdrCommonFields(idCardDocument),
      ...GenericDocumentUtils.gdrFields(idCardDocument),
    ],
  },
];

// German ID Card (BACK) - Display Utility Method
const deIdCardBackFields = (idCardDocument: DeIdCardBackDocument) => [
  {
    title: 'German ID Card Back',
    data: [
      ...GenericDocumentUtils.gdrCommonFields(idCardDocument),
      ...GenericDocumentUtils.gdrFields(idCardDocument),
    ],
  },
  {
    title: 'ID Card MRZ',
    data: [
      ...GenericDocumentUtils.gdrCommonFields(idCardDocument.mrz),
      ...GenericDocumentUtils.gdrFields(idCardDocument.mrz),
    ],
  },
];

// Driver License (FRONT) - Display Utility Method
const deDriverLicenseFrontFields = (
  driversLicense: DeDriverLicenseFrontDocument,
) => [
  {
    title: 'German Drivers licence Front',
    data: [
      ...GenericDocumentUtils.gdrCommonFields(driversLicense),
      ...GenericDocumentUtils.gdrFields(driversLicense),
    ],
  },
];

// Driver License (BACK) - Display Utility Method
const deDriverLicenseBackFields = (
  driversLicense: DeDriverLicenseBackDocument,
) => [
  {
    title: 'German Drivers licence Back',
    data: [
      ...GenericDocumentUtils.gdrCommonFields(driversLicense),
      ...GenericDocumentUtils.gdrFields(driversLicense),
    ],
  },
  ...driverLicenseBackCategoryFields(driversLicense.categories),
];

// Driver License (BACK - Categories) - Display Utility Method
const driverLicenseBackCategoryFields = (categories: CategoriesDocument) => [
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

// Driver License Category - Display Utility Method
const getDriverLicenseCategoryField = (
  displayName: string,
  category?: {
    validFrom: Field;
    validUntil: Field;
  },
) => {
  if (category === undefined) {
    return {
      title: displayName,
      data: [],
    };
  }

  const from = category?.validFrom.value?.text ?? 'N/A';
  const until = category?.validUntil.value?.text ?? 'N/A';

  return {
    title: displayName,
    data: [
      {
        key: displayName,
        value: `From ${from} to ${until}`,
      },
    ],
  };
};
