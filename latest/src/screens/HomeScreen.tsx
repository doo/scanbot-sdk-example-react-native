import React, {useCallback, useContext, useEffect} from 'react';
import {
  SectionList,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {examplesList, Section, SectionData} from '../utils/Examples';
import {useOnExamplePress} from '../hooks/useOnExamplePress';
import {
  SectionFooter,
  SectionHeader,
  SectionItem,
} from '../components/SectionComponents';
import {PageContext} from '../context/usePages';

export function HomeScreen() {
  const onExamplePress = useOnExamplePress();
  const {loadPages} = useContext(PageContext);

  useEffect(() => {
    loadPages();
  }, [loadPages]);

  const renderItem = useCallback(
    (listItem: SectionListRenderItemInfo<SectionData, Section>) => {
      return (
        <SectionItem
          listItem={listItem}
          onPress={onExamplePress[listItem.item.id]}
        />
      );
    },
    [onExamplePress],
  );

  return (
    <View>
      <SectionList
        stickySectionHeadersEnabled={false}
        style={styles.list}
        sections={examplesList}
        keyExtractor={(item, index) => item.title + index}
        renderSectionHeader={SectionHeader}
        renderItem={renderItem}
        ListFooterComponent={SectionFooter}
      />
      <Text style={styles.copyrightLabel}>
        Copyright {new Date().getFullYear()} doo GmbH. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: '1%',
    marginLeft: '5%',
    height: '90%',
    width: '90%',
  },
  copyrightLabel: {
    textAlign: 'center',
    lineHeight: 40,
    width: '100%',
    height: 40,
    color: 'gray',
    fontSize: 12,
  },
});
