//
//  CalcViewController.m
//  Calc
//
//  Created by László Kővári on 2012.01.16..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import "CalcViewController.h"
//#import <QuartzCore/QuartzCore.h> 
#import "CalculatorUtils.h"
#include <math.h>
#import "ColorUtils.h"

@implementation CalcViewController 


@synthesize numberNine = _numberNine;
@synthesize numberEight = _numberEight;
@synthesize numberSeven = _numberSeven;
@synthesize numberSix = _numberSix;
@synthesize numberFive = _numberFive;
@synthesize numberFour = _numberFour;
@synthesize numberThree = _numberThree;
@synthesize numberTwo = _numberTwo;
@synthesize numberOne = _numberOne;
@synthesize calcViewUIView = _calcViewUIView;
@synthesize memoryStored = _memoryStored;
@synthesize errorOccurred = _errorOccurred;
@synthesize errorDisplay = _errorDisplay;
@synthesize numberZero = _numberZero;

@synthesize clear = _clear;
@synthesize clearEntry = _clearEntry;
@synthesize divide = _divide;
@synthesize multiply = _multiply;
@synthesize substract = _substract;
@synthesize addition = _addition;
@synthesize equal = _equal;
@synthesize leftParenthesis = _leftParenthesis;
@synthesize rightParenthesis = _rightParenthesis;
@synthesize pi = _pi;
@synthesize reciprocal = _reciprocal;
@synthesize squareRoot = _squareRoot;
@synthesize root = _root;
@synthesize factorial = _factorial;

@synthesize display = _display;
@synthesize displayView = _displayView;
@synthesize history = _historyUITextView;
@synthesize negativeSignature = _negativeSignature;

@synthesize decimalPoint = _decimalPoint;
@synthesize memoryClear = _memoryClear;
@synthesize memoryAdd = _memoryAdd;
@synthesize memorySub = _memorySub;
@synthesize memoryRead = _memoryRead;

@synthesize boolIsDigitAlreadyPressed = _boolIsDigitAlreadyPressed;
@synthesize boolIsDecimalSeparatorAlreadyPressed = _boolIsDecimalSeparatorAlreadyPressed;

@synthesize displayStack = _displayStack;
@synthesize historyStack = _historyStack;

@synthesize calculatorEngine = _calculatorEngine;

@synthesize boolIsResultOnDisplay = _boolIsResultOnDisplay;

@synthesize MAX_DECIMAL_DIGITS = _MAX_DECIMAL_DIGITS;


/* INTERNAL OBJECT GETTERS */

/*
 *  getter if no created will create it
 */
- (CalculatorEngine *) calculatorEngine {
    if (!_calculatorEngine)
        _calculatorEngine = [[CalculatorEngine alloc] init];
    self.MAX_DECIMAL_DIGITS = 8;
    return _calculatorEngine;
}

/*
 *
 */
- (CalcStack *) displayStack {
    if (!_displayStack)
        _displayStack = [[CalcStack alloc] init];
    return _displayStack;
}

/*
 *
 */
- (CalcStack *) historyStack {
    if (!_historyStack)
        _historyStack = [[CalcStack alloc] init];
    return _historyStack;
    
}

/* SETUP UI */

/*
 *  
 */
- (void) setupVisualLookUIView:(UIView *)view withBorderWidth:(float )brdrWidth withBorderColor:(UIColor *)brdrColor withCornerRadius:(float )cornerRadius {
    view.layer.borderWidth = brdrWidth;
    view.layer.borderColor = brdrColor.CGColor;
    view.layer.cornerRadius = cornerRadius;

}

/*
 *  
 */
- (void) initializeDisplayAndHistory {
    
    // border
    UIColor *borderColor = [UIColor colorWithHue:0.611 saturation:0.327 brightness:0.394 alpha:1.000];
    
    // setup look of display
    [self setupVisualLookUIView:(_displayView) withBorderWidth:(1.5) withBorderColor:(borderColor) withCornerRadius:(8.0)];
    self.display.adjustsFontSizeToFitWidth = YES;
    
    // setup look of history
    [self setupVisualLookUIView:(_historyUITextView) withBorderWidth:(1.5) withBorderColor:(borderColor) withCornerRadius:(8.0)];
    
    
    [self.history setContentSize:CGSizeMake(self.history.frame.size.width, self.history.frame.size.height)];    
    
}



/*
 *
 */
