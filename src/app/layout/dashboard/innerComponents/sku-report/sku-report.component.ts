import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { DashboardDataService } from "../../dashboard-data.service";
import { Config } from "src/assets/config";
import { ToastrService } from "ngx-toastr";
import { DashboardService } from "../../dashboard.service";
import * as moment from "moment";
import { NgModel } from "@angular/forms";

@Component({
  selector: 'app-sku-report',
  templateUrl: './sku-report.component.html',
  styleUrls: ['./sku-report.component.scss']
})
export class SkuReportComponent implements OnInit {
  title = "KBD Reports";
  skuList:any = [];
  loading = false;
  titleList: any = [];
  selectedTitleFilter: any = {};
  selectedYearFilter: any = {};
  selectedMonthFilter: any = {};
  Title: any = [];
  visitedShops: any = [];
  loadingData: boolean;
  ip: any = Config.BASE_URI;

  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    private dataService: DashboardDataService,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getSkuList();
    console.log("list",this.getSkuList)
    
  }

  getSkuList() {
    this.skuList = [];
    this.httpService.getDistinctSkuList().subscribe(
      (data) => {
        if (data) {
          this.skuList = data;
          console.log("this.skuList",this.skuList)
        }
      },
      (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
  }
}
