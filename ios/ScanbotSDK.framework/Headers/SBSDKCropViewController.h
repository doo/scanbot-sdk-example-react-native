//
//  SBSDKCropViewController.h
//  SnapIos
//
//  Created by Sebastian Husche on 09.07.13.
//  Copyright (c) 2014 doo GmbH. All rights reserved.
//

#import <UIKit/UIKit.h>

@class SBSDKPolygon;
@class SBSDKCropViewController;

/** \deprecated Replaced by SBSDKImageEditingViewController and SBSDKImageEditingViewControllerDelegate. */
/**
 * A delegate protocol to inform an object about changes in SBSDKCropViewController.
 */

/** \cond */
__attribute__ ((deprecated))
/** \endcond */
@protocol SBSDKCropViewControllerDelegate <NSObject>
@optional

/**
 * Informs the delegate that the crop view controllers apply button was hit.
 * @param cropViewController The calling SBSDKCropViewController.
 * @param polygon The current polygon of the SBSDKCropViewController.
 * @param croppedImage The cropped image.
 */
- (void)cropViewController:(nonnull SBSDKCropViewController *)cropViewController
didApplyChangesWithPolygon:(nonnull SBSDKPolygon *)polygon
              croppedImage:(nonnull UIImage *)croppedImage;


/**
 * Informs the delegate that the crop view controllers cancel button was hit.
 * @param cropViewController The calling SBSDKCropViewController.
 */
- (void)cropViewControllerDidCancelChanges:(nonnull SBSDKCropViewController *)cropViewController;

/**
 * Informs the delegate that the crop view controllers polygon was changed.
 * @param cropViewController The calling SBSDKCropViewController.
 */
- (void)cropViewControllerDidChangePolygon:(nonnull SBSDKCropViewController *)cropViewController;


/**
 * Asks the delegate for the cancel buttons icon.
 * @param cropViewController The calling SBSDKCropViewController.
 * @return An image used for the cancel button.
 */
- (nonnull UIImage *)cancelButtonImageForCropViewController:(nonnull SBSDKCropViewController *)cropViewController;

/**
 * Asks the delegate for the apply buttons icon.
 * @param cropViewController The calling SBSDKCropViewController.
 * @return An image used for the apply button.
 */
- (nonnull UIImage *)applyButtonImageForCropViewController:(nonnull SBSDKCropViewController *)cropViewController;

@end

/** \deprecated Replaced by SBSDKImageEditingViewController and SBSDKImageEditingViewControllerDelegate. */
/**
 * @class SBSDKCropViewController
 * UIViewController subclass showing an image and a polygon The user can move edge and corner handles to redefine the
 * polygon manually.
 * This class cannot be instanced from a storyboard.
 * Instead it is installing itself as a child view controller onto a given parent view controller.
 */
/** \cond */
__attribute__ ((deprecated))
/** \endcond */
@interface SBSDKCropViewController : UIViewController

/** 
 The uncropped input image. If polygon is nil, the receiver tries to detect and set a polygon from the image.
 Must be called on main-thread!
 **/
@property(nonatomic, strong, nonnull) UIImage *image;

/** 
 The current polygon. If nil, the standard fully enclosing polygon is used.
 Must be called on main-thread!
 **/
@property(nonatomic, copy, nullable) SBSDKPolygon *polygon;

/** 
 The rendered color of unsnapped edges.
 Must be called on main-thread!
 **/
@property(nonatomic, strong, nonnull) UIColor *edgeColor;

/** 
 The rendered color of magnetically snapped edges. 
 Must be called on main-thread!
 **/
@property(nonatomic, strong, nonnull) UIColor *magneticEdgeColor;

/** 
 Cropped image as result of applying polygon to image.
 Must be called on main-thread!
 **/
@property(nonatomic, readonly, nonnull) UIImage *croppedImage;

/** 
 The insets of the contents: image and handles. Defaults to (12, 12, 12, 12).
 **/
@property(nonatomic, assign) UIEdgeInsets contentInsets;

/** Delegate for result callback methods. **/
@property(nonatomic, weak, nullable) id<SBSDKCropViewControllerDelegate> delegate;

/**
 * Desginated initializer. Installs the receiver as child view controller onto the parent view controllers
 * view using its entire bounds area.
 * @param parentViewController The view controller the newly created instance is embedded into.
 * @param container The view to embed the receivers view into. Must be a descendant of parentViewControllers view.
 */
- (nonnull instancetype)initWithParentViewController:(nonnull UIViewController *)parentViewController
                                       containerView:(nonnull UIView *)container;

/**
 Tells the controller to apply changes immediately. Calls the appropriate delegate method when finished.
 **/
- (void)applyChanges;

/**
 Tells the controller to cancel changes immediately. Calls the appropriate delegate method.
 **/
- (void)dismissChanges;

@end

