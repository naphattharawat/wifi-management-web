import { LoginService } from './../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent implements OnInit {

  code: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService
  ) {
    this.code = this.route.snapshot.queryParams.code;
  }

  ngOnInit(): void {
    if (this.code) {
      this.getToken();
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  async getToken() {
    const rs: any = await this.loginService.login(this.code);
    if (rs.ok) {
      localStorage.setItem('token', rs.token);
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/login');
    }

  }
}
