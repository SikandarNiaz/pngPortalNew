import { Component, OnInit, ViewChild, Input } from "@angular/core";
import * as moment from "moment";
import { EvaluationService } from "../evaluation.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { ModalDirective } from "ngx-bootstrap";
import { Alert } from "selenium-webdriver";
import { Config } from "src/assets/config";
import { MatPaginator } from "@angular/material";

@Component({
  selector: "app-details-page",
  templateUrl: "./details-page.component.html",
  styleUrls: ["./details-page.component.scss"],
})
export class DetailsPageComponent implements OnInit {
  // ip = environment.ip;

  ip: any = Config.BASE_URI;
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
  isExternalUrl: boolean;
  isQCRequest: boolean;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: EvaluationService,
    private activeRoute: ActivatedRoute
  ) {
    this.reevaluatorRole = localStorage.getItem("Reevaluator");
    this.evaluatorRole = localStorage.getItem("Evaluator");
    this.userType = localStorage.getItem("user_type");
    this.userId = localStorage.getItem("user_id");

    if (
      this.userType != null &&
      (this.userType == this.evaluatorRole ||
        this.userType == this.reevaluatorRole)
    ) {
      this.isQCRequest = true;
    }
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
    const obj1 = {
      surveyorId: obj.surveyorId || -1,
      startDate: obj.startDate || null,
      endDate: obj.endDate || null,
      userType: this.userType || -1,
      evaluatorId: this.userId ? (this.isQCRequest ? this.userId : -1) : -1,
      areaId: obj.areaId || -1,
    };
    this.httpService.getData(obj1).subscribe(
      (data) => {
        // console.log(data);
        this.tableData = data;
        if (this.tableData.length === 0) {
          this.loading = false;
          this.toastr.info("No record found.");
          setTimeout(() => {
            this.router.navigate(["/dashboard/merchandiser_List"]);
          }, 3000);
        } else {
          this.setImageUrl();
        }
        this.headingsList = Object.keys(data);
        this.loading = false;
      },
      (error) => {}
    );
  }

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
  setImageUrl() {
    for (const element of this.tableData) {
      if (element.shop_image_url != null) {
        if (element.shop_image_url.indexOf("amazonaws.com") >= 0 || element.shop_image_url.indexOf("http") >= 0) {
          this.isExternalUrl = true;
        }
      }
    }
  }
}
