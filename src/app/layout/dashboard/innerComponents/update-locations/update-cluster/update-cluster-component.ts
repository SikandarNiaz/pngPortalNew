import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  AfterViewInit,
} from "@angular/core";
import { DashboardService } from "../../../dashboard.service";
import { DashboardDataService } from "../../../dashboard-data.service";
import { Router } from "@angular/router";
import {
  FormBuilder,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import * as _ from "lodash";
import { Config } from "src/assets/config";

@Component({
  selector: "app-cluster-location",
  templateUrl: "./update-cluster-component.html",
  styleUrls: ["./update-cluster-component.scss"],
})
export class UpdateClusterComponent implements OnInit, AfterViewInit {
  @Output("dataEmitter") dataEmitter: any = new EventEmitter<any>();
  // @ViewChild("tabGroup") tabGroup;

  selectedTabIndex: any;

  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    private dataService: DashboardDataService,
    public formBuilder: FormBuilder
  ) {
    this.clusterList = JSON.parse(localStorage.getItem("clusterList"));
    this.projectType = localStorage.getItem("projectType");
    this.clusterId = localStorage.getItem("clusterId") || -1;
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));

    this.accessProperties = JSON.parse(
      localStorage.getItem("accessProperties")
    );
  }

  labels: any;
  ip: any = Config.BASE_URI;
  projectType: any;
  loadingData: boolean;

  loading = true;
  sortOrder = true;
  sortBy: "completed";

  clusterList: any = [];
  selectedCluster: any = {};

  clusterId: any;

  accessProperties: any;

  clearAllSections() {
    this.selectedCluster = {};
  }
  ngOnInit() {
    // this.mustHaveAll = this.dataService.getYesNoAll();
  }

  ngAfterViewInit() {
    // this.selectedTabIndex = this.tabGroup.selectedIndex;
    // console.log("selectedTabIndex: ", this.selectedTabIndex);
  }

  tabChanged(event) {
    // this.selectedTabIndex = event.index;
    // console.log("selectedTabIndex: ", this.selectedTabIndex);
  }

  clearLoading() {
    this.loading = false;
    this.loadingData = false;
  }
}
