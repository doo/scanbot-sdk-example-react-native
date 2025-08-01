import React from 'react';
import {useRoute} from '@react-navigation/native';
import {DocumentDataExtractionResultScreenRouteProp} from '@utils';
import {
  GenericDocumentResult,
  ResultContainer,
  ResultFieldRow,
} from '@components';
import {View} from 'react-native';

export function DocumentDataExtractorResultScreen() {
  const {params} = useRoute<DocumentDataExtractionResultScreenRouteProp>();

  return (
    <ResultContainer>
      <View key={`${params.document?.type.name}`}>
        <ResultFieldRow
          title={'Extraction Status'}
          value={params.extractionStatus}
        />
        <GenericDocumentResult genericDocument={params.document} />
      </View>
    </ResultContainer>
  );
}
