import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { DevUIModule } from 'ng-devui';
import { MenuModule } from "../components/menu/menu.module";
import { RouterModule } from "@angular/router";
import { HeaderUserOperationComponent } from './header/header-user-operation/header-user-operation.component';
import { PersonalNoticeComponent } from './header/header-user-operation/personal-notice/personal-notice.component';
import { NoticeDataService } from "../../_mock/notice-data.service";
import { PersonalSettingsComponent } from "./header/header-user-operation/personal-settings/personal-settings.component";
import { FormsModule } from "@angular/forms";
import { ComponentsModule } from "../components/components.module";


@NgModule({
    declarations: [
        LayoutComponent,
        HeaderUserOperationComponent,
        PersonalNoticeComponent,
        PersonalSettingsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ComponentsModule,
    ],
    providers: [
        NoticeDataService
    ]
})
export class LayoutModule {
}
