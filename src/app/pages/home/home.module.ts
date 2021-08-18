import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { TaskComponent } from './task/task.component';
import { NoticeComponent } from './notice/notice.component';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        TaskComponent,
        NoticeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        // TranslateModule,
        // NzPaginationModule,
        // NzDatePickerModule,
        FormsModule,
        // NzSwitchModule
    ]
})
export class HomeModule {
}
