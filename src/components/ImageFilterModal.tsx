import React from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {COLORS} from '@theme';

import {
  BrightnessFilter,
  ColorDocumentFilter,
  ColorDocumentShadowRemovalFilter,
  ContrastFilter,
  CustomBinarizationFilter,
  GrayscaleFilter,
  LegacyFilter,
  ParametricFilter,
  ScanbotBinarizationFilter,
  WhiteBlackPointFilter,
} from 'react-native-scanbot-sdk';

const filters: Record<
  ParametricFilter['_type'],
  {displayItemLabel: string; parametricFilter: ParametricFilter}
> = {
  BrightnessFilter: {
    parametricFilter: new BrightnessFilter({brightness: 0.2}),
    displayItemLabel: 'Brightness Filter',
  },
  ColorDocumentFilter: {
    parametricFilter: new ColorDocumentFilter(),
    displayItemLabel: 'Color Document Filter',
  },
  ColorDocumentShadowRemovalFilter: {
    parametricFilter: new ColorDocumentShadowRemovalFilter(),
    displayItemLabel: 'Color Document Shadow Removal Filter',
  },
  ContrastFilter: {
    parametricFilter: new ContrastFilter({contrast: 2}),
    displayItemLabel: 'Contrast Filter',
  },
  CustomBinarizationFilter: {
    parametricFilter: new CustomBinarizationFilter({preset: 'PRESET_1'}),
    displayItemLabel: 'Custom Binarization Filter',
  },
  GrayscaleFilter: {
    parametricFilter: new GrayscaleFilter(),
    displayItemLabel: 'Grayscale Filter',
  },
  LegacyFilter: {
    parametricFilter: new LegacyFilter(),
    displayItemLabel: 'None',
  },
  ScanbotBinarizationFilter: {
    parametricFilter: new ScanbotBinarizationFilter(),
    displayItemLabel: 'Scanbot Binarization Filter',
  },
  WhiteBlackPointFilter: {
    parametricFilter: new WhiteBlackPointFilter(),
    displayItemLabel: 'White BlackPoint Filter',
  },
};

const IMAGE_FILTERS = Object.values(filters);

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
      <View style={styles.modalContainer}>
        <FlatList
          data={IMAGE_FILTERS}
          contentContainerStyle={styles.flatListContentContainer}
          renderItem={({item}) => (
            <Item
              label={item.displayItemLabel}
              onPress={() => {
                onSelect(item.parametricFilter);
                onDismiss();
              }}
            />
          )}
          ListFooterComponent={<Item label={'CLOSE'} onPress={onDismiss} />}
          ListFooterComponentStyle={styles.listFooterStyle}
        />
      </View>
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
