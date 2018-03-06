//
//  CalcStack.m
//  Calc
//
//  Created by László Kővári on 2012.01.28..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import "CalcStack.h"


/*
 *  Remember as well that premature optimization is the root of all evil.
 */


/*
 *  CalcStack simple object stack implementation
 */
@implementation CalcStack

@synthesize stack = _stack;
@synthesize tempArray = _tempArray;

/*
 *
 */
- (id) init {
    self = [super init]; 
    if (self != nil) {
        _stack = [[NSMutableArray alloc] init]; 
    }
    return self;
}


/*
 *  return YES if has object else NO
 */
- (BOOL)boolHasObjects {
    BOOL hasObject = ([_stack count]!=0);
    return hasObject; 
}
/*
 *
 */
- (BOOL) boolIsEmpty {
    return ![self boolHasObjects];
}

/*
 *  is Number on top of stack
 */
-(BOOL) boolIsNumberOnTop {
    NSObject *object = [self peek];
    // isKindOfClass: indicates whether an object inherits from a given class
    BOOL isNumber = [object isKindOfClass:[NSNumber class]];

    // isMemberOfClass: indicates whether an object is an instance of a given class.
    //BOOL isNumber = [object isMemberOfClass:[NSNumber class]];
    
    return isNumber;
}

/*
 *  is String on top of stack
 */
-(BOOL) boolIsStringOnTop {
    NSObject *object = [self peek];
    BOOL isString = [object isKindOfClass:[NSString class]];
    //BOOL isString = [object isMemberOfClass:[NSString class]];
    return isString;
}

/*
 *  return an object from the top of stack NOT remove it
 */
-(id) peek {
    id object = nil;
    if ([self boolHasObjects]) {
        object = [_stack lastObject]; 
    }    
    return object;
}

/*
 *  return an object from the top of stack /remove it of corse/
 */
-(id) pop {
//    id object = [[[_stack lastObject] retain] autorelease];
//	[_stack removeLastObject];
//	return object;
    
    // get last object
    id object = [self peek];
    // if not nil remove it from stack
    if (object != nil) {
        [_stack removeLastObject];
    }
    return object;    
}

/*
 *  add an object to the stack
 */
-(int) push:(id)obj {
    [_stack addObject:obj];
    return [_stack count];
}

/*
 *  get the size of stack
 */
-(int) size {
    return [_stack count]; 
}

/*
 *  clear the stack content
 */
-(void) clear {
    [_stack removeAllObjects];
    _stack = nil;
    [_tempArray removeAllObjects];
    _tempArray = nil;
}

/*
 *  Reverse the content of stack
 */
- (void) reverse {
    _tempArray = [[NSMutableArray alloc] initWithCapacity:[_stack count]];
    // add all to tempArray
    [_tempArray addObjectsFromArray:_stack];
    // clear stack
    [_stack removeAllObjects];
    // add in reverse order by reverse order enumerator
    _stack = (NSMutableArray *)[[_tempArray reverseObjectEnumerator] allObjects];
    // release _tempArray
    [_tempArray removeAllObjects];
    _tempArray = nil;
}

/*
 *  return as simple array
 */
-(NSArray*) arrayGetObjects {
    return _stack;
}

@end
