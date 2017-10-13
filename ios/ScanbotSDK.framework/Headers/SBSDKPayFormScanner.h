//
//  SBSDKPayFormScanner.h
//  Scanbot SDK
//
//  Created by Sebastian Husche on 21.04.15.
//  Copyright (c) 2015 doo GmbH. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

#pragma mark - SBSDKPayFormTokenType

/**
 * @enum SBSDKPayFormTokenType
 * An enumeration describing the types of tokens the SBSDKPayFormScanner can detect and recognize.
 */
typedef NS_ENUM(NSInteger, SBSDKPayFormTokenType) {
    /** The name of the payments receiver. */
    SBSDKPayFormTokenTypeReceiver,
    
    /** The IBAN of the payments receiver. */
    SBSDKPayFormTokenTypeIBAN,
    
    /** The BIC of the payments receiver. */
    SBSDKPayFormTokenTypeBIC,
    
    /** The amount of money being transferred. */
    SBSDKPayFormTokenTypeAmount,
    
    /** The reference number or text. */
    SBSDKPayFormTokenTypeReferenceNumber,
    
    /** Second line for reference number */
    SBSDKPayFormTokenTypeReferenceNumber2,
    
    /** The name of the payment sender */
    SBSDKPayFormTokenTypeSender,
    
    /** The IBAN of the payment sender */
    SBSDKPayFormTokenTypeSenderIBAN
};


#pragma mark - SBSDKPayFormToken

/**
 * @class SBSDKPayFormToken
 * Describes the position and the type of a text box within the image being detected or recognized.
 */
@interface SBSDKPayFormToken : NSObject

/** The rectangle of the receiver marking the area on the perspective corrected and cropped image. */
@property (nonatomic, assign, readonly) CGRect rect;

/** The receivers type. */
@property (nonatomic, assign, readonly) SBSDKPayFormTokenType type;

@end





#pragma mark - SBSDKPayFormRecognizedField

/**
 * @class SBSDKPayFormRecognizedField
 * Resulting element of the SBSDKPayFormScanners recognizer.
 * Holds a token and its recognized text value after recognition.
 */
@interface SBSDKPayFormRecognizedField : NSObject

/** The receivers token. */
@property (nonatomic, strong, readonly, nonnull) SBSDKPayFormToken *token;

/** The recognized text for the receivers token. */
@property (nonatomic, copy, readonly, nullable) NSString *value;

@end





#pragma mark - SBSDKPayFormPolygon

/**
 * @class SBSDKPayFormPolygon
 * Describes an ordered collection of geometric points in the images coordinate system.
 * Used to express boxes and rectangles in non-perspective-corrected images.
 */
@interface SBSDKPayFormPolygon : NSObject

/** An UIBezierPath instance describing a closed path along the receivers points. */
@property (nonatomic, strong, readonly, nonnull) UIBezierPath *path;

/** The number of points the receiver holds. */
@property (nonatomic, assign, readonly) NSUInteger pointCount;

/** Convenience initializer taking a C-style array of CGPoints and the number of points. */
- (nonnull instancetype)initWithPoints:(nonnull CGPoint *)points count: (NSUInteger)pointCount;

/** Convenience initializer taking a NSArray of NSValue objects, e.g. [NSValue valueWithCGPoint:point]. */
- (nonnull instancetype)initWithPointValues:(nonnull NSArray<NSValue *> *)pointValues;

/** Returns the CGPoint at the given index. Does not perform bounds check. */
- (CGPoint)pointAtIndex:(NSUInteger)index;

@end





#pragma mark - SBSDKPayFormDetectedBox

/**
 * @class SBSDKPayFormDetectedBox
 * Part of the detector result. Gathers a polygon and a token type.
 */
@interface SBSDKPayFormDetectedBox : NSObject

/** The token type of the detected text box. */
@property (nonatomic, assign, readonly) SBSDKPayFormTokenType type;

/** Polygon, holding the geometry of one detected text box in non-perspective-corrected images coordinate system. */
@property (nonatomic, strong, readonly, nonnull) SBSDKPayFormPolygon *polygon;

@end





#pragma mark - SBSDKPayFormResult
/**
 * @class SBSDKPayFormResult
 * Common super class for the result classes of the detector and the recognizer.
 */
@interface SBSDKPayFormResult : NSObject

/** The size of the image the detector/recognizer has been run on. */
@property (nonatomic, readonly) CGSize imageSize;

