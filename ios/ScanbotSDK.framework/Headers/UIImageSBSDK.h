//
//  UIImageSBSDK.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 29.06.15.
//  Copyright (c) 2015 doo GmbH. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SBSDKImageFilterTypes.h"
#import "SBSDKPolygon.h"
#import "SBSDKLensCameraProperties.h"

/**
 * @category UIImage(SBSDK)
 * An UIImage class extension to perform basic image processing operations.
 * Direct usage is not recommended for large images. Instead use SBSDKImageProcessor methods to employ
 * queues and proper memory management.
 */
@interface UIImage(SBSDK)

/**
 * Creates a UIImage instance from a sample buffer.
 */
- (nullable id)sbsdk_initFromSampleBuffer:(nonnull CMSampleBufferRef)sampleBuffer;

/**
 * Converts a CMSampleBuffer to an UIImage.
 * @param sampleBuffer The sample buffer to convert.
 * @return An UIImage.
 */
+ (nullable UIImage *)sbsdk_imageFromSampleBuffer:(nonnull CMSampleBufferRef)sampleBuffer;

/**
 * Applies a filter to the receiver and returns the filtered image.
 * @param filter The type of the filter to be applied.
 * @return The filtered UIImage.
 */
- (nullable UIImage *)sbsdk_imageFilteredByFilter:(SBSDKImageFilterType)filter;

/**
 * Applies a polygon to the receiver and returns the cropped and perspective corrected image.
 * @param polygon The polygon used to crop and perspective correct the image.
 * @param imageScale If the image has been scaled, compared to how it was captured from the camera,
 * you must set the scaling factor here for proper cropping. Otherwise the the resulting aspect ratio will be wrong.
 * Set to 1.0 if the image if of its original size.
 * @return The cropped and perspective corrected UIImage.
 */
- (nullable UIImage *)sbsdk_imageWarpedByPolygon:(nonnull SBSDKPolygon *)polygon imageScale:(CGFloat)imageScale;

/**
 * Applies a polygon to the receiver and returns the cropped and perspective corrected image.
 * @param polygon The polygon used to crop and perspective correct the image.
 * @param lensCameraProperties Properties of the camera which captured the image or nil.
 * @param imageScale If the image has been scaled, compared to how it was captured from the camera,
 * you must set the scaling factor here for proper cropping. Otherwise the the resulting aspect ratio will be wrong.
 * Set to 1.0 if the image if of its original size.
 * @return The cropped and perspective corrected UIImage.
 */
- (nullable UIImage *)sbsdk_imageWarpedByPolygon:(nonnull SBSDKPolygon *)polygon
                            lensCameraProperties:(nullable SBSDKLensCameraProperties *)lensCameraProperties
                                      imageScale:(CGFloat)imageScale;

/**
 * Applies a polygon and a filter to the receiver. Faster than two sequential operations.
 * @param polygon The polygon used to crop and perspective correct the image.
 * @param filter The type of the filter to be applied.
 * @param imageScale If the image has been scaled, compared to how it was captured from the camera,
 * you must set the scaling factor here for proper cropping. Otherwise the the resulting aspect ratio will be wrong.
 * Set to 1.0 if the image if of its original size.
 * @return The cropped and perspective corrected UIImage.
 */
- (nullable UIImage *)sbsdk_imageWarpedByPolygon:(nonnull SBSDKPolygon *)polygon
                                   andFilteredBy:(SBSDKImageFilterType)filter
                                      imageScale:(CGFloat)imageScale;

/**
 * Applies a polygon and a filter to the receiver. Faster than two sequential operations.
 * @param polygon The polygon used to crop and perspective correct the image.
 * @param filter The type of the filter to be applied.
 * @param lensCameraProperties Properties of the camera which captured the image or nil.
 * @param imageScale If the image has been scaled, compared to how it was captured from the camera,
 * you must set the scaling factor here for proper cropping. Otherwise the the resulting aspect ratio will be wrong.
 * Set to 1.0 if the image if of its original size.
 * @return The cropped and perspective corrected UIImage.
 */
- (nullable UIImage *)sbsdk_imageWarpedByPolygon:(nonnull SBSDKPolygon *)polygon
                                   andFilteredBy:(SBSDKImageFilterType)filter
                            lensCameraProperties:(nullable SBSDKLensCameraProperties *)lensCameraProperties
                                      imageScale:(CGFloat)imageScale;

