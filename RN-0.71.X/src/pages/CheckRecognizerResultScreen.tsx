/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../model/Colors';
import {Results} from '../model/Results';
import PreviewImage from '../ui/PreviewImage';
import {BaseScreen} from '../utils/BaseScreen';
import {
  CheckRecognizerResult,
  CheckRecognizerResultField,
} from 'react-native-scanbot-sdk';

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

const getCheckFields = (checkResult: CheckRecognizerResult) => {
  const fields = checkResult.fields;
  if (!fields) {
    return [];
  }

  return Object.keys(fields).flatMap(key => {
    const field = (fields as any)[key] as CheckRecognizerResultField;
    const value = field.value;
    if (!value) {
      return undefined;
    }
    const text = value.text;

    if (!text) {
      return undefined;
    }

    return JSON.stringify({
      key: key,
      value: text,
    });
  });
};

export class CheckRecognizerResultScreen extends BaseScreen {
  render() {
    const checkResult = Results.lastCheckRecognizerResult!;

    return (
      <>
        <View style={styles.container}>
          <SectionList
            contentContainerStyle={styles.contentContainer}
            bounces={false}
            sections={[
              {
                title: 'Snapped Image',
                data: [
                  JSON.stringify({
                    key: 'imageFileUri',
                    value: '',
                  }),
                ],
              },
              {title: 'Fields', data: getCheckFields(checkResult)},
            ]}
            renderItem={({item}) => {
              const jsonItem = item;
              if (!jsonItem) {
                return null;
              }
              const pair: {key: string; value: string} = JSON.parse(jsonItem);
              if (pair.key === 'imageFileUri') {
                return (
                  <PreviewImage
                    imageUri={checkResult.imageFileUri}
                    style={styles.image}
                  />
                );
              }
              return (
                <>
                  <Text style={styles.item}>
                    <Text style={{fontWeight: 'bold'}}>{pair.key}</Text>
                  </Text>
                  <Text style={styles.item}>{pair.value}</Text>
                </>
              );
            }}
            renderSectionHeader={({section}): any => (
              <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            keyExtractor={(item, index) => '' + index}
          />
        </View>
      </>
    );
  }
}