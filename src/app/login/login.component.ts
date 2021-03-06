import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  msg: string;
  public myuser: SocialUser;
  private loggedIn: boolean;

  constructor(private router: Router, private loginService: LoginService, private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
    this.loggedIn = this.loginService.isUserLoggedIn();
    if(this.loggedIn)
      this.router.navigate(['home']);
  }

  formGroup: FormGroup;
  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.maxLength(20)])
    });
  }

  loginProcess() {
    console.log("Form valid: ", this.formGroup.valid);
    if (this.formGroup.valid) {
      this.loginService.login(this.formGroup.value).subscribe(
        result => {
          console.log("Login result: ", result);
          // route to home component if success
          if (!(result === null))
            this.router.navigate(['home/ob']);
          else
            this.msg = "Invalid Credentials. Please try again";
        });
    }
  }

  signInWithGoogle(): void {
    console.log("Sign in with google called!");
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then(user => {
      this.myuser = user;
      console.log("google user: ", this.myuser)
      sessionStorage.setItem('name', user.name);

      this.loginService.setAccess(this.myuser.email).subscribe(result => {
        console.log("session store access: ", sessionStorage.getItem('access'));
      })
      this.router.navigate(['home/ob']);
    }).catch(error => {
      this.msg = error + "Please try again";
    });
  }
  signOut(): void {
    console.log("signed out!");
    sessionStorage.removeItem('access');
    this.authService.signOut();
  }
}