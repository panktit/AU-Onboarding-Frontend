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

  loginstatus:boolean;

  constructor(private router: Router, private loginService: LoginService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loginstatus = JSON.parse(localStorage.getItem('loginstatus'));
    console.log("Login in header: ", this.loginstatus);
  }
  signOut(): void {
    console.log("signed out!");
    localStorage.removeItem('myuser');
    localStorage.setItem('loginstatus', JSON.stringify(false));
    this.authService.signOut();
    this.router.navigate(['']);
  }
}
