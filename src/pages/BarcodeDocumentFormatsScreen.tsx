import React from 'react';
import { FlatList, SafeAreaView, Switch, Text, TouchableOpacity, View } from 'react-native';

import { BarcodeDocumentFormats } from '../model/BarcodeDocumentFormats';
import { Styles } from '../model/Styles';
import { BaseScreen } from '../utils/BaseScreen';

export class BarcodeDocumentFormatsScreen extends BaseScreen {
  render() {
    return (
      <SafeAreaView>
        <View style={Styles.INSTANCE.barcodeDocumentFormats.headerItemContainer}>
          <View style={Styles.INSTANCE.barcodeDocumentFormats.headerTextContainer}>
            <Text style={Styles.INSTANCE.barcodeDocumentFormats.headerItemText}>
              Enable Document Format Filters
            </Text>
          </View>
          <Switch
            style={Styles.INSTANCE.barcodeDocumentFormats.headerItemSwitch}
            value={BarcodeDocumentFormats.isFilteringEnabled}
            onValueChange={() => {
              BarcodeDocumentFormats.isFilteringEnabled =
                !BarcodeDocumentFormats.isFilteringEnabled;
              this.refresh();
            }}
          />
        </View>
        <FlatList
          style={Styles.INSTANCE.barcodeDocumentFormats.list}
          data={BarcodeDocumentFormats.list}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.6} onPress={() => this.onListItemClick(item)}>
              <View style={Styles.INSTANCE.barcodeDocumentFormats.listItemContainer}>
                <Text style={Styles.INSTANCE.barcodeDocumentFormats.listItemText}>{item.key}</Text>
                <Switch
                  style={Styles.INSTANCE.barcodeDocumentFormats.listItemSwitch}
                  value={item.value}
                  disabled={!BarcodeDocumentFormats.isFilteringEnabled}
                  onValueChange={() => {
                    this.onListItemClick(item);
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.key}
        />
      </SafeAreaView>
    );
  }

  private onListItemClick(item: any) {
    if (BarcodeDocumentFormats.isFilteringEnabled) {
      item.value = !item.value;
      BarcodeDocumentFormats.update(item);
      this.refresh();
    }
  }
}
