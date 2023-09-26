import {
  Linking,
  SectionListData,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {Section, SectionData} from '../model/Examples';
import {COLORS} from '../theme/Theme';

interface SectionItemProps {
  listItem: SectionListRenderItemInfo<SectionData, Section>;
  onPress(): void;
}

export function SectionItem({onPress, listItem}: SectionItemProps) {
  return (
    <View style={styles.sectionItemContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.sectionItem}>{listItem.item.title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export function SectionHeader(item: {
  section: SectionListData<SectionData, Section>;
}) {
  return <Text style={styles.sectionHeader}>{item.section.title}</Text>;
}

export function SectionFooter() {
  const onPress = useCallback(() => {
    Linking.openURL('https://scanbot.io');
  }, []);

  return (
    <View style={styles.sectionItemContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.sectionFooter}>Learn More About Scanbot SDK</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionItem: {
    fontSize: 17,
    marginTop: 14,
    marginBottom: 5,
  },
  sectionItemContainer: {
    borderBottomColor: '#bdbdbd',
    borderBottomWidth: 1,
  },
  sectionHeader: {
    fontSize: 13,
    marginTop: 25,
    marginBottom: 0,
    fontWeight: 'bold',
    color: '#696969',
  },
  sectionFooter: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 25,
    marginBottom: 10,
    color: COLORS.SCANBOT_RED,
  },
});
