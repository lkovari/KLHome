//
//  CalculatorUtils.m
//  Calc
//
//  Created by László Kővári on 2012.01.21..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import "CalculatorUtils.h"
#include <math.h>

@implementation CalculatorUtils


/*
 *  check is digit or not
 */
+ (BOOL) boolIsDigitString:(NSString *)value {
    BOOL isDigit = NO;
    /*
    NSCharacterSet *digitsSet = [NSCharacterSet decimalDigitCharacterSet];
    NSCharacterSet *inputStringSet = [NSCharacterSet characterSetWithCharactersInString:value]; 
    isDigit = [digitsSet isSupersetOfSet:inputStringSet];
    */ 
    NSScanner *scan = [NSScanner scannerWithString:value];
    [scan setCharactersToBeSkipped:[[NSCharacterSet characterSetWithCharactersInString:@"1234567890."] invertedSet]];
    float f;
    isDigit = [scan scanFloat:&f];
    return isDigit;
}

/*
 *
 */
+ (BOOL) boolIsOperandString:(NSString *)value {
    BOOL isOperand = NO;
    if (value != nil) {
        isOperand = [CalculatorUtils boolIsDigitString:value] && ![CalculatorUtils boolIsLeftParenthesisString:value] && ![CalculatorUtils boolIsRightParenthesisString:value];
    }
    return isOperand;
}

/*
 *  return YES if string is left parenthesis
 */
+ (BOOL) boolIsLeftParenthesisString:(NSString *)value {
    BOOL isLeftParenthesis = NO;
    isLeftParenthesis = [value isEqualToString:@"("];
    return isLeftParenthesis;
    
}

/*
 *  return YES if string is right parenthesis
 */
+ (BOOL) boolIsRightParenthesisString:(NSString *)value {
    BOOL isRightParenthesis = NO;
    isRightParenthesis = [value isEqualToString:@")"];
    return isRightParenthesis;
}


/*
 *  return YES if string has negative signature
 */
+ (BOOL) boolIsNegativeString:(NSString *)value {
    char c = [value characterAtIndex:0];
    int ascii = c;
    return ascii == 0x00d0;
}

/*
 *  return YES if object is NSNumber
 */
+ (BOOL) boolIsNumberNSObject:(NSObject *)value {
    BOOL isNumber = NO;
    isNumber = [value isKindOfClass:[NSNumber class]];
    return isNumber;
}

/*
 *  return YES if object is NSString
 */
+ (BOOL) boolIsStringNSObject:(NSObject *)value {
    BOOL isString = NO;
    isString = [value isKindOfClass:[NSString class]];
    return isString;
}


/*
 *  return YES if valueString exists in valueArray
 */
+ (BOOL) boolIsStringElementOfArray:(NSString *)valueStr array:(NSSet *)valuesSet {
    BOOL isStringFound = [valuesSet containsObject:valueStr];
    return isStringFound;
}


/*
 *  return YES if string is an operator
 */
+ (BOOL) boolIsOperatorNSString:(NSString *)value {
    BOOL isOperatorFound = NO;
    isOperatorFound = [CalculatorUtils boolIsStringElementOfArray:value array:operatorsSet];
    return isOperatorFound;
}

/*
 *  return the prevedence veight of operation
 */
+ (int) intGetPrecedenceWeighting:(NSString *)value {
    int weight = 0;
    if ([value isEqualToString:@"+"]) {
        weight = 10;
    }
    else if ([value isEqualToString:@"-"]) {
        weight = 10;
    }
    else if ([value isEqualToString:@"*"]) {
        weight = 12;
    }
    else if ([value isEqualToString:@"/"]) {
        weight = 12;
    }
    else if ([value isEqualToString:@"1/x"]) {
        weight = 18;
    }
    else if ([value isEqualToString:@"√"]) {
        weight = 18;
    }
    else if ([value isEqualToString:@"ln"]) {
        weight = 18;
    }
    else if ([value isEqualToString:@"lg"]) {
        weight = 18;
    }
    else if ([value isEqualToString:@"x^Y"]) {
        weight = 18;
    }
    else if ([value isEqualToString:@"n!"]) {
        weight = 18;
    }
    return weight;
}

/*
 *  return YES if has no decimal part of number
 */
