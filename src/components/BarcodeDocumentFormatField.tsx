import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ResultFieldRow} from './ResultFieldRow';

import {
  AAMVA,
  BarcodeDocumentModelRootType,
  BoardingPass,
  GenericDocument,
  GS1,
  IDCardPDF417,
  MedicalCertificate,
  SEPA,
  SwissQR,
  VCard,
} from 'react-native-scanbot-sdk';
import {GenericDocumentUtils} from '../utils/GenericDocumentUtils.ts';

function AAMVADocumentFields({document}: {document: AAMVA}) {
  return (
    <View>
      <ResultFieldRow
        title={'File type:'}
        value={document.issuerIdentificationNumber}
      />
      <ResultFieldRow title={'Aamva version number'} value={document.version} />
      <ResultFieldRow
        title={'Issuer identification number'}
        value={document.issuerIdentificationNumber}
      />
      <ResultFieldRow
        title={'Jurisdiction version number'}
        value={document.jurisdictionVersionNumber}
      />
      <ResultFieldRow title={'Version'} value={document.version} />
    </View>
  );
}

function BoardingPassFields({document}: {document: BoardingPass}) {
  return (
    <View>
      <ResultFieldRow title={'Name'} value={document.name} />
      <ResultFieldRow title={'Security Data'} value={document.securityData} />
      <ResultFieldRow
        title={'Electronic ticket'}
        value={document.electronicTicket}
      />
      <ResultFieldRow title={'Number of legs'} value={document.numberOfLegs} />
    </View>
  );
}

function GS1Fields({document}: {document: GS1}) {
  return (
    <View>
      <ResultFieldRow title={'Fields'} value={''} style={styles.titleRow} />
      {document.elements.map((field, index) => (
        <View key={index}>
          <ResultFieldRow
            title={'Description'}
            value={field.elementDescription}
          />
          <ResultFieldRow title={'Raw field'} value={field.rawValue} />
          <ResultFieldRow title={'Data Title'} value={field.dataTitle} />
          <ResultFieldRow
            title={'Application ID'}
            value={field.applicationIdentifier}
          />
          <ResultFieldRow
            title={'Validation Status'}
            value={field.validationStatus}
          />
        </View>
      ))}
    </View>
  );
}

function IDCardPDF417Fields({document}: {document: IDCardPDF417}) {
  return (
    <View>
      <ResultFieldRow title={'Document code'} value={document.documentCode} />
      <ResultFieldRow title={'Date issued'} value={document.dateIssued} />
      <ResultFieldRow title={'Date expired'} value={document.dateExpired} />
      <ResultFieldRow title={'First Name'} value={document.firstName} />
      <ResultFieldRow title={'Last Name'} value={document.lastName} />
      <ResultFieldRow title={'Birth Date'} value={document.birthDate} />
      <ResultFieldRow title={'Optional'} value={document.optional} />
    </View>
  );
}

function MedicalCertificateFields({document}: {document: MedicalCertificate}) {
  return (
    <View>
      <ResultFieldRow title={'First name'} value={document.firstName} />
      <ResultFieldRow title={'Last name'} value={document.lastName} />
      <ResultFieldRow title={'Birthdate'} value={document.birthDate} />
      <ResultFieldRow title={'Doctor number'} value={document.doctorNumber} />
      <ResultFieldRow
        title={'Health insurance number'}
        value={document.healthInsuranceNumber}
      />
    </View>
  );
}

function SepaFields({document}: {document: SEPA}) {
  return (
    <View>
      <ResultFieldRow title={'Version'} value={document.version} />
      <ResultFieldRow title={'Amount'} value={document.amount} />
      <ResultFieldRow title={'Character Set'} value={document.characterSet} />
      <ResultFieldRow title={'Purpose'} value={document.purpose} />
      <ResultFieldRow
        title={'Identification'}
        value={document.identification}
      />
      <ResultFieldRow title={'Information'} value={document.information} />
      <ResultFieldRow title={'Receiver BIC'} value={document.receiverBIC} />
      <ResultFieldRow title={'Receiver IBAN'} value={document.receiverIBAN} />
      <ResultFieldRow title={'Receiver Name'} value={document.receiverName} />
      <ResultFieldRow title={'Remittance'} value={document.remittance} />
    </View>
  );
}

function SwissQRFields({document}: {document: SwissQR}) {
  return (
    <View>
      <ResultFieldRow title={'Version'} value={document.version} />
      <ResultFieldRow title={'Ammount'} value={document.amount} />
      <ResultFieldRow title={'Due date'} value={document.dueDate} />
      <ResultFieldRow title={'Currency'} value={document.currency} />
      <ResultFieldRow title={'Debtor Name'} value={document.debtorName} />
      <ResultFieldRow title={'IBAN'} value={document.iban} />
    </View>
  );
}

function VCardFields({document}: {document: VCard}) {
  return (
    <View>
      <ResultFieldRow title={'Name'} value={document.name?.rawValue} />
      <ResultFieldRow title={'Title'} value={document.title?.rawValue} />
      <ResultFieldRow
        title={'First Name'}
        value={document.firstName?.rawValue}
      />
      <ResultFieldRow title={'Birthday'} value={document.birthday?.rawValue} />
      <ResultFieldRow title={'Email'} value={document.email?.rawValue} />
      <ResultFieldRow title={'Role'} value={document.role?.rawValue} />
    </View>
  );
}

export function BarcodeDocumentFormatField({
  document,
  staticFields = false,
}: {
  document: GenericDocument;
  staticFields?: boolean;
}) {
  /**
   * Fields from Generic Document could be managed in the following ways:
   *
   * 1. Extract all the fields from the Generic Document itself
   * 2. Use the wrappers provided by ScanbotSDK and use the desired properties directly
   *
   */
  let Document;

  if (!staticFields) {
    Document = (
      <View>
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
  } else {
    switch (document.type.name as BarcodeDocumentModelRootType) {
      case 'AAMVA':
        Document = <AAMVADocumentFields document={new AAMVA(document)} />;
        break;
      case 'BoardingPass':
        Document = <BoardingPassFields document={new BoardingPass(document)} />;
        break;
      case 'GS1':
        Document = <GS1Fields document={new GS1(document)} />;
        break;
      case 'IDCardPDF417':
        Document = <IDCardPDF417Fields document={new IDCardPDF417(document)} />;
        break;
      case 'MedicalCertificate':
        Document = (
          <MedicalCertificateFields
            document={new MedicalCertificate(document)}
          />
        );
        break;
      case 'SEPA':
        Document = <SepaFields document={new SEPA(document)} />;
        break;
      case 'SwissQR':
        Document = <SwissQRFields document={new SwissQR(document)} />;
        break;
      case 'VCard':
        Document = <VCardFields document={new VCard(document)} />;
        break;
      default: {
        Document = <View />;
      }
    }
  }

  return (
    <View>
      <ResultFieldRow title={'Parsed Document'} value={document.type.name} />
      {Document}
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    backgroundColor: '#00000026',
  },
});
