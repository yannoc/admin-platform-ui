import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataRoutingModule } from './data-routing.module';
import { DetailComponent } from './detail/detail.component';
import { GridComponent } from './grid/grid.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DetailComponent,
    GridComponent
  ],
    imports: [
        CommonModule,
        DataRoutingModule,
        // NzInputModule,
        FormsModule
    ]
})
export class DataModule { }
