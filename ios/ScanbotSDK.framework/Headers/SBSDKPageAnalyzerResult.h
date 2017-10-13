//
//  SBSDKPageAnalyzerResult.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 29.06.15.
//  Copyright (c) 2015 doo GmbH. All rights reserved.
//


#import <Foundation/Foundation.h>

/**
 * @enum SBSDKPageOrientation
 * Part of the page layout analyis result. Describes the detected orientation of the text.
 */
typedef NS_ENUM(NSUInteger, SBSDKPageOrientation){
    /** The text is oriented correctly. */
    SBSDKPageOrientationUp,
    
    /** The text is rotated 90 degrees in clockwise direction. */
    SBSDKPageOrientationRight,
    
    /** The text is rotated 180 degrees. */
    SBSDKPageOrientationDown,
    
    /** The text is rotated 90 degrees in counter-clockwise direction. */
    SBSDKPageOrientationLeft
};

/**
 * @enum SBSDKWritingDirection
 * Part of the page layout analyis result.
 * Describes the reading direction of the text independently from the orientation.
 * Note: Experimental - this is currently not always working correctly for top-to-bottom text.
 */
typedef NS_ENUM(NSUInteger, SBSDKWritingDirection){
    /** The text (in up-orientation) is read from left to right. (English, etc.) */
    SBSDKWritingDirectionLeftToRight,
    
    /** The text (in up-orientation) is read from right to left. (Arabian, Hebrew) */
    SBSDKWritingDirectionRightToLeft,
    
    /** The text (in up-orientation) is read from top to bottom. (Japanese, etc.)*/
    SBSDKWritingDirectionTopToBottom,
};

/**
 * @enum SBSDKTextlineOrder
 * Part of the page layout analyis result.
 * Describes the order of columns in top-to-bottom writing direction resp. of rows in left-right and right-left direction.
 */
typedef NS_ENUM(NSUInteger, SBSDKTextlineOrder) {
    /** Colums are read from left-to-right order in top-bottom directional languages. (Japanese, etc.) */
    SBSDKTextlineOrderLeftToRight,
    
    /** Colums are read from right-to-left order in top-bottom directional languages. */
    SBSDKTextlineOrderRightToLeft,
    
    /** Rows are read from top-to-bottom order in left-to-right or right-to-left directional languages. (English, etc.) */
    SBSDKTextlineOrderTopToBottom,
};


/**
 * @class SBSDKPageAnalyzerResult
 * Describes the result of a page layout analyzing operation. It contains page orientation, writing direction and
 * text line order as well as a deskew angle.
 * This result can be used to process the input image before running an OCR operation on it, e.g.
 * - Rotate the image to let the page orientation flip to SBSDKPageOrientationUp,
 * - Apply a rotation with the deskewAngle to remove distortion and get perfectly aligned text lines.
 * - Limit recognition languages to languages that use the analyzer results writingDirection and textlineOrder to achieve much better OCR performance.
 * For convenience this immutable class conforms to NSCopying protocol.
 */
@interface SBSDKPageAnalyzerResult : NSObject<NSCopying>

/** The general orientation of the text in the image. See SBSDKPageOrientation. */
@property (nonatomic, readonly) SBSDKPageOrientation orientation;

/** The writing direction of the text lines in the image. See SBSDKWritingDirection. */
@property (nonatomic, readonly) SBSDKWritingDirection writingDirection;

/** The order of text lines. See SBSDKTextlineOrder. */
@property (nonatomic, readonly) SBSDKTextlineOrder textlineOrder;

/** The angle in radians the image needs to be rotated to achieve perfectly aligned text lines. */
@property (nonatomic, readonly) CGFloat deskewAngle;

/**
 * Designated initializer.
 * @param orientation The receivers orientation.
 * @param writingDirection The receivers text line writing direction.
 * @param textlineOrder The receivers textline order.
 * @param radians The receivers deskew angle in radians.
 * @return Fully initialized object.
 */
- (nonnull instancetype)initWithOrientation:(SBSDKPageOrientation)orientation
                           writingDirection:(SBSDKWritingDirection)writingDirection
                              textlineOrder:(SBSDKTextlineOrder)textlineOrder
                                deskewAngle:(double)radians;

@end