/**
 * Applies clockwise 90 degree rotations to the receiver.
 * @param times Number of 90 degree rotations to apply. Can be negative. Uses modulo arithmetics.
 * @return The rotated UIImage.
 */
- (nullable UIImage *)sbsdk_imageRotatedClockwise:(NSInteger)times;

/**
 * Applies counter-clockwise 90 degree rotations to the receiver.
 * @param times Number of 90 degree rotations to apply. Can be negative. Uses modulo arithmetics.
 * @return The rotated UIImage.
 */
- (nullable UIImage *)sbsdk_imageRotatedCounterClockwise:(NSInteger)times;

/**
 * Rotates the receiver for the given angle.
 * @return The rotated image.
 */
- (nullable UIImage *)sbsdk_imageRotatedByDegrees:(CGFloat)degrees;

/**
 * Applies counter-clockwise 90 degree rotations, polygon warping and filtering to the receiver and returns a
 * JPEG UIImage with given compression/quality.
 * @param times Number of 90 degree rotations to apply. Can be negative. Uses modulo arithmetics.
 * @param polygon The polygon used to crop and perspective correct the image.
 * @param filter The type of the filter to be applied.
 * @param compression The JPEG compression/quality setting.
 * Range is 0.0 (low quality, small file) to 1.0 (high quality, large file).
 * @param lensCameraProperties Properties of the camera which captured the image or nil.
 * @param imageScale If the image has been scaled, compared to how it was captured from the camera,
 * you must set the scaling factor here for proper cropping. Otherwise the the resulting aspect ratio will be wrong.
 * Set to 1.0 if the image if of its original size.
 * @return The processed UIImage.
 */
- (nullable UIImage *)sbsdk_imageByProcessingWithRotations:(NSInteger)times
                                                   polygon:(nullable SBSDKPolygon *)polygon
                                                    filter:(SBSDKImageFilterType)filter
                                               compression:(CGFloat)compression
                                      lensCameraProperties:(nullable SBSDKLensCameraProperties *)lensCameraProperties
                                                imageScale:(CGFloat)imageScale;

/**
 * Applies counter-clockwise 90 degree rotations, polygon warping and filtering to the receiver and returns
 * JPEG image data with given compression/quality.
 * @param times Number of 90 degree rotations to apply. Can be negative. Uses modulo arithmetics.
 * @param polygon The polygon used to crop and perspective correct the image.
 * @param filter The type of the filter to be applied.
 * @param compression The JPEG compression/quality setting.
 * Range is 0.0 (low quality, small file) to 1.0 (high quality, large file).
 * @param lensCameraProperties Properties of the camera which captured the image or nil.
 * @param imageScale If the image has been scaled, compared to how it was captured from the camera,
 * you must set the scaling factor here for proper cropping. Otherwise the the resulting aspect ratio will be wrong.
 * Set to 1.0 if the image if of its original size.
 * @return The JPEG data of the processed image.
 */
- (nullable NSData *)sbsdk_imageDataByProcessingWithRotations:(NSInteger)times
                                                      polygon:(nullable SBSDKPolygon *)polygon
                                                       filter:(SBSDKImageFilterType)filter
                                                  compression:(CGFloat)compression
                                         lensCameraProperties:(nullable SBSDKLensCameraProperties *)lensCameraProperties
                                                   imageScale:(CGFloat)imageScale;


/**
 * Applies the an image filter to the receiver and returns JPEG image data with given compression/quality.
 * @param filter The type of the filter to be applied.
 * @param compression The JPEG compression/quality setting.
 * Range is 0.0 (low quality, small file) to 1.0 (high quality, large file).
 * @return The JPEG data of the processed image.
 */
- (nullable NSData *)sbsdk_imageDataByApplyingFilter:(SBSDKImageFilterType)filter compression:(CGFloat)compression;

/**
 * Rotates the receiver to correct the orientation flag to UIImageOrientationUp.
 * @return The orientation fixed image.
 */
- (nullable UIImage *)sbsdk_imageWithFixedOrientation;

/**
 * Strips the alpha channel from an image.
 * @return The image without alpha channel.
 */
- (nullable UIImage *)sbsdk_imageWithStrippedAlpha;

/**
 * Rotates the given image data to correct the orientation flag to UIImageOrientationUp.
 * @return A new NSData instance containing jpeg image data with corrected metadata.
 */
+ (nullable NSData *)sbsdk_imageDataWithFixedOrientation:(nullable NSData *)imageData;

@end
