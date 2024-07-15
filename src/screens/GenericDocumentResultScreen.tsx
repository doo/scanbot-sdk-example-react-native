import React, {useMemo} from 'react';
import {useRoute} from '@react-navigation/native';
import {GenericDocumentResultScreenRouteProp} from '@utils';
import {GenericDocument} from 'react-native-scanbot-sdk';
import {GenericDocumentUtils} from '../utils/GenericDocumentUtils';
import {ResultContainer, ResultFieldRow, ResultHeader} from '@components';
import {View} from 'react-native';

export function GenericDocumentResultScreen() {
  const {params: genericDocumentResult} =
    useRoute<GenericDocumentResultScreenRouteProp>();

  const GenericDocuments = useMemo(() => {
    if (genericDocumentResult.documents.length === 0) {
      return () => null;
    }

    return () => (
      <View>
        {genericDocumentResult.documents.map((document, index) => (
          <GenericDocumentResult document={document} key={index} />
        ))}
      </View>
    );
  }, [genericDocumentResult]);

  return (
    <ResultContainer>
      <ResultHeader title={'Generic Document recognition'} />
      <GenericDocuments />
    </ResultContainer>
  );
}

function GenericDocumentResult({document}: {document: GenericDocument}) {
  return (
    <View>
      <ResultHeader title={'Generic Document'} />
      {GenericDocumentUtils.extractGenericDocumentFields(document).map(
        (field, index) => (
          <ResultFieldRow
            key={field.type.name + index}
            title={field.type.name.trim()}
            value={field.value?.text}
          />
        ),
      )}
    </View>
  );
}
