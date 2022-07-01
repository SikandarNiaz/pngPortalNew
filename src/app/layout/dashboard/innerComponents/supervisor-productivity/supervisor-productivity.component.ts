import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-supervisor-productivity',
  templateUrl: './supervisor-productivity.component.html',
  styleUrls: ['./supervisor-productivity.component.scss']
})
export class SupervisorProductivityComponent implements OnInit {
  title = "";
  labels: any;

  constructor(public router: Router) {
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
    if (this.router.url == "/dashboard/supervisor-productivity") {
      this.title = "Supervisor Productivity";
    } else {
      this.title = this.labels.surveyorLabel + " supervisor_productivity";
    }
  }

  ngOnInit() {
  }

}
