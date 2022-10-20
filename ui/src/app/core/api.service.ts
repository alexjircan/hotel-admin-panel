import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private $http: HttpClient) { }

    get(url: string, options?: any): Observable<any> {
        return this.$http.get(`${environment.api.base}${url}`, options);
    }

    post(url: string, body: any | null, options?: any ): Observable<any> {
        return this.$http.post(`${environment.api.base}${url}`, body, options);
    }
}