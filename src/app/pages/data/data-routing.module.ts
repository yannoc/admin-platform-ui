import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GridComponent } from './grid/grid.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
    {
        path: 'grid/:className', component: GridComponent
    }, {
        path: 'detail/:className/:oid', component: DetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataRoutingModule {
}
