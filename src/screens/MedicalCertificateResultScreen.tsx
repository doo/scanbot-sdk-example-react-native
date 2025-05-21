import React, {useEffect, useState} from 'react';
import {
  autorelease,
  MedicalCertificateCheckBox,
  MedicalCertificateDateRecord,
  MedicalCertificatePatientInfoBox,
  MedicalCertificateScanningResult,
} from 'react-native-scanbot-sdk';
import {useRoute} from '@react-navigation/native';
import {MedicalCertificateResultScreenRouteProp} from '@utils';
import {
  ResultContainer,
  ResultFieldRow,
  ResultHeader,
  ResultImage,
} from '@components';
import {View} from 'react-native';

export function MedicalCertificateResultScreen() {
  const route = useRoute<MedicalCertificateResultScreenRouteProp>();
  const [medicalCertificateResult, setMedicalCertificateResult] =
    useState<MedicalCertificateScanningResult>();
  const [image, setImage] = useState<string>();

  useEffect(() => {
    /**
     * Since the result contains an image reference, an autorelease pool is required to manage memory correctly.
     * Referencing the image allows flexibility:
     *  * The image can be encoded (e.g., as a base64 buffer),
     *  * The image can be saved on disk.
     *  * Information about the image can be extracted,
     * In this example, we encode the image as a base64 buffer.
     */
    autorelease(async () => {
      const result = new MedicalCertificateScanningResult(
        route.params.certificate,
      );
      const imageData = await result.croppedImage?.encodeImage();

      if (imageData) {
        setImage(`data:image/jpeg;base64,${imageData}`);
      }

      setMedicalCertificateResult(result);
    });
  }, [route.params.certificate]);

  return (
    <ResultContainer>
      <ResultImage imageUri={image} />
      <ResultFieldRow
        title={'Form Type'}
        value={medicalCertificateResult?.formType}
      />
      <ResultHeader title={'Patient Data'} />
      <PatientDataFields
        patientData={medicalCertificateResult?.patientInfoBox}
      />
      <ResultHeader title={'Dates'} />
      <DatesData datesData={medicalCertificateResult?.dates} />
      <ResultHeader title={'Checkboxes'} />
      <CheckboxesData checkboxes={medicalCertificateResult?.checkBoxes} />
    </ResultContainer>
  );
}

function PatientDataFields({
  patientData,
}: {
  patientData?: MedicalCertificatePatientInfoBox;
}) {
  if (!patientData) {
    return null;
  }

  return (
    <View>
      {patientData.fields.map(field => (
        <ResultFieldRow
          title={field.type}
          value={field.value}
          key={field.type}
        />
      ))}
    </View>
  );
}

const DatesData = ({
  datesData,
}: {
  datesData?: MedicalCertificateDateRecord[];
}) => {
  if (!datesData) {
    return null;
  }

  return (
    <View>
      {datesData.map(dateData => (
        <ResultFieldRow
          title={dateData.type}
          value={dateData.value}
          key={dateData.type}
        />
      ))}
    </View>
  );
};

const CheckboxesData = ({
  checkboxes,
}: {
  checkboxes?: MedicalCertificateCheckBox[];
}) => {
  if (!checkboxes) {
    return null;
  }

  return (
    <View>
      {checkboxes.map(checkBox => (
        <ResultFieldRow
          title={checkBox.type}
          value={checkBox.checked}
          key={checkBox.type}
        />
      ))}
    </View>
  );
};
