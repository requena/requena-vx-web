import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { }

  buildPath(path: string, params?: any) {
    // let url = `${this.auth.baseUrl}${path}`;
    let url = `http://localhost:3000/${path}`;
    if (params) {
      const arr = [];
      for (const p of params) {
        arr.push(`${p}=${params[p]}`);
      }
      url = `${url}?${arr.join('&')}`;
    }
    return url;
  }

  headers() {
    const header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    header.append('Accept', 'application/json');
    return header;
  }

  parseResponse(ret: any) {
    return JSON.parse(ret.data);
  }

  parseResponseAsText(ret: any) {
    return ret.data;
  }

  post(path: string, body: any, params?: any, responseAsText?: boolean) {
    let responseType: any = 'json';
    if (responseAsText) {
      responseType = 'text';
    }
    const headers = this.headers();
    return this.httpClient.post(this.buildPath(path), body,
      {
        withCredentials: true, headers: headers, responseType: responseType
      }).toPromise();
  }

  put(path: string, body: any, params?: any, responseAsText?: boolean) {
    let responseType: any = 'json';
    if (responseAsText) {
      responseType = 'text';
    }
    const headers = this.headers();
    return this.httpClient.put(this.buildPath(path), body,
      {
        withCredentials: true, headers: headers, responseType: responseType
      }).toPromise();
  }

  get(path: string, params?: any, responseAsText?: boolean) {
    let responseType: any = 'json';
    if (responseAsText) {
      responseType = 'text';
    }

    const headers = this.headers();
    return this.httpClient.get(this.buildPath(path),
      {
        withCredentials: true, headers: headers, responseType: responseType
      }).toPromise();
  }
}

