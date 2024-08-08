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
import {
  BrightnessFilter,
  ColorDocumentFilter,
  ContrastFilter,
  CustomBinarizationFilter,
  GrayscaleFilter,
  LegacyFilter,
  ParametricFilter,
  ScanbotBinarizationFilter,
  WhiteBlackPointFilter,
} from 'react-native-scanbot-sdk';

const IMAGE_FILTERS: ParametricFilter[] = [
  new BrightnessFilter({brightness: 0.3}),
  new ColorDocumentFilter(),
  new ContrastFilter(),
  new CustomBinarizationFilter(),
  new GrayscaleFilter(),
  new ScanbotBinarizationFilter(),
  new WhiteBlackPointFilter(),
  new LegacyFilter(),
];

const displayItemLabel: Record<ParametricFilter['_type'], string> = {
  BrightnessFilter: 'Brightness Filter',
  ColorDocumentFilter: 'Color Document Filter',
  ContrastFilter: 'Contrast Filter',
  CustomBinarizationFilter: 'Custom Binarization Filter',
  GrayscaleFilter: 'Grayscale Filter',
  LegacyFilter: 'None',
  ScanbotBinarizationFilter: 'Scanbot Binarization Filter',
  WhiteBlackPointFilter: 'White BlackPoint Filter',
};

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
}: {
  isVisible: boolean;
  onDismiss: () => void;
  onSelect: (item: ParametricFilter) => void;
}) {
  return (
    <Modal animationType={'slide'} visible={isVisible} transparent={true}>
      <SafeAreaView style={styles.modalContainer}>
        <FlatList
          data={IMAGE_FILTERS}
          contentContainerStyle={styles.flatListContentContainer}
          renderItem={({item}) => (
            <Item
              label={displayItemLabel[item._type]}
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
