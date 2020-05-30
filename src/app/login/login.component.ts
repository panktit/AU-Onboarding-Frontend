import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError : boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  formGroup: FormGroup;
  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.maxLength(20)])
    });
  }

  loginProcess() {
    console.log(this.formGroup.valid);
    if(this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(result => {
        console.log(result);
        // route to home component
        this.router.navigate(['home']);
      })
    }
  }

  googleLogin() {
    // this.authService.googleLogin().subscribe(result => {
    //   console.log(result);
    //   this.router.navigate(['home']);
    // })
    window.location.href='http://localhost:8080/';
  }
}
