//
//  ColorUtils.h
//  Calc
//
//  Created by László Kővári on 2012.02.20..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ColorUtils : NSObject

+ (void) HSBToRGB:(float)hue sat:(float)saturation bright:(float)brightness outRed:(float *)red outGreen:(float *)green outBlue:(float *)blue composite:(int *)rgb;

+ (void) RGBToHSB:(float)red colorGreen:(float)green colorBlue:(float)blue outHue:(float *)hue outSat:(float *)saturation outBright:(float *)brightness;

+ (UIColor *) colorAdjustBrightnessColor:(UIColor *)color percent:(double)value flavour:(BOOL)isBrighter;

+ (void) extractRGBComponents:(CGFloat [3])components forColor:(UIColor *)color;

+ (UIColor *) colorStartColorForGradientColor:(UIColor *)color percent:(double)percentValue flavour:(BOOL)isBrighter;

@end
