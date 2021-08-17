import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { zh } from './language/zh';
import { en } from './language/en';
import { catchError, map } from 'rxjs/operators';
import * as deepmerge from 'deepmerge';

export class TranslateMultiHttpLoader implements TranslateLoader {
    private translations = new Map<string, Observable<any>>();

    constructor(private http: HttpClient) {
        this.translations.set('zh', of(zh));
        this.translations.set('en', of(en));
    }

    getTranslation(lang: string): Observable<any> {
        const custom = this.http.get('/assets/i18n/' + lang + '.json').pipe(catchError(() => {
            return of({});
        }));
        return forkJoin([this.translations.get(lang), custom]).pipe(map(response => deepmerge.all(response)));
    }
}
