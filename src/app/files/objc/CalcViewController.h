//
//  CalcViewController.h
//  Calc
//
//  Created by László Kővári on 2012.01.16..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <QuartzCore/CoreAnimation.h>
#import <QuartzCore/QuartzCore.h>
#import "CalculatorEngine.h"
#import "CalcStack.h"

// called restoreHistory when DIGIT_PRESSED or OPERATOR_PESSED etc...
typedef enum  {
    DIGIT_PRESSED,
    OPERATOR_PRESED,
    PARENTHESIS_PRESSED,
    PLUSMINUSSIGN_PRESSED
} ENRestoreHistorySignKind;



@interface CalcViewController : UIViewController {
    NSString *lastPressed;
    NSString *decimalSeparator;
    NSDecimalNumber *lastResult;
}

@property (weak, nonatomic) IBOutlet UILabel *display;
@property (weak, nonatomic) IBOutlet UIView *displayView;
@property (weak, nonatomic) IBOutlet UITextView *history;

@property (weak, nonatomic) IBOutlet UIButton *negativeSignature;
@property (weak, nonatomic) IBOutlet UIButton *decimalPoint;
//memory buttons
@property (weak, nonatomic) IBOutlet UIButton *memoryClear;
@property (weak, nonatomic) IBOutlet UIButton *memoryAdd;
@property (weak, nonatomic) IBOutlet UIButton *memorySub;
@property (weak, nonatomic) IBOutlet UIButton *memoryRead;
//operations
@property (weak, nonatomic) IBOutlet UIButton *clear;
@property (weak, nonatomic) IBOutlet UIButton *clearEntry;
@property (weak, nonatomic) IBOutlet UIButton *divide;
@property (weak, nonatomic) IBOutlet UIButton *multiply;
@property (weak, nonatomic) IBOutlet UIButton *substract;
@property (weak, nonatomic) IBOutlet UIButton *addition;
@property (weak, nonatomic) IBOutlet UIButton *equal;
@property (weak, nonatomic) IBOutlet UIButton *leftParenthesis;
@property (weak, nonatomic) IBOutlet UIButton *rightParenthesis;
@property (weak, nonatomic) IBOutlet UIButton *pi;
@property (weak, nonatomic) IBOutlet UIButton *reciprocal;
@property (weak, nonatomic) IBOutlet UIButton *squareRoot;
@property (weak, nonatomic) IBOutlet UIButton *root;
@property (weak, nonatomic) IBOutlet UIButton *factorial;

//Numbers
@property (weak, nonatomic) IBOutlet UIButton *numberNine;
@property (weak, nonatomic) IBOutlet UIButton *numberEight;
@property (weak, nonatomic) IBOutlet UIButton *numberSeven;
@property (weak, nonatomic) IBOutlet UIButton *numberSix;
@property (weak, nonatomic) IBOutlet UIButton *numberFive;
@property (weak, nonatomic) IBOutlet UIButton *numberFour;
@property (weak, nonatomic) IBOutlet UIButton *numberThree;
@property (weak, nonatomic) IBOutlet UIButton *numberTwo;
@property (weak, nonatomic) IBOutlet UIButton *numberZero;
@property (weak, nonatomic) IBOutlet UIButton *numberOne;
@property (weak, nonatomic) IBOutlet UIView *calcViewUIView;

@property (weak, nonatomic) IBOutlet UILabel *memoryStored;
@property (weak, nonatomic) IBOutlet UILabel *errorOccurred;
@property (weak, nonatomic) IBOutlet UILabel *errorDisplay;

@property (nonatomic) BOOL boolIsDigitAlreadyPressed;
@property (nonatomic) BOOL boolIsDecimalSeparatorAlreadyPressed;

@property (nonatomic, strong) CalculatorEngine *calculatorEngine;

@property (nonatomic) int MAX_DECIMAL_DIGITS;

@property (nonatomic, strong) CalcStack *displayStack;
@property (nonatomic, strong) CalcStack *historyStack;

// YES if the result send to display
@property BOOL boolIsResultOnDisplay;


- (CalculatorEngine *) calculatorEngine;

- (void) setupVisualLookUIView:(UIView *)view withBorderWidth:(float )brdrWidth withBorderColor:(UIColor *)brdrColor withCornerRadius:(float )cornerRadius;   

- (void) initializeDisplayAndHistory;

- (NSString *) stringDeterminateDecimalSeparator;

- (void) setupDecimalSeparatorIntoDecimalSeparatorButton;

- (void) setupButtonColors:(UIButton *)button foreground:(UIColor *)fgColor background:(UIColor *)bgColor withGradient:(BOOL)isUseGradient;

- (CalcStack *) displayStack;
- (CalcStack *) historyStack;

- (void) setupViewBackgroundColors:(UIColor *)bgColor;

- (void) setupDisplayColors:(UIColor *)fgColor background:(UIColor *)bgColor;
- (void) setupHistoryColors:(UIColor *)fgColor background:(UIColor *)bgColor;
- (void) setupMemoryButtonColors:(UIColor *)fgColor background:(UIColor *)bgColor withGradient:(BOOL)isUseGradient;
- (void) setupOperatorButtonColors:(UIColor *)fgColor background:(UIColor *)bgColor withGradient:(BOOL)isUseGradient;
- (void) setupNumberButtonColors:(UIColor *)fgColor background:(UIColor *)bgColor withGradient:(BOOL)isUseGradient;
- (void) setupParenthesisButtonColors:(UIColor *)fgColor background:(UIColor *)bgColor withGradient:(BOOL)isUseGradient;
- (void) setupClearButtonColors:(UIColor *)fgColor background:(UIColor *)bgColor withGradient:(BOOL)isUseGradient;

- (void) setupFuncButtonColors:(UIColor *)fgColor background:(UIColor *)bgColor withGradient:(BOOL)isUseGradient;

- (void) updateDisplay:(NSString *)value needappend:(BOOL)needAppend;
- (void) updateHistory:(NSString *)value withCRLF:(BOOL)needCRLF;
- (void) clearDisplay;
- (void) clearHistory;
- (void) clearAll;

- (void) showResult:(NSString *)value;

- (NSDecimalNumber *) captureValueFromDisplay;
- (void) captureValueFromDisplayAndPassAsOperand;
- (void) captureValueFromDisplayAndPassToHistory;

- (void) initializeColors:(BOOL)isUseGradient;
- (void) initializeCalc;

- (void) restoreDisplay;
- (void) restoreHistory:(ENRestoreHistorySignKind)restoreHistorySignKind;

- (BOOL) boolIsRightParenthesisAllowed;

- (NSString *) stringFormatDouble:(double)valueToFormat maxDecimals:(int)maxDec; 

- (UIButton *) buttonAddLayerForSetBGColor:(UIButton *) button bgColor: (UIColor *)bgColor;

- (UIButton *) buttonAddGradientEffect:(UIButton *) button startColor: (UIColor *)startColor endColor:(UIColor *) endColor;

@end
