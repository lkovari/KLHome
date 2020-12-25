import { Component, OnInit, ViewChild } from '@angular/core';
import { ChecklistItem } from 'src/app/shared/models/checklist/checklist-item.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChecklistComponent } from 'src/app/shared/components/checklist/checklist.component';
@Component({
  selector: 'app-angular-page-content11',
  templateUrl: './angular-page-content11.component.html',
  styleUrls: ['./angular-page-content11.component.scss']
})
export class AngularPageContent11Component implements OnInit {
  exampleForm: FormGroup | null;
  githubLogoPath;
  checklistItems: ChecklistItem[] = [
    { id: 1, label: "Alistair McIntyre as bone breaker", selected: false, value: null },
    { id: 2, label: "Erika Gusbakothy as brain miner", selected: false, value: null },
    { id: 3, label: "Laszlo Kovari as a software developer", selected: false, value: null },
    { id: 4, label: "Bor New as a milk machine", selected: true, value: null },
    { id: 5, label: "Zodekap Edenwer as a dilettant", selected: false, value: null },
    { id: 6, label: "Vanadit 10 faimous knife steel material", selected: false, value: null, normal: true },
    { id: 7, label: "Vanadit 10 This is a list item, where the label's text is longer than what used in the most common cases. This is the demonstration of how the test fit into two rows, and how aligned the icon.", selected: false, value: null, normal: true },
    { id: 8, label: "M390 is the best knife steel material", selected: false, value: null, normal: true }
  ];
  singleSelect = true;

  @ViewChild('checklist', { static: true }) checklistComponent: ChecklistComponent;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const updateOnObj = { updateOn: 'change' };
    this.exampleForm = this.formBuilder.group({
      checklist: this.formBuilder.array([])
    }, updateOnObj);
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
  }

  onSubmit(form: FormGroup | null) {
    console.log(form);
  }

  showCheckedItems() {
    return this.checklistComponent.selectedItems;
  }

  showFormStatus(): string {
    return ' Pristine ' + this.exampleForm?.pristine + ' Touched ' + this.exampleForm?.touched + ' Dirty ' + this.exampleForm?.dirty;
  }

}
