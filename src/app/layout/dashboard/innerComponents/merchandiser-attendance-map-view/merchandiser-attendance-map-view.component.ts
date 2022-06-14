import { Component, OnInit, ViewChild, Input } from "@angular/core";
import * as moment from "moment";
import { DashboardService } from "../../dashboard.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Config } from "src/assets/config";
import mapboxgl from "mapbox-gl"


@Component({
  selector: 'app-merchandiser-attendance-map-view',
  templateUrl: './merchandiser-attendance-map-view.component.html',
  styleUrls: ['./merchandiser-attendance-map-view.component.scss']
})
export class MerchandiserAttendanceMapViewComponent implements OnInit {
  @Input("surveyorType") surveyorType;
  map: any;
  ip: any = Config.BASE_URI;
  tableData: any = [];
  zones: any = [];
  regions: any = [];
  selectedItem: any = {};
  loadingData: boolean;
  selectedZone: any = {};
  selectedRegion: any = {};
  minDate = new Date(2000, 0, 1);
  maxDate = new Date();
  startDate: any;
  title = "Check In";
  @ViewChild("childModal") childModal: ModalDirective;
  userType: any;

  surveyors: any = [];
  selectedSurveyor: any = [];

  labels: any;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private httpService: DashboardService
  ) {
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic2lrYW5kYXJuaWF6IiwiYSI6ImNrd3FiYWkwZzBrd3UycHBtOGNnYWY1Nm4ifQ.NSL0s456ejrd4QFu4cvZ6w";
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

  ngOnInit() {}
  getDistributionCheckinData() {
    this.loadingData = true;
    const obj = {
      zoneId: localStorage.getItem("zoneId") || -1,
      regionId: localStorage.getItem("regionId") || -1,
      startDate: moment(this.startDate).format("YYYY-MM-DD"),
      endDate: moment(this.startDate).format("YYYY-MM-DD"),
      surveyorIds: "",
      surveyorType: this.surveyorType || -1,
    };

    this.httpService.getDistributionCheckInList(obj).subscribe(
      (data) => {
        this.tableData = data;
        this.getMap();
        // setTimeout(() => {
        //   this.getMap();
        // }, 200);
        if (this.tableData.length === 0) {
          this.toastr.info("No record found.");
        }
        this.loadingData = false;
      },
      (error) => {}
    );
  }

  goToNewPage(item) {
    window.open(
      `${environment.hash}dashboard/evaluation/list/home?surveyorId=${item.surveyorId}&startDate=${item.date}&endDate=${item.date}&userType=${this.userType}`,
      "_blank"
    );
  }

  getMap() {
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [69.3451, 30.3753],
      zoom: 4,
    });

    for (const data of this.tableData) {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<p><strong>Name: </strong>${data.fullName}<br/>
        <strong>Start Time: </strong>${data.startTime}<br/>
        <strong>Remarks: </strong>${data.remarks}</p>`
      );
      const marker1 = new mapboxgl.Marker()
        .setLngLat([data.longitude, data.latitude])
        .setPopup(popup)
        .addTo(this.map);
    }
    this.map.addControl(new mapboxgl.NavigationControl());
    setTimeout(() => this.map.resize(), 0);
  }

}
