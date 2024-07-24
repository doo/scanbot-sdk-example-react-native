import React, {useMemo} from 'react';
import {useRoute} from '@react-navigation/native';
import {GenericDocumentResultScreenRouteProp} from '@utils';
import {GenericDocument} from 'react-native-scanbot-sdk';
import {GenericDocumentUtils} from '../utils/GenericDocumentUtils';
import {ResultContainer, ResultFieldRow, ResultHeader} from '@components';
import {View} from 'react-native';

function GenericDocumentResult({document}: {document: GenericDocument}) {
  /**
   *  Generic Document fields can be used from the GenericDocument as shown below,
   *  or by utilizing the wrappers to encapsulate the result,
   *  thereby enabling property access to the desired field.
   *
   *  For example:
   *
   *   import {
   *    DeDriverLicenseBack,
   *    DeDriverLicenseBackDocumentType,
   *    DeDriverLicenseFront,
   *    DeDriverLicenseFrontDocumentType,
   *    DeIdCardBack,
   *    DeIdCardBackDocumentType,
   *    DeIdCardFront,
   *    DeIdCardFrontDocumentType,
   *    DePassport,
   *    DePassportDocumentType,
   *    DeResidencePermitBack,
   *    DeResidencePermitBackDocumentType,
   *    DeResidencePermitFront,
   *    DeResidencePermitFrontDocumentType,
   *    GenericDocument,
   *  } from 'react-native-scanbot-sdk';
   *
   *   switch (document.type.name) {
   *     case DeIdCardFrontDocumentType: {
   *       const deIdCardFront = new DeIdCardFront(document);
   *       return (
   *         <View>
   *           <ResultHeader title={'DE ID Card Result'} />
   *           <ResultFieldRow
   *             title={'Given Name'}
   *             value={deIdCardFront.givenNames}
   *           />
   *           <ResultFieldRow title={'Surname'} value={deIdCardFront.surname} />
   *           <ResultFieldRow title={'Birthdate'} value={deIdCardFront.birthDate} />
   *         </View>
   *       );
   *     }
   *     case DeIdCardBackDocumentType: // const deIDCard = new DeIdCardBack(document);
   *     case DePassportDocumentType: // const dePassport = new DePassport(document);
   *     case DeDriverLicenseFrontDocumentType: // const deDriverLicenseFront = new DeDriverLicenseFront(document);
   *     case DeDriverLicenseBackDocumentType: // const deDriverLicenseBack = new DeDriverLicenseBack(document);
   *     case DeResidencePermitFrontDocumentType: // const deResidencePermitFront = new DeResidencePermitFront(document);
   *     case DeResidencePermitBackDocumentType: //  const deResidencePermitBack = new DeResidencePermitBack(document);
   *   }
   **/

  return (
    <View>
      <ResultHeader title={'Generic Document'} />
      {GenericDocumentUtils.extractGenericDocumentFields(document).map(
        (field, index) => (
          <ResultFieldRow
            key={field.type.name + index}
            title={field.type.name.trim()}
            value={field.value?.text}
          />
        ),
      )}
    </View>
  );
}

export function GenericDocumentResultScreen() {
  const {params: genericDocumentResult} =
    useRoute<GenericDocumentResultScreenRouteProp>();

  const GenericDocuments = useMemo(() => {
    if (genericDocumentResult.documents.length === 0) {
      return () => null;
    }

    return () => (
      <View>
        {genericDocumentResult.documents.map((document, index) => (
          <GenericDocumentResult document={document} key={index} />
        ))}
      </View>
    );
  }, [genericDocumentResult]);

  return (
    <ResultContainer>
      <GenericDocuments />
    </ResultContainer>
  );
}
