import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

interface SwitchOptionsList {
  data: Record<string, boolean>;
  onPress: (item: string) => void;
  isFilteringEnabled?: boolean;
}

export function SwitchOptionsList({
  data,
  onPress,
  isFilteringEnabled = false,
}: SwitchOptionsList) {
  return (
    <FlatList
      style={styles.list}
      data={Object.entries(data)}
      renderItem={({item: [item, value]}) => (
        <TouchableOpacity
          disabled={isFilteringEnabled}
          activeOpacity={0.6}
          onPress={() => onPress(item)}>
          <View style={styles.listItemContainer}>
            <Text style={styles.listItemText}>{item}</Text>
            <Switch
              value={value}
              disabled={isFilteringEnabled}
              onValueChange={() => onPress(item)}
            />
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={([item]) => item}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: '2%',
    height: '98%',
  },
  listItemContainer: {
    paddingLeft: 20,
    paddingRight: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemText: {
    fontSize: 14,
    textAlignVertical: 'center',
  },
});
