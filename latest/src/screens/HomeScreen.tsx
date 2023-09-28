import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  SectionList,
  SectionListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {examplesList, FeatureId, Section, SectionData} from '../utils/Examples';
import {useOnExamplePress} from '../hooks/useOnExamplePress';
import {
  HomeScreenSectionFooter,
  HomeScreenSectionHeader,
  HomeScreenSectionItem,
} from '../components/HomeScreenSectionComponents';
import {PageContext} from '../context/usePages';
import {useImportImageAndApplyFilter} from '../hooks/examples/useImportImageAndApplyFilter';
import {ImageFilterModal} from '../components/ImageFilterModal';
import {selectImagesFromLibrary} from '../utils/ImageUtils';
import {ImageFilter} from 'react-native-scanbot-sdk';

export function HomeScreen() {
  const {loadPages} = useContext(PageContext);
  const onExamplePress = useOnExamplePress();
  const applyImageOnFilter = useImportImageAndApplyFilter();
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<string>();

  const onFilterSelect = useCallback(
    async (filter: ImageFilter) => {
      await applyImageOnFilter(filter, imageRef.current);
    },
    [applyImageOnFilter],
  );

  onExamplePress[FeatureId.ApplyFilterOnImage] = useCallback(async () => {
    const selectedImage = await selectImagesFromLibrary();
    if (!selectedImage) {
      return;
    }
    imageRef.current = selectedImage[0];
    setIsVisible(true);
  }, []);

  useEffect(() => {
    loadPages();
  }, [loadPages]);

  const renderItem = useCallback(
    (listItem: SectionListRenderItemInfo<SectionData, Section>) => {
      return (
        <HomeScreenSectionItem
          listItem={listItem}
          onPress={onExamplePress[listItem.item.id]}
        />
      );
    },
    [onExamplePress],
  );

  return (
    <View style={styles.container}>
      <SectionList
        stickySectionHeadersEnabled={false}
        style={styles.list}
        sections={examplesList}
        keyExtractor={(item, index) => item.title + index}
        renderSectionHeader={HomeScreenSectionHeader}
        renderItem={renderItem}
        ListFooterComponent={HomeScreenSectionFooter}
      />
      <ImageFilterModal
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
        onSelect={onFilterSelect}
      />
      <Text style={styles.copyrightLabel}>
        Copyright {new Date().getFullYear()} doo GmbH. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
