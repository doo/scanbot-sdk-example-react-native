//
//  SBSDKPolygon.h
//  doo-ios
//
//  Created by Sebastian Husche on 28.11.13.
//  Copyright (c) 2013 doo GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>
#import "SBSDKDocumentDetectionStatus.h"
#import "SBSDKPolygonEdge.h"

/**
 * @class SBSDKPolygon
 * This class represents a 4-gon, a polygon with 4 edges. The polygons points are stored in
 * a normalized unit coordinate system from {0, 0} to {1, 1}.
 * To convert to absolute coordinates use the methods that take a size and return absolute values.
 * An absolute space can be any 2-dimensional space with a size, e.g. an image.
 */
@interface SBSDKPolygon : NSObject <NSCopying>

@property(nonatomic, assign) double widthPercentage;
@property(nonatomic, assign) double heightPercentage;
@property(nonatomic, assign) double detectionScore;
@property(nonatomic, assign) SBSDKDocumentDetectionStatus detectionStatus;

/**
 * One of the desinated initializer methods.
 * @param a The first point of the polygon in unit coordinates.
 * @param b The second point of the polygon in unit coordinates.
 * @param c The third point of the polygon in unit coordinates.
 * @param d The fourth point of the polygon in unit coordinates.
 * @return A new instance of SBSDKPolygon class.
 */
- (instancetype)initWithNormalizedPointA:(CGPoint)a pointB:(CGPoint)b pointC:(CGPoint)c pointD:(CGPoint)d;

/**
 * One of the desinated initializer methods.
 * @param rect A rectangle in normalized unit space coordinates forming the new polygon.
 * @return A new instance of SBSDKPolygon class.
 */
- (instancetype)initWithNormalizedRect:(CGRect)rect;

/**
 * One of the desinated initializer methods.
 * @param a The first point of the polygon in absolute coordinates.
 * @param b The second point of the polygon in absolute coordinates.
 * @param c The third point of the polygon in absolute coordinates.
 * @param d The fourth point of the polygon in absolute coordinates.
 * @param size The size to use to convert the points to unit coordinates.
 * @return A new instance of SBSDKPolygon class.
 */
- (instancetype)initWithAbsolutePointA:(CGPoint)a pointB:(CGPoint)b pointC:(CGPoint)c pointD:(CGPoint)d forSize:(CGSize)size;

/** 
 * One of the desinated initializer methods.
 * @param values An array of 8 NSNumber double values containing the normalized 
 * coordinates in the form [x1, y1, x2, y2, x3, y3, x4, y4].
 **/
- (instancetype)initWithNormalizedDoubleValues:(NSArray<NSNumber *>*)values;

/**
 * One of the desinated initializer methods.
 * @param codeObject An AVMetadataMachineReadableCodeObject as returned from QR code detection.
 **/
- (instancetype)initWithMetadataObject:(AVMetadataMachineReadableCodeObject *)codeObject;

/**
 * Compares the receiver to another instance of SBSDKPolygon.
 * @param polygon The polygon instance the receiver is compared to.
 * @return YES, if the points of polygon are equal to the points of the receiver, NO otherwise.
 */
- (BOOL)isEqualToPolygon:(SBSDKPolygon *)polygon;


- (BOOL)isSimilarToPolygon:(SBSDKPolygon *)polygon;

/**
 * Calculates the standard deviation in the corresponding points of the receiver and the given SBSDKPolygon.
 * @param polygon The polygon instance the receiver is compared to.
 * @return Standard deviation.
 */
- (double)standardDeviationToPolygon:(SBSDKPolygon *)polygon;

/**
 * Clips the receiver the unit space {0, 0} - {1, 1}.
 */
- (void)normalize;

/**
 * Orders the receivers points in clockwise order. The first point is the point right next to 12 o'clock.
 * This method uses the atan2 operator to sort the points clockwise.
 */
- (void)sortClockwise;

/**
 * Creates a UIBezierPath instance of the receiver for drawing purposes.
 * @param size The size to use to convert the normalized points of the receiver to absolute coordinates.
 * @return An UIBezierPath instance representing the polygon converted to absolute space.
 */
- (UIBezierPath *)bezierPathForSize:(CGSize)size;

/**
 * Creates a UIBezierPath instance of the receiver for drawing purposes.
 * @param previewLayer The preview layer the path is going to be presented on.
 * @return An UIBezierPath instance representing the polygon.
 */
- (UIBezierPath *)bezierPathForPreviewLayer:(AVCaptureVideoPreviewLayer *)previewLayer;

/**
 * Helper method to transform a normalized point to an absolute coordinate system with given size.
 * @param point The absolute point to convert into normalized space.
 * @param size The size of the absolute coordinate system.
 * @return The normalized point.
 */
