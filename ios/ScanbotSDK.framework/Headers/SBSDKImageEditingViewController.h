//
//  SBSDKImageEditingViewController.h
//  SnapIos
//
//  Created by Sebastian Husche on 18.09.17.
//  Copyright (c) 2014 doo GmbH. All rights reserved.
//

#import <UIKit/UIKit.h>

@class SBSDKPolygon;
@class SBSDKImageEditingViewController;

/**
 * A delegate protocol to inform an object about changes in SBSDKImageEditingViewController.
 */
@protocol SBSDKImageEditingViewControllerDelegate <NSObject>
@optional

/**
 * Informs the delegate that the image editing view controllers apply button was hit.
 * @param editingViewController The calling SBSDKImageEditingViewController.
 * @param polygon The current polygon of the SBSDKImageEditingViewController.
 * @param croppedImage The cropped image.
 */
- (void)imageEditingViewController:(nonnull SBSDKImageEditingViewController *)editingViewController
        didApplyChangesWithPolygon:(nonnull SBSDKPolygon *)polygon
              croppedImage:(nonnull UIImage *)croppedImage;


/**
 * Informs the delegate that the image editing view controllers cancel button was hit.
 * @param editingViewController The calling SBSDKImageEditingViewController.
 */
- (void)imageEditingViewControllerDidCancelChanges:(nonnull SBSDKImageEditingViewController *)editingViewController;

/**
 * Informs the delegate that the image editing view controllers polygon was changed by user interaction.
 * @param editingViewController The calling SBSDKImageEditingViewController.
 */
- (void)imageEditingViewControllerDidChangePolygon:(nonnull SBSDKImageEditingViewController *)editingViewController;

- (UIBarButtonItem *_Nullable)imageEditingViewControllerCancelButtonItem:(nonnull SBSDKImageEditingViewController *)editingViewController;

- (UIBarButtonItem *_Nullable)imageEditingViewControllerApplyButtonItem:(nonnull SBSDKImageEditingViewController *)editingViewController;

- (UIBarStyle)imageEditingViewControllerToolbarStyle:(nonnull SBSDKImageEditingViewController *)editingViewController;

- (UIColor *_Nullable)imageEditingViewControllerToolbarTintColor:(nonnull SBSDKImageEditingViewController *)editingViewController;

- (UIColor *_Nullable)imageEditingViewControllerToolbarItemTintColor:(nonnull SBSDKImageEditingViewController *)editingViewController;

- (UIBarButtonItem *_Nullable)imageEditingViewControllerRotateClockwiseToolbarItem:(nonnull SBSDKImageEditingViewController *)editingViewController;

- (UIBarButtonItem *_Nullable)imageEditingViewControllerRotateCounterClockwiseToolbarItem:(nonnull SBSDKImageEditingViewController *)editingViewController;

@end

/**
 * @class SBSDKImageEditingViewController
 * UIViewController subclass showing an image and a polygon The user can move edge and corner handles to redefine the
 * polygon manually and rotate the image in 90 degree steps (counter)clockwise.
 * This class cannot be instanced from a storyboard.
 * Instead it is installing itself as a child view controller onto a given parent view controller.
 *
 * Replaces the deprecated SBSDKCropViewController.
 */
@interface SBSDKImageEditingViewController : UIViewController

/** 
 The uncropped input image. If polygon is nil, the receiver tries to detect and set a polygon from the image.
 Must be called on main-thread!
 **/
@property(nonatomic, strong, nonnull) UIImage *image;

/** 
 The current polygon. If nil, the default, fully enclosing, polygon is used.
 Must be called on main-thread!
 **/
@property(nonatomic, copy, nullable) SBSDKPolygon *polygon;

/** 
 The rendering color of non-snapped edges.
 Must be called on main-thread!
 **/
@property(nonatomic, strong, nonnull) UIColor *edgeColor;

/** 
 The rendering color of magnetically snapped edges.
 Must be called on main-thread!
 **/
@property(nonatomic, strong, nonnull) UIColor *magneticEdgeColor;

/** 
 The cropped and rotated image. This is the final result of the receiver.
 Must be called on main-thread!
 **/
@property(nonatomic, readonly, nonnull) UIImage *croppedImage;

/** 
 The insets of the contents: image and handles. Defaults to (12, 12, 12, 12).
 **/
@property(nonatomic, assign) UIEdgeInsets contentInsets;

/** Delegate for result callback methods. **/
@property(nonatomic, weak, nullable) id<SBSDKImageEditingViewControllerDelegate> delegate;

/**
 * Desginated initializer. Installs the receiver as child view controller onto the parent view controllers
 * view using its entire bounds area.
 * @param parentViewController The view controller the newly created instance is embedded into.
 * @param container The view to embed the receivers view into. Must be a descendant of parentViewControllers view.
 */
- (nonnull instancetype)initWithParentViewController:(nonnull UIViewController *)parentViewController
                                       containerView:(nonnull UIView *)container;

/**
 * Asks the controller to rotate input image
 * @param clockwise The rotation direction. If set YES, rotates clockwise, counterclockwise otherwise.
 * @param animated If set to YES, animates the rotation.
 **/
- (void)rotateInputImageClockwise:(BOOL)clockwise
                         animated:(BOOL)animated;
                         

/** Updates the navigation bars buttons of the receiver by calling the appropriate delegate functions. **/
- (void)updateNavigationBarItems;

/** Updates the toolbars buttons of the receiver by calling the appropriate delegate functions. **/
- (void)updateToolBarItems;


/** Tells the receiver to apply changes immediately. Calls the appropriate delegate method when finished. **/
- (void)applyChanges;

/** Tells the receiver to cancel changes immediately. Calls the appropriate delegate method. **/
- (void)dismissChanges;

@end
