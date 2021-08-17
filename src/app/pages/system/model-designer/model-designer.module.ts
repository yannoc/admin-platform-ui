import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelDesignerFrameComponent } from './model-designer-frame/model-designer-frame.component';
import { ComponentsModule } from "../../../components/components.module";
import { ModelDesignerComponent } from "./model-designer.component";
import { ClassDetailComponent } from "./class-detail/class-detail.component";
import { ClassAttributeDetailComponent } from "./class-attribute-detail/class-attribute-detail.component";
import { ClassViewListComponent } from "./class-view-list/class-view-list.component";
import { FormsModule } from "@angular/forms";
import { ClassAttributeListComponent } from "./class-attribute-list/class-attribute-list.component";


@NgModule({
    declarations: [
        ModelDesignerComponent,
        ModelDesignerFrameComponent,
        ClassDetailComponent,
        ClassAttributeDetailComponent,
        ClassViewListComponent,
        ClassAttributeListComponent
    ],
    imports: [
        CommonModule,
        ComponentsModule,
    ]
})
export class ModelDesignerModule {
}
