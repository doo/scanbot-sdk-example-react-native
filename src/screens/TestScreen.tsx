import React from 'react';
// import {sCreatePage} from 'react-native-scanbot-sdk/src/page';
import {Button, View} from 'react-native';
import {selectImagesFromLibrary} from '../utils/ImageUtils';
import {sCreatePage} from 'react-native-scanbot-sdk/src/page';

export function TestScreen() {
  async function onPress() {
    const selectedImage = await selectImagesFromLibrary();
    if (!selectedImage) {
      return;
    }
    const [imageFileUri] = selectedImage;
    const pageWrapper = await sCreatePage(imageFileUri);

    console.log(pageWrapper.page.originalImageFileUri);
  }

  return (
    <View>
      <Button title={'isPageListEmpty'} onPress={onPress} />
    </View>
  );
}

/*
  DocumentSession -> Documents[] -> Pages[]

  Android page.toJson()
  ios page.getDTO()

  Android DocumentSession -> Documents[] -> Pages[]
  IOs -> DocumentSessionDTO -> Documents[]Dto -> Pages[]DTo
 */