- (UIButton *) buttonAddGradientEffect:(UIButton *) button startColor: (UIColor *)startColor endColor:(UIColor *) endColor {

    CAGradientLayer* gradientLayer = [[CAGradientLayer alloc] init];
    [gradientLayer setBounds:[button bounds]];
    [gradientLayer setPosition:
     CGPointMake([button bounds].size.width/2, [button bounds].size.height/2)];
    
    [gradientLayer setColors:[NSArray arrayWithObjects:(id)[startColor CGColor], (id)[endColor CGColor], nil]];
    [[button layer] insertSublayer:gradientLayer atIndex:0];    
    gradientLayer.cornerRadius = 8.0f;
    // border
    UIColor *borderColor = [UIColor colorWithHue:0.611 saturation:0.327 brightness:0.394 alpha:1.000];
    [gradientLayer setBorderWidth:1.5f];
    [gradientLayer setBorderColor:[borderColor CGColor]];
    gradientLayer.opaque = NO;
    gradientLayer.shadowOffset = CGSizeMake(3, 3);
    gradientLayer.shadowColor = [UIColor grayColor].CGColor;
    gradientLayer.shadowOpacity = 1.0;
    // Title shadow
//    button.titleLabel.shadowOffset = CGSizeMake(1.5f, 1.5f);
//    button.titleLabel.shadowColor = [UIColor grayColor];
    
    gradientLayer = nil;
    
    /* 
     CAGradientLayer *gradient = [CAGradientLayer layer];
     gradient.cornerRadius = 8.0f;  //Set the corner radius so the edges of the button are rounded
     gradient.frame = button.bounds; //We need to tell the gradient how much and where to fill
     // Now supply an array of colors, which will form the gradient. You can add more than two, but we're sticking with two here
     gradient.colors = [NSArray arrayWithObjects:(id)[[UIColor colorWithRed:100.0f/255.0f green:180.0f/255.0f blue:96.0f/255.0f alpha:1.0f] CGColor], (id)[[UIColor colorWithRed:6/255.0f green:105/255.0f blue:57/255.0f alpha:1.0f] CGColor], nil];
     // Insert the gradient to the top of the button's sublayer
     [button.layer insertSublayer:gradient atIndex:0];
     [self.view addSubview:button];
     */
    return button;
}

- (UIButton *) buttonAddLayerForSetBGColor:(UIButton *) button bgColor: (UIColor *)bgColor {
    
    CALayer* layer = [[CALayer alloc] init];
    [layer setBounds:[button bounds]];
    [layer setPosition:
     CGPointMake([button bounds].size.width/2, [button bounds].size.height/2)];
    
    [layer setBackgroundColor:[bgColor CGColor]];
    [[button layer] insertSublayer:layer atIndex:0];    
    layer.cornerRadius = 8.0f;
    // border
    UIColor *borderColor = [UIColor colorWithHue:0.611 saturation:0.327 brightness:0.394 alpha:1.000];
    [layer setBorderWidth:1.5f];
    [layer setBorderColor:[borderColor CGColor]];
    // Button shadow
    layer.opaque = NO;
    layer.shadowOffset = CGSizeMake(3, 3);
    layer.shadowColor = [UIColor grayColor].CGColor;
    layer.shadowOpacity = 1.0;
    // Title shadow
//    button.titleLabel.shadowOffset = CGSizeMake(1.5f, 1.5f);
//    button.titleLabel.shadowColor = [UIColor grayColor];

    layer = nil;
    return button;
}



/*
 *
 */
- (void) setupButtonColors:(UIButton *)button foreground:(UIColor *)fgColor background:(UIColor *)bgColor withGradient:(BOOL)isUseGradient {
    // foreground
    if (fgColor != nil) {
        [button setTitleColor:fgColor forState:UIControlStateNormal];
        [button setTitleColor:[UIColor blueColor] forState:UIControlStateHighlighted];
        
    }    
    // background
    if (isUseGradient) {
         UIColor *endColor = [ColorUtils colorStartColorForGradientColor:bgColor percent:75 flavour:NO];
        [self buttonAddGradientEffect:button startColor:bgColor endColor:endColor];
    }                    
    else {
        [self buttonAddLayerForSetBGColor:button bgColor:bgColor];
//        [self buttonAddGradientEffect:button startColor:bgColor endColor:bgColor];
    }    
    
    /*
    CGContextRef context = 
    CGContextSetLineWidth(context, strokeWidth);
    CGContextSetStrokeColorWithColor(context, self.strokeColor.CGColor);
    CGContextSetFillColorWithColor(context, self.rectColor.CGColor);    
    */ 
}

/*
 *
 */
- (void) setupMemoryButtonColors:(UIColor *)fgColor background:(UIColor *)bgColor withGradient:(BOOL)isUseGradient {
    [self setupButtonColors:_memoryClear foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_memoryAdd foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_memorySub foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_memoryRead foreground:fgColor background:bgColor withGradient:isUseGradient];
}    

- (void) setupClearButtonColors:(UIColor *)fgColor background:(UIColor *)bgColor withGradient:(BOOL)isUseGradient {
    [self setupButtonColors:_clear foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_clearEntry foreground:fgColor background:bgColor withGradient:isUseGradient];
}

- (void) setupOperatorButtonColors:(UIColor *)fgColor background:(UIColor *)bgColor withGradient:(BOOL)isUseGradient {
    [self setupButtonColors:_addition foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_substract foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_multiply foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_divide foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_pi foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_negativeSignature foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_equal foreground:fgColor background:bgColor withGradient:isUseGradient];
    
}

- (void) setupParenthesisButtonColors:(UIColor *)fgColor background:(UIColor *)bgColor withGradient:(BOOL)isUseGradient {
    [self setupButtonColors:_leftParenthesis foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_rightParenthesis foreground:fgColor background:bgColor withGradient:isUseGradient];
}

