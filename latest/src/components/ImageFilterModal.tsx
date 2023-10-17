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
import {ImageFilterType} from 'react-native-scanbot-sdk';

type ImageFilterList = Exclude<
  ImageFilterType,
  'ImageFilterTypeSensitiveBinarization'
>;

const IMAGE_FILTERS: ImageFilterList[] = [
  'ImageFilterTypeNone',
  'ImageFilterTypeColor',
  'ImageFilterTypeGray',
  'ImageFilterTypeBinarized',
  'ImageFilterTypeColorDocument',
  'ImageFilterTypePureBinarized',
  'ImageFilterTypeBackgroundClean',
  'ImageFilterTypeBlackAndWhite',
  'ImageFilterTypeOtsuBinarization',
  'ImageFilterTypeDeepBinarization',
  'ImageFilterTypeEdgeHighlight',
  'ImageFilterTypeLowLightBinarization',
  'ImageFilterTypeLowLightBinarization2',
  'ImageFilterTypePureGray',
];

const displayItemLabel: Record<ImageFilterList, string> = {
  ImageFilterTypeBackgroundClean: 'Background Clean',
  ImageFilterTypeBinarized: 'Binarized',
  ImageFilterTypeBlackAndWhite: 'Black And White',
  ImageFilterTypeColor: 'Color',
  ImageFilterTypeColorDocument: 'Color Document',
  ImageFilterTypeDeepBinarization: 'Deep Binarization',
  ImageFilterTypeEdgeHighlight: 'Edge Highlight',
  ImageFilterTypeGray: 'Gray',
  ImageFilterTypeLowLightBinarization: 'Low Light Binarization',
  ImageFilterTypeLowLightBinarization2: 'Low Light Binarization2',
  ImageFilterTypeNone: 'None',
  ImageFilterTypeOtsuBinarization: 'Otsu Binarization',
  ImageFilterTypePureBinarized: 'Pure Binarized',
  ImageFilterTypePureGray: 'Pure Gray',
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
