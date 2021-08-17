import { Injectable } from '@angular/core';
import * as Color from 'color';
import { devuiDarkTheme, devuiLightTheme } from 'ng-devui/theme';
import { ColorHierarchyMap, IColorDef, IColorHierarchy, IColorObject, IColorOffset, IEffect, HsvModel, IThemeData, HslModel } from './color-hierarchy';

@Injectable({
    providedIn: 'root'
})
export class ThemeBuildFactoryService {
    colorHierarchy = ColorHierarchyMap;
    themeDataLight = devuiLightTheme.data;
    themeDataDark = devuiDarkTheme.data;

    public genThemeData(colorChanges: Array<IColorDef>, isDark = false, effect?: IEffect): IThemeData {
        const themeData = isDark ? this.themeDataDark : this.themeDataLight;
        const pattern = this.genColorPattern(this.colorHierarchy, themeData);
        const updatedPattern = this.updateColor(colorChanges, pattern, effect);
        this.fillEmptyColor(updatedPattern, effect);
        return this.pattern2ThemeData(updatedPattern);
    }

    private updateColor(colorChanges: Array<IColorDef>, colorHierarchy: IColorHierarchy, effect?: IEffect) {
        const changeKeys = colorChanges.map(change => change.colorName);
        const changeStack = [...changeKeys];
        const colorKeys = Object.keys(colorHierarchy);
        const pattern = JSON.parse(JSON.stringify(colorHierarchy)) as IColorHierarchy;
        let count = 0;
        while (changeStack.length) {
            const handleKey = changeStack.splice(0, 1).pop();
            if (count < changeKeys.length) {
                pattern[handleKey!]['default-value'] = colorChanges[count].color;
            } else {
                const extendsKey = pattern[handleKey!].extends;
                const extendsColor = Color(pattern[extendsKey!]['default-value']);
                const colorOffset = <IColorOffset>pattern[handleKey!].offset;
                const {mode, offset} = this.getColorEffectOffset(extendsColor, colorOffset, effect);
                pattern[handleKey!]['default-value'] = ThemeBuildFactoryService.getHexOrRgba(
                    this.getColorValue(extendsColor, offset, mode)
                );
            }

            colorKeys.forEach(colorName => {
                if (handleKey === pattern[colorName].extends) {
                    if (!(changeStack.indexOf(colorName) > -1) && !(changeKeys.indexOf(colorName) > -1)) {
                        // 如果不是changeStackUI经做过标记，或者ChangeKeys直接指定了颜色，则标记为需要更新
                        changeStack.push(colorName);
                    }
                }
            });
            count++;
        }
        return pattern;
    }

    private fillEmptyColor(pattern: IColorHierarchy, effect?: IEffect) {
        const colorKeys = Object.keys(pattern);
        const noColorArray = colorKeys.map(colorName => ({
            colorName: colorName,
            pattern: pattern[colorName]
        })).filter(color => !color.pattern['default-value']);
        noColorArray.forEach(color => {
            const handleKey = color.colorName;
            const extendsKey = pattern[handleKey].extends;
            const extendsColor = Color(pattern[extendsKey!]['default-value']);
            const colorOffset = <IColorOffset>pattern[handleKey].offset;
            const {mode, offset} = this.getColorEffectOffset(extendsColor, colorOffset, effect);
            pattern[handleKey]['default-value'] = ThemeBuildFactoryService.getHexOrRgba(
                this.getColorValue(extendsColor, offset!, mode)
            );
        });
    }

    private pattern2ThemeData(pattern: IColorHierarchy): IThemeData {
        const themeData: IThemeData = {};
        const colorKeys = Object.keys(pattern);
        colorKeys.forEach(colorName => {
            themeData[colorName] = <string>pattern[colorName]['default-value'];
        });
        return themeData;
    }

    private genColorPattern(colorHierarchy: IColorHierarchy, themeData: IThemeData): IColorHierarchy {
        const pattern: IColorHierarchy = {};
        const offset = this.getThemeOffset(colorHierarchy, themeData);
        offset.forEach(obj => {
            pattern[obj.colorName] = {
                ...colorHierarchy[obj.colorName],
                'default-value': themeData[obj.colorName],
                offset: obj.offset
            };
        });
        return pattern;
    }

    private getThemeOffset(colorHierarchy: IColorHierarchy, themeData: IThemeData): Array<IColorObject> {
        const colorKeys = Object.keys(colorHierarchy);
        return colorKeys.map(key => (
            {
                colorName: key,
                color: Color(themeData[key]),
                extends: Color(themeData[this.colorHierarchy[key].extends!])
            } as IColorObject
        )).map(colorObj => {
            if (colorObj.extends) {
                colorObj.offset = {
                    hsl: this.getColorOffset(colorObj.color, colorObj.extends, 'hsl'),
                    hsv: this.getColorOffset(colorObj.color, colorObj.extends, 'hsv')
                };
            }
            return colorObj;
        });
    }

