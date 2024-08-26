import React from 'react';
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {
  PreviewImage,
  ResultContainer,
  ResultFieldRow,
  ResultHeader,
} from '@components';
import {PlainDataResultParam, PlainDataResultScreenRouteProp} from '@utils';

function PlainImageResult({
  imageUris,
}: {
  imageUris: PlainDataResultParam['imageUris'];
}) {
  const {width, height} = useWindowDimensions();
  if (!imageUris || imageUris.length === 0) {
    return null;
  }

  return (
    <View>
      {imageUris.map(url => (
        <PreviewImage
          imageUri={url}
          key={url}
          style={{width, height: height - height * 0.25, resizeMode: 'contain'}}
        />
      ))}
    </View>
  );
}

function PlainDataResult({data}: {data?: PlainDataResultParam['data']}) {
  if (!data || data.length === 0) {
    return null;
  }

  if (Array.isArray(data)) {
    return (
      <View>
        {data.map(i => (
          <ResultFieldRow title={i.key} value={i.value} key={i.key} />
        ))}
      </View>
    );
  }

  return (
    <View>
      <View style={styles.textDataContainer}>
        <Text style={styles.dataTextResult}>{data}</Text>
      </View>
    </View>
  );
}

export function PlainDataResultScreen() {
  const {params} = useRoute<PlainDataResultScreenRouteProp>();

  return (
    <ResultContainer>
      <PlainImageResult imageUris={params.imageUris} />
      <PlainDataResult data={params.data} />
    </ResultContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataTextResult: {
    fontSize: 16,
    textAlign: 'left',
  },
  textDataContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
