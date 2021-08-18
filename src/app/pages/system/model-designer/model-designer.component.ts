import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { TreeComponent } from 'ng-devui/tree';

@Component({
    selector: 'cs-model-designer',
    templateUrl: './model-designer.component.html',
    styleUrls: ['./model-designer.component.less']
})
export class ModelDesignerComponent implements AfterViewInit {

    nodes: Array<any> = []
    // 树节点展开模式
    expandMode: 'root' | 'all' | 'none' = 'root'
    // 选中不同节点的参数
    config: any
    // 选中节点的类型
    isLeaf: boolean = false;
    // 所有数据类数据
    data?: Array<any>

    @ViewChild("basicTree") basicTree?: TreeComponent

    constructor() {
        // this.nodes = [{
        //     key: 'root',
        //     isRoot: true,
        //     title: '数据类',
        // }]
        this.nodes= [{
            title: '数据类',
            open: true,
            disabled: true,
            items: [
                {
                    title: '分组一',
                    items: [
                        {
                            title: '数据类-01'
                        },
                        {
                            title: '数据类-02'
                        },
                        {
                            title: '数据类-03'
                        },
                        {
                            title: '数据类-04'
                        }
                    ]
                },
                {
                    title: '分组二',
                    items: [
                        {
                            title: '数据类-11'
                        },
                        {
                            title: '数据类-12'
                        },
                        {
                            title: '数据类-13'
                        },
                        {
                            title: '数据类-14'
                        }
                    ]
                }
            ]
        }]
    }

    // ngOnInit(): void {
    // }

    ngAfterViewInit(): void {
        // 初始化后，默认展开根节点
        const rootNode = this.basicTree?.treeFactory.getNodeById("root");
        // if (!rootNode) {
        //     return;
        // }
        // this.service.getAll.then((response: any) => {
        //     if (response.success) {
        //         const list = response.data.list;
        //         this.data = list;
        //         rootNode?.addChildren(this._createTree(list))
        //         rootNode.isExpanded = true;
        //     }
        // })
    }

    onTreeItemDrop(e: any) {
        e.stopPropagation();
        e.preventDefault();
    }

    // onTreeItemDbClick(e: NzTreeNode | NzFormatEmitEvent) {
    //     if (e instanceof NzTreeNode) {
    //         e.isExpanded = !e.isExpanded;
    //     } else {
    //         if (e.node) {
    //             e.node.isExpanded = !e.node.isExpanded;
    //         }
    //     }
    // }

    noTreeNodeSelected(e: any) {
        const nodeData = e.node?.origin;
        this.isLeaf = nodeData?.isLeaf || false;
        if (this.isLeaf) {
            this.config = {
                node: nodeData,
            };
        } else {
            this.config = {
                node: nodeData,
                data: this.data
            };
        }
    }

    onTreeNodeToggled(e: any) {

    }

    private _createTree(data: Array<any>) {
        const result: any[] = [];
        data.forEach((y) => {
            if (y.group) {
                // TODO new TreeNode() 后续使用devui自带的对象来生成树
                const group: any = result.find((t: any) => y.group === t.key)
                if (group) {
                    group.children.push({
                        key: y.className,
                        title: y.displayName,
                        isLeaf: true
                    })
                } else {
                    result.push({
                        key: y.group,
                        title: y.group,
                        children: [{
                            key: y.className,
                            title: y.displayName,
                            isLeaf: true
                        }]
                    })
                }
            } else {
                result.push({
                    key: y.className,
                    title: y.displayName,
                    isLeaf: true
                })
            }
        })
        return result;
    }

}
