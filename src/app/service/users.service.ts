import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient
  ) { }

  async getAdminList(query = '', limit = 10, offset = 0) {
    const url = `${this.apiUrl}/users/admin?query=${query}&limit=${limit}&offset=${offset}`;
    const rs: any = await this.http.get(url).toPromise();
    return rs;
  }

  async getAdminTotal(query = '', type = 'WEB') {
    const url = `${this.apiUrl}/users/admin/total?query=${query}&type=${type}`;
    const rs: any = await this.http.get(url).toPromise();
    return rs;
  }


  async adminInfo(id) {
    const url = `${this.apiUrl}/users/admin/info?id=${id}`;
    const rs: any = await this.http.get(url).toPromise();
    return rs;
  }

  async deleteAdmin(id) {
    const url = `${this.apiUrl}/users/admin`;
    const rs: any = await this.http.delete(url).toPromise();
    return rs;
  }
  async updateAdmin(data) {
    const url = `${this.apiUrl}/users/admin`;
    const rs: any = await this.http.put(url, data).toPromise();
    return rs;
  }

  async saveAdmin(data) {
    const url = `${this.apiUrl}/users/admin`;
    const rs: any = await this.http.post(url, data).toPromise();
    return rs;
  }

}
