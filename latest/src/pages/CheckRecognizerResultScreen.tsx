import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CheckRecognizerResult} from 'react-native-scanbot-sdk';
import {ScanResultSectionList} from '../components/ScanResultSectionList';
import {useRoute} from '@react-navigation/native';
import {CheckRecognizerResultScreenRouteProp} from '../utils/Navigation';

export function CheckRecognizerResultScreen() {
  const {params: checkRecognizerResult} =
    useRoute<CheckRecognizerResultScreenRouteProp>();

  return (
    <View style={styles.container}>
      <ScanResultSectionList
        sectionData={[
          {
            title: 'Fields',
            data: transformCheckResult(checkRecognizerResult),
          },
        ]}
        imageFileUri={checkRecognizerResult.imageFileUri}
      />
    </View>
  );
}

function transformCheckResult(result: CheckRecognizerResult) {
  const fields = result.fields;

  if (!fields) {
    return [];
  }

  return Object.entries(fields)
    .filter(([_key, value]) => value && value.value && value.value.text)
    .map(([key, value]) => ({
      key,
      value: value.value.text as string,
    }));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
