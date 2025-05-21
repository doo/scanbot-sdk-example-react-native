import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {CheckRecognizerResultScreenRouteProp} from '@utils';
import {
  GenericDocumentResult,
  ResultContainer,
  ResultFieldRow,
  ResultImage,
} from '@components';
import {
  autorelease,
  CheckScanningResult,
} from 'react-native-scanbot-sdk';

const CheckDocument = ({
  checkScannerResult,
}: {
  checkScannerResult?: CheckScanningResult;
}) => {
  if (!checkScannerResult?.check) {
    return null;
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
   *      switch (checkScannerResult.check.type.name) {
   *      case USACheckDocumentType: {
   *      const check = new USACheck(checkScannerResult.check);
   *      return (
   *      <View>
   *      <ResultHeader title={'Check Document Result'} />
   *      <ResultFieldRow
   *      title={'Transit number'}
   *      value={check.transitNumber}
   *      />
   *      <ResultFieldRow
   *      title={'Account number'}
   *      value={check.accountNumber}
   *      />
   *      <ResultFieldRow
   *      title={'Auxiliary On Us'}
   *      value={check.auxiliaryOnUs}
   *      />
   *      </View>
   *      );
   *      }
   *      case INDCheckDocumentType: {
   *      const check = new INDCheck(checkScannerResult.check);
   *      return (
   *      <View>
   *      <ResultHeader title={'Check Document Result'} />
   *      <ResultFieldRow title={'Sort number'} value={check.sortNumber} />
   *      <ResultFieldRow
   *      title={'Account number'}
   *      value={check.accountNumber}
   *      />
   *      <ResultFieldRow
   *      title={'Transaction code'}
   *      value={check.transactionCode}
   *      />
   *      </View>
   *      );
   *      }
   *      case FRACheckDocumentType: // const check = new FRACheck(checkRecognizerResult.check);
   *      case ISRCheckDocumentType: // const check = new ISRCheck(checkRecognizerResult.check);
   *      case KWTCheckDocumentType: // const check = new KWTCheck(checkRecognizerResult.check);
   *      case AUSCheckDocumentType: // const check = new AUSCheck(checkRecognizerResult.check);
   *      case UAECheckDocumentType: // const check = new UAECheck(checkRecognizerResult.check);
   *      case CANCheckDocumentType: // const check = new CANCheck(checkRecognizerResult.check);
   *      }
   */

  return <GenericDocumentResult genericDocument={checkScannerResult?.check} />;
};

export function CheckScannerResultScreen() {
  const route = useRoute<CheckRecognizerResultScreenRouteProp>();
  const [checkResult, setCheckResult] = useState<CheckScanningResult>();
  const [image, setImage] = useState<string>();

  useEffect(() => {
    /**
     * Since the result contains an image reference, an autorelease pool is required to manage memory correctly.
     * Referencing the image allows flexibility:
     *  * The image can be encoded (e.g., as a base64 buffer),
     *  * The image can be saved on disk.
     *  * Information about the image can be extracted,
     * In this example, the image reference has already been encoded as a base64 buffer.
     */
    autorelease(() => {
      const result = new CheckScanningResult(route.params.check);
      const imageData = result.croppedImage?.buffer;

      if (imageData) {
        setImage(`data:image/jpeg;base64,${imageData}`);
      }

      setCheckResult(result);
    });
  }, [route.params.check]);

  return (
    <ResultContainer>
      <ResultImage imageUri={image} />
      <ResultFieldRow title={'Check status'} value={checkResult?.status} />
      <CheckDocument checkScannerResult={checkResult} />
    </ResultContainer>
  );
}
