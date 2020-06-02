import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { OnboardeeService } from 'src/app/services/onboardee.service';
import { Onboardee } from 'src/app/models/onboardee';

@Component({
  selector: 'app-onboardee',
  templateUrl: './onboardee.component.html',
  styleUrls: ['./onboardee.component.css']
})
export class OnboardeeComponent implements OnInit {

  data: Onboardee[];
  displayedColumns: string[] = ['id', 'name', 'email', 'mno', 'joiningCity', 'obStatus', 'eta', 'actions'];
  dataSource;

  constructor(private onboardeeService: OnboardeeService) { }


  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.onboardeeService.findAllOnboardees().subscribe(users => {
      this.data = users;
      console.log(users);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
    })
  }

  delete(id:number) {
    console.log("deleted entry: ",id);
    this.onboardeeService.deleteOnboardee(id).subscribe(res => {
      console.log(res);
      this.refreshList();
    });
  }

  refreshList() {
    this.onboardeeService.findAllOnboardees().subscribe(users => {
      this.data = users;
      this.dataSource = new MatTableDataSource(this.data);
     }, err => {
       console.log(err);
    });
   }
}
