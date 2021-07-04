import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get(path: string)
  {
    return this.http.get(path);
  }

  post(path: string, data: object) {
    return this.http.post(path,data);
  }

  delete(path: string) {
    return this.http.delete(path);
  }

  put(path:string,data: object) {
    return this.http.put(path,data);
  }
}
