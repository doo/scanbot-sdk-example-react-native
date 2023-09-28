import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

interface SwitchOptionsList<T extends string> {
  data: Record<T, boolean>;
  onPress: (item: T) => void;
  isFilteringEnabled?: boolean;
}

export function SwitchOptionsList<T extends string>({
  data,
  onPress,
  isFilteringEnabled = false,
}: SwitchOptionsList<T>) {
  return (
    <FlatList
      style={styles.list}
      data={Object.keys(data)}
      renderItem={({item}) => (
        <TouchableOpacity
          disabled={isFilteringEnabled}
          activeOpacity={0.6}
          onPress={() => onPress(item as T)}>
          <View style={styles.listItemContainer}>
            <Text style={styles.listItemText}>{item}</Text>
            <Switch
              value={data[item as T]}
              disabled={isFilteringEnabled}
              onValueChange={() => onPress(item as T)}
            />
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingTop: '2%',
    height: '98%',
    flexGrow: 1,
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