/** Helper method to convert a polygon from image coordinate system to unit coordinates ([0..1], [0..1]). */
- (nonnull SBSDKPayFormPolygon *)convertPolygonToUnitSpace:(nonnull SBSDKPayFormPolygon *)polygon;

/** Helper method to convert a polygon from image coordinate system to a cameras preview layer coordinate system. */
- (nonnull SBSDKPayFormPolygon *)convertPolygon:(nonnull SBSDKPayFormPolygon *)polygon
                            toPreviewLayerSpace:(nonnull AVCaptureVideoPreviewLayer *)previewLayer;

@end





#pragma mark - SBSDKPayFormDetectionResult

/**
 * @class SBSDKPayFormDetectionResult
 * Result class of SBSDKPayFormScanners detector part. Describes wether the image contains a bank transfer form,
 * and if so it also holds the bounding polygon of the form as well as the detected text boxes.
 */
@interface SBSDKPayFormDetectionResult : SBSDKPayFormResult

/** YES if a valid bank transfer form was found, NO otherwise. */
@property (nonatomic, readonly) BOOL isValidPayForm;

/** The boundary polygon whithin the boxes have been detected. */
@property (nonatomic, readonly, nonnull) SBSDKPayFormPolygon *polygon;

/** The detected text boxes. NSArray of SBSDKPayFormDetectedBox objects. */
@property (nonatomic, readonly, nonnull) NSArray<SBSDKPayFormDetectedBox *> *detectedBoxes;

@end





#pragma mark - SBSDKPayFormRecognitionResult

/**
 * @class SBSDKPayFormRecognitionResult
 * Result class of SBSDKPayFormScanners recognizer part. Encapsulates the recognized text fields.
 */
@interface SBSDKPayFormRecognitionResult : SBSDKPayFormResult

/** NSArray of SBSDKPayFormRecognizedField objects as the result of the recognizer. */
@property (nonatomic, readonly, nonnull) NSArray<SBSDKPayFormRecognizedField *> *recognizedFields;

@end





#pragma mark - SBSDKPayFormScanner

/**
 * @class SBSDKPayFormScanner
 * The main scanner class that performs detection and recognition on either UIImage or CMSampleBufferRef (from camera).
 * Usually start with detection on a smaller image (video frame) and if detection was successful (isValidForm == YES)
 * run recognition on either the same or a larger image (camera still shot). The larger the image
 * the better the recognition results. Images are rotated accordingly to either the UIImage imageOrientation property
 * or the given video orientation.
 * Detection and recognition are successful only if the rotated image has natural orientation.
 *
 * Note: This class needs the german (deu.traineddata) language file installed. See SBSDKOpticalTextRecognizer on how to install
 * language files in your app.
 *
 */
@interface SBSDKPayFormScanner : NSObject

/**
 * Detects whether an image contains a bank transfer form or not on the given UIImage.
 * @param image The image to detect a payform on.
 * @return The detectors result.
 */
- (nullable SBSDKPayFormDetectionResult *)detectOnImage:(nonnull UIImage *)image;

/**
 * Detects whether an image contains a bank transfer form or not on the given CMSampleBufferRef.
 * @param sampleBuffer The CMSampleBuffer to detect a payform on.
 * @param videoOrientation The orientation the sample buffer is taken with.
 * @return The detectors result.
 */
- (nullable SBSDKPayFormDetectionResult *)detectInSampleBuffer:(nonnull CMSampleBufferRef)sampleBuffer
                                                   orientation:(AVCaptureVideoOrientation)videoOrientation;

/**
 * Recognizes the bank transfer form fields in the given UIImage.
 * @param image The image to recognize a payform on.
 * @return The recognizers result.
 */
- (nullable SBSDKPayFormRecognitionResult *)recognizeFieldsOnImage:(nonnull UIImage *)image;


/**
 * Recognizes the bank transfer form fields in the given CMSampleBufferRef.
 * @param sampleBuffer The CMSampleBuffer to recognize a payform on.
 * @param videoOrientation The orientation the sample buffer is taken with.
 * @return The recognizers result.
 */
- (nullable SBSDKPayFormRecognitionResult *)recognizeFieldsInSampleBuffer:(nonnull CMSampleBufferRef)sampleBuffer
                                                              orientation:(AVCaptureVideoOrientation)videoOrientation;

@end

