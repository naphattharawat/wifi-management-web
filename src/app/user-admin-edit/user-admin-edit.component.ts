import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from './../service/alert.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/service/users.service';

@Component({
  selector: 'app-user-admin-edit',
  templateUrl: './user-admin-edit.component.html',
  styleUrls: ['./user-admin-edit.component.css']
})
export class UserAdminEditComponent implements OnInit {

  
    id: any;
    info: any = {};
    cid: any;
    remark: any;
    isTicket: any = false;
    isManage: any = false;
  
    isUpdate = false;
    isSave = false;

    constructor(
      private alertService: AlertService,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService
    ) {
      this.id = this.route.snapshot.queryParams.id;
    }
  
    ngOnInit() {
      if (this.id) {
        this.isUpdate = true;
        this.getInfo();
      }
  
    }
  
  
    async getInfo() {
      try {
        const rs: any = await this.userService.adminInfo(this.id);
        if (rs.ok) {
          this.info = rs.rows;
          this.cid = rs.rows.cid;
          this.remark = rs.rows.remark;
          this.isTicket = rs.rows.is_ticket === 'Y' ? true : false;
          this.isManage = rs.rows.is_manage === 'Y' ? true : false;
        } else {
          this.alertService.serverError();
        }
      } catch (error) {
        this.alertService.error(error);
      }
    }
  
    async onClickUpdate() {
      try {
        this.isSave = true;
        const confirm = await this.alertService.confirm('คุณต้องการแก้ไขข้อมูล ใช่หรือไม่?');
        if (confirm) {
          if (this.isUpdate) {
            const obj: any = {
              id:this.id
            };
            this.info.cid !== this.cid ? obj.cid = this.cid : null;
            this.info.remark !== this.remark ? obj.remark = this.remark : null;
            (this.info.isTicket === 'Y' ? true : false) !== this.isTicket ? obj.isTicket = (this.isTicket ? 'Y' : 'N') : null;
            (this.info.isManage === 'Y' ? true : false) !== this.isManage ? obj.isManage = (this.isManage ? 'Y' : 'N') : null;

            const rs: any = await this.userService.updateAdmin(obj);
            if (rs.ok) {
              this.alertService.success();
              this.getInfo();
            } else {
              this.alertService.error(rs.error);
            }
            this.isSave = false;
          } else {
            this.alertService.error('เกิดข้อผิดพลาด กรุณา refresh');
            this.isSave = false;
          }
        } else {
          this.isSave = false;
        }
      } catch (error) {
        this.isSave = false;
        this.alertService.error(error);
      }
    }
  
    async onClickAdd() {
      try {
        this.isSave = true;
        const confirm = await this.alertService.confirm('คุณต้องการบันทึกข้อมูล ใช่หรือไม่?');
        if (confirm) {
          if (!this.isUpdate) {
            if (this.cid && this.remark) {
              const obj: any = {
                cid: this.cid,
                remark: this.remark,
                is_ticket: this.isTicket ? 'Y' : 'N',
                is_manage: this.isManage ? 'Y' : 'N'
              };
  
              const rs: any = await this.userService.saveAdmin(obj);
              if (rs.ok) {
                this.alertService.success();
                this.router.navigateByUrl(`/users-admin`);
              } else {
                this.alertService.error(rs.error);
              }
              this.isSave = false;
            } else {
              this.alertService.error('เกิดข้อผิดพลาด กรุณา refresh');
              this.isSave = false;
            }
  
          } else {
            this.alertService.error('ข้อมูลไม่ครบถ้วน');
            this.isSave = false;
          }
        } else {
          this.isSave = false;
        }
      } catch (error) {
        this.isSave = false;
        this.alertService.error(error);
      }
    }
  }
  