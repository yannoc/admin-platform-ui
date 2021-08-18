import { ActivatedRouteSnapshot, BaseRouteReuseStrategy, DetachedRouteHandle } from '@angular/router';
import { Injectable } from '@angular/core';

/**
 * 标签路由缓存服务
 */
@Injectable({
    providedIn: 'root'
})
export class TabRouteReuseService extends BaseRouteReuseStrategy {
    public tabs: Array<TabConfig> = [];
    private cacheRouters = new Map<string, DetachedRouteHandle>();
    private waitDelete: string | null = null;

    /**
     * 是否生成路由待缓存数据
     * 当path在tabs中时缓存
     * @param route
     */
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        for (let tab of this.tabs) {
            if (tab.link === this.getRoutePath(route)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 将生成的待缓存数据加入缓存中
     * @param route
     * @param handle
     */
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        if (this.waitDelete && this.waitDelete == this.getRoutePath(route)) {
            this.waitDelete = null
            return;
        }
        if (handle) {
            this.cacheRouters.set(this.getRoutePath(route), handle);
        }
    }

    /**
     * 是否还原该路由
     * 当缓存中存在该path时还原
     * @param route
     */
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return this.cacheRouters.has(this.getRoutePath(route));
    }

    /**
     * 获取路由对应缓存数据
     * @param route
     */
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        return this.cacheRouters.get(this.getRoutePath(route)) || null;
    }

    /**
     * 路由跳转时，判断是否启用内置路由复用策略
     * 当path完全相同时才启用
     * @param future
     * @param curr
     */
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig &&
            JSON.stringify(future.params) === JSON.stringify(curr.params);
    }

    /**
     * 删除path缓存
     * @param path
     */
    removeCache(path: string) {
        if (this.cacheRouters.has(path)) {
            const handle: any = this.cacheRouters.get(path);
            try {
                handle.componentRef.destory();
            } catch (e) {
            }
            this.cacheRouters.delete(path);
        } else {
            this.waitDelete = path;
        }
    }

    getRoutePath(route: ActivatedRouteSnapshot): string {
        let fullRouteUrlPath: string[] = [];
        route.pathFromRoot.forEach((item: ActivatedRouteSnapshot) => {
            fullRouteUrlPath = fullRouteUrlPath.concat(item.url.map(urlSegment => urlSegment.path));
        });
        return '/' + fullRouteUrlPath.join('/');
    }
}

export class TabConfig {
    title!: string;
    link!: string;
    siteIndex!: number
}
