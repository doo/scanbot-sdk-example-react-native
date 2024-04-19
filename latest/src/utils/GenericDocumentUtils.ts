import {Field, GenericDocumentWrapper} from 'react-native-scanbot-sdk';

function isGenericDocumentField(field: any): field is Field {
  return (
    (field as Field).validationStatus !== undefined ||
    (field as Field).value?.text !== undefined ||
    (field as Field).value?.confidence !== undefined
  );
}

function sectionValueItem(key: string, value: string) {
  return {key, value};
}

function sectionImageItem(key: string, image?: string) {
  return {key, image};
}

function sectionFieldItem(key: string, field: Field) {
  return {key, field};
}

function gdrCommonFields(document: GenericDocumentWrapper): Array<{
  key: string;
  value?: string;
}> {
  return [
    sectionValueItem('Type', document.type.name),
    sectionValueItem('Confidence', document.confidence.toString()),
  ];
}

function gdrFields(document: GenericDocumentWrapper) {
  return Object.entries(document)
    .filter(([_, value]) => isGenericDocumentField(value))
    .map(([key, value]) => sectionFieldItem(key, value));
}

export const GenericDocumentUtils = {
  gdrCommonFields,
  gdrFields,
  sectionValueItem,
  sectionImageItem,
  sectionFieldItem,
};
