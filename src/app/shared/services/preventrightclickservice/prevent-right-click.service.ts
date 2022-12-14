import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class PreventRightClickService {

    constructor(@Inject(DOCUMENT) private document: Document) { }

    listener: any;

    preventRightClick() {
        this.listener = function listener(event: Event) {
            event.preventDefault();
        };        
        this.document.addEventListener('contextmenu', this.listener);
    }

    allowRightClick() {
        this.document.removeEventListener('contextmenu', this.listener);
    }
}