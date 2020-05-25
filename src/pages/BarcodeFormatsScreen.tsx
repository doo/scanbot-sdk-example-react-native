import React from 'react';
import {
  FlatList,
  SafeAreaView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BarcodeFormats} from '../model/BarcodeFormats';
import {Styles} from '../model/Styles';
import {BaseScreen} from '../utils/BaseScreen';

export class BarcodeFormatsScreen extends BaseScreen {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView>
        <FlatList
          style={Styles.INSTANCE.barcodeFormats.list}
          data={BarcodeFormats.list}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.onListItemClick(item)}>
              <View style={Styles.INSTANCE.barcodeFormats.listItemContainer}>
                <Text style={Styles.INSTANCE.barcodeFormats.listItemText}>
                  {item.key}
                </Text>
                <Switch
                  style={Styles.INSTANCE.barcodeFormats.listItemSwitch}
                  value={item.value}
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.key}
        />
      </SafeAreaView>
    );
  }

  private onListItemClick(item: any) {
    item.value = !item.value;
    BarcodeFormats.update(item);
    this.refresh();
  }
}
