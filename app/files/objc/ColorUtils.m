//
//  ColorUtils.m
//  Calc
//
//  Created by László Kővári on 2012.02.20..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import "ColorUtils.h"
#import <math.h>

@implementation ColorUtils

+ (void) HSBToRGB:(float)hue sat:(float)saturation bright:(float)brightness outRed:(float *)red outGreen:(float *)green outBlue:(float *)blue composite:(int *)rgb {
    
	int r = 0, g = 0, b = 0;
    if (saturation == 0) {
	    r = g = b = (int) (brightness * 255.0f + 0.5f);
	} else {
	    float h = (hue - (float)floor(hue)) * 6.0f;
	    float f = h - (float)floor(h);
	    float p = brightness * (1.0f - saturation);
	    float q = brightness * (1.0f - saturation * f);
	    float t = brightness * (1.0f - (saturation * (1.0f - f)));
	    switch ((int) h) {
            case 0:
                r = (int) (brightness * 255.0f + 0.5f);
                g = (int) (t * 255.0f + 0.5f);
                b = (int) (p * 255.0f + 0.5f);
                break;
            case 1:
                r = (int) (q * 255.0f + 0.5f);
                g = (int) (brightness * 255.0f + 0.5f);
                b = (int) (p * 255.0f + 0.5f);
                break;
            case 2:
                r = (int) (p * 255.0f + 0.5f);
                g = (int) (brightness * 255.0f + 0.5f);
                b = (int) (t * 255.0f + 0.5f);
                break;
            case 3:
                r = (int) (p * 255.0f + 0.5f);
                g = (int) (q * 255.0f + 0.5f);
                b = (int) (brightness * 255.0f + 0.5f);
                break;
            case 4:
                r = (int) (t * 255.0f + 0.5f);
                g = (int) (p * 255.0f + 0.5f);
                b = (int) (brightness * 255.0f + 0.5f);
                break;
            case 5:
                r = (int) (brightness * 255.0f + 0.5f);
                g = (int) (p * 255.0f + 0.5f);
                b = (int) (q * 255.0f + 0.5f);
                break;
	    }
	}
    *red = r;
    *green = g;
    *blue = b;
	*rgb = 0xff000000 | (r << 16) | (g << 8) | (b << 0);
    
    /*
    float temp1;
    float temp2;
    float temp[3];
    int i;
    
    // Check for saturation. If there isn't any just return the luminance value for each, which results in gray.
    if (saturation == 0.0) {
        *red = brightness;
        *green = brightness;
        *blue = brightness;
        return;
    }
    
    // Test for luminance and compute temporary values based on luminance and saturation 
    if (brightness < 0.5)
        temp2 = brightness * (1.0 + saturation);
    else
        temp2 = brightness + saturation - brightness * saturation;

    temp1 = 2.0 * brightness - temp2;
    
    // Compute intermediate values based on hue
    temp[0] = hue + 1.0 / 3.0;
    temp[1] = hue;
    temp[2] = hue - 1.0 / 3.0;
    
    for(i = 0; i < 3; ++i) {
        // Adjust the range
        if(temp[i] < 0.0)
            temp[i] += 1.0;

        if(temp[i] > 1.0) 
            temp[i] -= 1.0;
        
        
        if(6.0 * temp[i] < 1.0) {
            temp[i] = temp1 + (temp2 - temp1) * 6.0 * temp[i];
        }    
        else {
            if(2.0 * temp[i] < 1.0) {
                temp[i] = temp2;
            }    
            else {
                if(3.0 * temp[i] < 2.0)
                    temp[i] = temp1 + (temp2 - temp1) * ((2.0 / 3.0) - temp[i]) * 6.0;
                else
                    temp[i] = temp1;
            }
        }
    }
    
   // Assign temporary values to R, G, B
   *red = temp[0];
   *green = temp[1];
   *blue = temp[2];
   */  
}

+ (void) RGBToHSB:(float)red colorGreen:(float)green colorBlue:(float)blue outHue:(float *)hue outSat:(float *)saturation outBright:(float *)brightness {
    red = red / 255.0f;
    green = green / 255.0f;
    blue = blue / 255.0f;
    
    
    float h,s, l, cmax, cmin;
    
    h = 0;
    s = 0;
    l = 0;
    
    cmax = fmax(red, green);
    cmax = fmax(cmax, blue);
    cmin = fmin(red, green);
    cmin = fmin(cmin, blue);
    
    *brightness = ((float) cmax)  / 255.0f;
    
	if (cmax != 0.0)
	    *saturation = ((float) (cmax - cmin)) / ((float) cmax);
	else
	    *saturation = 0;
    
	if (saturation == 0)
	    *hue = 0.0;
	else {
	    float redc = ((float) (cmax - red)) / ((float) (cmax - cmin));
	    float greenc = ((float) (cmax - green)) / ((float) (cmax - cmin));
	    float bluec = ((float) (cmax - blue)) / ((float) (cmax - cmin));
	
        if (red == cmax)
            *hue = bluec - greenc;
	    else if (green == cmax)
	        *hue = 2.0f + redc - bluec;
        else
            *hue = 4.0f + greenc - redc;
	    
        *hue /= 6.0f;
	    
        if (*hue < 0)
            *hue = *hue + 1.0f;
	}
    
    /*    
    l = (cmin + cmax) / 2.0f;
    
    if (l <= 0.0){
        *hue = h;
		*saturation = s;
		*brightness = l;
        return;
    }
    
    vm = cmax - cmin;
    s = vm;
    
    if (s > 0.0f) {
        s /= (l <= 0.5f) ? (cmax + cmin) : (2.0 - cmax - cmin); 
    } else {
        *hue = h;
        *saturation = s;
        *brightness = l;
        return;
    }
    
    r2 = (cmax - red) / vm;
    g2 = (cmax - green) / vm;
    b2 = (cmax - blue) / vm;
    
    if (red == cmax) {
        h = (green == cmin ? 5.0f + b2 : 1.0f - g2);
    } else if (green == cmax) {
        h = (blue == cmin ? 1.0f + r2 : 3.0 - b2);
    }else {
        h = (red == cmin ? 3.0f + g2 : 5.0f - r2);
    }
    
    h /= 6.0f;
    
    *hue = h;
    *saturation = s;
    *brightness = l;
    */
}

