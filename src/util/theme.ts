import { devuiDarkTheme, devuiLightTheme, Theme, ThemeServiceInit } from "ng-devui/theme";
import { infinityTheme, sweetTheme, provenceTheme, deepTheme } from "ng-devui/theme-collection";

export type SizeKey = 'large' | 'medium' | 'normal'

export interface ICustomSize {
    id: string
    name: string,
    cnName: string
    data: any
}

export type ICustomSizeData = {
    [p in SizeKey]: ICustomSize
}

export const NORMAL_SIZE = {
    'devui-font-size': '12px',
    'devui-font-size-card-title': '14px',
    'devui-font-size-page-title': '16px',
    'devui-font-size-modal-title': '18px',
    'devui-font-size-price': '20px',
    'devui-font-size-data-overview': '24px',
    'devui-font-size-icon': '16px',
    'devui-font-size-sm': '12px',
    'devui-font-size-md': '12px',
    'devui-font-size-lg': '14px',
};


export const MEDIUM_SIZE = {
    'devui-font-size': '14px',
    'devui-font-size-card-title': '16px',
    'devui-font-size-page-title': '18px',
    'devui-font-size-modal-title': '20px',
    'devui-font-size-price': '22px',
    'devui-font-size-data-overview': '26px',
    'devui-font-size-icon': '18px',
    'devui-font-size-sm': '14px',
    'devui-font-size-md': '14px',
    'devui-font-size-lg': '16px',
}

export const LARGE_SIZE = {
    'devui-font-size': '16px',
    'devui-font-size-card-title': '18px',
    'devui-font-size-page-title': '20px',
    'devui-font-size-modal-title': '22px',
    'devui-font-size-price': '24px',
    'devui-font-size-data-overview': '28px',
    'devui-font-size-icon': '20px',
    'devui-font-size-sm': '16px',
    'devui-font-size-md': '16px',
    'devui-font-size-lg': '18px',
};

export const NORMAL_RADIUS = {
    'devui-border-radius': "4px",
    'devui-border-radius-card': "4px"
}

export const MEDIUM_RADIUS = {
    'devui-border-radius': "6px",
    'devui-border-radius-card': "6px"
}

export const LARGE_RADIUS = {
    'devui-border-radius': "8px",
    'devui-border-radius-card': "8px"
}

export const CustomFontSize: ICustomSizeData = {
    normal: {
        id: "custom-normal-font",
        name: 'normal',
        cnName: '小',
        data: NORMAL_SIZE
    },
    medium: {
        id: "custom-medium-font",
        name: 'medium',
        cnName: '中',
        data: MEDIUM_SIZE
    },
    large: {
        id: "custom-large-font",
        name: 'large',
        cnName: '大',
        data: LARGE_SIZE
    }
}

export const CustomRadiusSize: ICustomSizeData = {
    normal: {
        id: "custom-normal-radius",
        name: 'normal',
        cnName: '小',
        data: NORMAL_RADIUS
    },
    medium: {
        id: "custom-medium-radius",
        name: 'medium',
        cnName: '中',
        data: MEDIUM_RADIUS
    },
    large: {
        id: "custom-medium-radius",
        name: 'large',
        cnName: '大',
        data: LARGE_RADIUS
    }
}

export const CustomColors = ['#343a40', '#24316c', '#673AB7', '#4f7dff', '#4caf78', '#5faa15', '#ff6a0d', '#f36b7f']

export const CustomThemes = {
    customDarkTheme: new Theme({
        id: `customize-dark-theme`,
        name: 'Dark',
        cnName: '自定义（暗黑）',
        data: {
            'layout-header-bg': '#202124',
            'layout-sider-bg': '#202124'
        },
        extends: devuiDarkTheme.id,
        isDark: true
    }),
    customLightTheme: new Theme({
        id: `customize-light-theme`,
        name: 'Light',
        cnName: '自定义（明亮）',
        data: {},
        extends: devuiLightTheme.id,
        isDark: false,
    })
}

export function enableCustomTheme() {
    ThemeServiceInit({
        infinityTheme,
        sweetTheme,
        provenceTheme,
        deepTheme,
        devuiDarkTheme,
        ...CustomThemes
        // customTheme
    }, infinityTheme.id);
}
