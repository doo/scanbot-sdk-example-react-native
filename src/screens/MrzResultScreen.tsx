import React from 'react';
import {useRoute} from '@react-navigation/native';
import {GenericDocumentUtils, MrzResultScreenRouteProp} from '@utils';
import {ResultContainer, ResultFieldRow, ResultHeader} from '@components';
import {View} from 'react-native';
import {MrzScannerResult} from 'react-native-scanbot-sdk';

const MRZDocument = ({
  mrzScannerResult,
}: {
  mrzScannerResult: MrzScannerResult;
}) => {
  if (!mrzScannerResult.mrz) {
    return null;
  }

  /**
   *  MRZ Document fields can be used from the GenericDocument as shown below,
   *  or by utilizing the wrappers to encapsulate the result,
   *  thereby enabling property access to the desired field.
   *
   *  For example:
   *      import {MRZ} from 'react-native-scanbot-sdk';
   *
   *      const mrz = new MRZ(mrzScannerResult.mrz);
   *
   *      return (
   *        <View>
   *          <ResultHeader title={'MRZ Document Result'} />
   *          <ResultFieldRow title={'Given name'} value={mrz.givenNames} />
   *          <ResultFieldRow title={'Birthdate'} value={mrz.birthDate} />
   *          <ResultFieldRow title={'Surname'} value={mrz.surname} />
   *        </View>
   *      );
   */

  return (
    <View>
      <ResultHeader title={'MRZ Document Result'} />
      {GenericDocumentUtils.extractGenericDocumentFields(
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
};

export function MrzResultScreen() {
  const {params: mrzScannerResult} = useRoute<MrzResultScreenRouteProp>();

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
      <MRZDocument mrzScannerResult={mrzScannerResult} />
    </ResultContainer>
  );
}
