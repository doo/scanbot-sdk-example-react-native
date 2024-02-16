import React from 'react';
import {useRoute} from '@react-navigation/native';
import {BarcodeResultScreenRouteProp} from '../utils/Navigation';
import {ScanResultSectionList} from '../components/ScanResultSectionList';
import {
  AAMVADocumentFormat,
  AAMVADocumentSubfile,
  BarcodeResultField,
  BarcodeScannerResult,
  BoardingPassDocumentFormat,
  GS1DocumentFormat,
  IDCardPDF417DocumentFormat,
  MedicalCertificateDocumentFormat,
  MedicalPlanDocumentFormat,
  MedicalPlanStandardSubheading,
  SEPADocumentFormat,
  SwissQRCodeDocumentFormat,
  VCardDocumentFormat,
} from 'react-native-scanbot-sdk';

type KeyValueField = {key: string; value: string};

export function BarcodeResultScreen() {
  const {params: barcodeResult} = useRoute<BarcodeResultScreenRouteProp>();

  return <ScanResultSectionList sectionData={transformData(barcodeResult)} />;
}

const transformData = (result: BarcodeScannerResult) => {
  const barcodes = result.barcodes;
  if (!barcodes) {
    return [];
  }

  return barcodes.map((barcode, index) => ({
    title: `Barcode #${index + 1} (${barcode.type})`,
    data: transformBarcode(barcode),
  }));
};

const getTextField = (name: string, value?: string) => {
  return {key: name, value: value && value.trim().length > 0 ? value : '-'};
};

const transformBarcode = (barcode: BarcodeResultField): KeyValueField[] => {
  const fields = [
    getTextField('Text (with extension)', barcode.textWithExtension),
    getTextField('Type', barcode.type),
    getTextField('Parsed', barcode.parsedSuccessful ? 'YES' : 'NO'),
  ];

  if (barcode.formattedResult != null) {
    fields.push(
      getTextField(
        'FORMATTED RESULT',
        barcode.formattedResult?.documentFormat ?? '-',
      ),
    );
    fields.push(...transformFormattedResult(barcode));
  }

  return fields;
};

const transformFormattedResult = (
  barcode: BarcodeResultField,
): KeyValueField[] => {
  const formattedResult = barcode.formattedResult;
  if (!formattedResult) {
    return [];
  }

  switch (formattedResult.documentFormat) {
    case 'AAMVA':
      return transformAAMVA(formattedResult as AAMVADocumentFormat);
    case 'BOARDING_PASS':
      return transformBoardingPass(
        formattedResult as BoardingPassDocumentFormat,
      );
    case 'DE_MEDICAL_PLAN':
      return transformDeMedicalPlan(
        formattedResult as MedicalPlanDocumentFormat,
      );
    case 'GS1':
      return transformGS1(formattedResult as GS1DocumentFormat);
    case 'ID_CARD_PDF_417':
      return transformIdCard(formattedResult as IDCardPDF417DocumentFormat);
    case 'MEDICAL_CERTIFICATE':
      return transformMedicalCertificate(
        formattedResult as MedicalCertificateDocumentFormat,
      );
    case 'SEPA':
      return transformSepa(formattedResult as SEPADocumentFormat);
    case 'SWISS_QR':
      return transformSwissQR(formattedResult as SwissQRCodeDocumentFormat);
    case 'VCARD':
      return transformVCard(formattedResult as VCardDocumentFormat);
  }
};

const transformAAMVA = (document: AAMVADocumentFormat): KeyValueField[] => {
  return [
    getTextField('AAMVA Version Number', document.aamvaVersionNumber),
    getTextField('File Type', document.fileType),
    getTextField('Header Raw String', document.headerRawString),
    getTextField('Issuer ID Number', document.issuerIdentificationNumber),
    getTextField(
      'Jurisdiction Version Number',
      document.jurisdictionVersionNumber,
    ),
    getTextField('Number of entries', document.numberOfEntries.toString()),
    ...document.subfiles.flatMap((subfile, index) =>
      transformAAMVASubfile(subfile, index),
    ),
  ];
};

const transformAAMVASubfile = (
  subfile: AAMVADocumentSubfile,
  index: number,
): KeyValueField[] => {
  return [
    getTextField(`Subfile ${index + 1} Raw Header`, subfile.subFileRawHeader),
    getTextField(`Subfile ${index + 1} Type`, subfile.subFileType),
    ...subfile.fields.map(field =>
      getTextField(`Subfile ${index + 1} ${field.type}`, field.value),
    ),
  ];
};