+ (BOOL) boolIsDecimalNumber:(double)value {
    BOOL hasDecimal = NO;
    double whole = floor(value);
    hasDecimal = whole != value;
    return hasDecimal;
}


/*
 *  return true if precedence of operator1 <= operator2 with lessOrEquals is YES
 *  return true if precedence of operator1 > operator2 with lessOrEquals is NO
 */
+ (BOOL) boolCheckPrecedence:(NSString *)operator1 with:(NSString *)operator2 lessOrEquals:(BOOL)isLessOrEquals {
    BOOL isOperator1LessOrEquals_Greater = NO;
    // get precedence weight
    int precedence1 = [CalculatorUtils intGetPrecedenceWeighting:operator1];
    int precedence2 = [CalculatorUtils intGetPrecedenceWeighting:operator2];

    // check kind of check
    if (isLessOrEquals) {
        // is operator1 less or equals than operator2
        isOperator1LessOrEquals_Greater = (precedence1 <= precedence2);
    }
    else {
        // check is operator1 greater than operator2
        isOperator1LessOrEquals_Greater = (precedence1 > precedence2);
    }
    return isOperator1LessOrEquals_Greater;
}


/*
 * Convert infix stack to postfix stack
 * Test: 
 *  infix: 3+4*2+(3+4*2)+(3+4*2+(3+4*2))-((10/2)-3)
 *  postfix: 342*+342*++342*+342*+++102/3--
 *  result: 42
 */
+ (CalcStack *) callStackConvertInfixToPostfixCallStack:(CalcStack *)infixStack {
    CalcStack *postfixStack = [[CalcStack alloc] init];
    CalcStack *operatorStack = [[CalcStack alloc] init];
              
    NSObject *exprElement = @"";
    
    [CalculatorUtils logStackElements:infixStack];
    
    // reverse stack
    [infixStack reverse];
    
//    [CalculatorUtils logStackElements:infixStack];
    
    while ([infixStack boolHasObjects]) {
        
        // pop expression element from the stack
        exprElement = [infixStack pop];
        
        // is i number?
        if ([CalculatorUtils boolIsNumberNSObject:exprElement]) {
            NSNumber *number = (NSNumber *)exprElement;
            // push to stack
            [postfixStack push:number];
        }
        else {
            // is string?
            if ([CalculatorUtils boolIsStringNSObject:exprElement]) {
                NSString *exprString = ((NSString *)exprElement);
                // is operator?
                if ([CalculatorUtils boolIsOperatorNSString:exprString]) {
                    // put to string
                    NSString *operatorString = ((NSString *)exprElement);
                    // is NOT equals "^" POW function?
                    if (![operatorString isEqualToString:@"x^Y"]) {
                        while ([operatorStack boolHasObjects] && [CalculatorUtils boolCheckPrecedence:operatorString with:[operatorStack peek] lessOrEquals:YES]) {
                            // pop operator from the stack and push into the output
                            [postfixStack push:[operatorStack pop]];
                        }
                    }
                    else {
                        while ([operatorStack boolHasObjects] && [CalculatorUtils boolCheckPrecedence:operatorString with:[operatorStack peek] lessOrEquals:NO])  {
                            // pop operator from the stack and push into the output
                            [postfixStack push:[operatorStack pop]];
                        }
                    }
                    [operatorStack push:exprElement];
                }
                else {
                    // is left parenthesis
                    if ([exprString isEqualToString:@"("]) {
                        [operatorStack push:exprElement];
                    }
                    // is right parentesis
                    if ([exprString isEqualToString:@")"]) {
                        // while stack is not empty and not left parenthesis on top of stack
                        NSString *operatorOnTop = (NSString *)[operatorStack peek];
                        while ([operatorStack boolHasObjects] && (![operatorOnTop isEqualToString:@"("])) {
                            // pop operator from the stack and put into the output
                            [postfixStack push:[operatorStack pop]];
                            operatorOnTop = (NSString *)[operatorStack peek];
                        }
                        if ([operatorStack boolIsEmpty]) {
                            // error unbalanced parenthesis - missing left
                            [NSException raise:@"Unbalanced parenthesis!" format:@"Missing left ( parenthesis.", nil];                           
                        }
                        else {
                            // pop the left parenthesis
                            [operatorStack pop];
                        }
                    }
                }
            }
        }
        
    }
    NSString *opr = nil;
    while ([operatorStack boolHasObjects]) {
        opr = (NSString *)[operatorStack pop];
        // is left parenthesis?
        if ([opr isEqualToString:@"("]) {
            // error unbalanced parenthesis - left found missing right
            [NSException raise:@"Unbalanced parenthesis!" format:@"Missing right ) parenthesis.", nil];                           
        }
        [postfixStack push:opr];
    }
    
//    [CalculatorUtils logStackElements:postfixStack];
    
    operatorStack = nil;
    
    return postfixStack;
}

