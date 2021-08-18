import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeChangerModule } from "./theme/theme-changer.module";
import { DevUIModule } from "ng-devui";
import { MenuModule } from "./menu/menu.module";
import { FormsModule } from "@angular/forms";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        DevUIModule,
    ],
    exports: [
        DevUIModule,
        MenuModule,
        FormsModule,
        ThemeChangerModule
    ]
})
export class ComponentsModule {
}