const transformBoardingPass = (
  document: BoardingPassDocumentFormat,
): KeyValueField[] => {
  return [
    getTextField('Electronic Ticket', document.electronicTicket ? 'YES' : 'NO'),
    getTextField('Security Data', document.securityData),
    getTextField('Number of legs', document.numberOfLegs.toString()),
  ].concat(
    document.legs !== undefined
      ? document.legs.flatMap((leg, index) =>
          leg.fields.map(legField =>
            getTextField(`Leg ${index + 1} ${legField.type}`, legField.value),
          ),
        )
      : [],
  );
};

const transformDeMedicalPlan = (document: MedicalPlanDocumentFormat) => {
  return [
    getTextField('GUID', document.GUID),
    getTextField('Current Page', document.currentPage.toString()),
    getTextField(
      'Total Number of Pages',
      document.totalNumberOfPages.toString(),
    ),
    ...document.doctor.fields.flatMap(field =>
      getTextField(`Doctor - ${field.type}`, field.value),
    ),
    ...document.patient.fields.flatMap(field =>
      getTextField(`Patient - ${field.type}`, field.value),
    ),
    ...transformDeMedicalPlanSubheadings(document.subheadings),
    getTextField('Patch Version Number', document.patchVersionNumber),
    getTextField('Language Country Code', document.languageCountryCode),
    getTextField('Document Version Number', document.documentVersionNumber),
  ];
};

const transformDeMedicalPlanSubheadings = (
  subheadings: MedicalPlanStandardSubheading[],
): KeyValueField[] => {
  return subheadings.flatMap((subheading, index) => [
    ...subheading.generalNotes.map((note, noteIndex) =>
      getTextField(
        `Subheading #${index + 1} - General Note ${noteIndex}`,
        note,
      ),
    ),
    ...subheading.medicines.flatMap((medicine, medicineIndex) => [
      getTextField(
        `Subheading #${index + 1} - Medicine ${medicineIndex} Fields`,
        medicine.fields
          .map(medField => `- ${medField.type}: ${medField.value}`)
          .join('\n\n'),
      ),

      getTextField(
        `Subheading #${index + 1} - Medicine ${medicineIndex} Substances`,
        medicine.substances
          .flatMap(medSub =>
            medSub.fields.map(
              medSubField => `${medSubField.type}: ${medSubField.value}`,
            ),
          )
          .join('\n'),
      ),
    ]),
  ]);
};

const transformGS1 = (document: GS1DocumentFormat) => {
  return document.fields.flatMap((field, index) => [
    getTextField(`Field #${index + 1} - Data Title`, field.dataTitle),
    getTextField(`Field #${index + 1} - Description`, field.fieldDescription),
    getTextField(`Field #${index + 1} - Raw Value`, field.rawValue),
    getTextField(
      `Field #${index + 1} - Standard`,
      field.standard ? 'YES' : 'NO',
    ),
    getTextField(
      `Field #${index + 1} - Validation Status`,
      field.validationStatus,
    ),
  ]);
};

const transformIdCard = (document: IDCardPDF417DocumentFormat) => {
  return document.fields.flatMap(field => [
    getTextField(field.type ?? 'Unknown ID Card Field type', field.value),
  ]);
};

const transformMedicalCertificate = (
  document: MedicalCertificateDocumentFormat,
) => {
  return document.fields.flatMap(field => [
    getTextField(
      field.type ?? 'Unknown Medical certificate Field type',
      field.value,
    ),
  ]);
};

const transformSepa = (document: SEPADocumentFormat) => {
  return document.fields.flatMap(field => [
    getTextField(field.type, field.value),
  ]);
};

const transformSwissQR = (document: SwissQRCodeDocumentFormat) => {
  return [
    getTextField('Version', document.version),
    ...document.fields.flatMap(field => [
      getTextField(field.type, field.value),
    ]),
  ];
};

const transformVCard = (document: VCardDocumentFormat) => {
  return document.fields.flatMap(field => [
    getTextField(`${field.type} - Raw Text`, field.rawText),
    getTextField(
      `${field.type} - Values`,
      field.values.map(v => `- ${v}`).join('\n\n'),
    ),
    getTextField(
      `${field.type} - Type Modifiers`,
      field.typeModifiers.map(t => `- ${t}`).join('\n\n'),
    ),
  ]);
};
