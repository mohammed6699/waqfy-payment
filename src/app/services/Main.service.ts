import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MainService {
    baseUrl = environment.baseUrl;
    constructor(
        private http: HttpClient
    ) { }
    
    get<T>(endpoint: string): Observable<T>{
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`)
    }
    post<T>(endpoint: string, body: unknown): Observable<T>{
        return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body)
    }
}