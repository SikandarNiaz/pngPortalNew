import { Component, OnInit, ViewChild } from "@angular/core";
import { DashboardService } from "../../dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Config } from "src/assets/config";
import { Location } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import * as moment from "moment";

@Component({
  selector: "app-shop-detail-ir-assettypes-component",
  templateUrl: "./shop-detail-ir-assettypes-component.html",
  styleUrls: ["./shop-detail-ir-assettypes-component.scss"],
})
export class ShopDetailIRAssetTypesComponent implements OnInit {
  title = "shop detail ir";
  tableData: any;
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
  regions: any = [];
  zones: any = [];
  clusterList: any = [];
  selectedZone: any = {};
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate = new Date();
  endDate = new Date();
  selectedRegion: any = {};

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private httpService: DashboardService,
    public activatedRoute: ActivatedRoute,
    private readonly location : Location
  ) {
    // this.location.replaceState("/dashboard/shop_detail");
    this.zones = JSON.parse(localStorage.getItem("zoneList"));
    this.clusterList = JSON.parse(localStorage.getItem("clusterList"));
  }
  showChildModal(): void {
    this.childModal.show();
  }
  goToEvaluationIR(id, assetTypeId) {
    //  const chromeOptions = '--user-data-dir="C://Chrome dev session" --disable-web-security';
    window.open(
      `${environment.hash}dashboard/evaluation/list/details_ir?surveyId=${id}&assetTypeId=${assetTypeId}`,
      "_blank"
      // "_blank",chromeOptions
    );
  }
  hideChildModal(): void {
    this.childModal.hide();
  }

  setSelectedItem(item) {
    this.selectedItem = item;
  }
  ngOnInit() {
    // let id = 0;
    // let obj;
    // const o: any = JSON.parse(localStorage.getItem("obj"));
    // this.shopObject= o;
    // console.log("obj",o);
    // this.activatedRoute.queryParams.subscribe((p) => {
    //   id = p.id;
    //   this.remarksId = p.remark_id;
    //   if (p.viewType == "oos") {
    //     this.viewType = 2;
    //     this.shopObject.type = 1;
    //     obj = {
    //       startDate: p.startDate,
    //       endDate: p.endDate,
    //       merchandiserId: id,
    //       viewType: this.viewType,

    //       oosShops : p.oosShops || 'N'
    //     };
    //   } else {
    //     this.viewType = 1;
    //     obj = {
    //       zoneId: o.zoneId,
    //       regionId: o.regionId,
    //       startDate: o.startDate,
    //       endDate: o.endDate,
    //       merchandiserId: id,
    //       remarksId: this.remarksId,
    //       viewType: this.viewType,
    //       type:o.type,
    //     };
    //   }

    //   this.getTableData(obj);
    // });
    // if (this.remarksId === 1) {
    //   this.tableTitle = "Successful";
    // } else if (this.remarksId === -1) {
    //   this.tableTitle = "Completed";
    // } else if (this.remarksId === 0) {
    //   this.tableTitle = "Un-Successful";
    // }
  }
  getTableData() {
   
    this.loading = true;
    const obj = {
      startDate: moment(this.startDate).format("YYYY-MM-DD"),
      endDate: moment(this.endDate).format("YYYY-MM-DD"),
      zoneId: this.selectedZone.id || -1,
      regionId: this.selectedRegion.id || -1,
      // channelId: this.arrayMaker(this.selectedChannel),
      // shopCode: this.shopCode,
      // detail : 'N',
      // // shopProfile : this.selectedShopProfile?.title || 'All',
      // supervisorIds: this.arrayMaker(this.selectedSupervisor) || -1,

    };
    this.httpService.getTableListIR(obj).subscribe(
      (data: any) => {
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

  zoneChange() {
    this.loading = true;

    this.httpService.getRegion(this.selectedZone.id).subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.regions = res;
        } else {
          this.clearLoading();

          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }

        setTimeout(() => {
          this.loading = false;
        }, 500);
      },
      (error) => {
        this.clearLoading();
      }
    );
  }

  clearLoading() {
    this.loading = false;
  }
}
