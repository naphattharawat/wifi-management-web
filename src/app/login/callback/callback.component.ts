import { JwtHelperService } from '@auth0/angular-jwt';
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
    private loginService: LoginService,
    private jwtHelperService: JwtHelperService
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
      // is_management
      const result = await this.jwtHelperService.decodeToken(rs.token);
      if (result.is_management) {
        localStorage.setItem('mnm-token', rs.token);
        this.router.navigateByUrl('/admin-dashboard');
      } else {
        this.router.navigateByUrl('/login');
      }

    } else {
      this.router.navigateByUrl('/login');
    }

  }
}
