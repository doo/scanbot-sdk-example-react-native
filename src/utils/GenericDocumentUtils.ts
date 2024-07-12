import {Field, GenericDocument} from 'react-native-scanbot-sdk';

function extractGenericDocumentFields(document: GenericDocument): Field[] {
  let fields: Field[] = [];

  if (document.fields.length > 0) {
    fields = fields.concat(document.fields);
  }

  if (document.children.length > 0) {
    document.children.forEach(child => {
      fields = fields.concat(extractGenericDocumentFields(child));
    });
  }

  return fields;
}

export const GenericDocumentUtils = {
  extractGenericDocumentFields,
};
