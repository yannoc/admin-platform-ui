import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { NoticeComponent } from './notice/notice.component';

const routes: Routes = [
    {
        path: 'task', component: TaskComponent
    }, {
        path: 'notice', component: NoticeComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
