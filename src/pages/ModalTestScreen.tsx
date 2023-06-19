import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import ScanbotSDK from 'react-native-scanbot-sdk';
import {Colors} from '../model/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';

export const ModalTestScreen = () => {
  const openDocumentScanner = async () => {
    await ScanbotSDK.UI.startDocumentScanner({});
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView>
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hi, I am a Modal component</Text>
              <Pressable
                style={[styles.button, styles.buttonOpenRtu]}
                onPress={openDocumentScanner}>
                <Text style={styles.textStyle}>Open Document Scanner</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>SHOW MODAL</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 32,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: Colors.SCANBOT_RED,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  buttonOpenRtu: {
    backgroundColor: Colors.SCANBOT_RED,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
