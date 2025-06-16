import {Field, GenericDocument} from 'react-native-scanbot-sdk';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ResultHeader} from './ResultHeader.tsx';
import {ResultFieldRow} from './ResultFieldRow.tsx';
import {GenericDocumentUtils} from '@utils';

export function GenericDocumentResult(props: {
  genericDocument: GenericDocument | null | undefined;
}) {
  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    if (props.genericDocument) {
      setFields(
        GenericDocumentUtils.extractGenericDocumentFields(
          props.genericDocument,
        ),
      );
    }
  }, [props.genericDocument]);

  if (!props.genericDocument) {
    return null;
  }

  return (
    <View>
      <ResultHeader title={`${props.genericDocument?.type.name} Fields`} />
      {fields.map((field, index) => (
        <ResultFieldRow
          key={field.type.name + index}
          title={field.type.name.trim()}
          value={field.value?.text}
        />
      ))}
    </View>
  );
}
