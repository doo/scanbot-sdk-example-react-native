import {
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {PreviewImage} from './PreviewImage';
import React from 'react';
import {Colors} from '../model/Colors';

type ScanResultSectionData = {
  key: string;
  value: string;
};

type ScanResultSection = {
  title: string;
  data: ScanResultSectionData[];
};

interface ScanResultSectionListProps {
  imageFileUri?: string;
  sectionData: ScanResultSection[];
}

export function ScanResultSectionList({
  imageFileUri,
  sectionData,
}: ScanResultSectionListProps) {
  return (
    <View style={styles.container}>
      <SectionList
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        sections={sectionData}
        ListHeaderComponent={
          <View>
            <Text style={styles.sectionHeader}>Snapped Image</Text>
            <PreviewImage imageUri={imageFileUri} style={styles.image} />
          </View>
        }
        renderItem={ScanResultSectionListItem}
        renderSectionHeader={ScanResultSectionHeader}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

function ScanResultSectionHeader({
  section: {title},
}: {
  section: SectionListData<ScanResultSectionData, ScanResultSection>;
}) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

function ScanResultSectionListItem({
  item: {key, value},
}: SectionListRenderItemInfo<ScanResultSectionData, ScanResultSection>) {
  return (
    <View>
      <Text style={[styles.item, styles.bold]}>{key}</Text>
      <Text style={styles.item}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 250,
    resizeMode: 'cover',
    backgroundColor: 'black',
    marginTop: -16,
  },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
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
  bold: {
    fontWeight: 'bold',
  },
});
