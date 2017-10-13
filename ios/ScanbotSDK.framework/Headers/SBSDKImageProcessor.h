//
//  SBSDKImageProcessor.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 29.06.15.
//  Copyright (c) 2015 doo GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SBSDKScanbotSDKConstants.h"
#import "SBSDKProgress.h"
#import "SBSDKImageFilterTypes.h"
#import "SBSDKPolygon.h"

/**
 * @typedef SBSDKImageProcessingHandler
 * This type of block takes a source or input UIImage and a pointer to an NSError object, processes the image
 * and returns the processed image. In case of an error the error pointer is populated.
 * @param sourceImage The input image.
 * @param outError In case of an error this NSError pointer should be filled with an appropriate NSError.
 * @return The output image.
 */
typedef  UIImage *_Nullable (^SBSDKImageProcessingHandler)(UIImage *_Nonnull sourceImage,  NSError *_Nullable *_Nullable outError);


/**
 * @class SBSDKImageProcessor
 * A static class that processes images asynchronously: the heart of the Scanbot SDK image processing module.
 * As image processing is most often consuming lots of memory
 * this class processes images on a serial queue ensuring a minimum of large images in memory.
 * Each operation reads the image from the imageURL, processes it and,
 * if outputImageURL is a valid file URL, writes the result to outputImageURL.
 * Upon completion completionHandler is called on main thread in a synchronous matter.
 * After your completionHandler finished executing the next operation is enqueued.
 * Its resultInfo dictionary contains the processed image,
 * the source image URL and the destination image URL if specified.
 */
@interface SBSDKImageProcessor : NSObject

/**
 * Asynchronously applies one of the filters specified in SBSDKFilterType to the source image.
 * @param image The image to be filtered. Must not be nil.
 * @param filter The filter to be applied on the input image.
 * @param completionHandler The completionHandler that is being called upon completion of the operation.
 * Called on main thread.
 * The result info dictionary contains values for the following keys:
 * - SBSDKResultInfoDestinationImageKey: the output image as UIImage
 * @return An SBSDKProgress object that can be used to observe the operations progress and to cancel the operation.
 */
+ (nonnull SBSDKProgress *)filterImage:(nonnull UIImage *)image
                                filter:(SBSDKImageFilterType)filter
                            completion:(nullable SBSDKCompletionHandler)completionHandler;

/**
 * Asynchronously rotates the source image clockwise 90 degrees * times.
 * @param image The image to be filtered. Must not be nil.
 * @param times The number of clockwise 90 degree rotations. Modulo arithmetic is applied internally.
 * @param completionHandler The completionHandler that is being called upon completion of the operation.
 * Called on main thread.
 * The result info dictionary contains values for the following keys:
 * - SBSDKResultInfoDestinationImageKey: the output image as UIImage
 * @return An SBSDKProgress object that can be used to observe the operations progress and to cancel the operation.
 */
+ (nonnull SBSDKProgress *)rotateImage:(nonnull UIImage *)image
                             clockwise:(NSInteger)times
                            completion:(nullable SBSDKCompletionHandler)completionHandler;

/**
 * Asynchronously rotates the source image counter clockwise 90 degrees * times.
 * @param image The image to be filtered. Must not be nil.
 * @param times The number of counter clockwise 90 degree rotations. Modulo arithmetic is applied internally.
 * @param completionHandler The completionHandler that is being called upon completion of the operation.
 * Called on main thread.
 * The result info dictionary contains values for the following keys:
 * - SBSDKResultInfoDestinationImageKey: the output image as UIImage
 * @return An SBSDKProgress object that can be used to observe the operations progress and to cancel the operation.
 */
+ (nonnull SBSDKProgress *)rotateImage:(nonnull UIImage *)image
                      counterClockwise:(NSInteger)times
                            completion:(nullable SBSDKCompletionHandler)completionHandler;


/**
 * Asynchronously applies a rotation of the given degrees to the source image.
 * @param image The image to be filtered. Must not be nil.
 * @param degress The angle in degrees.
 * @param completionHandler The completionHandler that is being called upon completion of the operation.
 * Called on main thread.
 * The result info dictionary contains values for the following keys:
 * - SBSDKResultInfoDestinationImageKey: the output image as UIImage
 * @return An SBSDKProgress object that can be used to observe the operations progress and to cancel the operation.
 */
