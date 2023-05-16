import { LoginService } from './../service/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { customAlphabet } from 'nanoid'
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private jwtHelperService: JwtHelperService,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const nanoid = customAlphabet('1234567890', 18)
    const state = nanoid();
    const token = localStorage.getItem('mnm-token') || '';
    if (token) {
      if (this.jwtHelperService.isTokenExpired(token)) {
        // this.login();
      } else {
        this.router.navigate(['/admin']);
      }
    } else {
      // this.login();
    }

  }

  async login() {
    try {
      const rs: any = await this.loginService.redirect();
      console.log(rs);
      
      if (rs.ok) {
        window.location.href = rs.url;
      }

    } catch (error) {
      console.log('error', error);

    }
  }

}
