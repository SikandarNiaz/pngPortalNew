import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supervisor-change-log-report',
  templateUrl: './supervisor-change-log-report.component.html',
  styleUrls: ['./supervisor-change-log-report.component.scss']
})
export class SupervisorChangeLogReportComponent implements OnInit {
  title = 'supervisor change log Report';
  constructor() { 
    console.log("chnage: ");
  }

  ngOnInit() {
  }

}
