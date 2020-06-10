import { Component, OnInit } from '@angular/core';
import { DemandService } from 'src/app/services/demand.service';

@Component({
  selector: 'app-demand',
  templateUrl: './demand.component.html',
  styleUrls: ['./demand.component.css']
})
export class DemandComponent implements OnInit {

  demands: any[];
  constructor(private demandService: DemandService) { }
  ngOnInit(): void {
    this.demandService.getAllDemands().subscribe(result => {
      this.demands = result;
      console.log(result);
    });
  }

}
