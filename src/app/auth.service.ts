import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
    //  console.log(environment.apiBaseUrl);
  }

  getDetails() {
    const Headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get(this.apiBaseUrl, { headers: Headers });
  }
}
