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
} from 'react-native-scanbot-sdk';
import {GenericDocumentUtils as DocumentUtils} from '../utils/GenericDocumentUtils';

export function CheckRecognizerResultScreen() {
  const {params: checkRecognizerResult} =
    useRoute<CheckRecognizerResultScreenRouteProp>();

  useEffect(() => {
    console.log(
      'Check Recognizer Document Type: ' +
        checkRecognizerResult.document?.documentType ?? 'N/A',
    );
  });

  return (
    <ScanResultSectionList
      sectionData={[
        {
          title: checkRecognizerResult.document?.documentType ?? 'NOT DETECTED',
          data: transformData(checkRecognizerResult),
        },
      ]}
    />
  );
}

const transformData = (result: CheckRecognizerResult) => {
  let fields: Array<{key: string; value?: string; image?: string}> = [];

  const document = result.document;
  if (!document) {
    return [];
  }

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
  DocumentUtils.getTextField(document.accountNumber, false),
  DocumentUtils.getTextField(document.bsb, false),
  DocumentUtils.getTextField(document.rawString, false),
  DocumentUtils.getTextField(document.transactionCode, false),
  DocumentUtils.getOptTextField(document.fontType, 'Font Type'),
  DocumentUtils.getOptTextField(document.auxDomestic, 'AUX Domestic'),
  DocumentUtils.getOptTextField(
    document.extraAuxDomestic,
    'Extra AUX Domestic',
  ),
];

// FRA Check - Display Util Method
const getFraCheckFields = (document: FRACheckDocument) => [
  DocumentUtils.getTextField(document.accountNumber, false),
  DocumentUtils.getTextField(document.chequeNumber, false),
  DocumentUtils.getTextField(document.rawString, false),
  DocumentUtils.getTextField(document.routingNumber, false),
  DocumentUtils.getOptTextField(document.fontType, 'Font Type'),
];

// KWT Check - Display Util Method
const getKwtCheckFields = (document: KWTCheckDocument) => [
  DocumentUtils.getTextField(document.accountNumber, false),
  DocumentUtils.getTextField(document.chequeNumber, false),
  DocumentUtils.getTextField(document.rawString, false),
  DocumentUtils.getTextField(document.sortCode, false),
  DocumentUtils.getOptTextField(document.fontType, 'Font Type'),
];

// USA Check - Display Util Method
const getUsaCheckFields = (document: USACheckDocument) => [
  DocumentUtils.getTextField(document.accountNumber, false),
  DocumentUtils.getTextField(document.rawString, false),
  DocumentUtils.getTextField(document.transitNumber, false),
  DocumentUtils.getOptTextField(document.fontType, 'Font Type'),
  DocumentUtils.getOptTextField(document.auxiliaryOnUs, 'Auxiliary on US'),
];

// IND Check - Display Util Method
const getIndCheckFields = (document: INDCheckDocument) => [
  DocumentUtils.getTextField(document.accountNumber, false),
  DocumentUtils.getTextField(document.rawString, false),
  DocumentUtils.getTextField(document.serialNumber, false),
  DocumentUtils.getTextField(document.transactionCode, false),
  DocumentUtils.getOptTextField(document.sortNumber, 'Sort Number', false),
  DocumentUtils.getOptTextField(document.fontType, 'Font Type', false),
];

// Unknown Check - Display Util Method
const getUnknownCheckFields = (document: UnknownCheckDocument) => [
  DocumentUtils.getTextField(document.rawString, false),
  ...(document.document.fields?.map(field => ({
    key: field.type.name,
    value: field.value?.text ?? '-',
    image: field.image,
  })) || []),
];
