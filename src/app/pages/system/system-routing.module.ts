import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelDesignerComponent } from './model-designer/model-designer.component';
import { DataEditorComponent } from './data-editor/data-editor.component';

const routes: Routes = [
    {
        path: 'model-designer', component: ModelDesignerComponent
    }, {
        path: 'data-editor', component: DataEditorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SystemRoutingModule {
}
