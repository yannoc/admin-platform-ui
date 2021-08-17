import { Component, OnDestroy, OnInit } from '@angular/core';
import { DrawerService, IDrawerOpenResult } from "ng-devui";
import { PersonalSettingsComponent } from './personal-settings/personal-settings.component';

@Component({
    selector: 'cs-header-user-operation',
    templateUrl: './header-user-operation.component.html',
    styleUrls: ['./header-user-operation.component.less']
})
export class HeaderUserOperationComponent implements OnInit, OnDestroy {

    userName?: string;

    settingDrawer?: IDrawerOpenResult;

    constructor(private drawerService: DrawerService) {
    }

    ngOnInit(): void {
        // TODO
        this.userName = "张三"
        console.log()
    }

    openSettingDrawer() {
        if (this.settingDrawer) {
            this.settingDrawer.drawerInstance.show();
        } else {
            this.settingDrawer = this.drawerService.open({
                drawerContentComponent: PersonalSettingsComponent,
                width: '340px',
                destroyOnHide: false,
                data: {
                    close: () => {
                        if (this.settingDrawer) {
                            this.settingDrawer.drawerInstance.hide();
                        }
                    },
                },
            });
        }
    }

    handleNoticeCount(e: any) {
        console.log(e);
    }

    ngOnDestroy(): void {
        if (this.settingDrawer) {
            this.settingDrawer.drawerInstance.destroy();
            this.settingDrawer = undefined;
        }
    }
}