/*
 *  write to console the elements of stack
 */
+ (void) logStackElements:(CalcStack *)stack {
    NSUInteger ix;
    NSString *className = NSStringFromClass([stack class]); 
    NSLog(@"Stack elements %@", className);
    for (ix = 0; ix < [stack size]; ix++) {
        // one of all elements
        NSObject *arrayElement = [[stack arrayGetObjects] objectAtIndex:ix];
        if ([CalculatorUtils boolIsNumberNSObject:arrayElement]) {
            NSNumber *number = ((NSNumber *)arrayElement);
            NSLog(@"%@", number);
        }
        else if ([CalculatorUtils boolIsStringNSObject:arrayElement]) {
            NSString *stringElement = ((NSString *)arrayElement);
            NSLog(@"%@", stringElement);
        }
    }   
}

/*
 *  return YES if the value is an Binary operator
 */
+ (BOOL) boolIsBinaryOperator:(NSString *)value {
    BOOL isBinaryOperator = NO;
    NSSet *valuesSet = binaryOperatorsSet;
    isBinaryOperator = [CalculatorUtils boolIsStringElementOfArray:value array:valuesSet];
    return isBinaryOperator;
}

/*
 *  return YES if the value is an Unary operator
 */
+ (BOOL) boolIsUnaryOperator:(NSString *)value {
    BOOL isUnaryOperator = NO;
    isUnaryOperator = [CalculatorUtils boolIsStringElementOfArray:value array:unaryOperatorsSet];
    return isUnaryOperator;
}

/*
 *  capture cause of exception or if isUseDetails = YES then capture more informations
 */
+ (NSString *) stringCaptureExceptionCallStack:(NSException *)exception withDetails:(BOOL)isUseDetails {
    NSString *message = nil;
    NSString *reason = [exception reason];
    if (isUseDetails) {
        NSArray *backtrace = [exception callStackSymbols];
        NSString *platform = [[UIDevice currentDevice] model];
        NSString *version = [[UIDevice currentDevice] systemVersion];
        message = [NSString stringWithFormat:@"%@\nDevice: %@. OS: %@. e:\n%@", reason, platform, version, backtrace];    
    }
    else {
        message = [NSString stringWithFormat:@"%@", reason];    
    }
    return message;
}

/*
 *  change decimal separator to Locale dependent separator
 */
+ (NSString *) stringFormattingAsLocaleDependentDecimalNumber:(NSDecimalNumber *)value {
	NSDictionary *current = [NSLocale currentLocale];
	// Get the number and translate the comma separator.
	NSString *buffer = [value stringValue];
    
	NSMutableString *bufferAsMutableString = [NSMutableString stringWithCapacity:[buffer length]];
	
    [bufferAsMutableString appendString:buffer];
	
    NSString *decimalSeparator = [current objectForKey:NSLocaleDecimalSeparator];
	
    [bufferAsMutableString replaceOccurrencesOfString:@"." withString:decimalSeparator options:NSLiteralSearch range:NSMakeRange(0,[bufferAsMutableString length])];
	return [bufferAsMutableString copy];
}

/*
 *  Replace decimal separator with dot separator
 */
+ (NSString *) stringReplaceDecimalSeparatorWithDotSeparatorString:(NSString *)value {
	NSDictionary *current = [NSLocale currentLocale];
    
	NSMutableString *bufferAsMutableString = [NSMutableString stringWithCapacity:[value length]];
	
    [bufferAsMutableString appendString:value];
	
    NSString *decimalSeparator = [current objectForKey:NSLocaleDecimalSeparator];
	
    [bufferAsMutableString replaceOccurrencesOfString:decimalSeparator withString:@"." options:NSLiteralSearch range:NSMakeRange(0,[bufferAsMutableString length])];
	return [bufferAsMutableString copy];
}



@end
