//
//  SBSDKImageMetadata.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 01.07.16.
//  Copyright © 2016 doo GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>

/**
 * @class SBSDKImageMetadata
 * Encapsulates image metadata, e.g. EXIF, TIFF, JFIF in a convenient way.
 * Use SBSDKImageMetadataProcessor to extract metadata from and inject changed metadata into image data.
 */
@interface SBSDKImageMetadata : NSObject

/** The raw metadata dictionary as it gets extracted from CGImageSourceCopyPropertiesAtIndex. Readonly. **/
@property(nonatomic, readonly, nonnull) NSDictionary<NSString *, NSObject *> *metadataDictionary;

/** The orientation flag of the image. **/
@property(nonatomic, assign) NSUInteger orientation;

/** The width of the image in pixels. **/
@property(nonatomic, assign) NSUInteger imageWidth;

/** The height of the image in pixels. **/
@property(nonatomic, assign) NSUInteger imageHeight;

/** The title of the image. **/
@property(nonatomic, strong, nullable) NSString *title;

/** The longitude of the location where the image was captured. **/
@property(nonatomic, strong, nullable) NSNumber *longitude;

/** The latitude of the location where the image was captured. **/
@property(nonatomic, strong, nullable) NSNumber *latitude;

/** The altitude of the location where the image was captured. **/
@property(nonatomic, strong, nullable) NSNumber *altitude;

/** The date of when the image was captured. **/
@property(nonatomic, strong, nullable) NSDate *originalDate;

/** The date of when the image was digitized. **/
@property(nonatomic, strong, nullable) NSDate *digitalizationDate;

/** The model of the lens used to capture the image. Readonly. **/
@property(nonatomic, readonly, strong, nullable) NSString *lensModel;

/** The manufacturer of the lens used to capture the image. Readonly. **/
@property(nonatomic, readonly, strong, nullable) NSString *lensMaker;

/** The real focal length of the lens used to capture the image. Measured in millimeters. Readonly. **/
@property(nonatomic, readonly, strong, nullable) NSNumber *focalLength;

/** The 35mm equivalent focal length of the lens used to capture the image. Measured in millimeters. Readonly. **/
@property(nonatomic, readonly, strong, nullable) NSNumber *focalLength35mm;

/** The f-stop number or aperture of the lens used to capture the image. Readonly. **/
@property(nonatomic, readonly, strong, nullable) NSNumber *aperture;

/** The duration the sensor was exposed during capturing the image. Equals to 1.0 / shutter speed. Readonly. **/
@property(nonatomic, readonly, strong, nullable) NSNumber *exposureTime;

/** The ISO value used to capture the image. Readonly. **/
@property(nonatomic, readonly, strong, nullable) NSNumber *ISOValue;

/** Designated initializer. 
 * @param metadata Takes the the raw metadata dictionary as it gets extracted from CGImageSourceCopyPropertiesAtIndex.
 * @return A new SBSDKImageMetadata object or nil, if the metadata dictionary does not contain valid metadata.
 **/
- (nullable instancetype)initWithMetadataDictionary:(nonnull NSDictionary<NSString *, NSObject *> *)metadata;

/** Removes location information from metadata dictionary. */
- (void)removeLocationInformation;

@end
