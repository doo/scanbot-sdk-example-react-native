//
//  SBSDKPDFRenderer.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 17.06.15.
//  Copyright (c) 2015 doo GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SBSDKScanbotSDKConstants.h"
#import "SBSDKImageStorage.h"
#import "SBSDKProgress.h"

/**
 * @enum SBSDKPDFRendererPageSize
 * Specifies the desired page size (media box size) for PDF rendering operations.
 */
typedef NS_ENUM(NSUInteger, SBSDKPDFRendererPageSize) {
    /** Each page is as large as its image at 72 dpi. */
    SBSDKPDFRendererPageSizeFromImage,
    
    /**
     * The page has the aspect ratio of the image, but is fitted into A4 size.
     * Whether portrait or landscape depends on the images aspect ratio.
     */
    SBSDKPDFRendererPageSizeA4,
    
    /**
     * The page has the aspect ratio of the image, but is fitted into US letter size.
     * Whether portrait or landscape depends on the images aspect ratio.
     */
    SBSDKPDFRendererPageSizeUSLetter,
    
    /**
     * Each page of the result PDF will be of US letter or A4 size depending on the current locale.
     * Whether portrait or landscape depends on the images aspect ratio.
     */
    SBSDKPDFRendererPageSizeAutoLocale,
    
    /**
     * For each page the best matching format (A4 or US letter) is used.
     * Whether portrait or landscape depends on the images aspect ratio.
     */
    SBSDKPDFRendererPageSizeAuto
};

/**
 * @class SBSDKPDFRenderer
 * A static class that renders an ordered collection of images into a basic, none-searchable PDF. Very fast.
 * It does not perform OCR.
 */
@interface SBSDKPDFRenderer : NSObject

/**
 * Asynchronously renders the images at the specified indices from the image storage into a none-searchable PDF
 * with the given page size, saves the PDF to the specified URL and calls the completion handler upon completion.
 * Each page is made up of one image.
 * @param imageStorage The image store to take the images from.
 * @param copyStorage Whether the receiver should make a physical copy of the image storage for the operation or not.
 * If set to NO, you must make sure that the image storage is not mutated while the operation is running.
 * Setting YES makes a physical copy of the files in the storage, using up disk memory, but protecting it against mutation.
 * @param indices The indices of images in the image store you want to render into the PDF.
 * Pass nil if all images must be rendered.
 * @param pageSize The page size used to render an image into a page. See SBSDKPDFRendererPageSize.
 * @param pdfOutputURL
 * @param completionHandler The completionHandler that is being called upon completion of the operation.
 * Called on main thread.
 * The result info dictionary contains values for the following keys:
 * - SBSDKResultInfoImageStorageKey: the ordered collection of images as SBSDKImageStorage
 * - SBSDKResultInfoDestinationFileURLKey: the file URL of the created PDF as NSURL
 
 * @return A SBSDKProgress object that can be used to observe the operations progress and to cancel the operation.
 */
+ (nullable SBSDKProgress *)renderImageStorage:(nonnull SBSDKImageStorage *)imageStorage
                              copyImageStorage:(BOOL)copyStorage
                                      indexSet:(nullable NSIndexSet *)indices
                                  withPageSize:(SBSDKPDFRendererPageSize)pageSize
                                        output:(nonnull NSURL *)pdfOutputURL
                             completionHandler:(nullable SBSDKCompletionHandler)completionHandler;


/**
 * Synchronously renders the images at the specified indices from the image storage into a none-searchable PDF
 * with the given page size and saves the PDF to the specified URL.
 * Each page is made up of one image.
 * @param imageStorage The image store to take the images from.
 * @param indices The indices of images in the image store you want to render into the PDF.
 * Pass nil if all images must be rendered.
 * @param pageSize The page size used to render an image into a page. See SBSDKPDFRendererPageSize.
 * @param pdfOutputURL
 * @param outError The pointer to an NSError when the rendering fails.
 * @return The URL to the rendered PDF file.
 */

+ (nullable NSURL *)renderImageStorage:(nonnull SBSDKImageStorage *)imageStorage
                              indexSet:(nullable NSIndexSet *)indices
                          withPageSize:(SBSDKPDFRendererPageSize)pageSize
                                output:(nonnull NSURL *)pdfOutputURL
                                 error:(NSError *_Nullable*_Nullable)outError;

@end
