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
    private router: Router
  ) { }

  ngOnInit(): void {
    const nanoid = customAlphabet('1234567890', 18)
    const state = nanoid();
    const token = localStorage.getItem('token');
    const url = `https://auth.moph.go.th/v1/oauth2/auth?client_id=ApUtHyVQeEkSXaFvkuTV&response_type=code&state=${state}`;
    if (token) {
      if (this.jwtHelperService.isTokenExpired(token)) {
        window.location.href = url;
      } else {
        this.router.navigate(['/admin']);
      }
    } else {
      window.location.href = url;
    }

  }

}
