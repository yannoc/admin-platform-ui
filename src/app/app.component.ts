import { Component } from '@angular/core';
import { LanguageService } from './components/i18n/language.service';

@Component({
    selector: 'cs-root',
    template: `
        <router-outlet></router-outlet>
    `
})
export class AppComponent {
    constructor(private languageService: LanguageService) {
        languageService.setLanguage('zh');
    }
}