- (void) setupFuncButtonColors:(UIColor *)fgColor background:(UIColor *)bgColor withGradient:(BOOL)isUseGradient {
    [self setupButtonColors:_reciprocal foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_squareRoot foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_root foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_factorial foreground:fgColor background:bgColor withGradient:isUseGradient];
}

- (void) setupNumberButtonColors:(UIColor *)fgColor background:(UIColor *)bgColor withGradient:(BOOL)isUseGradient {
    [self setupButtonColors:_numberZero foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_numberOne foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_numberTwo foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_numberThree foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_numberFour foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_numberFive foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_numberSix foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_numberSeven foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_numberEight foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_numberNine foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_decimalPoint foreground:fgColor background:bgColor withGradient:isUseGradient];
    [self setupButtonColors:_pi foreground:fgColor background:bgColor withGradient:isUseGradient];
    
}

- (void) setupViewBackgroundColors:(UIColor *)bgColor {
    self.calcViewUIView.backgroundColor = bgColor;
}

- (void) setupDisplayColors:(UIColor *)fgColor background:(UIColor *)bgColor {
    self.display.backgroundColor = bgColor;
    self.display.textColor = fgColor;
    self.displayView.backgroundColor = bgColor;
}

- (void) setupHistoryColors:(UIColor *)fgColor background:(UIColor *)bgColor {
    self.history.backgroundColor = bgColor;
    self.history.textColor = fgColor;
}

/* DECIMAL POINT IDENTIFICATION AND SET */

/*
 *  determinate decimal point
 */
- (NSString *) stringDeterminateDecimalSeparator {
    NSNumberFormatter *numberFormatter = [[NSNumberFormatter alloc] init];
    numberFormatter.numberStyle = NSNumberFormatterCurrencyStyle;
    NSString *decSeparator = [numberFormatter decimalSeparator];
    numberFormatter = nil;
    return decSeparator;
}

/*
 *  setup decimal point
 */
- (void) setupDecimalSeparatorIntoDecimalSeparatorButton {
    decimalSeparator = [self stringDeterminateDecimalSeparator];
    NSString *mess = @"Decimal separator of current regional settings is ";
    mess = [mess stringByAppendingString:decimalSeparator];
    NSLog(@"%@", [NSString stringWithFormat:@"%@", mess]);
    // set it up
    [self.decimalPoint setTitle:decimalSeparator forState:UIControlEventAllEvents];
    [self.decimalPoint setTitle:decimalSeparator forState:UIControlStateNormal];
}



/*
 *
 */
- (NSDecimalNumber *) captureValueFromDisplay {
    NSDecimalNumber *currentNumber = nil;
    NSString *display = self.display.text;
//TODO !!!!!!! if not digit string need to sign it !!!!!!!    
    if ([CalculatorUtils boolIsDigitString:display]) {
        if ([display length] > 0) {
            currentNumber = [NSDecimalNumber decimalNumberWithString:display];
        }     
    }
    return currentNumber;
}

- (IBAction)memButtonPressed:(UIButton *)sender {
    NSLog(@"Button pressed: %@", [sender currentTitle]);
    
    NSString *memButton = [sender currentTitle];
    NSDecimalNumber *value = nil;
//TODO !!!!!!! if need push to display and history stack    
    if ([memButton isEqualToString:@"M+"]) {
        value = [self captureValueFromDisplay];

        // store to lastPressed
        lastPressed = [sender currentTitle];
        
        if (value == nil) {
            [self.errorOccurred setHidden:NO];
             return;
        }
        
        [self.calculatorEngine memoryAdd:value];
        [self.memoryStored setHidden:NO];
    }
    else if ([memButton isEqualToString:@"M-"]) {
        value = [self captureValueFromDisplay];

        // store to lastPressed
        lastPressed = [sender currentTitle];
        
        if (value == nil) {
            [self.errorOccurred setHidden:NO];
            return;
        }
        
        [self.calculatorEngine memorySub:value];
        [self.memoryStored setHidden:NO];
    }
    else if ([memButton isEqualToString:@"MC"]) {
        [self.calculatorEngine memoryClear];
        [self.memoryStored setHidden:YES];
        // store to lastPressed
        lastPressed = [sender currentTitle];
    }
    else if ([memButton isEqualToString:@"MR"]) {
        value = [self.calculatorEngine memoryRead];
        // is contain value?
        if (value != nil) {
            // get digits
            self.boolIsDigitAlreadyPressed = YES;
            
            NSString *resultAsText = [value stringValue];
            
            self.display.text = resultAsText;
            
            // is operator was the last pressed?
            if ([CalculatorUtils boolIsOperatorNSString:lastPressed]) {
                [self captureValueFromDisplayAndPassToHistory];
                // push if call CE
                [self.displayStack push:resultAsText];    
            }
            // store to lastPressed
            lastPressed = [sender currentTitle];
        }
        else {
            [self.errorOccurred setHidden:NO];
        }
    }
}

- (void) clearAll {
    [self clearDisplay];
    [self clearHistory];
//    [self.calculatorEngine memoryClear];
    [self.calculatorEngine clearValues];
    [self.displayStack clear];
    self.displayStack = nil;
    [self.historyStack clear];
    self.historyStack = nil;
    self.boolIsDigitAlreadyPressed = NO;
    [self.errorOccurred setHidden:YES];
    [self.errorDisplay setText:@""];

}

