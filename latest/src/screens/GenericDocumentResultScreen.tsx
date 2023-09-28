import React from 'react';
import {
  GenericDocumentField,
  GenericDocumentRecognizerResult,
  MrzDocumentResult,
} from 'react-native-scanbot-sdk';
import {useRoute} from '@react-navigation/native';
import {GenericDocumentResultScreenRouteProp} from '../utils/Navigation';
import {ScanResultSectionList} from '../components/ScanResultSectionList';

export function GenericDocumentResultScreen() {
  const {params: genericDocumentResult} =
    useRoute<GenericDocumentResultScreenRouteProp>();

  return (
    <ScanResultSectionList
      sectionData={[
        {
          title: 'Fields',
          data: transformData(genericDocumentResult),
        },
      ]}
      imageFileUri={genericDocumentResult.fields.photoImageUri}
    />
  );
}

const transformMRZFields = (document: MrzDocumentResult) => {
  return Object.keys(document)
    .flatMap(key => {
      let value: string;
      if (Array.isArray((document as any)[key])) {
        value = JSON.stringify((document as any)[key]);
      } else {
        const field = (document as any)[key] as GenericDocumentField;
        value = `${field.text} (confidence: ${field.confidence?.toFixed(2)})`;
      }
      return {
        key: `MRZ.${key}`,
        value: value,
      };
    })
    .filter(item => item);
};

const transformData = (document: GenericDocumentRecognizerResult) => {
  if (!document.fields) {
    return [];
  }

  const jsonFields = Object.keys(document.fields)
    .flatMap(key => {
      let value: string | undefined;
      if (key.endsWith('Uri')) {
        value = (document.fields as any)[key] as string;
      } else if (key === 'mrz') {
        value = undefined;
      } else {
        const field = (document.fields as any)[key] as GenericDocumentField;
        value = `${field.text} ${
          field.confidence ? '(confidence: )' + field.confidence.toFixed(2) : ''
        }`;
      }

      return value ? {key: key, value: value} : undefined;
    })
    .filter(item => item);

  let mrzFields = (document.fields as any).mrz as MrzDocumentResult;
  if (mrzFields) {
    transformMRZFields(mrzFields).forEach(jsonField =>
      jsonFields.push(jsonField),
    );
  }

  return jsonFields as Array<{key: string; value: string}>;
};
