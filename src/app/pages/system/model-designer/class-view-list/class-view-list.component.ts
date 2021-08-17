import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-class-view-list',
  templateUrl: './class-view-list.component.html',
  styleUrls: ['./class-view-list.component.less']
})
export class ClassViewListComponent implements OnInit {

    constructor() {
    }

    dataSource: Array<any> = [];

    ngOnInit(): void {
        console.log()
    }

    columns = [
        {
            field: 'firstName',
            header: 'First Name',
            fieldType: 'text'
        },
        {
            field: 'lastName',
            header: 'Last Name',
            fieldType: 'text'
        },
        {
            field: 'gender',
            header: 'Gender',
            fieldType: 'text'
        },
        {
            field: 'dob',
            header: 'Date of birth',
            fieldType: 'date'
        }
    ]
}