- (IBAction)clearPressed:(UIButton *)sender {
    NSLog(@"Button pressed: %@", [sender currentTitle]);

    // prevent double press 
//    if ([lastPressed isEqualToString:[sender currentTitle]])
//        return;
    
    // clear all
    [self clearAll];
    // store to lastPressed
    lastPressed = [sender currentTitle];
}

- (void) restoreDisplay {
    // restore display to last
    NSObject *lastDisplay = [_displayStack peek];
    if (lastDisplay != nil) {
        NSString *lastDisp = (NSString *)lastDisplay;
        self.display.text = lastDisp;    
    }    
}

/*
 *  isNumberPressed = YES if called when number is pressed
 */
- (void) restoreHistory:(ENRestoreHistorySignKind)restoreHistorySignKind {
    NSObject *lastHistory = nil;
    NSString *lastHist = nil;

//!!!!!!!    
    // if history stack is empty then return
//    if ([self.historyStack boolIsEmpty])
//        return;
    
    switch (restoreHistorySignKind) {
        case DIGIT_PRESSED:
            lastHistory = [self.historyStack peek];
            if (lastHistory != nil) {
                lastHist = (NSString *)lastHistory;
                self.history.text = lastHist;    
            }    
            break;
        case OPERATOR_PRESED :
            lastHistory = [self.historyStack pop];
            lastHistory = nil;
            lastHistory = [self.historyStack peek];
            if (lastHistory != nil) {
                lastHist = (NSString *)lastHistory;
                self.history.text = lastHist;    
            }    
            break;
        case PARENTHESIS_PRESSED :
            lastHistory = [self.historyStack peek];
            if (lastHistory != nil) {
                lastHist = (NSString *)lastHistory;
                self.history.text = lastHist;    
            }    
            break;
        case PLUSMINUSSIGN_PRESSED :
            lastHistory = [self.historyStack peek];
            if (lastHistory != nil) {
                lastHist = (NSString *)lastHistory;
                self.history.text = lastHist;    
            }    
            break;
        default:
            break;
    }
}

- (IBAction)clearEntryPressed:(id)sender {
    NSLog(@"Button pressed: %@", [sender currentTitle]);
    // prevent double press 
    if ([lastPressed isEqualToString:[sender currentTitle]])
        return;
    
    // if equals pressed nothing to do
    if (self.boolIsResultOnDisplay)
        return;
    // only once press the CE    
    if ([lastPressed isEqualToString:[sender currentTitle]])
        return;
    
    // clear last entry from infix stack
    CalcStack *infixStack = self.calculatorEngine.infixCalcStack;

    // is infix stack is empty simple call the clearAll
    if ([infixStack boolIsEmpty]) {
        [self clearAll];
        return;
    }
    
    
    // is digit or PI pressed? Π π
    if ([CalculatorUtils boolIsDigitString:lastPressed] || ([lastPressed isEqualToString:@"π"])) {
        // clear display
        [self clearDisplay];
        
        // restore history to last
        [self restoreHistory: DIGIT_PRESSED];
    }
    else if ([CalculatorUtils boolIsOperatorNSString:lastPressed]) {
        // remove operator
        NSObject *lastObject = [infixStack pop];
        lastObject = nil;
        //02/26/2012-23:55
//        lastObject = [infixStack pop];
//        lastObject = nil;
        
        // restore display to last
        [self restoreDisplay];
        
        // restore history to last
        [self restoreHistory: OPERATOR_PRESED];
    }
    else if ([CalculatorUtils boolIsLeftParenthesisString:lastPressed] || [CalculatorUtils boolIsRightParenthesisString:lastPressed]) {
        NSObject *lastObject = [infixStack pop];
        lastObject = nil;
        
        // clear display
        [self clearDisplay];
        
        // restore history to last
        [self restoreHistory: PARENTHESIS_PRESSED];
    }
    // store to lastPressed
    lastPressed = [sender currentTitle];
}

/*
 *  pass operators usually called when the operator type is unary
 */
- (void) passOperators:(NSString *)operator {
    if ([lastPressed isEqualToString:operator])
        return;
    
    // push operand to historystack
    [self.historyStack push:self.history.text];
    
    if (self.boolIsResultOnDisplay) {
        [self captureValueFromDisplayAndPassToHistory];
        // push last result /currently as first operand to historystack
        [self.historyStack push:self.history.text];
    }
    lastPressed = operator;
    
    // capture possible operand and pass to calculator engine
    [self captureValueFromDisplayAndPassAsOperand];
    
    // push current value
    if ([operator isEqualToString:@"x^Y"]) {
        [self clearDisplay]; 
        [self updateHistory:@"^" withCRLF:NO];   
        // push operator to historystack
        [self.historyStack push:self.history.text];
    }
    else {
        [self clearDisplay];
        [self updateHistory:operator withCRLF:NO];   
        // push operator to historystack
        [self.historyStack push:self.history.text];
    }
    
    // push operator to historystack
//    [self.historyStack push:self.history.text];
    
    [self.calculatorEngine enterOperator:operator];
    // operator is pressed
    self.boolIsResultOnDisplay = NO;    
}

