import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cs-class-attribute-list',
  templateUrl: './class-attribute-list.component.html',
  styleUrls: ['./class-attribute-list.component.less']
})
export class ClassAttributeListComponent implements OnInit {

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
