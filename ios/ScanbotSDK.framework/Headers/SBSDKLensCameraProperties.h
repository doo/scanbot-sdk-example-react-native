//
//  SBSDKLensCameraProperties.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 01.07.16.
//  Copyright © 2016 doo GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreGraphics/CoreGraphics.h>
#import "SBSDKImageMetadata.h"


/**
 * @class SBSDKLensCameraProperties
 * Encapsulates lens and camera properties. Can be used with polygonal image cropping to achieve a very accurate
 * aspect ratio of the resulting image.
 * If created from image image metadata, uses a dictionary of some known devices to lookup the values.
 */
@interface SBSDKLensCameraProperties : NSObject

/** The focal length of the lens used to capture an image in millimeters. Readonly. **/
@property(nonatomic, assign, readonly) double focalLength;

/** The 35mm equivalent focal length of the lens used to capture an image in millimeters. Readonly. **/
@property(nonatomic, assign, readonly) double focalLength35mm;

/** The crop factor of the lens/sensor used to capture an image compared to 35mm full frame sensor. Readonly. **/
@property(nonatomic, assign, readonly) double cropFactor;

/** The diagonal of the sensor area in millimeters. Readonly. **/
@property(nonatomic, assign, readonly) double sensorDiagonal;

/** The aspect ratio of the sensor. Usually is 4/3. Readonly. **/
@property(nonatomic, assign, readonly) double sensorAspectRatio;

/** The width and height of the sensor in millimeters. Readonly. **/
@property(nonatomic, assign, readonly) CGSize sensorSize;

/** Manufacturer of the lens. Optional. **/
@property(nonatomic, readonly, nullable) NSString *lensMaker;

/** Model name of the lens. Optional. **/
@property(nonatomic, readonly, nullable) NSString *lensModel;

/** 
 * Initializer from image metadata. Does device dictionary lookup.
 * @param metadata The image metadata object that is used to extract lens and sensor properties from.
 * @return Nil, if metadata does not contain sufficient information about lens and sensor or if
 * for the lens model metadata entry there is no information available in the lookup dictionary.
 **/
+ (nullable SBSDKLensCameraProperties *)propertiesFromMetadata:(nullable SBSDKImageMetadata *)metadata;

/** Designated initializer. Does no device dictionary lookup.
 * @param focalLength Focal length of the lens in millimeters. Caution: NOT the 35mm equivalent.
 * @param sensorSize Width and heigth of the cameras image sensor.
 * @return Nil, if focalLength or sensorSize contain values <= 0.
 **/
- (nonnull instancetype)initWithFocalLength:(double)focalLength sensorSize:(CGSize)sensorSize;

@end