- (IBAction)reciprocalPressed:(id)sender {
    [self passOperators:[sender currentTitle]];
}

- (IBAction)sqrtPressed:(id)sender {
    [self passOperators:[sender currentTitle]];
}

- (IBAction)factorialPressed:(id)sender {
    [self passOperators:[sender currentTitle]];
}

- (IBAction)rootPressed:(id)sender {
    [self passOperators:[sender currentTitle]];
}

/*
 *
 */
- (void) updateDisplay:(NSString *)value needappend:(BOOL)needAppend {

    if (value == nil)
        return;
    
    if (needAppend) {
        self.display.text = [self.display.text stringByAppendingString:value];
    }
    else {
        self.display.text = value;
        self.boolIsDigitAlreadyPressed = YES;
    }
    
}

/*
 *
 */
- (void) showResult:(NSString *)value {
    [self updateDisplay:value needappend:_boolIsDigitAlreadyPressed];
    [self updateHistory:value withCRLF:YES];
}

/*
 *
 */
- (void) updateHistory:(NSString *)value withCRLF:(BOOL)needCRLF {
    NSString *valueToShow = value;
    
    if (needCRLF) {
        valueToShow = [valueToShow stringByAppendingString:@"\n"];
    }
    
    self.history.text = [self.history.text stringByAppendingString:valueToShow];

    if (needCRLF) {
        NSRange selectedRange = self.history.selectedRange;
        [self.history scrollRangeToVisible:selectedRange];
        /*
        if (YES) {
            CGFloat lineHeight = self.history.font.lineHeight;
            CGSize contentSize = self.history.contentSize;
            if (contentSize.height > 88) {
                CGPoint scrollPoint = self.history.contentOffset;
                scrollPoint.y = scrollPoint.y + lineHeight;
                [self.history setContentOffset:scrollPoint animated:YES];    
                
            }
        }
        */
    }
}

/*
 *
 */
- (void) clearDisplay {
    self.display.text = @"";
}

/*
 *
 */
- (void) clearHistory {
    self.history.text = @"";
}


- (IBAction)digitPressed:(UIButton *)sender {
    NSLog(@"Button pressed: %@", [sender currentTitle]);
    // is result on display?
    if (self.boolIsResultOnDisplay) {
        //clear the display
        [self clearDisplay];
    }
    
    [self updateDisplay:[sender currentTitle] needappend:_boolIsDigitAlreadyPressed];    
    [self updateHistory:[sender currentTitle] withCRLF:NO];   
    self.boolIsResultOnDisplay = NO;
    // store to lastPressed
    lastPressed = [sender currentTitle];
}

- (void) showMessage:(NSString *)message {
    UIAlertView *alertMessage = [[UIAlertView alloc] initWithTitle:@"Calculator" message:message delegate:nil cancelButtonTitle:@"OK" otherButtonTitles:nil];
    [alertMessage show];
}

/*
 *  pressed the +/- sign
 */
- (IBAction)signPressed:(UIButton *)sender {
    NSLog(@"Button pressed: %@", [sender currentTitle]);
    
    
    /*
    if ((self.display.text == nil) || (![CalculatorUtils boolIsNumberNSObject:self.display.text])) {
        [self showMessage:@"Use to digits only!"];
        return;
    }
    */
    
    NSString *currentContent = _display.text;
    
    if (([currentContent length] > 0) && (currentContent != @"0")) {
        // is start with -
        if ([currentContent hasPrefix:@"-"]) {
            NSString *tempContent = [currentContent substringWithRange:NSMakeRange(1, [currentContent length] - 1)];
            currentContent = tempContent;    
        }
        else {
            NSString *tempContent = @"-";
            tempContent = [tempContent stringByAppendingString:currentContent];
            currentContent = tempContent;
        }
            
    }
    [self updateDisplay:currentContent needappend:NO];    
    // restore history 
    if ([self.historyStack boolIsEmpty]) {
        self.history.text = currentContent;    
    }
    else {
        [self restoreHistory:PLUSMINUSSIGN_PRESSED];
        // update it
        [self updateHistory:currentContent withCRLF:NO];   
    }
    //store to lastPressed        
    lastPressed = [sender currentTitle];
}

/*
 *  pressed decimal separator
 */
- (IBAction)decimalPointPressed:(id)sender {
    NSLog(@"Button pressed: %@", [sender currentTitle]);
    if ([lastPressed isEqualToString:[sender currentTitle]])
        return;
    
    if (self.boolIsDecimalSeparatorAlreadyPressed)
        return;
    
    [self updateDisplay:[sender currentTitle]needappend:_boolIsDigitAlreadyPressed];    
    [self updateHistory:[sender currentTitle] withCRLF:NO];   
    // store the last pressed    
    lastPressed = [sender currentTitle];
    self.boolIsDecimalSeparatorAlreadyPressed = YES;

}

/*
 *  Capture value from display and pass iit as operand to calculator engine
 */
