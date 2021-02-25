import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsChecklisItemSelectedPipe } from './is-checklis-item-selected.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [IsChecklisItemSelectedPipe],
    exports: [IsChecklisItemSelectedPipe]
})
export class SharedPipesModule { }
