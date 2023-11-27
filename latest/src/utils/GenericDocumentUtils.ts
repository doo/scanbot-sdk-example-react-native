import {
  ImageFieldWrapper,
  TextFieldWrapper,
  ValidatedTextFieldWrapper,
} from 'react-native-scanbot-sdk/src/internal/gdr/gdr-base-wrappers';

// Common Display Utility Method
const getImageField = (field: ImageFieldWrapper) => ({
  key: field.type.name,
  image: field.image,
});

const getTextField = (field: TextFieldWrapper | ValidatedTextFieldWrapper) => ({
  key: field.type.name,
  value: field.value
    ? `${field.value.text} (confidence: ${(
        field.value.confidence * 100.0
      ).toFixed(0)}%)`
    : '-',
  image: field.image,
});

// Common Display Utility Method - for optional field wrappers
const getOptTextField = (
  field: TextFieldWrapper | ValidatedTextFieldWrapper | undefined,
  defaultName: string,
) => (field ? getTextField(field) : {key: defaultName, value: 'not detected'});

export const GenericDocumentUtils = {
  getImageField,
  getTextField,
  getOptTextField,
};