- (void) captureValueFromDisplayAndPassAsOperand {
    NSDecimalNumber *currentNumber = nil;
    NSString *display = _display.text;
    if ([display length] > 0) {
        // is decimal separator not a dot?
        NSString *displayWithDotDecimalSeparator = nil;
        if (![decimalSeparator isEqualToString:@"."]) {
            displayWithDotDecimalSeparator = [CalculatorUtils stringReplaceDecimalSeparatorWithDotSeparatorString:display];
        }
        else {
            displayWithDotDecimalSeparator = display;
        }
        currentNumber = [NSDecimalNumber decimalNumberWithString:displayWithDotDecimalSeparator];
        [self.calculatorEngine enterOperand:currentNumber];
    }     
    
}

/*
 *  capture value from display and pass to history
 */
- (void) captureValueFromDisplayAndPassToHistory {
    NSString *display = self.display.text;
    [self updateHistory:display withCRLF:NO];   
}

/*
 *  pressed an operator
 */
- (IBAction)operatorPressed:(UIButton *)sender {
    NSLog(@"Button pressed: %@", [sender currentTitle]);
    
    // prevent double press 
    if ([lastPressed isEqualToString:[sender currentTitle]])
        return;
    
    // prohibit to start with operator
    if (!self.boolIsDigitAlreadyPressed)
        return;

    // push operand to historystack
    [self.historyStack push:self.history.text];
    
    // is result on display or MR was pressed?
    if (self.boolIsResultOnDisplay || [lastPressed isEqualToString:@"MR"]) {
        [self captureValueFromDisplayAndPassToHistory];
        // push last result /currently as first operand to historystack
        [self.historyStack push:self.history.text];
    }
    lastPressed = [sender currentTitle];
    
    // capture possible operand and pass to calculator engine
    [self captureValueFromDisplayAndPassAsOperand];
    
    NSString *operator = [sender currentTitle]; 
    // push current value
    [self.displayStack push:self.display.text];
    [self clearDisplay];
    [self updateHistory:operator withCRLF:NO];   
   
    // push operator to historystack
    [self.historyStack push:self.history.text];

    [self.calculatorEngine enterOperator:operator];
    // operator is pressed
    self.boolIsResultOnDisplay = NO;    
    // decimal separator is pressed set to NO
    self.boolIsDecimalSeparatorAlreadyPressed = NO;

}


/*
 *  return YES if right parenthesis allowed
 */
- (BOOL) boolIsRightParenthesisAllowed {
    BOOL isRightAllowed = NO;
    // is left parenthesis
    if (self.calculatorEngine.numberOfLeftParenthesises > self.calculatorEngine.numberOfRightParenthesises) {
        isRightAllowed = YES;
    }    
    
    return isRightAllowed;
}


- (IBAction)parenthesisPressed:(UIButton *)sender {
    NSLog(@"Button pressed: %@", [sender currentTitle]);
    NSString *parenthesisCharacter = [sender currentTitle];

    /*
    if (![self boolIsLeftParenthesisAllowed]) {
        [self showMessage:@"Parenthesis follows operator or first sign of expression!"];
        [self showMessage:@"Right parenthesis does not allowed!"];
        return;
    }
    */
    
    if ([parenthesisCharacter isEqualToString:@"("]) {
        [self clearDisplay];
        [self updateHistory:[sender currentTitle] withCRLF:NO];   
        
        [self.calculatorEngine enterLeftParenthesis:parenthesisCharacter];
    }
    else if ([parenthesisCharacter isEqualToString:@")"]) {
        if (![self boolIsRightParenthesisAllowed]) {
            [self showMessage:@"Left parenthesis needed before Right!"];
            return;
        }

        // capture possible operand and pass to calculator engine
        [self captureValueFromDisplayAndPassAsOperand];

        [self clearDisplay];
        [self updateHistory:[sender currentTitle] withCRLF:NO];   
        
        [self.calculatorEngine enterRightParenthesis:parenthesisCharacter];
    }
    self.boolIsResultOnDisplay = NO;
    lastPressed = [sender currentTitle];
}

/*
 *  pressed PI button Π
 */
- (IBAction)piPressed:(UIButton *)sender {
    NSLog(@"Button pressed: %@", [sender currentTitle]);
    // prevent double press 
    if ([lastPressed isEqualToString:[sender currentTitle]])
        return;
    
    // is result on display?
    if (self.boolIsResultOnDisplay) {
        [self clearDisplay];
    }
    
    // push operand to historystack
    [self.historyStack push:self.history.text];

    double pi = M_PI;
    NSString *piInString = [NSString stringWithFormat:@"%f",pi];
    [self updateDisplay:piInString needappend:_boolIsDigitAlreadyPressed];    
    
    [self updateHistory:[sender currentTitle] withCRLF:NO];   
    self.boolIsResultOnDisplay = NO;
    // store the last pressed    
    lastPressed = [sender currentTitle];
}

/*
 *  return a well formated double value
 */
