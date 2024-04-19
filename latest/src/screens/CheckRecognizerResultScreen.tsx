import React from 'react';
import {ScanResultSectionList} from '../components/ScanResultSectionList';
import {useRoute} from '@react-navigation/native';
import {CheckRecognizerResultScreenRouteProp} from '../utils/Navigation';
import {GenericDocumentUtils} from '../utils/GenericDocumentUtils';
import {CheckRecognizerResult} from 'react-native-scanbot-sdk';

export function CheckRecognizerResultScreen() {
  const {params: checkRecognizerResult} =
    useRoute<CheckRecognizerResultScreenRouteProp>();

  return (
    <ScanResultSectionList
      sectionData={[
        {
          title: 'Check Result',
          data: checkResultData(checkRecognizerResult),
        },
        {
          title: checkRecognizerResult.check?.type.name ?? 'NOT DETECTED',
          data: GenericDocumentUtils.gdrFields(checkRecognizerResult.check),
        },
      ]}
    />
  );
}

const checkResultData = (checkRecognizerResult: CheckRecognizerResult) => [
  GenericDocumentUtils.sectionImageItem(
    'Check Image',
    checkRecognizerResult.imageFileUri,
  ),
  GenericDocumentUtils.sectionValueItem(
    'Recognition Status',
    checkRecognizerResult.checkStatus,
  ),
  GenericDocumentUtils.sectionValueItem(
    'Check Type',
    checkRecognizerResult.checkType,
  ),
  ...GenericDocumentUtils.gdrCommonFields(checkRecognizerResult.check),
];
