import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'cs-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.less']
})
export class GridComponent implements OnInit {
    className!: string | null;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.className = this.route.snapshot.paramMap.get('className');
    }
}
