import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeChangerService } from "./theme-changer.service";
import { CustomColors, CustomFontSize, CustomRadiusSize, CustomThemes, ICustomSizeData } from "src/util/theme";
import { Theme } from "ng-devui/theme";

@Component({
    selector: 'cs-theme-changer',
    templateUrl: './theme-changer.component.html',
    styleUrls: ['./theme-changer.component.less']
})
export class ThemeChangerComponent implements OnInit {

    @Input() panelMode: 'large' | 'small' | 'default' = "default"
    // 内置的默认主题
    // defaultThemes?: Array<Theme>

    // 初始化时自定义的主题和字体颜色
    customThemes: { [name: string]: Theme }
    customColors: Array<string>
    customFonts: ICustomSizeData
    customRadius: ICustomSizeData

    // 当前的主题和颜色
    currentTheme?: string
    currentColor?: string
    currentFont?: string
    currentRadius?: string
    // 其他页面属性
    objectKeys = Object.keys;

    constructor(private service: ThemeChangerService) {
        this.customThemes = CustomThemes
        this.customColors = CustomColors
        this.customFonts = CustomFontSize
        this.customRadius = CustomRadiusSize
        this.currentTheme = this.service.currentThemeId
        this.currentColor = this.service.currentColorId
        this.currentFont = this.service.currentFontId
        this.currentRadius = this.service.currentRadiusId
    }

    ngOnInit(): void {
        console.log("ThemeChangerComponent init...")
    }

    changeTheme(themeId: string, colorId: string) {
        this.service.changeCustomTheme(themeId, colorId)
        this.currentTheme = themeId;
        this.currentColor = colorId;
    }

    changeFont(fontId: string) {
        this.service.changeCustomFontSize(fontId);
        this.currentFont = fontId;
    }

    changeRadius(radiusId: string) {
        this.service.changeCustomRadiusSize(radiusId);
        this.currentRadius = radiusId;
    }

    reset(args: number) {
        this.currentTheme = undefined;
        this.currentColor = undefined;
        this.currentFont = undefined;
        this.currentRadius = undefined;
        this.service.reset();
    }

}