+ (nonnull SBSDKProgress *)rotateImage:(nonnull UIImage *)image
                               degrees:(CGFloat)degrees
                            completion:(nullable SBSDKCompletionHandler)completionHandler;


/**
 * Asynchronously warps the source image into the given polygon.
 * The final image is a perspective corrected and cropped version of the input image.
 * @param image The image to be warped. Must not be nil.
 * @param polygon The polygon used to warp the image into. Must not be nil.
 * @param completionHandler The completionHandler that is being called upon completion of the operation.
 * Called on main thread.
 * The result info dictionary contains values for the following keys:
 * - SBSDKResultInfoDestinationImageKey: the output image as UIImage
 * @return An SBSDKProgress object that can be used to observe the operations progress and to cancel the operation.
 */
+ (nonnull SBSDKProgress *)warpImage:(nonnull UIImage *)image
                             polygon:(nonnull SBSDKPolygon *)polygon
                          completion:(nullable SBSDKCompletionHandler)completionHandler;


/**
 * Asynchronously applies a custom filter to the source image.
 * @param image The image to be filtered. Must not be nil.
 * @param processingBlock The block that implements the filter. Must not be nil.
 * @param completionHandler The completionHandler that is being called upon completion of the operation.
 * Called on main thread.
 * The result info dictionary contains values for the following keys:
 * - SBSDKResultInfoDestinationImageKey: the output image as UIImage
 * @return An SBSDKProgress object that can be used to observe the operations progress and to cancel the operation.
 */
+ (nonnull SBSDKProgress *)customFilterImage:(nonnull UIImage *)image
                             processingBlock:(nonnull SBSDKImageProcessingHandler)processingBlock
                                  completion:(nullable SBSDKCompletionHandler)completionHandler;

@end

@interface SBSDKImageProcessor(NSURL)

/**
 * Asynchronously applies one of the filters specified in SBSDKFilterType to the image located at imageURL and
 * saves the result to outputImageURL.
 * @param imageURL The file URL of the image to be filtered. Must not be nil.
 * @param filter The filter to be applied on the input image.
 * @param outputImageURL The file URL to where the filtered image is written to.
 * If nil no writing operation is performed.
 * @param completionHandler The completionHandler that is being called upon completion of the operation.
 * Called on main thread.
 * The result info dictionary contains values for the following keys:
 * - SBSDKResultInfoSourceFileURLKey: imageURL as NSURL
 * - SBSDKResultInfoDestinationFileURLKey: outputImageURL as NSURL
 * - SBSDKResultInfoDestinationImageKey: the output image as UIImage
 * @return An SBSDKProgress object that can be used to observe the operations progress and to cancel the operation.
 */
+ (nonnull SBSDKProgress *)filterImage:(nonnull NSURL *)imageURL
                                filter:(SBSDKImageFilterType)filter
                        outputImageURL:(nonnull NSURL *)outputImageURL
                            completion:(nullable SBSDKCompletionHandler)completionHandler;


/**
 * Asynchronously rotates the image located at imageURL clockwise 90 degrees * times and
 * saves the result to outputImageURL.
 * @param imageURL The file URL of the image to be filtered. Must not be nil.
 * @param times The number of clockwise 90 degree rotations. Modulo arithmetic is applied internally.
 * @param outputImageURL The file URL to where the filtered image is written to.
 * If nil no writing operation is performed.
 * @param completionHandler The completionHandler that is being called upon completion of the operation.
 * Called on main thread.
 * The result info dictionary contains values for the following keys:
 * - SBSDKResultInfoSourceFileURLKey: imageURL as NSURL
 * - SBSDKResultInfoDestinationFileURLKey: outputImageURL as NSURL
 * - SBSDKResultInfoDestinationImageKey: the output image as UIImage
 * @return An SBSDKProgress object that can be used to observe the operations progress and to cancel the operation.
 */
+ (nonnull SBSDKProgress *)rotateImage:(nonnull NSURL *)imageURL
                             clockwise:(NSInteger)times
                        outputImageURL:(nonnull NSURL *)outputImageURL
                            completion:(nullable SBSDKCompletionHandler)completionHandler;

