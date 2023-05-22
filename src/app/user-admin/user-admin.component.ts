import { UserService } from 'app/service/users.service';
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'app/service/alert.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss']
})
export class UserAdminComponent implements OnInit {

  list = [];
  currentPage = 1;
  limit = 10;
  page: any = 0;
  total = 0;
  query: any = '';
  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private router: Router

  ) { }

  ngOnInit() {
    this.getList();
    this.getTotal();
  }


  async getList() {
    try {
      const rs: any = await this.userService.getAdminList(this.query, this.limit, this.currentPage - 1);
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
      const rs: any = await this.userService.getAdminTotal(this.query);
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
    this.router.navigateByUrl(`/admin-users-admin-edit?id=${i.id}`);
  }

  onClickAdd() {
    this.router.navigateByUrl(`/admin-users-admin-edit`);
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
        const rs: any = await this.userService.deleteAdmin(i.id);
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



}
