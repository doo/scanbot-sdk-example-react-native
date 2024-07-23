import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {PreviewImage, ResultFieldRow, ResultHeader} from '@components';
import {PlainDataResultParam, PlainDataResultScreenRouteProp} from '@utils';

function PlainImageResult({
  imageUris,
}: {
  imageUris: PlainDataResultParam['imageUris'];
}) {
  if (!imageUris || imageUris.length === 0) {
    return null;
  }

  return (
    <View>
      {imageUris.map(url => (
        <PreviewImage imageUri={url} key={url} style={styles.image} />
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
        <ResultHeader title={'Result'} />
        {data.map(i => (
          <ResultFieldRow title={i.key} value={i.value} key={i.key} />
        ))}
      </View>
    );
  }

  return (
    <View>
      <ResultHeader title={'Result'} />
      <View style={styles.textDataContainer}>
        <Text style={styles.dataTextResult}>{data}</Text>
      </View>
    </View>
  );
}

export function PlainDataResultScreen() {
  const {params} = useRoute<PlainDataResultScreenRouteProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flex: 1}}>
        <PlainImageResult imageUris={params.imageUris} />
        <PlainDataResult data={params.data} />
      </ScrollView>
    </SafeAreaView>
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
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
