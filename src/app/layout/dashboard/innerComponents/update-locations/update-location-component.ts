import {
  Component,
  OnInit,
  OnChanges,
  AfterViewChecked,
  Input,
  Output,
  ViewChild,
  AfterContentChecked,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectorRef,
  AfterViewInit,
} from "@angular/core";
import { DashboardService } from "../../dashboard.service";
import { DashboardDataService } from "../../dashboard-data.service";
import * as moment from "moment";
import { subscribeOn } from "rxjs/operators";
import { Router } from "@angular/router";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { MatTableDataSource } from "@angular/material/table";
import { environment } from "src/environments/environment";
import { NgModel } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import * as _ from "lodash";
import { Config } from "src/assets/config";
import { async } from "@angular/core/testing"

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location-component.html',
  styleUrls: ['./update-location-component.scss']
})
export class UpdateLocationComponent implements OnInit, AfterViewInit{

  @Output("dataEmitter") dataEmitter: any = new EventEmitter<any>();
  
  @ViewChild('tabGroup') tabGroup;
  @ViewChild('tab') tab;

  selectedTabIndex: any;
  selectedTabLabel: any;
  insertForm: FormGroup;


  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    private dataService: DashboardDataService,
    public formBuilder: FormBuilder
  ) {
    this.insertForm = formBuilder.group({
      zoneEmail: new FormControl("", [Validators.required])
    });
    
    this.prepareObject();
    this.zones = JSON.parse(localStorage.getItem("zoneList"));
    this.clusterList = JSON.parse(localStorage.getItem("clusterList"));
    this.channels = JSON.parse(localStorage.getItem("channelList"));
    this.projectType = localStorage.getItem("projectType");
    this.clusterId = localStorage.getItem("clusterId") || -1;
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
    this.projectType = localStorage.getItem("projectType");
    this.accessProperties = JSON.parse(
      localStorage.getItem("accessProperties")
    );
   }

  labels: any;
  ip: any = Config.BASE_URI;
  projectType: any;

  distributionList: any = [];
  selectedDistribution: any = {};
  zones: any = [];
  loadingData: boolean;
  regions: any = [];
  channels: any = [];
  areas: any = []

  selectedZone: any = {};
  selectedRegion: any = {};
  selectedChannel: any = [];
  regionId = -1;

  selectedArea: any = {};
 
  cities: any = [];
  selectedCity: any = {};
  
 

  loadingReportMessage = false;
  
  loading = true;
  sortOrder = true;
  sortBy: "completed";
  
  clusterList: any = [];
  selectedCluster: any = {};
 
  actionTypeLists=[
    {id: 0, name:'National'},
    {id: 1, name:'Zonal'},
    {id: 2, name:'Regional'},
  ];

  @ViewChild("insertModal", { static: true }) insertModal: ModalDirective;
  loadingModalButton = false;

  clusterId: any;
 

  accessProperties: any;

  

   clearAllSections() {
    this.selectedZone = {};
    this.selectedRegion = {};
    this.selectedArea = {};
    this.selectedChannel = [];
    this.selectedCity = {};
    this.selectedDistribution = {};
    this.distributionList = [];
  }
