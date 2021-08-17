import { Injectable } from '@angular/core';
import { ThemeService } from "ng-devui/theme";
import { CustomFontSize, CustomRadiusSize, ICustomSize, SizeKey } from "src/util/theme";
import { ThemeBuildFactoryService } from "./util/theme-build-factory.service";

@Injectable({
    providedIn: 'root'
})
export class ThemeChangerService {

    defaultThemeConfig = {
        theme: 'infinityTheme',
        color: '',
        font: 'normal',
        radius: 'normal'
    };

    themes: { [id: string]: any };
    themeService: ThemeService;

    // 当前样式
    currentThemeId?: string
    currentColorId?: string
    currentFontId?: string
    currentRadiusId?: string

    constructor(private buildService: ThemeBuildFactoryService) {
        this.themeService = window['devuiThemeService' as any] as any;
        this.themes = window['devuiThemes' as any] as any;
    }

    // 初始化主题颜色
    initTheme() {
        // 默认主题是：empty-theme，如果已经保存了主题，则切换到主题
        if (this.themes) {
            const {
                theme,
                color,
                font,
                radius
            } = localStorage.getItem('user-custom-theme-config') ? JSON.parse(<string>localStorage.getItem('user-custom-theme-config')) : this.defaultThemeConfig;
            this.changeTheme(theme, color, font, radius)
        }
    }

    changeTheme(tId?: string, cId?: string, fId?: string, rId?: string) {
        // 设置圆角和字体大小
        tId = tId ? tId : Object.keys(this.themes)[0]
        const theme = this.themes[tId]
        const themeData = this.getCustomThemeData(cId, theme.isDark);
        const {fontData, radiusData} = ThemeChangerService.getSizeAndRadiusData(fId as SizeKey, rId as SizeKey);
        Object.assign(theme, {data: themeData});
        Object.assign(theme.data, fontData, radiusData);
        this.themeService.applyTheme(theme)
        localStorage.setItem("user-custom-theme-config", JSON.stringify({theme: tId, color: cId, font: fId, radius: rId}))
        this.currentThemeId = tId;
        this.currentColorId = cId;
        this.currentFontId = fId;
        this.currentRadiusId = rId;
    }

    changeCustomTheme(themeId: string, color: string) {
        // // 字体样式和圆角样式
        this.changeTheme(themeId, color, this.currentFontId, this.currentRadiusId)
    }

    changeCustomFontSize(fId: string) {
        this.changeTheme(this.currentThemeId, this.currentColorId, fId, this.currentRadiusId)
    }

    changeCustomRadiusSize(rId: string) {
        this.changeTheme(this.currentThemeId, this.currentColorId, this.currentFontId, rId)
    }

    reset() {
        localStorage.removeItem("user-custom-theme-config")
        this.initTheme();
    }

    private getCustomThemeData(color?: string, isDark?: boolean) {
        return color ? this.buildService.genThemeData([{colorName: 'devui-brand', color: color,}], isDark, 'hsl') : {};
    }

    private static getSizeAndRadiusData(fId: SizeKey, rId: SizeKey) {
        const font: ICustomSize = CustomFontSize[fId];
        const radius: ICustomSize = CustomRadiusSize[rId]
        return {
            fontData: font ? font.data : {},
            radiusData: radius ? radius.data : {}
        } as any;
    }
}
