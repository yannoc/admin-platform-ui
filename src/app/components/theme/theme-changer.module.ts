import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeChangerComponent } from './theme-changer.component';
import { ThemeChangerService } from "./theme-changer.service";
import { RadioModule } from "ng-devui";
import { FormsModule } from "@angular/forms";


@NgModule({
    declarations: [
        ThemeChangerComponent
    ],
    imports: [
        CommonModule,
        RadioModule,
        FormsModule,
    ],
    exports: [
        ThemeChangerComponent
    ],
    providers: [
        // ThemeBuildFactoryService,
        ThemeChangerService,
    ]
})
export class ThemeChangerModule {
}
