import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback} from 'react';
import {COLORS} from '@theme';

export function FeatureItem({
  onPress,
  title,
}: {
  title: string;
  onPress(): void;
}) {
  return (
    <View style={styles.sectionItemContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.sectionItem}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

export function FeatureHeader({title}: {title: string}) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

export function ScanbotLearnMore() {
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
