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
import {COLORS} from '../theme/Theme';
import {ImageFilter} from 'react-native-scanbot-sdk';

const IMAGE_FILTERS = [
  'NONE',
  'COLOR_ENHANCED',
  'GRAYSCALE',
  'PURE_GRAYSCALE',
  'BINARIZED',
  'COLOR_DOCUMENT',
  'PURE_BINARIZED',
  'BACKGROUND_CLEAN',
  'BLACK_AND_WHITE',
  'OTSU_BINARIZATION',
  'DEEP_BINARIZATION',
  'LOW_LIGHT_BINARIZATION',
  'EDGE_HIGHLIGHT',
  'LOW_LIGHT_BINARIZATION_2',
] as ImageFilter[];

interface ImageFilterModalProps {
  isVisible: boolean;
  onDismiss: () => void;
  onSelect: (item: ImageFilter) => void;
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
            <Item label={item} onPress={() => onSelect(item)} />
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
