import React from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {COLORS} from '@theme';
import {ImageFilterType} from 'react-native-scanbot-sdk';

const IMAGE_FILTERS: ImageFilterType[] = [
  'BACKGROUND_CLEAN',
  'BINARIZED',
  'BLACK_AND_WHITE',
  'COLOR',
  'COLOR_DOCUMENT',
  'DEEP_BINARIZATION',
  'EDGE_HIGHLIGHT',
  'GRAYSCALE',
  'LOW_LIGHT_BINARIZATION',
  'LOW_LIGHT_BINARIZATION_2',
  'NONE',
  'OTSU_BINARIZATION',
  'PURE_BINARIZED',
  'PURE_GRAY',
];

const displayItemLabel: Record<ImageFilterType, string> = {
  BACKGROUND_CLEAN: 'Background Clean',
  BINARIZED: 'Binarized',
  BLACK_AND_WHITE: 'Black And White',
  COLOR: 'Color',
  COLOR_DOCUMENT: 'Color Document',
  DEEP_BINARIZATION: 'Deep Binarization',
  EDGE_HIGHLIGHT: 'Edge Highlight',
  GRAYSCALE: 'Gray',
  LOW_LIGHT_BINARIZATION: 'Low Light Binarization',
  LOW_LIGHT_BINARIZATION_2: 'Low Light Binarization2',
  NONE: 'None',
  OTSU_BINARIZATION: 'Otsu Binarization',
  PURE_BINARIZED: 'Pure Binarized',
  PURE_GRAY: 'Pure Gray',
};

interface ImageFilterModalProps {
  isVisible: boolean;
  onDismiss: () => void;
  onSelect: (item: ImageFilterType) => void;
}

function Item(props: {label: string; onPress: () => void; style?: ViewStyle}) {
  return (
    <Pressable
      onPress={props.onPress}
      style={[styles.itemContainer, props.style && props.style]}>
      <Text style={styles.itemText}>{props.label}</Text>
    </Pressable>
  );
}

export function ImageFilterModal({
  isVisible,
  onDismiss,
  onSelect,
}: ImageFilterModalProps) {
  return (
    <Modal animationType={'slide'} visible={isVisible} transparent={true}>
      <SafeAreaView style={styles.modalContainer}>
        <FlatList
          data={IMAGE_FILTERS}
          contentContainerStyle={styles.flatListContentContainer}
          renderItem={({item}) => (
            <Item
              label={displayItemLabel[item]}
              onPress={() => {
                onSelect(item);
                onDismiss();
              }}
            />
          )}
          ListFooterComponent={<Item label={'CLOSE'} onPress={onDismiss} />}
          ListFooterComponentStyle={styles.listFooterStyle}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    marginVertical: 2,
    paddingVertical: 4,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    textAlign: 'center',
    color: COLORS.SCANBOT_RED,
    fontSize: 24,
  },
  modalContainer: {
    backgroundColor: '#00000080',
    flex: 1,
  },
  flatListContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: '2%',
  },
  listFooterStyle: {
    marginVertical: 12,
  },
});
