import { Component, OnInit, ViewChild, Input } from "@angular/core";
import * as moment from "moment";
import { EvaluationService } from "../evaluation.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { ModalDirective } from "ngx-bootstrap";
import { Alert } from "selenium-webdriver";
import { config } from "src/assets/config";
import { MatPaginator } from "@angular/material";

@Component({
  selector: "app-details-page",
  templateUrl: "./details-page.component.html",
  styleUrls: ["./details-page.component.scss"],
})
export class DetailsPageComponent implements OnInit {
  // ip = environment.ip;
  configFile = config;

  ip: any = this.configFile.ip;
  tableData: any = [];
  headingsList: any = [];
  loading = true;
  reevaluatorRole: any;
  evaluatorRole: any;
  userType: any;
  @Input() startDate: moment.MomentInput;
  title = "shop list";
  userId: any;
  @ViewChild("childModal") childModal: ModalDirective;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedItem: any = {};
  p = 0;
  tableTitle = "";
  params: any = {};
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: EvaluationService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.queryParams.subscribe((p) => {
      console.log("active params", p);
      this.params = p;
    });
  }

  showChildModal(): void {
    this.childModal.show();
  }
  hideChildModal(): void {
    this.childModal.hide();
  }

  setSelectedItem(item) {
    this.selectedItem = item;
  }

  ngOnInit() {
    // this.getTableData();
    this.getData(this.params);
    const that = this;
    const flag = false;
    this.reevaluatorRole = localStorage.getItem("Reevaluator");
    this.evaluatorRole = localStorage.getItem("Evaluator");
    this.userType = localStorage.getItem("user_type");
    document.addEventListener("visibilitychange", function (e) {
      console.log(document.hidden);
      if (!document.hidden) {
        that.getData(that.params);
      }
    });

    this.userId = localStorage.getItem("user_id");
  }

  getData(obj) {
    if (obj.surveyorId) {
      this.httpService.getData(obj).subscribe(
        (data) => {
          // console.log(data);
          this.tableData = data;
          if (this.tableData.length === 0) {
            this.loading = false;
            this.toastr.info("No record found.");
            setTimeout(() => {
              this.router.navigate(["/dashboard/merchandiser_List"]);
            }, 3000);
          }
          this.headingsList = Object.keys(data);
          this.loading = false;
        },
        (error) => {}
      );
    } else {
      console.log("date ", this.startDate);
      const obj = {
        startDate: moment(this.startDate).format("YYYY-MM-DD"),
        endDate: moment(this.startDate).format("YYYY-MM-DD"),
        userType: this.userType,
        evaluatorId: localStorage.getItem("user_id"),
      };
      this.httpService.getData(obj).subscribe(
        (data) => {
          // console.log(data);
          this.tableData = data;
          if (this.tableData.length === 0) {
            this.loading = false;
            this.toastr.info("No record found.");
            setTimeout(() => {
              this.router.navigate(["/dashboard/merchandiser_List"]);
            }, 3000);
          }
          this.headingsList = Object.keys(data);
          this.loading = false;
        },
        (error) => {}
      );
    }
  }

  // getEvaluatorShops() {

  //   const obj = {
  //     startDate:  moment(this.startDate).format('YYYY-MM-DD'),
  //     endDate:  moment(this.startDate).format('YYYY-MM-DD'),
  //     userType: this.userType,
  //     evaluatorId: this.userId

  //   };
  //   this.httpService.getData(obj).subscribe(data => {
  //     // console.log(data);
  //     this.tableData = data;
  //     this.tableData.paginator = this.paginator;
  //     if (this.tableData.length === 0) {
  //       this.loading = false;
  //       this.toastr.info('No record found.');
  //       setTimeout(() => {
  //       this.router.navigate(['/dashboard/merchandiser_List']);

  //       }, 3000);
  //     }
  //   this.headingsList = Object.keys(data);
  //   this.loading = false;

  //   }, error => {});

  // }

  gotoNewPage(item) {
    if (this.userType == this.reevaluatorRole) {
      window.open(
        `${environment.hash}dashboard/evaluation/list/details/${item.survey_id}`,
        "_blank"
      );
    } else if (this.userType == this.evaluatorRole && item.flag == -1) {
      window.open(
        `${environment.hash}dashboard/evaluation/list/details/${item.survey_id}`,
        "_blank"
      );
    } else {
      window.open(
        `${environment.hash}dashboard/evaluation/list/details/${item.survey_id}/${item.shop_id}`,
        "_blank"
      );
    }
  }
}
