import React, {useMemo} from 'react';
import {useRoute} from '@react-navigation/native';
import {MrzResultScreenRouteProp} from '@utils';
import {ResultContainer, ResultFieldRow, ResultHeader} from '@components';
import {GenericDocumentUtils} from '../utils/GenericDocumentUtils';
import {View} from 'react-native';

export function MrzResultScreen() {
  const {params: mrzScannerResult} = useRoute<MrzResultScreenRouteProp>();

  const MRZDocument = useMemo(() => {
    if (!mrzScannerResult.mrz) {
      return () => null;
    }
    return () => (
      <View>
        <ResultHeader title={'MRZ Document Result'} />
        {mrzScannerResult.mrz !== undefined &&
          GenericDocumentUtils.extractGenericDocumentFields(
            mrzScannerResult.mrz,
          ).map((field, index) => (
            <ResultFieldRow
              key={field.type.name + index}
              title={field.type.name.trim()}
              value={field.value?.text}
            />
          ))}
      </View>
    );
  }, [mrzScannerResult]);

  return (
    <ResultContainer>
      <ResultHeader title={'MRZ'} />
      <ResultFieldRow
        title={'Successful recognition'}
        value={mrzScannerResult.recognitionSuccessful}
      />
      <ResultFieldRow
        title={'Document type'}
        value={mrzScannerResult.documentType}
      />
      <ResultFieldRow
        title={'Raw MRZ string'}
        value={mrzScannerResult.rawString}
      />
      <ResultFieldRow
        title={'Check digit count'}
        value={mrzScannerResult.checkDigitsCount}
      />
      <ResultFieldRow
        title={'Valid check digit count'}
        value={mrzScannerResult.validCheckDigitsCount}
      />
      <MRZDocument />
    </ResultContainer>
  );
}
