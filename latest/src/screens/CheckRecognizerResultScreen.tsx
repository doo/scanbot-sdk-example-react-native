import React, {useEffect} from 'react';
import {CheckRecognizerResult} from 'react-native-scanbot-sdk';
import {ScanResultSectionList} from '../components/ScanResultSectionList';
import {useRoute} from '@react-navigation/native';
import {CheckRecognizerResultScreenRouteProp} from '../utils/Navigation';
import {
  AUSCheckDocument,
  FRACheckDocument,
  INDCheckDocument,
  KWTCheckDocument,
  USACheckDocument,
  UnknownCheckDocument,
} from 'react-native-scanbot-sdk/src/internal/gdr/gdr-wrappers';
import {GenericDocumentUtils} from '../utils/GenericDocumentUtils';

export function CheckRecognizerResultScreen() {
  const {params: checkRecognizerResult} =
    useRoute<CheckRecognizerResultScreenRouteProp>();

  useEffect(() => {
    console.log(
      'Check Recognizer Document Type: ' +
        checkRecognizerResult.document.documentType,
    );
  });

  return (
    <ScanResultSectionList
      sectionData={[
        {
          title: checkRecognizerResult.document.documentType,
          data: transformData(checkRecognizerResult),
        },
      ]}
    />
  );
}

const transformData = (result: CheckRecognizerResult) => {
  let fields: Array<{key: string; value?: string; image?: string}> = [];

  const document = result.document;

  switch (document.documentType) {
    case 'AUSCheck':
      fields.push(...getAusCheckFields(document as AUSCheckDocument));
      break;
    case 'FRACheck':
      fields.push(...getFraCheckFields(document as FRACheckDocument));
      break;
    case 'KWTCheck':
      fields.push(...getKwtCheckFields(document as KWTCheckDocument));
      break;
    case 'USACheck':
      fields.push(...getUsaCheckFields(document as USACheckDocument));
      break;
    case 'INDCheck':
      fields.push(...getIndCheckFields(document as INDCheckDocument));
      break;
    case 'UnknownCheck':
      fields.push(...getUnknownCheckFields(document as UnknownCheckDocument));
      break;
  }

  return fields;
};

// AUS Check - Display Util Method
const getAusCheckFields = (document: AUSCheckDocument) => [
  GenericDocumentUtils.getTextField(document.accountNumber),
  GenericDocumentUtils.getTextField(document.bsb),
  GenericDocumentUtils.getTextField(document.rawString),
  GenericDocumentUtils.getTextField(document.transactionCode),
  GenericDocumentUtils.getOptTextField(document.fontType, 'Font Type'),
  GenericDocumentUtils.getOptTextField(document.auxDomestic, 'AUX Domestic'),
  GenericDocumentUtils.getOptTextField(
    document.extraAuxDomestic,
    'Extra AUX Domestic',
  ),
];

// FRA Check - Display Util Method
const getFraCheckFields = (document: FRACheckDocument) => [
  GenericDocumentUtils.getTextField(document.accountNumber),
  GenericDocumentUtils.getTextField(document.chequeNumber),
  GenericDocumentUtils.getTextField(document.rawString),
  GenericDocumentUtils.getTextField(document.routingNumber),
  GenericDocumentUtils.getOptTextField(document.fontType, 'Font Type'),
];

// KWT Check - Display Util Method
const getKwtCheckFields = (document: KWTCheckDocument) => [
  GenericDocumentUtils.getTextField(document.accountNumber),
  GenericDocumentUtils.getTextField(document.chequeNumber),
  GenericDocumentUtils.getTextField(document.rawString),
  GenericDocumentUtils.getTextField(document.sortCode),
  GenericDocumentUtils.getOptTextField(document.fontType, 'Font Type'),
];

// USA Check - Display Util Method
const getUsaCheckFields = (document: USACheckDocument) => [
  GenericDocumentUtils.getTextField(document.accountNumber),
  GenericDocumentUtils.getTextField(document.rawString),
  GenericDocumentUtils.getTextField(document.transitNumber),
  GenericDocumentUtils.getOptTextField(document.fontType, 'Font Type'),
  GenericDocumentUtils.getOptTextField(
    document.auxiliaryOnUs,
    'Auxiliary on US',
  ),
];

// IND Check - Display Util Method
const getIndCheckFields = (document: INDCheckDocument) => [
  GenericDocumentUtils.getTextField(document.accountNumber),
  GenericDocumentUtils.getTextField(document.rawString),
  GenericDocumentUtils.getTextField(document.serialNumber),
  GenericDocumentUtils.getTextField(document.transactionCode),
  GenericDocumentUtils.getOptTextField(document.sortNumber, 'Sort Number'),
  GenericDocumentUtils.getOptTextField(document.fontType, 'Font Type'),
];

// Unknown Check - Display Util Method
const getUnknownCheckFields = (document: UnknownCheckDocument) => [
  GenericDocumentUtils.getTextField(document.rawString),
  ...(document.document.fields?.map(field => ({
    key: field.type.name,
    value: field.value?.text ?? '-',
    image: field.image,
  })) || []),
];
