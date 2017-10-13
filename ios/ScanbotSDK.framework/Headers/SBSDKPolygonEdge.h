//
//  SBSDKPolygonEdge.h
//  doo-ios
//
//  Created by Sebastian Husche on 02.12.13.
//  Copyright (c) 2013 doo GmbH. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SBSDKGeometryUtilities.h"

/**
 * @enum SBSDKPolygonEdgeOrientation
 * An enum describing the orientation of a polygon edge.
 */
typedef NS_ENUM(NSUInteger, SBSDKPolygonEdgeOrientation) {
    /** The edge is oriented horizontally. */
    SBSDKPolygonEdgeOrientationHorizontal = 0,
    /** The edge is oriented vertically. */
    SBSDKPolygonEdgeOrientationVertical = 1,
    /** The edge is oriented 45° from x- and y-axis. */
    SBSDKPolygonEdgeOrientationUndefined = 2
};

/** 
 @class SBSDKPolygonEdge
 Helper class that encapsulates an edge of a polygon and provides geometric helper methods.
 */
@interface SBSDKPolygonEdge : NSObject <NSCopying>

/** The start point of the edge. */
@property(nonatomic, assign) CGPoint p1;

/** The end point of the edge. */
@property(nonatomic, assign) CGPoint p2;

/** The center of the edge. */
@property(nonatomic, assign) CGPoint center;


/** 
 Designated initializer.
 @param p1 The start point of the edge.
 @param p2 The end point of the edge.
 @return Newly created instance of SBSDKPolygonEdge.
 */
- (instancetype)initWithPoint:(CGPoint)p1 andPoint:(CGPoint)p2;

/** The length of the receiver. In other words the distance between p1 and p2. */
- (CGFloat)length;

/** The axis-aligned bounding box of the receiver. */
- (CGRect)boundingBox;

/** The orientation of the receiver. See SBSDKPolygonEdgeOrientation */
- (SBSDKPolygonEdgeOrientation)orientation;

@end
