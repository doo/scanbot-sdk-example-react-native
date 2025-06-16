import React from 'react';
import {
  GenericDocumentResult,
  ResultContainer,
  ResultFieldRow,
} from '@components';
import {useRoute} from '@react-navigation/native';
import {CreditCardResultScreenRouteProp} from '@utils';
import {GenericDocument} from 'react-native-scanbot-sdk';

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

  return (
    <ResultContainer>
      <ResultFieldRow
        title={'Recognition status'}
        value={params.recognitionStatus}
      />
      <CreditCardDocument creditCardDocument={params.creditCardDocument} />
    </ResultContainer>
  );
}
