import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../model/Colors';
import {Results} from '../model/Results';
import {BaseScreen} from '../utils/BaseScreen';
import {
  GenericDocumentField,
  GenericDocumentRecognizerResult,
  MrzDocumentResult,
} from 'react-native-scanbot-sdk';
import {PreviewImage} from '../components/PreviewImage';

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

const getMrzFields = (document: MrzDocumentResult) => {
  return Object.keys(document)
    .flatMap(key => {
      let value = '';
      if (Array.isArray((document as any)[key])) {
        value = JSON.stringify((document as any)[key]);
      } else {
        const field = (document as any)[key] as GenericDocumentField;
        value = `${field.text} (confidence: ${field.confidence?.toFixed(2)})`;
      }
      return JSON.stringify({
        key: `MRZ.${key}`,
        value: value,
      });
    })
    .filter(item => item);
};

const getFieldsData = (document: GenericDocumentRecognizerResult) => {
  if (!document.fields) {
    return [];
  }

  const jsonFields = Object.keys(document.fields)
    .flatMap(key => {
      let value: string | undefined;
      if (key.endsWith('Uri')) {
        value = (document.fields as any)[key] as string;
      } else if (key === 'mrz') {
        value = undefined;
      } else {
        const field = (document.fields as any)[key] as GenericDocumentField;
        value = `${field.text} (confidence: ${field.confidence?.toFixed(2)})`;
      }

      return value ? JSON.stringify({key: key, value: value}) : undefined;
    })
    .filter(item => item);

  let mrzFields = (document.fields as any).mrz as MrzDocumentResult;
  if (mrzFields) {
    getMrzFields(mrzFields).forEach(jsonField => jsonFields.push(jsonField));
  }

  return jsonFields;
};

export class GenericDocumentResultScreen extends BaseScreen {
  render() {
    const documentResult = Results.lastGenericDocumentResult!;

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
                title: 'Snapped Image',
                data: [
                  JSON.stringify({
                    key: 'imageFileUri',
                    value: '',
                  }),
                ],
              },
              {title: 'Fields', data: getFieldsData(documentResult)},
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
                    imageUri={documentResult.fields.photoImageUri}
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
        </View>
      </>
    );
  }
}
