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

  async redirect() {
    const url = `${this.apiUrl}/login/redirect`;
    console.log(url);
    
    const rs: any = await this.http.get(url).toPromise();
    console.log(rs);
    
    return rs;
  }


}
