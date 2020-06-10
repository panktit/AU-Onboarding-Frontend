import { Component, OnInit } from '@angular/core';
import { DemandService } from 'src/app/services/demand.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../onboardee/dialog/dialog.component';

@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.css']
})
export class DemandComponent implements OnInit {

  demands: any[];
  constructor(private demandService: DemandService, private dialog: MatDialog) { }
  ngOnInit(): void {
    this.demandService.getAllDemands().subscribe(result => {
      this.demands = result;
      console.log(result);
    });
  }

  openDialog(paramId: number) {
    const dialogConfig = new MatDialogConfig();
    let result = this.demands.filter(demand => demand.ob!= null && demand.ob.id == paramId);
    let upOb = result[0].ob;
    upOb.displayDemand = false;
    dialogConfig.data = upOb;
    dialogConfig.width = '90%';
    this.dialog.open(DialogComponent, dialogConfig);
  }
}
