import { Injectable } from '@angular/core';

// 全局命名空间
const global_namespace = 'tdm.';

// 默认设置
export namespace DefaultSetting {
    const default_setting = global_namespace + 'setting.'
    // 语言
    export const LANG = default_setting + 'lang'
    // 主题
    export const THEME = default_setting + 'theme'
    // 颜色
    export const COLOR = default_setting + 'color'
    // 字体
    export const FONT = default_setting + 'font'
    // 圆角
    export const RADIUS = default_setting + 'radius'

}
// 用户信息
export namespace UserInfo {
    const user_namespace = global_namespace + 'user.';
    // 用户id
    export const USER_ID = user_namespace + 'id';
    // 用户菜单
    export const MENU_LIST = user_namespace + 'menuList';
    // 用户权限
    export const PERMISSION = user_namespace + 'permission';

}

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() {
    }

    public get<T>(key: string): any {
        return JSON.parse(<string>localStorage.getItem(key)) as T;
    }

    public getList<T>(key: string) {
        const before = localStorage.getItem(key);
        return before ? (JSON.parse(before) as T[]) : [];
    }

    public set(key: string, value: any): void {
        if (!value && value === undefined) {
            return;
        }
        const arr = JSON.stringify(value);
        localStorage.setItem(key, arr);
    }
}
