import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { AccordionModule } from "ng-devui";



@NgModule({
    declarations: [
        MenuComponent
    ],
    exports: [
        MenuComponent
    ],
    imports: [
        CommonModule,
        AccordionModule
    ]
})
export class MenuModule { }
