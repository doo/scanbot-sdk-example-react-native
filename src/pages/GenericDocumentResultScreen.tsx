import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import {Colors} from '../model/Colors';
import {Results} from '../model/Results';
import PreviewImage from '../ui/PreviewImage';
import {BaseScreen} from '../utils/BaseScreen';
import {
  GenericDocumentRecognizerResult,
  GenericDocumentField,
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

const getFieldsData = (document: GenericDocumentRecognizerResult) => {
  if (!document.fields) {
    return undefined;
  }

  return Object.keys(document.fields)
    .flatMap(key => {
      const field = (document.fields as any)[key] as GenericDocumentField;
      if (field.text === undefined) {
        return JSON.stringify({
          key: key,
          value: field,
        });
      }
      return JSON.stringify({
        key: key,
        value: `${field.text} (confidence: ${field.confidence?.toFixed(2)})`,
      });
    })
    .filter(item => item);
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
