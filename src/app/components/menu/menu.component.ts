import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccordionItemClickEvent } from 'ng-devui/accordion';

@Component({
    selector: 'cs-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {

    @Input() menu: Array<any> = []
    @Input() collapsed: boolean = false;
    @Output() collapsedChange = new EventEmitter<boolean>();
    @Output() menuItemClick = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
        console.log("")
    }

    public change(collapsed: boolean) {
        console.log(collapsed)
        this.collapsedChange.emit(this.collapsed);
    }

    onItemClick(e: AccordionItemClickEvent) {
        this.menuItemClick.emit(e);
    }
}
