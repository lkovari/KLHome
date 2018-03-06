//
//  ExpressionTreeBuilder.h
//  Calc
//
//  Created by László Kővári on 2012.02.11..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CalcStack.h"
#import "ExpressionTreeNode.h"


@interface ExpressionTreeBuilder : NSObject

@property (nonatomic, strong) CalcStack *postfixStack;
@property (nonatomic, strong) id<ExpressionTreeNode> rootNode;

/*
 *  recursively build expression tree
 */
- (id<ExpressionTreeNode>) buildExpessionTreeRecursively;

/*
 *  build expression tree
 */
- (id<ExpressionTreeNode>) buildExpessionTree;

/*
 *  recursive traverse expression tree
 */
- (void) postorderTraversal:(id<ExpressionTreeNode>)node;

/*
 *  clear expression tree
 */
- (void) clearExpressionTree;

@end
