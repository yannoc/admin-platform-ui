import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'cs-model-designer-frame',
  templateUrl: './model-designer-frame.component.html',
  styleUrls: ['./model-designer-frame.component.less']
})
export class ModelDesignerFrameComponent implements OnInit {

    formData: any
    items: any;
    dataSource: any;
    columns: any[]
    showDetailPanel: boolean = false

    activeTab: string | number = 'tab1'

    @Input() config: any

    constructor() {
        this.dataSource = []
        this.formData = {};
        this.columns = [{
            field: 'field',
            caption: '字段名'
        }, {
            field: 'name',
            caption: '名称'
        }, {
            field: 'display',
            caption: '显示名'
        }, {
            field: 'type',
            caption: '数据类型'
        }, {
            field: 'length',
            caption: '长度'
        }, {
            field: 'required',
            caption: '必填'
        }]

        this.items = [{
            label: {
                text: '表名',
                visible: true
            },
            disabled: true,
            name: 'tableName',
            dataField: 'tableName',
        }, {
            label: {
                text: '名称',
                visible: true
            },
            disabled: true,
            name: 'className',
            dataField: 'className',
        }, {
            label: {
                text: '显示名',
                visible: true
            },
            disabled: true,
            name: 'displayName',
            dataField: 'displayName',
        }, {
            label: {
                text: '主键',
                visible: true
            },
            disabled: true,
            name: 'primaryKey',
            dataField: 'primaryKey',
        }]
    }

    ngOnInit(): void {
        console.log()
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.config && changes.config.currentValue) {
            const node = changes.config.currentValue.node;
            if (node) {
                // this.service.queryByKey(node.key).then((response: any) => {
                //     if (response.success) {
                //         this.formData = response.data;
                //         console.log(response)
                //     }
                // })
            }
        }
    }

    onDataGridRowCheckedChange(e: any) {
        this.showDetailPanel = e.checked || false
        console.log(e)
    }

    onEditButtonClick(e: any) {

    }

    onSaveButtonClick(e: any) {

    }

}
