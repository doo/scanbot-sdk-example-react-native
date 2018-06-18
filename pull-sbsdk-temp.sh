#!/bin/bash

adb pull /storage/emulated/0/Android/data/io.scanbot.demo.reactnative/cache/sbsdk-temp
adb shell rm '/storage/emulated/0/Android/data/io.scanbot.demo.reactnative/cache/sbsdk-temp/*'