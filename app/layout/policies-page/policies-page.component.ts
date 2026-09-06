import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

export interface PolicyItem {
  id: string;
  name: string;
  path: string;
}

@Component({
  selector: 'app-policies-page',
  templateUrl: './policies-page.component.html',
  styleUrls: ['./policies-page.component.scss']
})
export class PoliciesPageComponent {
  public policies: PolicyItem[] = [
    { id: 'sensors', name: 'Sensors', path: 'assets/bigfiles/built-in-sensors-privacy-policy.html' },
    { id: 'mnb', name: 'Mnb', path: 'assets/bigfiles/mnb-privacy-policy.html' },
    { id: 'treecalc', name: 'TreeCalc', path: 'assets/bigfiles/treecalc-privacy-policy.html' },
    { id: 'gtl', name: 'GTL', path: 'assets/bigfiles/gtl-privacy-policy.html' },
    { id: 'numbers', name: 'Numbers', path: 'assets/bigfiles/numbers-privacy-policy.html' }
  ];
  public selectedId: string;
  public selectedName: string;
  public selectedSrc: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    const first = this.policies[0];
    this.selectedId = first.id;
    this.selectedName = first.name;
    this.selectedSrc = this.toSafeUrl(first.path);
  }

  public onSelect(policyId: string): void {
    const found = this.policies.find((item) => item.id === policyId);
    if (!found) {
      return;
    }
    this.selectedId = found.id;
    this.selectedName = found.name;
    this.selectedSrc = this.toSafeUrl(found.path);
  }

  private toSafeUrl(path: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(path);
  }
}
