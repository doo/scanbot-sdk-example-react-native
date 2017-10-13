//
//  SBSDKOCRResult.h
//  ScanbotSDK
//
//  Created by Sebastian Husche on 25.06.15.
//  Copyright (c) 2015 doo GmbH. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "SBSDKPageAnalyzerResult.h"

/**
 * @enum SBSDKOCRResultBlockType
 * When an OCR operation finishes it returns an array of result blocks containing e.g.
 * the position and type of recognized text. Each of the result blocks has a specific type.
 */
typedef NS_ENUM(NSUInteger, SBSDKOCRResultBlockType) {
    /** The result block representes a text paragraph. */
    SBSDKOCRResultBlockTypeParagraph = 1 << 0,
    
    /** The result block representes a line of text. */
    SBSDKOCRResultBlockTypeLine = 1 << 1,
    
    /** The result block representes a word. */
    SBSDKOCRResultBlockTypeWord = 1 << 2
};

/**
 * @class SBSDKOCRResultBlock
 * Part of the optical character recognitions result. This result contains multiple SBSDKOCRResultBlock objects.
 * Each block represents a text paragraph, a text line or a word and contains information about it, like the found text,
 * the bounding box, where in the image the paragraph/line/word can be found, the confidence value and the type.
 * For convenience this immutable class conforms to NSCopying protocol.
 */
@interface SBSDKOCRResultBlock : NSObject<NSCopying>

/** The recognized text within the receivers bounding box. */
@property (nonatomic, readonly, nonnull) NSString *text;

/**
 The bounding box of the receiver in normalized unit coordinate space Top, Left:(0.0, 0.0) - Width, Height(1.0, 1.0).
 Use the `boundingBoxWithImageSize:` method to get the bounding box in absolute image coordinates.
 */
@property (nonatomic, readonly) CGRect boundingBox;

/**
 * The confidence value describes how confident the OCR engine was when detecting the letters and words.
 * Ranges from 0.0 (not confident) to 100.0 (very confident).
 */
@property (nonatomic, readonly) CGFloat confidenceValue;

/** The type of the block. See SBSDKOCRResultBlockType. */
@property (nonatomic, readonly) SBSDKOCRResultBlockType blockType;

/**
 * Designated initializer.
 * @param text The text of the block.
 * @param boundingBox The bounding box of the block in normalized unit coordinates.
 * @param confidenceValue The confidence value of the block.
 * @param blockType The type of the block.
 * @return Initialized instance of SBSDKOCRResultBlock.
 */
- (nonnull instancetype)initWithText:(nonnull NSString *)text
                         boundingBox:(CGRect)boundingBox
                     confidenceValue:(CGFloat)confidenceValue
                           blockType:(SBSDKOCRResultBlockType)blockType;

/**
 * Calculates the bounding box of the receiver in absolute image coordinate system.
 * @param imageSize The size of the image the box is scaled into.
 * @return The bounding box in absolute image coordinate system.
 */
- (CGRect)boundingBoxWithImageSize:(CGSize)imageSize;

@end


/**
 * @class SBSDKOCRResult
 * This class summarizes the results of an optical character recognition (OCR) operation.
 * It contains the recognized text, and arrays for each type of SBSDKOCRResultBlock, as well as the result from the
 * page layout analysis.
 * For convenience this immutable class conforms to NSCopying protocol.
 */
@interface SBSDKOCRResult : NSObject <NSCopying>

/** The complete recognized text of the OCR operation. */
@property (nonatomic, readonly, nonnull) NSString *recognizedText;

/** An array of SBSDKOCRResultBlock objects containing all blocks of type paragraph. */
@property (nonatomic, readonly, nonnull) NSArray<SBSDKOCRResultBlock *> *paragraphs;

/** An array of SBSDKOCRResultBlock objects containing all blocks of type textline. */
@property (nonatomic, readonly, nonnull) NSArray<SBSDKOCRResultBlock *> *lines;

/** An array of SBSDKOCRResultBlock objects containing all blocks of type word. */
@property (nonatomic, readonly, nonnull) NSArray<SBSDKOCRResultBlock *> *words;

/** The result of the page analysis that is sometimes executed before the OCR operation. can be nil. */
@property (nonatomic, readonly, nullable) SBSDKPageAnalyzerResult *pageAnalyzerResult;

/**
 * Convenience method to append recognized text to the receivers text.
 * Can be used to merge results from multiple OCR operations into a single result.
 */
- (void)appendRecognizedText:(nullable NSString *)text;

/**
 * Convenience method to set the page analyzer result.
 * Can be used to merge results from multiple OCR operations into a single result.
 */
- (void)setPageAnalyzerResult:(nonnull SBSDKPageAnalyzerResult *)analyzerResult;

@end

