import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

// import { ModelDesign } from 'src/app/config/urls-config';

@Injectable({
    providedIn: 'root'
})
export class ModelDesignerService {

    constructor(private http: HttpClient) {
    }

    get getAll(): Promise<any> {
        // return this.http.get<any>(ModelDesign.GET_ALL).toPromise();
        return this.http.get<any>("/").toPromise();
    }

    queryByKey(key: string | number): Promise<any> {
        return this.http.get<any>("/").toPromise();
        // return this.http.get<any>(ModelDesign.QUERY_BY_KEY, {
        //     params: {
        //         key: key
        //     }
        // }).toPromise();
    }


    queryByPage(pageIndex: number, pageSize: number): Promise<any> {
        return this.http.get<any>("/").toPromise();
        // return this.http.get<any>(ModelDesign.QUERY_BY_PAGE, {
        //     params: {
        //         pageIndex: pageIndex,
        //         pageSize: pageSize
        //     }
        // }).toPromise();
    }

}
