import {
  AAMVADocumentFormat,
  BarcodeResultField,
  BaseDocumentFormat,
  BoardingPassDocumentFormat,
  GS1DocumentFormat,
  IDCardPDF417DocumentFormat,
  MedicalCertificateDocumentFormat,
  MedicalPlanDocumentFormat,
  SEPADocumentFormat,
  SwissQRCodeDocumentFormat,
  VCardDocumentFormat,
} from 'react-native-scanbot-sdk';

export function logBarcodeDocument(barcodeItem: BarcodeResultField) {
  const formattedResult = barcodeItem.formattedResult as BaseDocumentFormat;
  if (!formattedResult) {
    return;
  }
  console.log('Formatted result:\n' + JSON.stringify(formattedResult, null, 4));
  switch (formattedResult.documentFormat) {
    case 'AAMVA':
      const aamva = barcodeItem.formattedResult as AAMVADocumentFormat;
      console.log('AAMVA Number of entries: ' + aamva.numberOfEntries);
      break;
    case 'BOARDING_PASS':
      const boardingPass =
        barcodeItem.formattedResult as BoardingPassDocumentFormat;
      console.log('Boarding Pass Security Data: ' + boardingPass.securityData);
      break;
    case 'DE_MEDICAL_PLAN':
      const deMedicalPlan =
        barcodeItem.formattedResult as MedicalPlanDocumentFormat;
      console.log(
        'Medical Plan Total number of pages: ' +
          deMedicalPlan.totalNumberOfPages,
      );
      break;
    case 'MEDICAL_CERTIFICATE':
      const medicalCertificate =
        barcodeItem.formattedResult as MedicalCertificateDocumentFormat;
      const mcField = medicalCertificate.fields[0];
      if (!mcField) {
        return;
      }
      console.log(
        `Medical Certificate first field: ${mcField.type}: ${mcField.value}`,
      );
      break;
    case 'ID_CARD_PDF_417':
      const idCard = barcodeItem.formattedResult as IDCardPDF417DocumentFormat;
      const idCardField = idCard.fields[0];
      if (!idCardField) {
        return;
      }
      console.log(
        `ID Card PDF417 first field: ${idCardField.type}: ${idCardField.value}`,
      );
      break;
    case 'SEPA':
      const sepa = barcodeItem.formattedResult as SEPADocumentFormat;
      const sepaField = sepa.fields[0];
      if (!sepaField) {
        return;
      }
      console.log(`SEPA first field: ${sepaField.type}: ${sepaField.value}`);
      break;
    case 'SWISS_QR':
      const swissQR = barcodeItem.formattedResult as SwissQRCodeDocumentFormat;
      const swissQrField = swissQR.fields[0];
      if (!swissQrField) {
        return;
      }
      console.log(
        `SwissQR first field: ${swissQrField.type}: ${swissQrField.value}`,
      );
      break;
    case 'VCARD':
      const vCard = barcodeItem.formattedResult as VCardDocumentFormat;
      const vCardField = vCard.fields[0];
      if (!vCardField) {
        return;
      }
      console.log(
        `vCard first field: ${vCardField.type}: ${vCardField.values.join(',')}`,
      );
      break;
    case 'GS1':
      const gs1 = barcodeItem.formattedResult as GS1DocumentFormat;
      const gs1Field = gs1.fields[0];
      if (!gs1Field) {
        return;
      }
      console.log(
        `GS1 first field: ${gs1Field.fieldDescription}: ${gs1Field.rawValue}`,
      );
      break;
  }
}
