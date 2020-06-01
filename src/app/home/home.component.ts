import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  user;
  ngOnInit(): void {
    if(localStorage.getItem('myuser')) {
      this.user = JSON.parse(localStorage.getItem('myuser'));
      console.log("user: " ,this.user );
    }
    console.log("logged in: " , localStorage.getItem('loginstatus'));
  }

}
