import React from 'react';
import {MedicalCertificateScannerResult} from 'react-native-scanbot-sdk';
import {ScanResultSectionList} from '../components/ScanResultSectionList';
import {useRoute} from '@react-navigation/native';
import {MedicalCertificateResultScreenRouteProp} from '../utils/Navigation';

export function MedicalCertificateResultScreen() {
  const {params: medicalCertificateResult} =
    useRoute<MedicalCertificateResultScreenRouteProp>();

  return (
    <ScanResultSectionList
      sectionData={[
        {
          title: 'Medical Certificate Result',
          data: [
            {
              key: 'Snapped Image',
              image: medicalCertificateResult.imageFileUri,
            },
            {key: 'Form Type', value: medicalCertificateResult.formType},
          ],
        },
        {
          title: 'Patient Data',
          data: transformPatientData(medicalCertificateResult),
        },
        {
          title: 'Dates',
          data: transformDatesData(medicalCertificateResult),
        },
        {
          title: 'Checkboxes',
          data: getCheckboxesData(medicalCertificateResult),
        },
      ]}
    />
  );
}

type PatientDataKeys = keyof MedicalCertificateScannerResult['patientData'];
type DatesKeys = keyof MedicalCertificateScannerResult['dates'];
type CheckBoxKeys = keyof MedicalCertificateScannerResult['checkboxes'];

function transformPatientData(certificate: MedicalCertificateScannerResult) {
  if (!certificate.patientData) {
    return [];
  }

  const displayMap: Record<PatientDataKeys, string> = {
    firstName: 'First Name',
    lastName: 'Last Name',
    insuranceProvider: 'Insurance Provider',
    address1: 'Address #1',
    address2: 'Address #2',
    diagnose: 'Diagnose',
    healthInsuranceNumber: 'Health Insurance Number',
    insuredPersonNumber: 'Insured Person Number',
    status: 'Status',
    placeOfOperationNumber: 'Place of Operation Number',
    doctorNumber: "Doctor's number",
    unknown: 'Unknown',
  };

  return Object.keys(displayMap)
    .filter(
      mapKey =>
        mapKey in certificate.patientData &&
        certificate.patientData[mapKey as PatientDataKeys] != null,
    )
    .map(mapKey => ({
      key: displayMap[mapKey as PatientDataKeys],
      value: `${
        certificate.patientData[mapKey as PatientDataKeys]!.value
      } (confidence: ${Math.round(
        certificate.patientData[mapKey as PatientDataKeys]!
          .recognitionConfidence * 100,
      )} %)`,
    }));
}

const transformDatesData = (certificate: MedicalCertificateScannerResult) => {
  if (!certificate.dates) {
    return [];
  }

  const dates = certificate.dates;

  const displayMap = {
    incapableOfWorkSince: 'Incapable of work since',
    incapableOfWorkUntil: 'Incapable of work until',
    diagnosedOn: 'Diagnosed on',
    childNeedsCareFrom: 'Child needs care from',
    childNeedsCareUntil: 'Child needs care until',
    birthDate: 'Patient birth date',
    documentDate: 'Document date',
    unknown: 'Unknown',
  };

  return Object.keys(dates).map(key => {
    const returnKey = key in displayMap ? displayMap[key as DatesKeys] : key;
    let confidence = dates[key as DatesKeys]?.recognitionConfidence ?? 0;
    confidence = Math.round(confidence * 100);
    const returnValue = certificate.dates[key as DatesKeys]?.dateString ?? '';

    return {
      key: returnKey,
      value: `${returnValue} (confidence: ${confidence} %)`,
    };
  });
};

const getCheckboxesData = (certificate: MedicalCertificateScannerResult) => {
  const checkboxes = certificate.checkboxes;
  if (!checkboxes) {
    return [];
  }
  const displayNames: Record<CheckBoxKeys, string> = {
    initialCertificate: 'Initial Certificate',
    renewedCertificate: 'Renewed Certificate',
    workAccident: 'Work Accident',
    assignedToAccidentInsuranceDoctor: 'Assigned to Accident Insurance Doctor',
    accidentYes: 'Accident box checked Yes?',
    accidentNo: 'Accident box checked No?',
    requiresCareYes: 'Child requires care checked Yes?',
    requiresCareNo: 'Child requires care checked No?',
    insuredPayCase: 'Insurance company has to pay?',
    finalCertificate: 'The certificate is final?',
    otherAccident: 'Other Accident?',
    entitlementToContinuedPaymentNo: '',
    entitlementToContinuedPaymentYes: '',
    sickPayWasClaimedNo: 'Claimed sick pay No?',
    sickPayWasClaimedYes: 'Claimed sick play Yes?',
    singleParentNo: 'Single parent No?',
    singleParentYes: 'Single parent Yes?',
    unknown: 'Unknown',
  };

  return Object.keys(checkboxes).flatMap(key => {
    const value = checkboxes[key as CheckBoxKeys]?.isChecked;
    let confidence = checkboxes[key as CheckBoxKeys]?.confidence ?? 0;
    confidence = Math.round(confidence * 100);
    const displayName =
      key in displayNames ? displayNames[key as CheckBoxKeys] : key;
    return {
      key: displayName,
      value: `${value ? 'YES' : 'NO'} (confidence: ${confidence}%)`,
    };
  });
};
