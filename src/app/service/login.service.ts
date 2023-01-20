import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient
  ) { }

  async login(code) {
    const url = `${this.apiUrl}/login`;
    const rs: any = await this.http.post(url, { code }).toPromise();
    return rs;
  }
}
