import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { Message } from "ng-devui";
import { ThemeChangerService } from "src/app/components/theme/theme-changer.service";

@Component({
    selector: 'cs-side-settings',
    templateUrl: './personal-settings.component.html',
    styleUrls: ['./personal-settings.component.less'],
})
export class PersonalSettingsComponent implements OnInit {
    @Input() close: any;
    //
    layoutConfig: any;
    layout: any;
    // helpContent;
    message: Array<Message> = [];

    i18nValues: any;

    sidebarNotice = {};

    private change: number = 0;
    private compare: any;

    @ViewChild("themeSettingBox") themeBox?: ThemeChangerService;

    constructor(
        private clipboard: Clipboard,
        // private layoutService: DaLayoutService,
        // private mediaQueryService: DaScreenMediaQueryService,
        // private translate: TranslateService
    ) {
        // this.mediaQueryService
        //   .getPoint()
        //   .pipe(takeUntil(this.destroy$))
        //   .subscribe(({ currentPoint, change, compare }) => {
        //     this.change = change;
        //     this.compare = compare;
        //   });
    }

    ngOnInit(): void {
        this.initLayoutConfig();

        if (localStorage.getItem('da-layout-id')
        ) {
            this.layout = localStorage.getItem('da-layout-id');
        } else {
            this.layout = 'left-right';
        }
    }

    initLayoutConfig() {
        // this.layoutService.getLayoutConfig().subscribe((layout) => {
        //   this.layoutConfig = layout;
        // });
    }

    resetThemeSetting(e: any) {

    }

    onResetButtonClick() {
        // 重置默认配置
        if (this.themeBox) {
            this.themeBox.reset();
        }
    }
}
