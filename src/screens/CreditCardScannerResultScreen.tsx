import React, {useEffect, useState} from 'react';
import {
  GenericDocumentResult,
  ResultContainer,
  ResultFieldRow,
  ResultImage,
} from '@components';
import {useRoute} from '@react-navigation/native';
import {CreditCardResultScreenRouteProp} from '@utils';
import {autorelease, GenericDocument, ImageRef} from 'react-native-scanbot-sdk';

const CreditCardDocument = ({
  creditCardDocument,
}: {
  creditCardDocument?: GenericDocument | null;
}) => {
  if (!creditCardDocument) {
    return null;
  }

  /**
   *  Credit Card Document fields can be used from the GenericDocument as shown below,
   *  or by utilizing the wrappers to encapsulate the result,
   *  thereby enabling property access to the desired field.
   *
   *  For example:
   *   import {CreditCard} from 'react-native-scanbot-sdk';
   *
   *    const creditCard = new CreditCard(creditCardDocument);
   *    return (
   *      <View>
   *        <ResultHeader title={'Credit Card Document Result'} />
   *        <ResultFieldRow
   *          title={'Cardholder Name'}
   *          value={creditCard.cardholderName}
   *        />
   *        <ResultFieldRow title={'Card Number'} value={creditCard.cardNumber} />
   *        <ResultFieldRow title={'Expiry Date'} value={creditCard.expiryDate} />
   *      </View>
   *    );
   */

  return <GenericDocumentResult genericDocument={creditCardDocument} />;
};

export function CreditCardScannerResultScreen() {
  const {params} = useRoute<CreditCardResultScreenRouteProp>();
  const [image, setImage] = useState<string>();

  useEffect(() => {
    /**
     * In this example, the image is serialized as a reference, therefore we need to use an autorelease pool to manage memory correctly.
     */
    if (params.imageRefId) {
      autorelease(async () => {
        const imageData = await ImageRef.from({
          uniqueId: params.imageRefId!,
        }).encodeImage();

        if (imageData) {
          setImage(`data:image/jpeg;base64,${imageData}`);
        }
      });
    }
  }, [params.imageRefId]);

  return (
    <ResultContainer>
      <ResultImage imageUri={image} />
      <ResultFieldRow
        title={'Recognition status'}
        value={params.recognitionStatus}
      />
      <CreditCardDocument creditCardDocument={params.creditCardDocument} />
    </ResultContainer>
  );
}
