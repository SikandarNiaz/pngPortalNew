import { Component, OnInit, ViewChild } from "@angular/core";
import { DashboardService } from "../../dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Config } from "src/assets/config";
import { Location } from "@angular/common";

@Component({
  selector: "app-shop-detail",
  templateUrl: "./shop-detail.component.html",
  styleUrls: ["./shop-detail.component.scss"],
})
export class ShopDetailComponent implements OnInit {
  title = "shop list";
  tableData: any = [];
  loading = false;
  // ip= environment.ip

  ip: any = Config.BASE_URI;
  remarksId: any = 0;

  @ViewChild("childModal") childModal: ModalDirective;
  selectedItem: any = {};
  tableTitle = "";
  isExternalUrl: boolean;
  viewType: any;
  shopObject: any;

  constructor(
    private router: Router,
    private httpService: DashboardService,
    public activatedRoute: ActivatedRoute,
    private readonly location : Location
  ) {
    this.location.replaceState("/dashboard/shop_detail");
  }
  showChildModal(): void {
    this.childModal.show();
  }
  goToEvaluation(id) {
    window.open(
      `${environment.hash}dashboard/evaluation/list/details/${id}?location=shop&viewType=${this.viewType}&surveyorType=${this.shopObject?.type || 1}`,
      "_blank"
    );
  }
  hideChildModal(): void {
    this.childModal.hide();
  }

  setSelectedItem(item) {
    this.selectedItem = item;
  }
  ngOnInit() {
    let id = 0;
    let obj;
    const o: any = JSON.parse(localStorage.getItem("obj"));
    this.shopObject= o;
    console.log("obj",o);
    this.activatedRoute.queryParams.subscribe((p) => {
      id = p.id;
      this.remarksId = p.remark_id;
      if (p.viewType == "oos") {
        this.viewType = 2;
        this.shopObject.type = 1;
        obj = {
          startDate: p.startDate,
          endDate: p.endDate,
          merchandiserId: id,
          viewType: this.viewType,

          oosShops : p.oosShops || 'N'
        };
      } else {
        this.viewType = 1;
        obj = {
          zoneId: o.zoneId,
          regionId: o.regionId,
          startDate: o.startDate,
          endDate: o.endDate,
          merchandiserId: id,
          remarksId: this.remarksId,
          viewType: this.viewType,
          type:o.type,
        };
      }

      this.getTableData(obj);
    });
    if (this.remarksId === 1) {
      this.tableTitle = "Successful";
    } else if (this.remarksId === -1) {
      this.tableTitle = "Completed";
    } else if (this.remarksId === 0) {
      this.tableTitle = "Un-Successful";
    }
  }
  getTableData(obj) {
    console.log("req obj: ", obj);
    this.loading = true;
    this.httpService.getTableList(obj).subscribe(
      (data) => {
        console.log(data, "table data");
        const res: any = data;
        // this.dataSource = res;
        if (res != null) {
          this.tableData = res;
          this.setImageUrl();
        }
        this.loading = false;
        // if (res.planned == 0)
        //   this.toastr.info('No data available for current selection', 'Summary')
      },
      (error) => {
        console.log(error, "home error");
      }
    );
  }

  getPdf(item) {
    // debugger
    const obj = {
      surveyId: item.surveyId,
      type: 25,
      shopName: item.shopName,
    };
    const url = "url-pdf";
    this.httpService.DownloadResource(obj, url);
  }

  setImageUrl() {
    for (const element of this.tableData) {
      if (element.shopFullImg != null) {
        if (element.shopFullImg.indexOf("amazonaws.com") >= 0 || element.shopFullImg.indexOf("http") >= 0) {
          this.isExternalUrl = true;
        }
      }
    }
  }
}
