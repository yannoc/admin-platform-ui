import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from '../services/store/session-storage.service';
import { TabRouteReuseService } from './tab-route-reuse.service';
import { ThemeChangerService } from "../components/theme/theme-changer.service";

@Component({
    selector: 'cs-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {

    isCollapsed = false;
    sites = [{
        title: '首页',
        index: '0',
        menus: [{
            title: '工作空间',
            link: '',
            siteIndex: '0',
            children: [{
                title: '待办列表',
                link: '/home/task',
                siteIndex: '0'
            }, {
                title: '消息通知',
                link: '/home/notice',
                siteIndex: '0'
            }]
        }, {
            title: '数据管理',
            link: '',
            siteIndex: '0',
            children: [{
                title: '试验任务',
                link: '/data/grid/TestTask',
                siteIndex: '0'
            }, {
                title: '试验报告',
                link: '/data/grid/TestReport',
                siteIndex: '0'
            }, {
                title: '试验任务 - 1',
                link: '/data/detail/TestTask/1',
                siteIndex: '0'
            }, {
                title: '试验任务 - 2',
                link: '/data/detail/TestTask/2',
                siteIndex: '0'
            }]
        }]
    }, {
        title: '系统管理',
        index: '1',
        menus: [{
            title: '账户管理',
            link: '',
            siteIndex: '1',
            children: [{
                title: '用户管理',
                link: '/account/user',
                siteIndex: '1'
            }, {
                title: '角色管理',
                link: '/account/role',
                siteIndex: '1'
            }]
        }, {
            title: '模型设计器',
            link: '/system/model-designer',
            siteIndex: '1',
        }, {
            title: '数据编辑器',
            link: '/system/data-editor',
            siteIndex: '1',
        }, {
            title: '流程监视器',
            link: '/workflow/monitor/1',
            siteIndex: '1',
        }]
    }];
    menus: any[] = []
    siteIndex: string | number = 0;
    tabs: Array<any>;
    tabIndex: number | string = 0;
    rightClickTabIndex = 0;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private themeService: ThemeChangerService,
                private tabService: TabRouteReuseService,
                private sessionStore: SessionStorageService) {
        // 初始化主题
        this.themeService.initTheme()
        // 初始化布局，主要是从布局配置中设置菜单等的展现形式

        // 初始化选项卡
        this.tabs = this.tabService.tabs;
    }

    ngOnInit(): void {
        if (this.sessionStore.get('tabs')) {
            this.tabs.push(...this.sessionStore.get('tabs'));
            this.tabIndex = this.sessionStore.get('tabIndex');
        }
        if (this.tabs.length == 0) {
            // TODO 考虑通过初次登录加载页进行初始化
            // 如果由浏览器地址直接跳转某路由页面：
            // 根据url先从菜单中查找，如果没有自行构建：link = path; siteIndex = 0，由content component更新title
            // const path = this.tabService.getRoutePath(this.route.snapshot);
            // this.tabs.push(this.sites[0].menus[0].children[0]);
        }
        const site = this.sites.find(s => s.index == this.siteIndex)
        if (site) {
            this.menus = site.menus;
        }
    }

    onSiteChanged(activeId: string | number) {
        const site = this.sites.find(s => s.index == activeId)
        if (site) {
            this.menus = site.menus;
        }
    }

    addTab(e: any) {
        const menu = e.item;
        let hasTab = false;
        for (let tab of this.tabs) {
            if (tab.link === menu.link) {
                hasTab = true;
                break;
            }
        }
        if (!hasTab) {
            this.tabs.push(menu);
        }
        this.tabIndex = menu.title
    }

    closeTab(tab: any, type?: string) {
        const index = this.tabs.indexOf(tab);
        switch (type) {
            case 'left':
                for (let i = index - 1; i >= 0; i--) {
                    this.tabService.removeCache(this.tabs[i].link);
                    this.tabs.splice(i, 1);
                }
                break;
            case 'right':
                for (let i = this.tabs.length - 1; i > index; i--) {
                    this.tabService.removeCache(this.tabs[i].link);
                    this.tabs.splice(i, 1);
                }
                break;
            case 'other':
                for (let i = this.tabs.length - 1; i >= 0; i--) {
                    if (i === index) {
                        continue;
                    }
                    this.tabService.removeCache(this.tabs[i].link);
                    this.tabs.splice(i, 1);
                }
                break;
            default:
                this.tabService.removeCache(tab.link);
                this.tabs.splice(index, 1);
        }
        this._tabIndexChange();
        setTimeout(() => {
            // let tab = this.tabs[index - 1];
            // if (!tab) {
            //     // 如果上一个没有下一个选中
            //     tab = this.tabs[index];
            // }
            // this.router.navigate([tab.route, tab.id]).then(r => {
            // });

            let tab = this.tabs.find(t => t.title == this.tabIndex);
            if (!tab) {
                tab = this.tabs[index - 1] || this.tabs[index + 1]
                this.router.navigate([tab.link]).then(r => {
                    // 路由切换成功切换active tab
                    this.tabIndex = tab.title
                }).catch(e => {
                    // 路由切换失败，异常提醒
                });
            }
        });
    }

    // contextMenu($event: MouseEvent, tabDropdownMenu: NzDropdownMenuComponent, index: number) {
    //     this.rightClickTabIndex = index;
    //     this.nzContextMenuService.create($event, tabDropdownMenu);
    // }

    refreshTab(index: number) {
        this.router.navigate(['/'], {skipLocationChange: true}).then(() => {
            this.tabService.removeCache(this.tabs[index].link);
            this.router.navigate([this.tabs[index].link]).then();
        });
    }

    onActiveTabChange(e: string | number) {
        const tab = this.tabs.find(t => t.title == e)
        this.siteIndex = tab.siteIndex;
        const site = this.sites.find(s => s.index == this.siteIndex)
        if (site) {
            this.menus = site.menus;
        }
    }

    private _tabIndexChange() {
        this.sessionStore.set('tabs', this.tabs);
        this.sessionStore.set('tabIndex', this.tabIndex);
    }
}
