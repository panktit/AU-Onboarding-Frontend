import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

import { OnboardeeService } from 'src/app/services/onboardee.service';
import { Onboardee } from 'src/app/models/onboardee';
import { DialogComponent } from './dialog/dialog.component';
import { DemandService } from 'src/app/services/demand.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-onboardee',
  templateUrl: './onboardee.component.html',
  styleUrls: ['./onboardee.component.css']
})
export class OnboardeeComponent implements OnInit {

  data: Onboardee[];
  displayedColumns: string[] = ['id', 'name', 'email', 'mno', 'joiningCity', 'obStatus', 'last_modified', 'actions'];
  dataSource;
  name;

  constructor(private onboardeeService: OnboardeeService, private demandService: DemandService,private dialog: MatDialog) { }


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;

  ngOnInit() {
    this.onboardeeService.findAllOnboardees().subscribe(users => {
      this.data = users;
      console.log(users);
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.name = sessionStorage.getItem('name');
  }

  openDialog(paramId: number) {
    const dialogConfig = new MatDialogConfig();

    // get that record from users list
    let result = this.data.filter(user => user.id == paramId);

    // passing data to the view component
    let upOb:any = result[0];
    upOb.displayDemand = true;
    dialogConfig.data = upOb;
    dialogConfig.width = '120%';
    this.dialog.open(DialogComponent, dialogConfig);
  }

  delete(ob: Onboardee) {
    console.log("deleted entry: ", ob);
    // if (confirm("Are you sure to delete " + ob.name+"?")) {
      this.onboardeeService.deleteOnboardee(ob.id).subscribe(res => {
        console.log(res);
        this.onboardeeService.saveDeleteLog(ob.id, ob.name);
        this.refreshList();
      });
    // }
  }

  filter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  refreshList() {
    this.onboardeeService.findAllOnboardees().subscribe(users => {
      this.data = users;
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, err => {
      console.log(err);
    });
  }
}
