import React from 'react';
import {
  ImageResizeMode,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MedicalCertificateCheckboxField, MedicalCertificateDateField} from 'react-native-scanbot-sdk/src/model';
import {MedicalCertificateScannerResultData} from 'react-native-scanbot-sdk/src/result';
import {Colors} from '../model/Colors';
import {Results} from '../model/Results';
import PreviewImage from '../ui/PreviewImage';
import {BaseScreen} from '../utils/BaseScreen';

const keyValueDescription = (dict: any): string => {
  return Object.keys(dict)
    .flatMap(key => `${key}: ${JSON.stringify(dict[key])}`)
    .join('\n');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 16,
    marginTop: 16,
  },
  fieldsText: {
    fontSize: 20,
    marginHorizontal: 18,
    marginVertical: 16,
  },
  image: {
    height: 250,
    resizeMode: 'cover', //'cover' | 'contain' | 'stretch' | 'repeat' | 'center'
    backgroundColor: 'black',
    marginTop: -16,
  },
  sectionHeader: {
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 8,
    fontSize: 22,
    marginBottom: 16,
    color: 'white',
    backgroundColor: Colors.SCANBOT_RED,
  },
  item: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 18,
    lineHeight: 18,
  },
  contentContainer: {
    paddingBottom: 48,
  },
});

const getPatientData = (certificate: MedicalCertificateScannerResultData) => {
  if (!certificate.patientData) {
    return [];
  }

  const fields = [
    {key: 'firstName', display: 'First Name'},
    {key: 'lastName', display: 'Last Name'},
    {key: 'insuranceProvider', display: 'Insurance Provider'},
    {key: 'address1', display: 'Address #1'},
    {key: 'address2', display: 'Address #2'},
    {key: 'diagnose', display: 'Diagnose'},
    {key: 'healthInsuranceNumber', display: 'Health Insurance Number'},
    {key: 'insuredPersonNumber', display: 'Insured Person Number'},
    {key: 'status', display: 'Status'},
    {key: 'placeOfOperationNumber', display: 'Place of Operation Number'},
    {key: 'doctorNumber', display: "Doctor's number"},
  ];

  return fields
    .flatMap(item => {
      const key = item.key;
      const dict = certificate.patientData as any;
      if (!(key in dict)) {
        return undefined;
      }
      const value: string = dict[key];
      return JSON.stringify({key: item.display, value: value});
    })
    .filter(item => item);
};

const getDatesData = (certificate: MedicalCertificateScannerResultData) => {
  if (!certificate.dates) {
    return [];
  }
  const dates = certificate.dates!;
  const displayNames = {
    incapableOfWorkSince: 'Incapable of work since',
    incapableOfWorkUntil: 'Incapable of work until',
    diagnosedOn: 'Diagnosed on',
    childNeedsCareFrom: 'Child needs care from',
    childNeedsCareUntil: 'Child needs care until',
    birthDate: 'Patient birth date',
    documentDate: 'Document date',
  } as any;
  return Object.keys(dates).flatMap(key => {
    const dict = dates as any;
    const value = dict[key] as MedicalCertificateDateField;
    const confidence = Math.round(value.recognitionConfidence * 100);
    const displayName = key in displayNames ? displayNames[key] : key;
    return JSON.stringify({
      key: displayName,
      value: `${value.dateString} (confidence: ${confidence}%)`,
    });
  });
};

const getCheckboxesData = (
  certificate: MedicalCertificateScannerResultData,
) => {
  const checkboxes = certificate.checkboxes;
  if (!checkboxes) {
    return [];
  }
  const displayNames = {
    initialCertificate: 'Initial Certificate',
    renewedCertificate: 'Renewed Certificate',
    workAccident: 'Work Accident',
    assignedToAccidentInsuranceDoctor: 'Assigned to Accident Insurance Doctor',
    accident: 'Accident?',
    requiresCare: 'Child requires care?',
    insuredPayCase: 'Insurance company has to pay?',
    finalCertificate: 'The certificate is final?',
  } as any;

  return Object.keys(checkboxes).flatMap(key => {
    const dict = checkboxes as any;
    const value = dict[key] as MedicalCertificateCheckboxField;
    const confidence = Math.round(value.confidence * 100);
    const displayName = key in displayNames ? displayNames[key] : key;
    return JSON.stringify({
      key: displayName,
      value: `${value.isChecked ? 'YES' : 'NO'} (confidence: ${confidence}%)`,
    });
  });
};

export class MedicalCertificateResultsScreen extends BaseScreen {
  render() {
    const certificate = Results.lastMedicalCertificate!;

    const B = (props: any) => (
      // eslint-disable-next-line react-native/no-inline-styles
      <Text style={{fontWeight: 'bold'}}>{props.children}</Text>
    );
    return (
      <>
        <View style={styles.container}>
          <SectionList
            contentContainerStyle={styles.contentContainer}
            bounces={false}
            sections={[
              {
                title: 'Snapped Page',
                data: [
                  JSON.stringify({
                    key: 'page',
                    value: '',
                  }),
                ],
              },
              {title: 'Patient Data', data: getPatientData(certificate)},
              {title: 'Dates', data: getDatesData(certificate)},
              {title: 'Checkboxes', data: getCheckboxesData(certificate)},
            ]}
            renderItem={({item}) => {
              const pair: {key: string; value: string} = JSON.parse(item);
              if (pair.key === 'page') {
                return (
                  <PreviewImage
                    page={certificate.capturedPage!}
                    style={styles.image}
                  />
                );
              }
              return (
                <>
                  <Text style={styles.item}>
                    <B>{pair.key}</B>
                  </Text>
                  <Text style={styles.item}>{pair.value}</Text>
                </>
              );
            }}
            renderSectionHeader={({section}) => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item, index) => '' + index}
          />
          {/* <ScrollView>
            <PreviewImage
              page={Results.lastMedicalCertificate!.capturedPage!}
              style={styles.image}
            />
            <Text style={styles.headerText}>Patient Data</Text>
            <Text style={styles.fieldsText}>
              {keyValueDescription(Results.lastMedicalCertificate?.patientData)}
            </Text>
            <Text style={styles.headerText}>Dates</Text>
            <Text style={styles.fieldsText}>
              {keyValueDescription(Results.lastMedicalCertificate?.dates)}
            </Text>
            <Text style={styles.headerText}>Checkboxes</Text>
            <Text style={styles.fieldsText}>
              {keyValueDescription(Results.lastMedicalCertificate?.checkboxes)}
            </Text>
          </ScrollView> */}
        </View>
      </>
    );
  }
}
