import React from 'react';
import {useRoute} from '@react-navigation/native';
import {MrzResultScreenRouteProp} from '@utils';
import {
  GenericDocumentResult,
  ResultContainer,
  ResultFieldRow,
  ResultHeader,
} from '@components';
import {GenericDocument} from 'react-native-scanbot-sdk';

const MRZDocument = ({mrzDocument}: {mrzDocument?: GenericDocument | null}) => {
  if (!mrzDocument) {
    return null;
  }

  /**
   *  MRZ Document fields can be used from the GenericDocument as shown below,
   *  or by utilizing the wrappers to encapsulate the result,
   *  thereby enabling property access to the desired field.
   *
   *  For example:
   *   import {MRZ} from 'react-native-scanbot-sdk';
   *
   *   const mrz = new MRZ(mrzDocument);
   *
   *   return (
   *     <View>
   *       <ResultHeader title={'MRZ Document Result'} />
   *       <ResultFieldRow title={'Given name'} value={mrz.givenNames} />
   *       <ResultFieldRow title={'Birthdate'} value={mrz.birthDate} />
   *       <ResultFieldRow title={'Surname'} value={mrz.surname} />
   *     </View>
   *   );
   */

  return <GenericDocumentResult genericDocument={mrzDocument} />;
};

export function MrzResultScreen() {
  const {params} = useRoute<MrzResultScreenRouteProp>();

  return (
    <ResultContainer>
      <ResultHeader title={'MRZ'} />
      <ResultFieldRow title={'Raw MRZ string'} value={params.mrz.rawMRZ} />
      <MRZDocument mrzDocument={params.mrz.document} />
    </ResultContainer>
  );
}
