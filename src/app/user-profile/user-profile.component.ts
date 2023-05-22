import { MemberService } from './../service/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from './../service/alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  id: any;
  divisions = [];
  divisionId: any;

  info: any = {};
  cid: any;
  username: any;
  fname: any;
  lname: any;
  email: any;
  tel: any;
  note: any;
  password: any;
  isEditPassword: any;
  isActived: any = true;

  isUpdate = false;
  isSave = false;
  isShow = false;
  constructor(
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService
  ) {
    this.id = this.route.snapshot.queryParams.id;
  }

  ngOnInit() {
    console.log(this.id);
    this.getDivisions();
    if (this.id) {
      this.isUpdate = true;
      this.getInfo();
    }

  }

  async getDivisions() {
    try {
      const rs: any = await this.memberService.getDivisions();
      if (rs.ok) {
        this.divisions = rs.rows;
      } else {
        this.alertService.serverError();
      }
    } catch (error) {
      this.alertService.error(error);
    }
  }

  async getInfo() {
    try {
      const rs: any = await this.memberService.getInfo(this.id);
      if (rs.ok) {
        this.info = rs.rows;
        this.cid = rs.rows.cid;
        this.username = rs.rows.username;
        this.fname = rs.rows.first_name;
        this.lname = rs.rows.last_name;
        this.email = rs.rows.email;
        this.tel = rs.rows.tel;
        this.note = rs.rows.note;
        this.divisionId = rs.rows.division_id;
        this.password = '';

        this.isActived = rs.rows.is_actived === 'Y' ? true : false;
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
          const obj: any = {};
          this.info.cid !== this.cid ? obj.cid = this.cid : null;
          this.info.username !== this.username ? obj.username = this.username : null;
          this.info.first_name !== this.fname ? obj.firstName = this.fname : null;
          this.info.last_name !== this.lname ? obj.lastName = this.lname : null;
          this.info.email !== this.email ? obj.email = this.email : null;
          this.info.tel !== this.tel ? obj.tel = this.tel : null;
          this.info.note !== this.note ? obj.note = this.note : null;
          this.info.division_id !== this.divisionId ? obj.divisionId = this.divisionId : null;
          (this.info.is_actived === 'Y' ? true : false) !== this.isActived ? obj.isActived = (this.isActived ? 'Y' : 'N') : null;
          this.password.length > 1 ? obj.password = this.password : null;
          const rs: any = await this.memberService.update(this.id, obj);
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
          if (this.username && this.password) {
            const obj: any = {
              cid: this.cid,
              username: this.username,
              firstName: this.fname,
              lastName: this.lname,
              email: this.email,
              tel: this.tel,
              note: this.note,
              password: this.password,
              is_actived: this.isActived ? 'Y' : 'N'
            };

            const rs: any = await this.memberService.add(obj);
            if (rs.ok) {
              this.alertService.success();
              this.router.navigateByUrl(`/users`);
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
  showName() {

  }
}
