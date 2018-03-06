//
//  ExpressionTreeBuilder.m
//  Calc
//
//  Created by László Kővári on 2012.02.11..
//  Copyright (c) 2012 EKLSoft Trade Llc. All rights reserved.
//

#import "ExpressionTreeBuilder.h"
#import "CalculatorUtils.h"
#import "ExpressionTreeNode.h"
#import "BinaryExpressionTreeNode.h"
#import "UnaryExpressionTreeNode.h"
#import "ExpressionTreeNodeValue.h"


@implementation ExpressionTreeBuilder

@synthesize postfixStack = _postfixStack;
@synthesize rootNode = _rootNode;

/*
 *  set postfix stack
 */
- (void) setPostfixStack:(CalcStack *)postfixStack {
    _postfixStack = postfixStack;
}


/*
 *  build expression tree
 */
- (id<ExpressionTreeNode>) buildExpessionTree {
    self.rootNode = [self buildExpessionTreeRecursively];
    return self.rootNode;
}


/*
 *  build recursively the expression tree
 */
- (id<ExpressionTreeNode>) buildExpessionTreeRecursively {
    // tree node
    id<ExpressionTreeNode> treeNode = nil;

    // is there available node?
    if ([_postfixStack boolHasObjects]) {
        // get next element from stack    
        NSObject *exprElement = [_postfixStack pop];
    
        // is number?
        if ([CalculatorUtils boolIsNumberNSObject:exprElement]) {
            
            // create tree node value

            NSDecimalNumber *number = (NSDecimalNumber *)exprElement;
            treeNode = [[ExpressionTreeNodeValue alloc] initWithNumber:number];
        }
        else {
            // is String?
            if ([CalculatorUtils boolIsStringNSObject:exprElement]) {
                // cast to string
                NSString *exprString = ((NSString *)exprElement);
                // is Binary operation
                if ([CalculatorUtils boolIsBinaryOperator:exprString]) {
                    
                    // create BinaryExpressionTreeNode with operator
                    treeNode = [[BinaryExpressionTreeNode alloc] initWithOperation:exprString];
                    
                    // recursive call for left part
                    id<ExpressionTreeNode> builtLeftTreeNode = [self buildExpessionTreeRecursively];
                    // set left
                    [((BinaryExpressionTreeNode *)treeNode) setLeftExpressionTreeNode:builtLeftTreeNode];
                    
                    // recursive call for right part
                    id<ExpressionTreeNode> builtRightTreeNode = [self buildExpessionTreeRecursively];
                    // set right
                    [((BinaryExpressionTreeNode *)treeNode) setRightExpressionTreeNode:builtRightTreeNode];
                    
                }
                // is Unary operation
                else if ([CalculatorUtils boolIsUnaryOperator:exprString]) {
                    // create UnaryExpressionTreeNode with operator
                    treeNode = [[UnaryExpressionTreeNode alloc] initWithOperation:exprString];
                    
                    // recursive call for single part
                    id<ExpressionTreeNode> builtSingleTreeNode = [self buildExpessionTreeRecursively];
                    // set single
                    [((UnaryExpressionTreeNode *)treeNode) setSingleExpressionTreeNode:builtSingleTreeNode];
                }
            }
        }
    }
    return treeNode;
}

/*
 *  recursive call for tree nodes
 */
- (void) postorderTraversal:(id<ExpressionTreeNode>)node {
    if (node != nil) {
        if ([node isKindOfClass:[BinaryExpressionTreeNode class]]) {
            BinaryExpressionTreeNode *binaryTreeNode = ((BinaryExpressionTreeNode *)node); 
            // get left node
            id<ExpressionTreeNode> leftNode = [binaryTreeNode leftExpressionTreeNode];
            // call recursively for left node
            [self postorderTraversal:leftNode];                                           
            // get right node
            id<ExpressionTreeNode> rightNode = [binaryTreeNode leftExpressionTreeNode];
            // call recursively for left node
            [self postorderTraversal:rightNode];                                           
            // clear element
            binaryTreeNode.operation = nil;
            binaryTreeNode = nil;
        }
        else if ([node isKindOfClass:[UnaryExpressionTreeNode class]]) {
            UnaryExpressionTreeNode *unaryTreeNode = ((UnaryExpressionTreeNode *)node); 
            // get node
            id<ExpressionTreeNode> singleNode = [unaryTreeNode singleExpressionTreeNode];
            // call recursively for single node
            [self postorderTraversal:singleNode];                                           
            unaryTreeNode.operation = nil;
            unaryTreeNode = nil;
        }
        else if ([node isKindOfClass:[ExpressionTreeNodeValue class]]) {
            ExpressionTreeNodeValue *treeNodeValue = ((ExpressionTreeNodeValue *)node); 
            treeNodeValue.valueNumber = nil;
            treeNodeValue = nil;
        }    
    }
}

/*
 *  clear an expression tree by postorder traversal
 */
- (void) clearExpressionTree {
    // postorder traversal
    [self postorderTraversal:self.rootNode];
    self.rootNode = nil;
}


@end
