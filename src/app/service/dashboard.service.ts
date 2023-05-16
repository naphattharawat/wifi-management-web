import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    @Inject('API_URL') private apiUrl: string,
    private http: HttpClient
  ) { }

  async getCount() {
    const url = `${this.apiUrl}/member/count`;
    const rs: any = await this.http.get(url).toPromise();
    return rs;
  }

  async getCountThaid() {
    const url = `${this.apiUrl}/member/count/thaid`;
    const rs: any = await this.http.get(url).toPromise();
    return rs;
  }
  async getCountTicket() {
    const url = `${this.apiUrl}/member/count/ticket`;
    const rs: any = await this.http.get(url).toPromise();
    return rs;
  }
}
