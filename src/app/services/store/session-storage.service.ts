import { Injectable } from '@angular/core';


// 全局命名空间
export const GLOBAL_NAMESPACE = 'tdm.';

// 用户信息
const MENU_NAMESPACE = GLOBAL_NAMESPACE + 'menu.';
const TAB_NAMESPACE = GLOBAL_NAMESPACE + 'tab.';

export const TAB_LIST = TAB_NAMESPACE + 'list';
export const SELECTED_ITEM = MENU_NAMESPACE + 'selected'


@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {

    constructor() {
    }

    public get<T>(key: string): any {
        return JSON.parse(<string>sessionStorage.getItem(key)) as T;
    }

    public getList<T>(key: string) {
        const before = sessionStorage.getItem(key);
        return before ? (JSON.parse(before) as T[]) : [];
    }

    public set(key: string, value: any): void {
        if (!value && value === undefined) {
            return;
        }
        const arr = JSON.stringify(value);
        sessionStorage.setItem(key, arr);
    }
}