- (NSString *) stringFormatDouble:(double)valueToFormat maxDecimals:(int)maxDec {
    NSString *resultAsText = nil;
    if ([CalculatorUtils boolIsDecimalNumber:valueToFormat]) {
        NSString* formatText = @"%.";
        NSString *digitLength = [NSString stringWithFormat:@"%d", (int)maxDec];
        formatText = [formatText stringByAppendingString:digitLength];
        formatText = [formatText stringByAppendingString:@"f"];
        
        resultAsText = [NSString stringWithFormat:formatText, valueToFormat];
        unichar c = [resultAsText characterAtIndex:[resultAsText length] - 1];
        // 0 or .
        while (c == 48 || c == 46) { 
            resultAsText = [resultAsText substringToIndex:[resultAsText length] - 1];
            c = [resultAsText characterAtIndex:[resultAsText length] - 1];
        }
    }
    else {
        resultAsText = [NSString stringWithFormat:@"%d", (int)valueToFormat];
    }
    return resultAsText;
}


/*
 *  pressed = button
 */
- (IBAction)equalPressed:(UIButton *)sender {
    NSLog(@"Button pressed: %@", [sender currentTitle]);
    // prevent double press 
    if ([lastPressed isEqualToString:[sender currentTitle]])
        return;
    
    // capture possible operand and pass to calculator engine
    [self captureValueFromDisplayAndPassAsOperand];
    
    [self updateHistory:[sender currentTitle] withCRLF:NO];   
    
    [self clearDisplay];
    @try {
        lastResult = [self.calculatorEngine enterEqual:[sender currentTitle]];    

        // has decimal part
//        NSString *resultAsText = [self stringFormatDouble: result maxDecimals:self.MAX_DECIMAL_DIGITS];
        
        // convert to locale dependent format
        NSString *resultAsText = [CalculatorUtils stringFormattingAsLocaleDependentDecimalNumber:lastResult];
        
        // show result
        [self updateDisplay:resultAsText needappend:NO];
        [self updateHistory:resultAsText withCRLF:YES];   
        
        self.boolIsResultOnDisplay = YES;
        
    }
    @catch (NSException *exception) {
        [self.errorOccurred setHidden:NO];
        
        [self.errorDisplay setText:exception.reason];
        
//        NSString *mess = [CalculatorUtils stringCaptureExceptionCallStack:exception withDetails:NO];
        
//        [self showMessage:mess];
        
//        [self clearAll];
    }
    @finally {
        
    }
}




- (void) initializeColors:(BOOL)isUseGradient {
    // background of view
    UIColor *viewBg = [UIColor colorWithHue:0.621 saturation:0.154 brightness:1.000 alpha:1.000];    
    [self setupViewBackgroundColors:viewBg];

    float brightnessValue = 0.900f;
    float saturationValue = 0.500f;

    
    UIColor *foregroundColor = [UIColor colorWithHue:0.273 saturation:0.001 brightness:1.000 alpha:1.000];

    // clear buttons
    UIColor *clearButtonsBg = [UIColor colorWithHue:0.003 saturation:saturationValue brightness:brightnessValue alpha:1.000]; 
    [self setupClearButtonColors:foregroundColor background:clearButtonsBg withGradient:isUseGradient];
    
    // memory buttons
    UIColor *memButtonsBg = [UIColor colorWithHue:0.447 saturation:saturationValue brightness:brightnessValue alpha:1.000];
    [self setupMemoryButtonColors:foregroundColor background:memButtonsBg withGradient:isUseGradient];

    // numeric buttons
//    UIColor *numButtonsBg = [UIColor colorWithHue:0.591 saturation:saturationValue brightness:brightnessValue alpha:1.000];
    
    UIColor *numButtonsBg = [UIColor colorWithHue:0.003 saturation:0.010 brightness:0.318 alpha:1.000];    
    
    [self setupNumberButtonColors:foregroundColor background:numButtonsBg withGradient:isUseGradient];
    
    // operation buttons
    UIColor *oprButtonsBg =  [UIColor colorWithHue:0.273 saturation:0.001 brightness:brightnessValue alpha:1.000];
    [self setupOperatorButtonColors:foregroundColor background:oprButtonsBg withGradient:isUseGradient];
    
    // function buttons
    UIColor *fnButtonsBg =  [UIColor colorWithHue:0.447 saturation:saturationValue brightness:brightnessValue alpha:1.000];
    [self setupFuncButtonColors:foregroundColor background:fnButtonsBg withGradient:isUseGradient];
    
    // parenthesis buttons
    UIColor *parButtonsBg =  [UIColor colorWithHue:0.447 saturation:saturationValue brightness:brightnessValue alpha:1.000];
    [self setupParenthesisButtonColors:foregroundColor background:parButtonsBg withGradient:isUseGradient];
    
    UIColor *historyBg = [UIColor colorWithHue:0.301 saturation:0.144 brightness:1.000 alpha:1.000];    
    UIColor *displayBg = [UIColor colorWithHue:0.594 saturation:0.122 brightness:1.000 alpha:1.000];
    UIColor *historyFg = [UIColor colorWithHue:0.301 saturation:0.344 brightness:0.500 alpha:1.000];    
    UIColor *displayFg = [UIColor colorWithHue:0.594 saturation:0.222 brightness:0.500 alpha:1.000];
    
    [self setupHistoryColors:historyFg background:historyBg];
    [self setupDisplayColors:displayFg background:displayBg];
     
    self.memoryStored.textColor = [UIColor blueColor];

    self.errorOccurred.textColor = [UIColor redColor];

}

