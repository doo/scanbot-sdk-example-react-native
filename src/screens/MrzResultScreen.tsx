import React from 'react';
import {MrzScannerResult} from 'react-native-scanbot-sdk';
import {ScanResultSectionList} from '../components/ScanResultSectionList';
import {useRoute} from '@react-navigation/native';
import {MrzResultScreenRouteProp} from '../utils/Navigation';
import {GenericDocumentUtils} from '../utils/GenericDocumentUtils';

export function MrzResultScreen() {
  const {params: mrzScannerResult} = useRoute<MrzResultScreenRouteProp>();

  return (
    <ScanResultSectionList
      sectionData={[
        {
          title: 'MRZ Result',
          data: mrzResultData(mrzScannerResult),
        },
        {
          title: 'MRZ Document',
          data: GenericDocumentUtils.gdrFields(mrzScannerResult.mrz),
        },
      ]}
    />
  );
}

const mrzResultData = (result: MrzScannerResult) => [
  GenericDocumentUtils.sectionValueItem('Document Type', result.documentType),
  GenericDocumentUtils.sectionValueItem('Raw MRZ String', result.rawString),
  GenericDocumentUtils.sectionValueItem(
    'Recognition Successful?',
    result.recognitionSuccessful ? 'YES' : 'NO',
  ),
  GenericDocumentUtils.sectionValueItem(
    'Check digits count',
    result.checkDigitsCount.toString(),
  ),
  GenericDocumentUtils.sectionValueItem(
    'Valid check digits count',
    result.validCheckDigitsCount.toString(),
  ),
  ...GenericDocumentUtils.gdrCommonFields(result.mrz),
];
