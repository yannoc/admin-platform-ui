import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    constructor(
        // private translate: TranslateService,
        // private i18n: NzI18nService
    ) {
    }

    setLanguage(lang: string) {
        // this.translate.use(lang);
        // this.i18n.setLocale(LanguageService.getNzLocale(lang));
    }

    private static getNzLocale(lang: string) {
        switch (lang) {
            case 'en':
                // return en_US;
            case 'zh':
                // return zh_CN;
            default:
                // return zh_CN;
        }
    }
}
