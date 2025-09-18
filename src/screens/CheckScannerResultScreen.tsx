import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {CheckRecognizerResultScreenRouteProp} from '@utils';
import {
  GenericDocumentResult,
  ResultContainer,
  ResultFieldRow,
  ResultImage,
} from '@components';

import {GenericDocument} from 'react-native-scanbot-sdk';

const CheckDocument = ({
  checkDocument,
}: {
  checkDocument?: GenericDocument | null;
}) => {
  if (!checkDocument) {
    return null;
  }

  /*
    Check Document fields can be used from the GenericDocument as shown below,
    or by utilizing the wrappers to encapsulate the result,
    thereby enabling property access to the desired field.

    For example:
    import {
      AUSCheckDocumentType,
      CANCheckDocumentType,
      FRACheckDocumentType,
      GenericDocument,
      INDCheck,
      INDCheckDocumentType,
      ISRCheckDocumentType,
      KWTCheckDocumentType,
      UAECheckDocumentType,
      USACheck,
      USACheckDocumentType,
    } from 'react-native-scanbot-sdk';
   switch (checkDocument.type.name) {
     case USACheckDocumentType: {
       const check = new USACheck(checkDocument);
       return (
         <View>
           <ResultHeader title={'Check Document Result'} />
           <ResultFieldRow
             title={'Transit number'}
             value={check.transitNumber}
           />
           <ResultFieldRow
             title={'Account number'}
             value={check.accountNumber}
           />
           <ResultFieldRow
             title={'Auxiliary On Us'}
             value={check.auxiliaryOnUs}
           />
         </View>
       );
     }
     case INDCheckDocumentType: {
       const check = new INDCheck(checkDocument);
       return (
         <View>
           <ResultHeader title={'Check Document Result'} />
           <ResultFieldRow title={'Sort number'} value={check.sortNumber} />
           <ResultFieldRow
             title={'Account number'}
             value={check.accountNumber}
           />
           <ResultFieldRow
             title={'Transaction code'}
             value={check.transactionCode}
           />
         </View>
       );
     }
     case FRACheckDocumentType: // const check = new FRACheck(checkDocument);
     case ISRCheckDocumentType: // const check = new ISRCheck(checkDocument);
     case KWTCheckDocumentType: // const check = new KWTCheck(checkDocument);
     case AUSCheckDocumentType: // const check = new AUSCheck(checkDocument);
     case UAECheckDocumentType: // const check = new UAECheck(checkDocument);
     case CANCheckDocumentType: // const check = new CANCheck(checkDocument);
   }
   */

  return <GenericDocumentResult genericDocument={checkDocument} />;
};

export function CheckScannerResultScreen() {
  const route = useRoute<CheckRecognizerResultScreenRouteProp>();
  const [image, setImage] = useState<string>();

  useEffect(() => {
    /**
     * In this example, the image reference has already been serialized as a base64 buffer, therefore, we don't need autorelease pool.
     */
    const imageData = route.params.buffer;

    if (imageData) {
      setImage(`data:image/jpeg;base64,${imageData}`);
    }
  }, [route.params.buffer]);

  return (
    <ResultContainer>
      <ResultImage imageUri={image} />
      <ResultFieldRow title={'Check status'} value={route.params.status} />
      <CheckDocument checkDocument={route.params.checkDocument} />
    </ResultContainer>
  );
}
