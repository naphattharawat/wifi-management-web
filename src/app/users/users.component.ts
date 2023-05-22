import { AlertService } from './../service/alert.service';
import { MemberService } from './../service/member.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  list: any = [];
  currentPage = 1;
  limit = 10;
  page: any = 0;
  total = 0;
  query: any = '';
  type: Array<any> = [
    { name: 'Web', value: 'WEB', checked: false },
    { name: 'MyMOPH', value: 'MYMOPH', checked: false },
    { name: 'ThaiD', value: 'THAID', checked: false },
    { name: 'Ticket', value: 'PUBLIC', checked: false }
  ];
  constructor(
    private alertService: AlertService,
    private memberService: MemberService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getType();
    this.getList();
    this.getTotal();
  }


  async getList() {
    try {
      const type = _.map(_.filter(this.type, { 'checked': true }), (t) => {
        return t.value;
      }).join(',');
      const rs: any = await this.memberService.getList(this.query, type, this.limit, this.limit * (this.currentPage - 1));
      if (rs.ok) {
        this.list = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);

      this.alertService.error(error);
    }
  }

  async getTotal() {
    try {
      const type = _.map(_.filter(this.type, { 'checked': true }), (t) => {
        return t.value;
      }).join(',');
      const rs: any = await this.memberService.getTotal(this.query, type);
      if (rs.ok) {
        this.total = rs.count;
        this.page = Math.round(rs.count / this.limit);
        if (this.page == 0) {
          this.page = 1;
        }
        console.log(this.page, rs.count);

      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      console.log(error);
      this.alertService.error(error);
    }
  }

  edit(i) {
    this.router.navigateByUrl(`/admin-user-profile?id=${i.id}`);
  }

  onClickAdd() {
    this.router.navigateByUrl(`/admin-user-profile`);
  }

  onKeySearch(e) {
    if (e.keyCode === 13) {
      this.currentPage = 1;
      this.getTotal();
      this.getList();
    }
  }

  onClickSearch() {
    this.currentPage = 1;
    this.getTotal();
    this.getList();
  }

  async onClickRemove(i) {
    try {
      const confirm = await this.alertService.confirm('คุณต้องการลบ ใช่หรือไม่ ?');
      if (confirm) {
        const rs: any = await this.memberService.delete(i.id);
        if (rs.ok) {
          this.getList();
          this.alertService.success();
        } else {
          this.alertService.error(rs.error);
        }
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  onNextPage() {
    if (this.currentPage < this.page) {
      this.currentPage++;
      this.getList();
    }
  }
  onBackPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getList();
    }
  }

  onClickPage(page) {
    this.currentPage = page;
    this.getList();
  }

  getType() {
    const type = localStorage.getItem('admin-users-type');
    if (type) {
      for (const t of type.split(',')) {
        const idx = _.findIndex(this.type, { 'value': t });
        this.type[idx].checked = true;
      }
    } else {
      this.type[0].checked = true;
    }
  }

  onSelectType(e) {
    const idx = _.findIndex(this.type, { 'value': e.target.value });
    if (idx > -1) {
      this.type[idx].checked = e.target.checked;
      const type = _.map(_.filter(this.type, { 'checked': true }), (t) => {
        return t.value;
      }).join(',');
      localStorage.setItem('admin-users-type', type);
      this.getTotal();
      this.getList();
    }
  }

}
