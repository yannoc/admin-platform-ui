import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'cs-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
    className!: string | null;
    oid!: string | null;
    value!: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.className = this.route.snapshot.paramMap.get('className');
        this.oid = this.route.snapshot.paramMap.get('oid');
    }
}
