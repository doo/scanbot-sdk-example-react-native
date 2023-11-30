import React from 'react';
import {MRZDocument, MrzScannerResult} from 'react-native-scanbot-sdk';
import {ScanResultSectionList} from '../components/ScanResultSectionList';
import {useRoute} from '@react-navigation/native';
import {GenericDocumentUtils as DocumentUtils} from '../utils/GenericDocumentUtils';
import {MrzResultScreenRouteProp} from '../utils/Navigation';

export function MrzResultScreen() {
  const {params: mrzScannerResult} = useRoute<MrzResultScreenRouteProp>();

  return (
    <ScanResultSectionList
      sectionData={[
        {
          title: 'MRZ Result',
          data: transformMrzResultData(mrzScannerResult),
        },
        {
          title: 'MRZ Document',
          data: transformMrzDocumentData(mrzScannerResult),
        },
      ]}
    />
  );
}

const transformMrzResultData = (result: MrzScannerResult) => [
  {key: 'Document Type', value: result.documentType},
  {
    key: 'Recognition Successful?',
    value: result.recognitionSuccessful ? 'YES' : 'NO',
  },
  {key: 'Raw MRZ String', value: result.rawString},
];

const transformMrzDocumentData = (result: MrzScannerResult) => {
  // MRZ Document
  const document = result.mrzDocument as MRZDocument;
  if (!document || document.documentType !== 'MRZ') {
    return [];
  }

  return getMrzDocumentFields(document);
};

const getMrzDocumentFields = (document: MRZDocument) => [
  DocumentUtils.getTextField(document.givenNames),
  DocumentUtils.getTextField(document.surname),
  DocumentUtils.getTextField(document.birthDate),
  DocumentUtils.getTextField(document.nationality),
  DocumentUtils.getOptTextField(document.gender, 'Gender'),

  DocumentUtils.getOptTextField(document.issuingAuthority, 'Issuing Authority'),
  DocumentUtils.getOptTextField(
    document.officeOfIssuance,
    'Office Of Issuance',
  ),

  DocumentUtils.getOptTextField(document.dateOfIssuance, 'Date Of Issuance'),
  DocumentUtils.getOptTextField(document.expiryDate, 'Expiry Date'),
  DocumentUtils.getOptTextField(document.documentNumber, 'Document Number'),
  DocumentUtils.getOptTextField(
    document.documentTypeCode,
    'Document Type Code',
  ),

  DocumentUtils.getOptTextField(document.languageCode, 'Language Code'),
  DocumentUtils.getOptTextField(document.pinCode, 'Pin Code'),
  DocumentUtils.getOptTextField(document.personalNumber, 'Personal Number'),
  DocumentUtils.getOptTextField(document.versionNumber, 'Version Number'),
  DocumentUtils.getOptTextField(document.optional1, 'Optional 1'),
  DocumentUtils.getOptTextField(document.optional2, 'Optional 2'),

  DocumentUtils.getOptTextField(document.travelDocType, 'Travel Doc Type'),
  DocumentUtils.getOptTextField(
    document.travelDocTypeVariant,
    'Travel Doc Type Variant',
  ),

  DocumentUtils.getOptTextField(
    document.checkDigitBirthDate,
    'Check Digit Birth Date',
  ),
  DocumentUtils.getOptTextField(
    document.checkDigitDocumentNumber,
    'Check Digit Document Number',
  ),
  DocumentUtils.getOptTextField(
    document.checkDigitExpiryDate,
    'Check Digit Expiry Date',
  ),
  DocumentUtils.getOptTextField(
    document.checkDigitGeneral,
    'Check Digit General',
  ),
  DocumentUtils.getOptTextField(
    document.checkDigitPersonalNumber,
    'Check Digit Personal Number',
  ),
];
