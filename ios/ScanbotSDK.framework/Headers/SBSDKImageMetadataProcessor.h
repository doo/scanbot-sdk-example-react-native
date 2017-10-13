//
//  SBSDKImageMetadataProcessor.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 01.07.16.
//  Copyright © 2016 doo GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SBSDKImageMetadata.h"

/**
 * @class SBSDKImageMetadataProcessor
 * Helper class to extract image metadata, e.g. EXIF, TIFF, JFIF from any images data.
 * Be cautious: changing an images metadata can break it, e.g. by setting wrong width or height.
 *
 * Example usage:
 * 1. Use UIImageJPEGRepresentation(UIImage *image, CGFloat compressionFactor) to get the NSData object from an UIImage.
 *
 * 2. Call SBSDKImageMetadataProcessor method extractMetadataFromImageData: to
 * retrieve a SBSDKImageMetadata object from the image data.
 *
 * 3. Modify the metadata object as needed.
 *
 * 4. Call SBSDKImageMetadataProcessor method imageDataByInjectingMetadata to inject the modified metadata into the
 * image data.
 *
 * 5. Create a new UIImage object from the returned image data using UIImage(data:) constructor
 * with the modified metadata.
 */
@interface SBSDKImageMetadataProcessor : NSObject

/**
 * Extracts an images metadata (EXIF, TIFF, JFIF etc.) from an NSData object.
 * @param imageData The NSData object containing an images data.
 * @return An SBSDKImageMetadata object containing the images metadata.
 */
+ (nullable SBSDKImageMetadata *)extractMetadataFromImageData:(nullable NSData *)imageData;

/**
 * Merges image data and (modified) image metadata and creates a new NSData object that can be used to create
 * a new image.
 * @param metadata The (modified) metadata object to be used for the new image data object.
 * @param imageData The image data of the image to inject the metadata into.
 * @return An NSData object containing the given image data and metadata. Can be used to create a new UIImage.
 */
+ (nullable NSData *)imageDataByInjectingMetadata:(nonnull SBSDKImageMetadata *)metadata intoImageData:(nullable NSData *)imageData;

@end
