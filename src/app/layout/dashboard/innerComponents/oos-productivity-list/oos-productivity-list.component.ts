import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../../dashboard.service";
import * as moment from "moment";
import { environment } from "src/environments/environment";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-oos-productivity-list",
  templateUrl: "./oos-productivity-list.component.html",
  styleUrls: ["./oos-productivity-list.component.scss"],
})
export class OosProductivityListComponent implements OnInit {
  title = "merchandiser List";
  minDate = new Date(2000, 0, 1);
  maxDate: any = new Date();
  startDate: any = new Date();
  endDate = new Date();
  loadingReportMessage = false;
  selectedEvaluator: any = {};
  evaluatorList: any = [];
  userTypeId: any;
  ReEvaluatorId: any;
  userId: any;
  merchandiserList: any = [];
  loading = true;
  loadingData: boolean;
  cardLoading: boolean;
  evaluationSummary: any;
  p = 1;
  sortOrder = true;
  sortBy: "m_code";
  constructor(
    private httpService: DashboardService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadingData = false;
    this.userTypeId = localStorage.getItem("user_type");
    this.getMerchandiserList();
    this.sortIt("m_code");
    this.userId = localStorage.getItem("user_id");
  }

  getArrowType(key) {
    if (key === this.sortBy) {
      return this.sortOrder ? "arrow_upward" : "arrow_downward";
    } else {
      return "";
    }
  }
  sortIt(key) {
    this.sortBy = key;
    this.sortOrder = !this.sortOrder;
  }

  getMerchandiserList() {
    this.loadingData = true;
    const obj = {
      startDate: moment(this.startDate).format("YYYY-MM-DD"),
      endDate: moment(this.endDate).format("YYYY-MM-DD"),
    };

    this.httpService.getOOSProductivity(obj).subscribe((data: any) => {
      if (data) {
        this.merchandiserList = data;
        this.loading = false;
        this.loadingData = false;
      }
    });
  }

  modifyDate(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  // gotoNewPage(item) {
  //   window.open(
  //     `${environment.hash}dashboard/evaluation/list/home?surveyorId=${
  //       item.id
  //     }&startDate=${this.modifyDate(this.startDate)}&endDate=${this.modifyDate(
  //       this.endDate
  //     )}`,
  //     "_blank"
  //   );
  // }
}
