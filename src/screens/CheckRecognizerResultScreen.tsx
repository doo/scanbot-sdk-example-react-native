import React, {useMemo} from 'react';
import {useRoute} from '@react-navigation/native';
import {CheckRecognizerResultScreenRouteProp} from '@utils';
import {
  ResultContainer,
  ResultFieldRow,
  ResultHeader,
  ResultImage,
} from '@components';
import {View} from 'react-native';
import {GenericDocumentUtils} from '../utils/GenericDocumentUtils.ts';

export function CheckRecognizerResultScreen() {
  const {params: checkRecognizerResult} =
    useRoute<CheckRecognizerResultScreenRouteProp>();

  const CheckDocument = useMemo(() => {
    if (!checkRecognizerResult.check) {
      return () => null;
    }

    /**
     *  Check Document fields can be used from the GenericDocument as shown below,
     *  or by utilizing the wrappers to encapsulate the result,
     *  thereby enabling property access to the desired field.
     *
     *  For example:
     *      import {
     *        Check,
     *        INDCheck,
     *        USACheck,
     *        INDCheckDocumentType,
     *        AUSCheckDocumentType,
     *        CANCheckDocumentType,
     *        CheckDocumentModelRootType,
     *        FRACheckDocumentType,
     *        ISRCheckDocumentType,
     *        KWTCheckDocumentType,
     *        UAECheckDocumentType,
     *        USACheckDocumentType,
     *      } from 'react-native-scanbot-sdk';
     *
     *     switch (checkRecognizerResult.check.type.name) {
     *       case USACheckDocumentType: {
     *         const check = new USACheck(checkRecognizerResult.check);
     *         return () => (
     *           <View>
     *             <ResultHeader title={'Check Document Result'} />
     *             <ResultFieldRow
     *               title={'Transit number'}
     *               value={check.transitNumber}
     *             />
     *             <ResultFieldRow
     *               title={'Account number'}
     *               value={check.accountNumber}
     *             />
     *             <ResultFieldRow
     *               title={'Auxiliary On Us'}
     *               value={check.auxiliaryOnUs}
     *             />
     *           </View>
     *         );
     *       }
     *       case INDCheckDocumentType: {
     *         const check = new INDCheck(checkRecognizerResult.check);
     *         return () => (
     *           <View>
     *             <ResultHeader title={'Check Document Result'} />
     *             <ResultFieldRow title={'Sort number'} value={check.sortNumber} />
     *             <ResultFieldRow
     *               title={'Account number'}
     *               value={check.accountNumber}
     *             />
     *             <ResultFieldRow
     *               title={'Transaction code'}
     *               value={check.transactionCode}
     *             />
     *           </View>
     *         );
     *       }
     *       case FRACheckDocumentType: // const check = new FRACheck(checkRecognizerResult.check);
     *       case ISRCheckDocumentType: // const check = new ISRCheck(checkRecognizerResult.check);
     *       case KWTCheckDocumentType: // const check = new KWTCheck(checkRecognizerResult.check);
     *       case AUSCheckDocumentType: // const check = new AUSCheck(checkRecognizerResult.check);
     *       case UAECheckDocumentType: // const check = new UAECheck(checkRecognizerResult.check);
     *       case CANCheckDocumentType: // const check = new CANCheck(checkRecognizerResult.check);
     *     }
     */

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
      <CheckDocument />
    </ResultContainer>
  );
}
