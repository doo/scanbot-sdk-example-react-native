//
//  SBSDKImageFilterTypes.h
//  Scanbot SDK
//
//  Created by Sebastian Husche on 09.05.14.
//  Copyright (c) 2014 doo. All rights reserved.
//

#ifndef Scanbot_SDK_ImageFilterTypes_h
#define Scanbot_SDK_ImageFilterTypes_h

typedef enum SBSDKImageFilterType {
    SBSDKImageFilterTypeNone = 0,
    SBSDKImageFilterTypeColor = 1,
    SBSDKImageFilterTypeGray = 2,
    SBSDKImageFilterTypeBinarized = 3,
    SBSDKImageFilterTypeColorDocument = 4,
    SBSDKImageFilterTypePhoto = 5,
    SBSDKImageFilterTypePhotoBW1 = 6,
    SBSDKImageFilterTypePhotoBW2 = 7,
    SBSDKImageFilterTypeExperimental = 8,
    SBSDKImageFilterTypeTrinarization = 9,
    SBSDKImageFilterTypeFingerRemoval = 10
}SBSDKImageFilterType;

#endif