/**
 * 
 * Method: AdjustBrightness 
 * @param originColor Color - The interested color
 * @param index double - Index value
 * @param darkest boolean - True if deepest false if brightest
 * @return Color - Darkest from originColow with ix
 */
+ (UIColor *) colorAdjustBrightnessColor:(UIColor *)color percent:(double)value flavour:(BOOL)isBrighter {
    UIColor *colorAsResult = nil;
    float hue, saturation, brightness = 0.0;
    int rgb = 0;
    
    CGFloat components[3];
    [ColorUtils extractRGBComponents:components forColor:color];

    float red = components[0];
    float green = components[1];
    float blue = components[2];
    
    
    [ColorUtils RGBToHSB:red colorGreen:green colorBlue:blue outHue:&hue outSat:&saturation outBright:&brightness];

    if (!isBrighter) 
        brightness -= ((brightness / 100.0) * value);
    else
        brightness += ((brightness / 100.0) * value);
    
    [ColorUtils HSBToRGB:hue sat:saturation bright:brightness outRed:&red outGreen:&green outBlue:&blue composite:&rgb];
    
    colorAsResult = [UIColor colorWithRed:red/255.f green:green/255.f blue:blue/255.f alpha:1.0/255.f];
    
    return colorAsResult;
}



+ (void) extractRGBComponents:(CGFloat [3])components forColor:(UIColor *)color {
    CGColorSpaceRef rgbColorSpace = CGColorSpaceCreateDeviceRGB();
    unsigned char resultingPixel[4];
    CGContextRef context = CGBitmapContextCreate(&resultingPixel,
                                                 1,
                                                 1,
                                                 8,
                                                 4,
                                                 rgbColorSpace,
                                                 kCGImageAlphaNoneSkipLast);
    CGContextSetFillColorWithColor(context, [color CGColor]);
    CGContextFillRect(context, CGRectMake(0, 0, 1, 1));
    CGContextRelease(context);
    CGColorSpaceRelease(rgbColorSpace);
    
    for (int component = 0; component < 3; component++) {
        components[component] = resultingPixel[component] / 255.0f;
    }
}

/*
 *
 */
+ (UIColor *) colorStartColorForGradientColor:(UIColor *)color percent:(double)percentValue flavour:(BOOL)isBrighter {
    CGFloat redColor = 0.0;    
    CGFloat greenColor = 0.0;
    CGFloat blueColor = 0.0;    
    CGFloat alfaColor = 0.0;
    
    float hue = 0.0;
    float saturation = 0.0;
    float brightness = 0.0;
    float alpha = 0.0;
    
    UIColor *outColor = nil;
    
    BOOL isValid = [color getHue:&hue saturation:&saturation brightness:&brightness alpha:&alpha];
    
    if (isValid) {
        float onePercentBrightness = brightness / 100;
        float brightnessValue = onePercentBrightness * percentValue;
        if (isBrighter)
            brightnessValue = brightness + brightnessValue;
        else
            brightnessValue = brightness - brightnessValue;
        
        outColor = [UIColor colorWithHue:hue saturation:saturation brightness:brightnessValue alpha:alpha];
    }
    else {
        // UIColor to rgb
        int numComponents = CGColorGetNumberOfComponents(color.CGColor);
        if (numComponents == 4) {
            const CGFloat  *components = CGColorGetComponents(color.CGColor);
            redColor = components[0];    
            greenColor = components[1];
            blueColor = components[2];    
            alfaColor = components[3];
            
            outColor = [ColorUtils colorAdjustBrightnessColor:color percent:80.0 flavour:NO];
            
            /*
             [ColorUtils RGB2HSL:redColor colorGreen:greenColor colorBlue:blueColor outHue:&hue outSat:&saturation outBright:&brightness];
             
             float onePercentBrightness = brightness / 100;
             brightness = onePercentBrightness * 90;
             
             float outRed = 0.0;    
             float outGreen = 0.0;    
             float outBlue = 0.0;    
             [ColorUtils HSL2RGB:hue sat:saturation bright:brightness outRed:&outRed outGreen:&outGreen outBlue:&outBlue];
             
             outColor = [UIColor colorWithRed:((float) outRed / 255.0f) green:((float) outGreen / 255.0f) blue:((float) outBlue / 255.0f) alpha:alfaColor];
             */
            
        }
        else {
            outColor = [ColorUtils colorAdjustBrightnessColor:color percent:30.0 flavour:YES];
        }
    }
    return outColor;
}



@end