    private getColorOffset<T>(target: Color, source: Color, mode: 'hsl' | 'hsv') {
        const targetModel = target[mode]();
        const sourceModel = source[mode]();
        const offset = {
            // h,s,l 或者 hsv
            h: targetModel.hue() - sourceModel.hue(),
            s: targetModel.lightness() - sourceModel.lightness(),
            l: targetModel.saturationl() - sourceModel.saturationl(),
            v: targetModel.saturationv() - sourceModel.saturationv(),
            a: targetModel.alpha() - sourceModel.alpha()
        };
        const percent = {
            sp: offset['s'] > 0 ? offset['s'] * 100 / (100 - sourceModel.saturationl()) : offset['s'] * 100 / sourceModel.saturationl(),
            lp: offset['l'] > 0 ? offset['l'] * 100 / (100 - sourceModel.lightness()) : offset['l'] * 100 / sourceModel.lightness(),
            vp: offset['v'] > 0 ? offset['v'] * 100 / (100 - sourceModel.lightness()) : offset['v'] * 100 / sourceModel.lightness(),
            ap: offset.a > 0 ? offset.a * 100 / (1 - sourceModel.alpha()) : offset.a * 100 / sourceModel.alpha()
        };
        return {
            ...offset,
            ...percent
        };
    }

    private getColorEffectOffset(source: Color, colorOffset: IColorOffset, effect?: IEffect): { mode: 'hsl' | 'hsv', offset: HslModel | HsvModel } {
        let result: { mode: 'hsl' | 'hsv', offset: any };
        switch (effect) {
            case 'hsl':
                result = {
                    mode: 'hsl',
                    offset: colorOffset.hsl
                };
                break;
            case 'hsv':
                result = {
                    mode: 'hsv',
                    offset: colorOffset.hsv
                };
                break;
            case 'strong':
                result = {
                    mode: 'hsl',
                    offset: {
                        ...colorOffset.hsl,
                        sp: colorOffset.hsl.sp! > 0
                            ? ThemeBuildFactoryService.minmax(colorOffset.hsl.sp! * 1.3, colorOffset.hsl.sp!, 100)
                            : colorOffset.hsl.sp! * 0.75
                    }
                };
                break;
            case 'soft':
                result = {
                    mode: 'hsv',
                    offset: {
                        ...colorOffset.hsv,
                        sp: colorOffset.hsv.sp! > 0
                            ? ThemeBuildFactoryService.minmax(colorOffset.hsv.sp! * 1.25, colorOffset.hsv.sp!, 100)
                            : colorOffset.hsv.sp! * 0.5
                    }
                };
                break;
            case 'light':
                result = {
                    mode: 'hsl',
                    offset: {
                        ...colorOffset.hsl,
                        lp: colorOffset.hsl.lp! > 0
                            ? ThemeBuildFactoryService.minmax(colorOffset.hsl.lp!, colorOffset.hsl.lp!, 100)
                            : colorOffset.hsl.lp! * 0.2
                    }
                };
                break;
            case 'contrast': // 需要计算后的颜色，未支持
                result = {
                    mode: 'hsl',
                    offset: {
                        ...colorOffset.hsl
                    }
                };
                break;
            default:
                result = {
                    mode: 'hsl',
                    offset: colorOffset.hsl
                };
                break;

        }
        return result;
    }

    private getColorValue(source: Color, offset: HslModel | HsvModel, mode: 'hsl' | 'hsv'): Color {
        const sourceModel = source[mode]();
        offset = offset as HslModel
        const value = {
            h: (sourceModel.hue() + offset.h) % 360,
            s: offset['sp'] > 0 ? (sourceModel.lightness() + offset['sp'] * (100 - sourceModel.lightness()) / 100) : (sourceModel.lightness() + sourceModel.lightness() * offset['sp'] / 100),
            a: offset['ap'] > 0 ? (sourceModel.alpha() + offset['ap'] * (1 - sourceModel.alpha()) / 100) : (sourceModel.alpha() + sourceModel.alpha() * offset['ap'] / 100),
            l: offset['lp'] > 0 ? (sourceModel.saturationl() + offset['lp'] * (100 - sourceModel.saturationl()) / 100) : (sourceModel.saturationl() + sourceModel.saturationl() * offset['lp'] / 100)
        };
        return Color([value.h, value.s, value.l, value.a], mode);
        // v: offset['vp'] > 0 ? (sourceModel.saturationv() + offset['vp'] * (100 - sourceModel.saturationv()) / 100) : (sourceModel.saturationv() + sourceModel.saturationv() * offset['vp'] / 100),
    }

    private static getHexOrRgba(color: Color) {
        if (color.alpha() < 1) {
            // const rgb = color.rgb();
            // const [r, g, b] = rgb.color;
            // const a = rgb.valpha;
            const unit = color.unitObject();
            return `rgba(${unit.r}, ${unit.g}, ${unit.b}, ${unit.alpha})`;
        } else {
            return color.hex();
        }
    }

    private static minmax(v: number, min: number, max: number) {
        if (v < min) {
            return min;
        }
        if (v > max) {
            return max;
        }
        return v;
    }
}
