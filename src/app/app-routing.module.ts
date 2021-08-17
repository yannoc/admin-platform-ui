import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from "./layout/layout.component";

const routes: Routes = [
    {
        path: '', component: LayoutComponent, children: [
            {path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
            {path: 'data', loadChildren: () => import('./pages/data/data.module').then(m => m.DataModule)},
            {path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)},
            {path: 'workflow', loadChildren: () => import('./pages/workflow/workflow.module').then(m => m.WorkflowModule)},
            {path: 'system', loadChildren: () => import('./pages/system/system.module').then(m => m.SystemModule)},
            {path: 'custom', loadChildren: () => import('../custom/custom.module').then(m => m.CustomModule)}
        ]
    }, {
        path: 'custom', loadChildren: () => import('../custom/custom.module').then(m => m.CustomModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
