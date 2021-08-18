import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { ModelDesignerModule } from "./model-designer/model-designer.module";
import { DataEditorModule } from "./data-editor/data-editor.module";


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SystemRoutingModule,
        // 默认设计器
        ModelDesignerModule,
        // 数据编辑器
        DataEditorModule
    ]
})
export class SystemModule {
}
