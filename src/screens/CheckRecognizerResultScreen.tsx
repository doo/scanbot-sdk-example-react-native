import React, {useMemo} from 'react';
import {useRoute} from '@react-navigation/native';
import {CheckRecognizerResultScreenRouteProp} from '@utils';
import {GenericDocumentUtils} from '../utils/GenericDocumentUtils';
import {
  ResultContainer,
  ResultFieldRow,
  ResultHeader,
  ResultImage,
} from '@components';
import {View} from 'react-native';

export function CheckRecognizerResultScreen() {
  const {params: checkRecognizerResult} =
    useRoute<CheckRecognizerResultScreenRouteProp>();

  const CheckDocument = useMemo(() => {
    if (!checkRecognizerResult.check) {
      return () => null;
    }
    return () => (
      <View>
        <ResultHeader title={'Check Document Result'} />
        {GenericDocumentUtils.extractGenericDocumentFields(
          checkRecognizerResult.check,
        ).map((field, index) => (
          <ResultFieldRow
            key={field.type.name + index}
            title={field.type.name.trim()}
            value={field.value?.text}
          />
        ))}
      </View>
    );
  }, [checkRecognizerResult]);

  return (
    <ResultContainer>
      <ResultImage imageUri={checkRecognizerResult.imageFileUri} />
      <ResultHeader title={'Check recognition'} />
      <ResultFieldRow
        title={'Check status'}
        value={checkRecognizerResult.checkStatus}
      />
      <ResultFieldRow
        title={'Check type'}
        value={checkRecognizerResult.checkType}
      />
      <CheckDocument />
    </ResultContainer>
  );
}