/**
 * Asynchronously rotates the image located at imageURL counter-clockwise 90 degrees * times and
 * saves the result to outputImageURL.
 * @param imageURL The file URL of the image to be filtered. Must not be nil.
 * @param times The number of counter-clockwise 90 degree rotations. Modulo arithmetic is applied internally.
 * @param outputImageURL The file URL to where the filtered image is written to.
 * If nil no writing operation is performed.
 * @param completionHandler The completionHandler that is being called upon completion of the operation.
 * Called on main thread.
 * The result info dictionary contains values for the following keys:
 * - SBSDKResultInfoSourceFileURLKey: imageURL as NSURL
 * - SBSDKResultInfoDestinationFileURLKey: outputImageURL as NSURL
 * - SBSDKResultInfoDestinationImageKey: the output image as UIImage
 * @return An SBSDKProgress object that can be used to observe the operations progress and to cancel the operation.
 */
+ (nonnull SBSDKProgress *)rotateImage:(nonnull NSURL *)imageURL
                      counterClockwise:(NSInteger)times
                        outputImageURL:(nonnull NSURL *)outputImageURL
                            completion:(nullable SBSDKCompletionHandler)completionHandler;

/**
 * Asynchronously applies a rotation of the given degrees to the image located at imageURL and saves
 * the result to outputImageURL.
 * @param imageURL The file URL of the image to be filtered. Must not be nil.
 * @param degress The angle in degrees.
 * @param outputImageURL The file URL to where the filtered image is written to.
 * If nil no writing operation is performed.
 * @param completionHandler The completionHandler that is being called upon completion of the operation.
 * Called on main thread.
 * The result info dictionary contains values for the following keys:
 * - SBSDKResultInfoSourceFileURLKey: imageURL as NSURL
 * - SBSDKResultInfoDestinationFileURLKey: outputImageURL as NSURL
 * - SBSDKResultInfoDestinationImageKey: the output image as UIImage
 * @return An SBSDKProgress object that can be used to observe the operations progress and to cancel the operation.
 */
+ (nonnull SBSDKProgress *)rotateImage:(nonnull NSURL *)imageURL
                               degrees:(CGFloat)degrees
                        outputImageURL:(nonnull NSURL *)outputImageURL
                            completion:(nullable SBSDKCompletionHandler)completionHandler;
/**
 * Asynchronously warps the image located at imageURL into the given polygon and
 * saves the result to outputImageURL.
 * The final image is a perspective corrected and cropped version of the input image.
 * @param imageURL The file URL of the image to be filtered. Must not be nil.
 * @param polygon The polygon used to warp the image into. Must not be nil.
 * @param outputImageURL The file URL to where the filtered image is written to.
 * If nil no writing operation is performed.
 * @param completionHandler The completionHandler that is being called upon completion of the operation.
 * Called on main thread.
 * The result info dictionary contains values for the following keys:
 * - SBSDKResultInfoSourceFileURLKey: imageURL as NSURL
 * - SBSDKResultInfoDestinationFileURLKey: outputImageURL as NSURL
 * - SBSDKResultInfoDestinationImageKey: the output image as UIImage
 * @return An SBSDKProgress object that can be used to observe the operations progress and to cancel the operation.
 */
+ (nonnull SBSDKProgress *)warpImage:(nonnull NSURL *)imageURL
                             polygon:(nonnull SBSDKPolygon *)polygon
                      outputImageURL:(nonnull NSURL *)outputImageURL
                          completion:(nullable SBSDKCompletionHandler)completionHandler;


/**
 * Asynchronously applies a custom filter to the image located at imageURL and
 * saves the result to outputImageURL.
 * @param imageURL The file URL of the image to be filtered. Must not be nil.
 * @param processingBlock The block that implements the filter. Must not be nil.
 * @param outputImageURL The file URL to where the filtered image is written to.
 * If nil no writing operation is performed.
 * @param completionHandler The completionHandler that is being called upon completion of the operation.
 * Called on main thread.
 * The result info dictionary contains values for the following keys:
 * - SBSDKResultInfoSourceFileURLKey: imageURL as NSURL
 * - SBSDKResultInfoDestinationFileURLKey: outputImageURL as NSURL
 * - SBSDKResultInfoDestinationImageKey: the output image as UIImage
 * @return An SBSDKProgress object that can be used to observe the operations progress and to cancel the operation.
 */
+ (nonnull SBSDKProgress *)customFilterImage:(nonnull NSURL *)imageURL
                             processingBlock:(nonnull SBSDKImageProcessingHandler)processingBlock
                              outputImageURL:(nonnull NSURL *)outputImageURL
                                  completion:(nullable SBSDKCompletionHandler)completionHandler;



@end
