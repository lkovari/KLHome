//
//  CalculatorUtils.h
//  Calc
//
//  Created by László Kővári on 2012.01.21..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CalcStack.h"

// set of operators
#define operatorsSet [NSSet setWithObjects: @"+", @"-", @"*", @"/", @"x^Y", @"n!", @"1/x", @"√", @"ln", @"lg", nil]

#define binaryOperatorsSet [NSSet setWithObjects: @"+", @"-", @"*", @"/", @"x^Y", nil]

#define unaryOperatorsSet [NSSet setWithObjects: @"n!", @"1/x", @"√", @"ln", @"lg", nil]



@interface CalculatorUtils : NSObject


+ (BOOL) boolIsDigitString:(NSString *)value;

+ (BOOL) boolIsOperandString:(NSString *)value;

//+ (BOOL) isOperator:(NSString *)value;

+ (BOOL) boolIsLeftParenthesisString:(NSString *)value;

+ (BOOL) boolIsRightParenthesisString:(NSString *)value;

+ (BOOL) boolIsNegativeString:(NSString *)value;

+ (BOOL) boolIsNumberNSObject:(NSObject *)value;

+ (BOOL) boolIsStringNSObject:(NSObject *)value;

+ (BOOL) boolIsDecimalNumber:(double)value;

+ (BOOL) boolIsStringElementOfArray:(NSString *)valueStr array:(NSSet *)valuesSet;
+ (BOOL) boolIsOperatorNSString:(NSString *)value;
+ (BOOL) boolIsBinaryOperator:(NSString *)value;
+ (BOOL) boolIsUnaryOperator:(NSString *)value;

+ (int) intGetPrecedenceWeighting:(NSString *)value;

+ (BOOL) boolCheckPrecedence:(NSString *)operator1 with:(NSString *)operator2 lessOrEquals:(BOOL)isLessOrEquals;

+ (CalcStack *) callStackConvertInfixToPostfixCallStack:(CalcStack *)stack;


+ (void) logStackElements:(CalcStack *)stack;

+ (NSString *) stringCaptureExceptionCallStack:(NSException *)exception withDetails:(BOOL)isUseDetails;

+ (NSString *) stringFormattingAsLocaleDependentDecimalNumber:(NSDecimalNumber *)value;

+ (NSString *) stringReplaceDecimalSeparatorWithDotSeparatorString:(NSString *)value;

@end


