import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {MrzResultScreenRouteProp} from '@utils';
import {
  GenericDocumentResult,
  ResultContainer,
  ResultFieldRow,
  ResultHeader,
} from '@components';
import {autorelease, MrzScannerResult} from 'react-native-scanbot-sdk';

const MRZDocument = ({
  mrzScannerResult,
}: {
  mrzScannerResult?: MrzScannerResult;
}) => {
  if (!mrzScannerResult?.document) {
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

  return <GenericDocumentResult genericDocument={mrzScannerResult?.document} />;
};

export function MrzResultScreen() {
  const route = useRoute<MrzResultScreenRouteProp>();
  const [mrzResult, setMRZResult] = useState<MrzScannerResult>();

  useEffect(() => {
    autorelease(async () => {
      setMRZResult(new MrzScannerResult(route.params.mrz));
    });
  }, [route.params.mrz]);

  return (
    <ResultContainer>
      <ResultHeader title={'MRZ'} />
      <ResultFieldRow
        title={'Successful recognition'}
        value={mrzResult?.success}
      />
      <ResultFieldRow title={'Raw MRZ string'} value={mrzResult?.rawMRZ} />
      <MRZDocument mrzScannerResult={mrzResult} />
    </ResultContainer>
  );
}
