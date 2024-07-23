import React from 'react';
import {MedicalCertificateScannerResult} from 'react-native-scanbot-sdk';
import {useRoute} from '@react-navigation/native';
import {MedicalCertificateResultScreenRouteProp} from '@utils';
import {
  ResultContainer,
  ResultFieldRow,
  ResultHeader,
  ResultImage,
} from '@components';
import {
  MedicalCertificateCheckboxesInfo,
  MedicalCertificateCheckboxField,
  MedicalCertificateDateField,
  MedicalCertificateDatesInfo,
  MedicalCertificatePatientDataInfo,
  MedicalCertificatePatientDataInfoField,
} from 'react-native-scanbot-sdk/src/types';
import {View} from 'react-native';

export function MedicalCertificateResultScreen() {
  const {params: medicalCertificateResult} =
    useRoute<MedicalCertificateResultScreenRouteProp>();

  return (
    <ResultContainer>
      <ResultImage imageUri={medicalCertificateResult.imageFileUri} />
      <ResultHeader title={'Medical Certificate Result'} />
      <ResultFieldRow
        title={'Form Type'}
        value={medicalCertificateResult.formType}
      />
      <ResultHeader title={'Patient Data'} />
      <PatientDataFields patientData={medicalCertificateResult.patientData} />
      <ResultHeader title={'Dates'} />
      <DatesData datesData={medicalCertificateResult.dates} />
      <ResultHeader title={'Checkboxes'} />
      <CheckboxesData checkboxes={medicalCertificateResult.checkboxes} />
    </ResultContainer>
  );
}

type PatientDataKeys = keyof MedicalCertificateScannerResult['patientData'];
type DatesKeys = keyof MedicalCertificateScannerResult['dates'];
type CheckBoxKeys = keyof MedicalCertificateScannerResult['checkboxes'];

function PatientDataFields({
  patientData,
}: {
  patientData: MedicalCertificatePatientDataInfo;
}) {
  if (!patientData) {
    return null;
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

  return (
    <View>
      {Object.entries(patientData).map(([key, data], index) => (
        <ResultFieldRow
          title={displayMap[key as PatientDataKeys] ?? key}
          value={(data as MedicalCertificatePatientDataInfoField).value}
          key={key + index}
        />
      ))}
    </View>
  );
}

const DatesData = ({datesData}: {datesData: MedicalCertificateDatesInfo}) => {
  if (!datesData) {
    return null;
  }

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

  return (
    <View>
      {Object.entries(datesData).map(([key, data], index) => (
        <ResultFieldRow
          title={displayMap[key as DatesKeys] ?? key}
          value={(data as MedicalCertificateDateField).dateString}
          key={key + index}
        />
      ))}
    </View>
  );
};

const CheckboxesData = ({
  checkboxes,
}: {
  checkboxes: MedicalCertificateCheckboxesInfo;
}) => {
  if (!checkboxes) {
    return null;
  }
  const displayMap: Record<CheckBoxKeys, string> = {
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

  return (
    <ResultContainer>
      {Object.entries(checkboxes).map(([key, data], index) => (
        <ResultFieldRow
          title={displayMap[key as CheckBoxKeys] ?? key}
          value={(data as MedicalCertificateCheckboxField).isChecked}
          key={key + index}
        />
      ))}
    </ResultContainer>
  );
};
