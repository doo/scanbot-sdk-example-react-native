import {
  SectionList,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {COLORS} from '../theme/Theme';
import {PreviewImage} from './PreviewImage';

type ScanResultSectionData = {
  key: string;
  value?: string;
  image?: string;
};

type ScanResultSection = {
  title: string;
  data: ScanResultSectionData[];
};

interface ScanResultSectionListProps {
  sectionData: ScanResultSection[];
}

export function ScanResultSectionList({
  sectionData,
}: ScanResultSectionListProps) {
  return (
    <View style={styles.container}>
      <SectionList
        contentContainerStyle={styles.contentContainer}
        bounces={false}
        sections={sectionData}
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
  item: {key, value, image},
}: SectionListRenderItemInfo<ScanResultSectionData, ScanResultSection>) {
  return (
    <View style={styles.itemContainer}>
      <Text style={[styles.item, styles.bold]}>{key}</Text>
      {image ? <PreviewImage imageUri={image} style={[styles.image]} /> : <></>}
      {value ? <Text style={styles.item}>{value}</Text> : <></>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e2e2',
  },
  image: {
    flex: 1,
    height: 150,
    resizeMode: 'contain',
    backgroundColor: '#222222',
    margin: 16,
  },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 22,
    marginBottom: 16,
    color: 'white',
    backgroundColor: COLORS.SCANBOT_RED,
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
  itemContainer: {
    backgroundColor: '#ffffff',
    marginVertical: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
});
