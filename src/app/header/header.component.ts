import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

import { AuthService } from 'angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn: boolean;

  constructor(private router: Router, private loginService: LoginService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedIn = this.loginService.isUserLoggedIn();
    console.log("Logged in header: ", this.loggedIn);
  }
}