ngOnInit() {
   
    
    // this.mustHaveAll = this.dataService.getYesNoAll();
   

  }

  ngAfterViewInit() {
    this.selectedTabIndex = this.tabGroup.selectedIndex;
    // this.selectedTabLabel = this.tab.textLabel;
    this.selectedTabLabel = this.tab;
    console.log('selectedTabIndex: ', this.selectedTabIndex);
    console.log('selectedTabLabel: ', this.selectedTabLabel);
  }

  tabChanged(event) {
    this.selectedTabIndex = event.index;
    this.selectedTabLabel = event.tab.textLabel;
    console.log('selectedTabIndex: ', this.selectedTabIndex);
    console.log('event.tab.textLabel: ', this.selectedTabLabel);
  }

 

  clearLoading() {
    this.loading = false;
    this.loadingData = false;
    this.loadingReportMessage = false;
  }
 
  getZone() {
    this.httpService.getZone().subscribe(
      (data) => {
        const res: any = data;
        if (res.zoneList) {
          localStorage.setItem("zoneList", JSON.stringify(res.zoneList));
          localStorage.setItem("assetList", JSON.stringify(res.assetList));
          localStorage.setItem("channelList", JSON.stringify(res.channelList));
          this.zones = res.zoneList;
          this.channels = res.channelList;
        }
      },
      (error) => {
        this.clearLoading();

        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
  }

  getZoneByCluster() {
    this.loadingData = true;
    this.selectedZone = {};
    this.selectedRegion = {};
    this.selectedArea = {};
    this.selectedCity = {};
    this.selectedDistribution = {};
    this.httpService.getZoneByCluster(this.selectedCluster.id || -1).subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.zones = res;
        }
       this.prepareObject();
        this.loadingData = false;
      },
      (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
        this.loadingData = false;
      }
    );
  }


  zoneChange() {
    
    this.loadingData = true;
    // this.regions = [];
    // this.channels = [];
    this.selectedRegion = {};
    this.selectedArea = {};
    this.selectedCity = {};
    this.selectedDistribution = {};
    this.httpService.getRegion(this.selectedZone.id).subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.regions = res;
        }
        this.prepareObject();

        setTimeout(() => {
          this.loadingData = false;
        }, 500);
      },
      (error) => {
        this.clearLoading();
      }
    );
  }

  getAllRegions() {
    this.loadingData = true;
    this.httpService.getRegions().subscribe(
      (data) => {
        const res: any = data;
        if (res.regionList) {
          this.regions = res.regionList;
          // localStorage.setItem('regionList', JSON.stringify(res.regionList));
        }
        if (!res.regionList) {
          this.toastr.info("No data Found", "Info");
        }
        this.clearLoading();
      },
      (error) => {
        this.clearLoading();
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
  }

  regionChange() {
    
    this.selectedArea = {};
    this.selectedCity = {};
    this.selectedDistribution = {};
   

      this.loadingData = true;
      this.httpService.getAreaByRegion(this.selectedRegion.id || -1).subscribe(
        (data) => {
          // this.channels = data[0];
          const res: any = data;
          if (res) {
            this.areas = res;
          }
         this.prepareObject();

          setTimeout(() => {
            this.loadingData = false;
          }, 500);
        },
        (error) => {
          this.clearLoading();
        }
      );
  }
  getproductivityDownload(obj, url) {
    const u = url;
    this.httpService.DownloadResource(obj, u);
    setTimeout(() => {
      this.loadingData = false;
      this.loadingReportMessage = false;
      this.httpService.updatedDownloadStatus(false);
    }, 1000);
  }
  
  arrayMaker(arr) {
    const all = arr.filter((a) => a === "All");
    const result: any = [];
    if (all[0] === "All") {
      arr = this.channels;
    }
    arr.forEach((e) => {
      result.push(e.id);
    });
    return result;
  }

 
 updateData(){
const obj= {
    clusterId: this.selectedCluster.id
      ? this.selectedCluster.id == -1
        ? localStorage.getItem("clusterId")
        : this.selectedCluster.id
      : localStorage.getItem("clusterId"),
    zoneId: this.selectedZone.id
      ? this.selectedZone.id == -1
        ? localStorage.getItem("zoneId")
        : this.selectedZone.id
      : localStorage.getItem("zoneId"),
    regionId: this.selectedRegion.id
      ? this.selectedRegion.id == -1
        ? localStorage.getItem("regionId")
        : this.selectedRegion.id
      : localStorage.getItem("regionId"),
    areaId: this.selectedArea.id
      ? this.selectedArea.id == -1
        ? localStorage.getItem("areaId")
        : this.selectedArea.id
      : localStorage.getItem("areaId"),
      // startDate :moment(this.startDate).format("YYYY-MM-DD"),
      // endDate : moment(this.endDate).format("YYYY-MM-DD"),
      cityId: this.selectedCity.id || -1,
      distributionId: this.selectedDistribution.id || -1,
      channelId: this.selectedChannel.id
      ? this.selectedChannel.id == -1
        ? localStorage.getItem("channelId")
        : this.selectedChannel.id
      : localStorage.getItem("channelId"),
  };
 this.dataEmitter.emit(obj)
 console.log("obj",obj)
}

prepareObject(){
  if (this.router.url === "/dashboard/productivity_report" ||
  this.router.url === "/dashboard/supervisor_productivity"
) {
   }
   this.updateData();
}

VisitBaseReport(){
  
}


showInsertModal(zone) {
  console.log("this.zone", zone);
  // this.selectedCluster= [];
  this.selectedZone = zone;
  // this.selectedRegion= [];

  this.insertForm.patchValue({
    zoneEmail: zone.zoneEmail
  });

  this.insertModal.show();
  
  
}

hideInsertModal() {
  this.insertForm.reset();
  this.insertModal.hide();
}

saveZoneEmail(data){
  this.loadingModalButton= true;

  this.selectedZone.zoneEmail = data.zoneEmail;

  var i=this.zones.findIndex(z=>z.id==this.selectedZone.id);
  let obj=this.selectedZone;
  if (i > -1) {
    this.zones.splice(i,1,obj);
  }
  

  this.loadingModalButton= false;

}


}



