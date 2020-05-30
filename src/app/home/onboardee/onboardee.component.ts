import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DataSource} from '@angular/cdk/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-onboardee',
  templateUrl: './onboardee.component.html',
  styleUrls: ['./onboardee.component.css']
})
export class OnboardeeComponent implements OnInit {

  USER_DATA: User[];
  displayedColumns: string[] = ['id', 'name', 'access_level'];
  dataSource = new MatTableDataSource(this.USER_DATA);

  constructor(private userService: UserService) {}


  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {
    this.userService.findAllUsers().subscribe(users => {
      this.USER_DATA = users;
      console.log(users);
    })
    this.dataSource.sort = this.sort;
  }

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }
}
