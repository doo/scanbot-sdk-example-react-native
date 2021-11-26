import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {Pages} from '../model/Pages';
import PreviewImage from '../ui/PreviewImage';
import {BaseScreen} from '../utils/BaseScreen';

const keyValueDescription = (dict: any): string => {
  return Object.keys(dict)
    .flatMap(key => `${key}: ${JSON.stringify(dict[key])}`)
    .join('\n');
};

const styles = StyleSheet.create({
  scrollView: {
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
    maxHeight: 200,
    backgroundColor: 'black',
  },
});

export class MedicalCertificateResultsScreen extends BaseScreen {
  render() {
    return (
      <>
        <SafeAreaView>
          <ScrollView>
            <PreviewImage
              page={Pages.lastMedicalCertificate!.capturedPage!}
              style={styles.image}
            />
            <Text style={styles.headerText}>Patient Data</Text>
            <Text style={styles.fieldsText}>
              {keyValueDescription(Pages.lastMedicalCertificate?.patientData)}
            </Text>
            <Text style={styles.headerText}>Dates</Text>
            <Text style={styles.fieldsText}>
              {keyValueDescription(Pages.lastMedicalCertificate?.dates)}
            </Text>
            <Text style={styles.headerText}>Checkboxes</Text>
            <Text style={styles.fieldsText}>
              {keyValueDescription(Pages.lastMedicalCertificate?.checkboxes)}
            </Text>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
