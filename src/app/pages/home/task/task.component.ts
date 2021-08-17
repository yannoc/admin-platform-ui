import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../components/i18n/language.service';

@Component({
    selector: 'cs-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {
    date = null;

    constructor(
        private languageService: LanguageService
    ) {
    }

    ngOnInit(): void {
        console.log("TaskComponent init empty...")
    }

    switchLanguage($event: boolean) {
        $event ? this.languageService.setLanguage('zh') : this.languageService.setLanguage('en');
    }
}
