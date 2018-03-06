//
//  ExpressionTreeNodeValue.m
//  Calc
//
//  Created by László Kővári on 2012.02.11..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import "ExpressionTreeNodeValue.h"
#import "ExpressionTreeNode.h"

@implementation ExpressionTreeNodeValue

@synthesize valueNumber = _valueNumber;

- (ExpressionTreeNodeValue *) initWithNumber: (NSDecimalNumber *)value {
    self = [super init];
    if ( self ) {
        [self setValueNumber:value];
    }
    return self;
}

/*
 *  get the calculated value
 */
- (NSDecimalNumber *) getValue {
    return self.valueNumber;
}

/*
 *  convert to string with operator
 */
- (NSString *) stringToString {
    NSDecimalNumber *value = [self getValue];
    return value.stringValue;
}


@end
