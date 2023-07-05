import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient
  ) { }

  async getList(query = '', type = 'WEB', limit = 10, offset = 0) {
    const url = `${this.apiUrl}/member?query=${query}&limit=${limit}&offset=${offset}&type=${type}`;
    const rs: any = await this.http.get(url).toPromise();
    return rs;
  }

  async getTotal(query = '', type = 'WEB') {
    const url = `${this.apiUrl}/member/total?query=${query}&type=${type}`;
    const rs: any = await this.http.get(url).toPromise();
    return rs;
  }

  async getInfo(id) {
    const url = `${this.apiUrl}/member/${id}`;
    const rs: any = await this.http.get(url).toPromise();
    return rs;
  }

  async update(id, data) {
    const url = `${this.apiUrl}/member/${id}`;
    const rs: any = await this.http.put(url, data).toPromise();
    return rs;
  }

  async add(data) {
    const url = `${this.apiUrl}/member`;
    const rs: any = await this.http.post(url, data).toPromise();
    return rs;
  }

  async getDivisions() {
    const url = `${this.apiUrl}/basic/divisions`;
    const rs: any = await this.http.get(url).toPromise();
    return rs;
  }

  async delete(id) {
    const url = `${this.apiUrl}/member/${id}`;
    const rs: any = await this.http.delete(url).toPromise();
    return rs;
  }

  async getCount() {
    const url = `${this.apiUrl}/member/count`;
    const rs: any = await this.http.get(url).toPromise();
    return rs;
  }

  async getInfoHr(cid) {
    const url = `${this.apiUrl}/member/position?cid=${cid}`;
    const rs: any = await this.http.get(url).toPromise();
    return rs;
  }

}