- (void) initializeCalc {
    // initialize colors without gradient effect
    [self initializeColors:YES];
    // initialize display and history
    [self initializeDisplayAndHistory];
    // setup decimal separator
    [ self setupDecimalSeparatorIntoDecimalSeparatorButton];    
    // clear history
    self.history.text = @"";
    self.history.scrollEnabled = YES;
    // digit not pressed
    self.boolIsDigitAlreadyPressed = NO;
    self.boolIsResultOnDisplay = NO;
    self.boolIsDecimalSeparatorAlreadyPressed = NO;
    lastPressed = nil;
    [self.errorDisplay setText:@""];

}

/**********/

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Release any cached data, images, etc that aren't in use.
}

#pragma mark - View lifecycle

- (void)viewDidLoad
{
    [super viewDidLoad];
    // initialize    
    [self initializeCalc];
    
}

- (void)willRotateToInterfaceOrientation:(UIInterfaceOrientation)toInterfaceOrientation duration:(NSTimeInterval)duration{
    [super willRotateToInterfaceOrientation:toInterfaceOrientation duration:duration];
    if(toInterfaceOrientation == UIInterfaceOrientationPortrait || toInterfaceOrientation == UIInterfaceOrientationPortraitUpsideDown){
        // 24 20 273 50
        CGRect rect = [self.displayView bounds];
        rect.origin.x = 24;
        rect.origin.y = 20;
        rect.size.width = 273;
        rect.size.height = 50;
        self.displayView.frame = rect;
        
        // 0 0 267 50
        rect = [self.display bounds];
        rect.origin.x = 0;
        rect.origin.y = 0;
        rect.size.width = 267;
        rect.size.height = 50;
        self.display.frame = rect;
        
    }
    else if(toInterfaceOrientation == UIInterfaceOrientationLandscapeRight || toInterfaceOrientation == UIInterfaceOrientationLandscapeLeft){
        // 24 20 273 50
        CGRect rect = [self.displayView bounds];
        rect.origin.x = 24;
        rect.origin.y = 20;
        rect.size.width = 450;
        rect.size.height = 50;
        self.displayView.frame = rect;
        
        // 0 0 267 50
        rect = [self.display bounds];
        rect.origin.x = 0;
        rect.origin.y = 0;
        rect.size.width = 445;
        rect.size.height = 50;
        self.display.frame = rect;
    }
}

- (void)viewDidUnload {
    [self.calculatorEngine releaseMemoryNumber];
    self.calculatorEngine = nil;

    
    self.display = nil;
    [self setHistory:nil];
    [self setHistory:nil];
    [self setDecimalPoint:nil];
    [self setMemoryClear:nil];
    [self setMemoryAdd:nil];
    [self setMemorySub:nil];
    [self setMemoryRead:nil];
    [self setClear:nil];
    [self setDivide:nil];
    [self setMultiply:nil];
    [self setSubstract:nil];
    [self setAddition:nil];
    [self setNegativeSignature:nil];
    [self setEqual:nil];
    [self setLeftParenthesis:nil];
    [self setRightParenthesis:nil];
    [self setNumberNine:nil];
    [self setNumberEight:nil];
    [self setNumberSeven:nil];
    [self setNumberSix:nil];
    [self setNumberFive:nil];
    [self setNumberFour:nil];
    [self setNumberThree:nil];
    [self setNumberTwo:nil];
    [self setNumberOne:nil];
    [self setNumberZero:nil];
    [self setPi:nil];
    [self setNumberOne:nil];
    [self setClearEntry:nil];
    [self setReciprocal:nil];
    [self setSquareRoot:nil];
    [self setRoot:nil];
    [self setFactorial:nil];
    [self setCalcViewUIView:nil];
    [self setMemoryStored:nil];
    [self setErrorOccurred:nil];
    [self setReciprocal:nil];
    [self setSquareRoot:nil];
    [self setRoot:nil];
    [self setFactorial:nil];
    [self setNegativeSignature:nil];
    [self setNegativeSignature:nil];
    [self setDisplay:nil];
    [self setDisplayView:nil];
    [self setDisplay:nil];
    [self setDisplay:nil];
    [self setErrorOccurred:nil];
    [self setErrorDisplay:nil];
    [super viewDidUnload];
}

- (void)viewWillAppear:(BOOL)animated
{
    [super viewWillAppear:animated];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
}

- (void)viewWillDisappear:(BOOL)animated
{
	[super viewWillDisappear:animated];
}

- (void)viewDidDisappear:(BOOL)animated
{
	[super viewDidDisappear:animated];
}

- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    // Return YES for supported orientations
//    return (interfaceOrientation != UIInterfaceOrientationPortraitUpsideDown);
    return (interfaceOrientation == UIInterfaceOrientationPortrait || interfaceOrientation == UIInterfaceOrientationPortraitUpsideDown || interfaceOrientation == UIInterfaceOrientationLandscapeRight || interfaceOrientation == UIInterfaceOrientationLandscapeLeft);
}

@end