+ (CGPoint)normalizedPointFromAbsolutePoint:(CGPoint)point withSize:(CGSize)size;

/**
 * Helper method to transform an absolute point to the normalized unit coordinate system with given size.
 * @param point The normalized point to convert into absolute space.
 * @param size The size of the absolute coordinate system.
 * @return The converted point.
 */
+ (CGPoint)absolutePointFromNormalizedPoint:(CGPoint)point withSize:(CGSize)size;

/**
 * Returns the normalized point at the given index.
 * @param index The index of the point in the receiver. Must be in range {0-3}.
 * @return The normalized point.
 */
- (CGPoint)normalizedPointWithIndex:(NSUInteger)index;

/**
 * Returns the absolute point at the given index.
 * @param index The index of the point in the receiver. Must be in range {0-3}.
 * @param size The size of the absolute coordinate system to transform the point to.
 * @return The converted point.
 */
- (CGPoint)absolutePointWithIndex:(NSUInteger)index forSize:(CGSize)size;

/**
 * Returns the normalized edge at the given index.
 * The edge at index n is built from points at indices n and (n+1) % 4.
 * @param index The index of the edge in the receiver. Must be in range {0-3}.
 * @return The normalized edge.
 */
- (SBSDKPolygonEdge *)normalizedEdgeWithIndex:(NSUInteger)index;

/**
 * Returns the absolute edge at the given index.
 * The edge at index n is built from points at indices n and (n+1) % 4.
 * @param index The index of the edge in the receiver. Must be in range {0-3}.
 * @param size The size of the absolute coordinate system to transform the edge to.
 * @return The absolute edge.
 */
- (SBSDKPolygonEdge *)absoluteEdgeWithIndex:(NSUInteger)index forSize:(CGSize)size;

/** 
 * Returns the normalized points as an array of 8 double value NSNumbers in the form [x1, y1, x2, y2, x3, y3, x4, y4].
 **/
- (NSArray<NSNumber *>*)normalizedDoubleValues;

/**
 * Sets the receivers point at the given index to the value of point.
 * @param point The normalized point.
 * @param index The index of the point the set within the receiver in range {0-3}.
 */
- (void)setNormalizedPoint:(CGPoint)point forIndex:(NSUInteger)index;

/**
 * Sets the receivers point at the given index to the normalized value of point.
 * @param point The absolute point.
 * @param size The size of the absolute coordinate system.
 * @param index The index of the point the set within the receiver in range {0-3}.
 */
- (void)setAbsolutePoint:(CGPoint)point withSize:(CGSize)size forIndex:(NSUInteger)index;

/**
 * Rotates the points of the receiver 90 degrees clockwise,
 * transforming it from one absolute space to another.
 * @param oldSize The size of the absolute coordinate system before rotating it.
 * @param newSize The size of the absolute coordinate system after rotating it.
 */
- (void)rotate90CWWithOldSize:(CGSize)oldSize newSize:(CGSize)newSize;

/**
 * Rotates the points of the receiver 90 degrees counterclockwise,
 * transforming it from one absolute space to another.
 * @param oldSize The size of the absolute coordinate system before rotating it.
 * @param newSize The size of the absolute coordinate system after rotating it.
 */
- (void)rotate90CCWWithOldSize:(CGSize)oldSize newSize:(CGSize)newSize;

/**
 * Rotates the points of the receiver 180 degrees,
 * transforming it from one absolute space to another.
 * @param oldSize The size of the absolute coordinate system before rotating it.
 * @param newSize The size of the absolute coordinate system after rotating it.
 */
- (void)rotate180WithOldSize:(CGSize)oldSize newSize:(CGSize)newSize;

/** 
 * Performs times counter-clockwise rotations on the receiver.
 * @param size The size of the absolute coordinate system before rotating it.
 **/
- (void)rotateCCW:(NSUInteger)times withSize:(CGSize)size;

/**
 * Performs times clockwise rotations on the receiver.
 * @param size The size of the absolute coordinate system before rotating it.
 **/
- (void)rotateCW:(NSUInteger)times withSize:(CGSize)size;

/**
 * Returns the axis-oriented bounding box of the receiver.
 * @param size The absolute size the polygon is scaled to.
 * @return The bounding box of the polygon in sbolute image space coordinates.
 */
- (CGRect)boundingBoxWithSize:(CGSize)size;

/** Calculates the geometric center (mass point) of the polygon in normalized unit coordinates. */
- (CGPoint)center;

- (CGSize)sizeWhenApplyingToImageOfSize:(CGSize)size
                             imageScale:(double)imageScale
                            focalLength:(double)focalLength
                            sensorWidth:(double)sensorWidth;

@end
