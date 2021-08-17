import { Component, OnInit } from '@angular/core';
import { FormLayout } from "ng-devui/form";

@Component({
  selector: 'cs-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.less']
})
export class ClassDetailComponent implements OnInit {

    layoutDirection: FormLayout = FormLayout.Horizontal;
    multipleSelect2DemoConfig: any;
    singleDateDemoConfig: any;
    multiDateDemoConfig: any;
    inputDemoConfig2: any;
    selectDemoconfig2: any;
    singleDateDemoConfig2: any;

    disabled?: false;

    addedLabelList = [];

    selectOptions = [
        {
            id: 1,
            label: '序号'
        },
        {
            id: 2,
            label: '名称'
        },
        {
            id: 3,
            label: '人员'
        }
    ];

    formData = {
        tableName: 'Table_01',
        className: 'ClassName_01',
        displayName: '数据类01',
        primaryKey: '序号'
    };

    constructor() {
    }

    ngOnInit() {
        this.multipleSelect2DemoConfig = {
            key: 'multipleSelect-demo2',
            label: 'Options(Multiple selection with delete)',
            isSearch: true,
            multiple: 'true',
            labelization: {enable: true, labelMaxWidth: '120px'},
            options: this.selectOptions
        };
    }
}
