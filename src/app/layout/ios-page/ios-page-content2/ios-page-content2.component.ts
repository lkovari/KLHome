import { Component, OnInit } from '@angular/core';
import { FileLoaderService } from '../../../shared/services/fileloader/file-loader.service';

@Component({
  selector: 'app-ios-page-content2',
  templateUrl: './ios-page-content2.component.html',
  styleUrls: ['./ios-page-content2.component.scss']
})
export class IosPageContent2Component implements OnInit {
  public imagePathArray = ['assets/images/dev-objc-calc_ui_1.jpg', 'assets/images/dev-objc-calc_ui_2.jpg'];
  public calcSourceFiles = [];
  isDisplayText = false;
  fileName: string;
  fileContent: string;

  constructor(private fileLoaderService: FileLoaderService) { }

  loadFileContent(fileName: string) {
    this.fileLoaderService.loadtTextFile('objc', fileName, true).subscribe(fileContent => {
      this.fileName = fileName;
      this.fileContent = fileContent;
      this.isDisplayText = true;
      // console.log('File ' + this.numconvFileContent);
    });
  }

  ngOnInit() {
    this.calcSourceFiles = [
      'main.m', 'CalcAppDelegate.h', 'CalcAppDelegate.m', 'ExpressionTreeNode.h', 'BinaryExpressionTreeNode.h',
      'BinaryExpressionTreeNode.m', 'CalcStack.h', 'CalcStack.m', 'CalculatorEngine.h', 'CalculatorEngine.m',
      'CalculatorUtils.h', 'CalculatorUtils.m', 'CalcViewController.h', 'CalcViewController.m', 'ColorUtils.h', 'ColorUtils.m',
      'ExpressionTreeBuilder.h', 'ExpressionTreeBuilder.m', 'ExpressionTreeNodeValue.h', 'ExpressionTreeNodeValue.m',
      'UnaryExpressionTreeNode.h', 'UnaryExpressionTreeNode.m', 'OperationsEvaluator.h', 'OperationsEvaluator.m'
    ]
  }

  onTabClose(event) {
    console.log('onTabClose fired ' + event.index);
  }

  onTabOpen(event) {
    console.log('onTabOpen fired ' + event.index);
    this.loadFileContent(this.calcSourceFiles[event.index]);
  }

}
