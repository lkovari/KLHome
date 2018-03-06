//
//  OperationsEvaluator.m
//  Calc
//
//  Created by László Kővári on 2012.02.11..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import "OperationsEvaluator.h"
#include <math.h>

@implementation OperationsEvaluator



float logx(float value, float base) {
    return log10f(value) / log10f(base);
}

/*
 *  Pow
 */
+ (NSDecimalNumber *) decimalNumberPow:(NSDecimalNumber *)baseValue exponent:(NSDecimalNumber *)exponent {
    NSDecimalNumber *result = [NSDecimalNumber zero];
    // is exponent negative?
    int ix = 1;
    result = [NSDecimalNumber decimalNumberWithString:[baseValue stringValue]]; 
    do {
        result = [result decimalNumberByMultiplyingBy:baseValue];
        ix++;
    } while (ix < [exponent intValue]);
    return result;
}

/*
 * SQRT http://cocoawithlove.com/2008/05/square-root-numerical-fun-with.html
 */
+ (NSDecimalNumber *)decimalNumberSqrtDecimalNumber:(NSDecimalNumber *)value {
    if ([value compare:[NSDecimalNumber zero]] == NSOrderedAscending) {
        return [NSDecimalNumber notANumber];
    }
    
    NSDecimalNumber *half = [NSDecimalNumber decimalNumberWithMantissa:5 exponent:-1 isNegative:NO];
    NSDecimalNumber *guess = [[value decimalNumberByAdding:[NSDecimalNumber one]] decimalNumberByMultiplyingBy:half];
    
    @try {
        const int NUM_ITERATIONS_TO_CONVERGENCE = 6;
        for (int i = 0; i < NUM_ITERATIONS_TO_CONVERGENCE; i++) {
            guess = [[[value decimalNumberByDividingBy:guess] decimalNumberByAdding:guess] decimalNumberByMultiplyingBy:half];
        }
    }
    @catch (NSException *exception) {
        // deliberately ignore exception and assume the last guess is good enough
    }
    
    return guess;
}

/*
 *  Factorial
 */
+(unsigned long long) factorial:(unsigned long long)n {
	if (n == 0) 
		return 1;
	else 
		return n * [OperationsEvaluator factorial:(n - 1)];
}


/*
 *  evaluate value of binary operations
 */
+(NSDecimalNumber *) evaluateBinaryOperation:(NSString *)operation operand1:(NSDecimalNumber *)value1 operand2:(NSDecimalNumber *)value2 {
    NSString *argument1 = @"1st. ";
    NSString *argument2 = @"2nd. ";

    
    NSDecimalNumber *result = [NSDecimalNumber zero];
    
    NSString * possibleErrorMess = @"Argument Invalid '%@' to operation '";
    possibleErrorMess = [possibleErrorMess stringByAppendingString:operation];
    possibleErrorMess = [possibleErrorMess stringByAppendingString:@"'"];
    
    if (value1 == nil) {
        possibleErrorMess = [argument2 stringByAppendingString:possibleErrorMess];
        
        [NSException raise:NSInvalidArgumentException format:possibleErrorMess, value1];            
    }
    if (value2 == nil) {
        possibleErrorMess = [argument1 stringByAppendingString:possibleErrorMess];
        [NSException raise:NSInvalidArgumentException format:possibleErrorMess, value2];            
    }
    
    
    if ([operation isEqualToString:@"+"]) {
        result = [value1 decimalNumberByAdding:value2];
    } 
    else if ([operation isEqualToString:@"-"]) {
        result = [value1 decimalNumberBySubtracting:value2];
    }
    else if ([operation isEqualToString:@"*"]) {
        result = [value1 decimalNumberByMultiplyingBy:value2];
    }
    else if ([operation isEqualToString:@"/"]) {
        result = [value1 decimalNumberByDividingBy:value2];
    }
    else if ([operation isEqualToString:@"x^Y"]) {
        result = [OperationsEvaluator decimalNumberPow:value1 exponent:value2];
    }
    return result;
}


/*
 *  evaluate value of unary operations
 */
+(NSDecimalNumber *) evaluateUnaryOperation:(NSString *)operation operand:(NSDecimalNumber *)value {
    NSDecimalNumber *result = [NSDecimalNumber zero];
    if ([operation isEqualToString:@"1/x"]) {
        NSDecimalNumber *value1 = [NSDecimalNumber one];
        if (value == nil) {
            [NSException raise:NSInvalidArgumentException format:@"Invalid argument '%@' to operation '1/x'", value];            
        }
        result = [value1 decimalNumberByDividingBy:value];
    } 
    else if ([operation isEqualToString:@"n!"]) {
        if (value == nil) {
            [NSException raise:NSInvalidArgumentException format:@"Invalid argument '%@' to operation 'n!'", value];            
        }
        // NSDecimalNumber to long long
        long long val = [value longLongValue];
        // factorial
        long long res = [OperationsEvaluator factorial:val];
        // long long to NSDecimalNumber
        result = [NSDecimalNumber decimalNumberWithMantissa:res exponent:1 isNegative:NO];
    }
    else if ([operation isEqualToString:@"√"]) {
        if (value == nil) {
            [NSException raise:NSInvalidArgumentException format:@"Invalid argument '%@' to operation '√'", value];            
        }
        // Root
        result = [OperationsEvaluator decimalNumberSqrtDecimalNumber:value];
    }
    else if ([operation isEqualToString:@"ln"]) {
        if (value == nil) {
            [NSException raise:NSInvalidArgumentException format:@"Invalid argument '%@' to operation 'ln'", value];            
        }
        double res = log([value doubleValue]);
        result = (NSDecimalNumber *)[NSDecimalNumber numberWithDouble:res];
    }
    else if ([operation isEqualToString:@"lg"]) {
        if (value == nil) {
            [NSException raise:NSInvalidArgumentException format:@"Invalid argument '%@' to operation 'lg'", value];            
        }
        // Compute common logarithm
        double res = log10([value doubleValue]);
        result = (NSDecimalNumber *)[NSDecimalNumber numberWithDouble:res];
    }
    return result;
}

@end
