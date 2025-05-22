import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {DocumentDataExtractionResultScreenRouteProp} from '@utils';
import {
  GenericDocumentResult,
  ResultContainer,
  ResultFieldRow,
} from '@components';
import {StyleSheet, Text, View} from 'react-native';
import {
  autorelease,
  DocumentDataExtractionResult,
} from 'react-native-scanbot-sdk';

export function DocumentDataExtractorResultScreen() {
  const {params} = useRoute<DocumentDataExtractionResultScreenRouteProp>();
  const [documents, setDocuments] = useState<DocumentDataExtractionResult[]>(
    [],
  );

  useEffect(() => {
    autorelease(() => {
      try {
        if (params.documents !== undefined) {
          setDocuments(
            params.documents.map(d => new DocumentDataExtractionResult(d)),
          );
        }
      } catch (e) {
        console.error(e);
      }
    });
  }, [params.documents]);

  if (!(params.documents.length > 0)) {
    return (
      <View style={styles.container}>
        <Text style={styles.warningText}>No documents found</Text>
      </View>
    );
  }

  return (
    <ResultContainer>
      {documents.map(result => (
        <View key={`${result.document?.type.name}`}>
          <ResultFieldRow title={'Extraction Status'} value={result.status} />
          <ResultFieldRow
            title={'Detection Status'}
            value={result.documentDetectionResult.status}
          />
          <GenericDocumentResult genericDocument={result.document} />
        </View>
      ))}
    </ResultContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  warningText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
