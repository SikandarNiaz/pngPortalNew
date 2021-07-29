import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  Input,
} from "@angular/core";
import {
  CalendarEvent,
  CalendarMonthViewBeforeRenderEvent,
  CalendarView,
} from "angular-calendar";
import * as moment from "moment";
import { Subject } from "rxjs";
import { DashboardService } from "../../../dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-calender-demo",
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: "./calender-demo.component.html",
  styleUrls: ["./calender-demo.component.scss"],
})
export class CalenderDemoComponent implements OnInit {
  @Input("surveyors") surveyors;
  selectedSurveyor: any = {};
  tableData: any = [];
  refresh: Subject<any> = new Subject();

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService
  ) {}
  ngOnInit() {}

  getSurveyorWorking() {
    const obj = {
      surveyorIds: this.selectedSurveyor.id,
    };

    this.httpService.getDistributionCheckInList(obj).subscribe(
      (data) => {
        this.tableData = data;
        this.refresh.next();
        if (this.tableData.length === 0) {
          this.toastr.info("No record found.");
        }
      },
      (error) => {}
    );
  }
  beforeMonthViewRender(renderEvent: CalendarMonthViewBeforeRenderEvent): void {
    renderEvent.body.forEach((day) => {
      if (day.inMonth) {
        const dayOfMonth = moment(day.date).format("YYYY-MM-DD");
        const i = this.tableData.findIndex((e) => e.date == dayOfMonth);
        if (i > -1) {
          day.cssClass = "bg-grey";
        }
      }
    });
  }
}
