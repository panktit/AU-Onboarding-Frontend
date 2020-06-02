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
    // this.msg= "";
    // this.authService.authState.subscribe((user) => {
    //   this.myuser = user;
    //   console.log("myuser: " ,this.myuser);
    //   this.loggedIn = (user != null);
    //   console.log("logged in: " ,this.loggedIn);
    //   if(this.loggedIn){
    //     console.log("response received:"+this.myuser);
    //     let userdata: any = {
    //       email: "",
    //       nama: "",
    //     };
    //     console.log("userdata before: " ,userdata);
    //     userdata.email=this.myuser.email;
    //     userdata.name=this.myuser.name;
    //     console.log("userdata after : " ,userdata);
    //     localStorage.setItem('myuser', JSON.stringify(userdata));
    //     localStorage.setItem('loginstatus', JSON.stringify(this.loggedIn));
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
            this.router.navigate(['home']);
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
      this.router.navigate(['home']);
    }).catch(error => {
      this.msg = error + "Please try again";
    });
  }
  signOut(): void {
    console.log("signed out!");
    this.authService.signOut();
  }
}
