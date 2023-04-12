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
  ElementRef,
} from "@angular/core";
import { DashboardService } from "../../../dashboard.service";
import { DashboardDataService } from "../../../dashboard-data.service";
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
import { async } from "@angular/core/testing";
import { ProductService } from "./productservice";
import { Product } from "./product";
import { LazyLoadEvent } from "primeng/api";
import { SelectItem } from "primeng/api";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-zone-location",
  templateUrl: "./update-zone-component.html",
  providers: [MessageService],
  styleUrls: ["./update-zone-component.scss"],
})
export class UpdateZoneComponent implements OnInit, AfterViewInit {
  // @Output("dataEmitter") dataEmitter: any = new EventEmitter<any>();
  // @ViewChild('tabGroup') tabGroup;


  @ViewChild("insertModal", { static: true }) insertModal: ModalDirective;
  loadingModalButton = false;
  @Output("showModal") showModal: any = new EventEmitter<any>();

  @ViewChild('hello') hello: HTMLElement;

  selectedTabIndex: any;

  products1: Product[];

  products2: Product[];

  statuses: SelectItem[];
  list: any = [];

  // not working giving undefined error on cluster.title when accessed without ?
  // clusterList = [{
  //   id: -1,
  //   title: "No Cluster"
  // },
  // {
  //   id: 1,
  //   title: "All 1"
  // }];

  clusterList : any = [];

  cluster: any = {
    id: -1,
    title: "No Cluster"
  }

  clonedProducts: { [s: string]: Product } = {};
  // statusList: { id: number; title: string; }[];
  statusList: { title: string; }[];
  insertForm: FormGroup;
  // clonedZones: { [s: string]: any; } = {}
  clonedZones: any = []

  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    private dataService: DashboardDataService,
    public formBuilder: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService
  ) {
    this.zones = JSON.parse(localStorage.getItem("zoneList"));
    // this.clusterList = JSON.parse(localStorage.getItem("clusterList"));
    this.channels = JSON.parse(localStorage.getItem("channelList"));
    this.projectType = localStorage.getItem("projectType");
    this.clusterId = localStorage.getItem("clusterId") || -1;
    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
    this.projectType = localStorage.getItem("projectType");
    this.accessProperties = JSON.parse(
      localStorage.getItem("accessProperties")
    );

    this.insertForm = formBuilder.group({
      zoneEmail: new FormControl("", [Validators.required])
    });
    
  this.clusterList = [{
    id: -1,
    title: "No Cluster"
  },
  {
    id: 1,
    title: "All 1"
  }];

  this.statusList = [{
    title: "Y"
  },
  {
    title: "N"
  }];

  // this.clusterList = this.clusterList.map(x => ({
  //   label: x.title,
  //   value: x.id
  // }));


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
  areas: any = [];

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

  selectedCluster: any = {};

  actionTypeLists = [
    { id: 0, name: "National" },
    { id: 1, name: "Zonal" },
    { id: 2, name: "Regional" },
  ];

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
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    // this.mustHaveAll = this.dataService.getYesNoAll();
    this.productService
      .getProductsSmall()
      .then((data) => (this.products1 = data));
    this.productService
      .getProductsSmall()
      .then((data) => (this.products2 = data));

    this.statuses = [
      { label: "In Stock", value: "INSTOCK" },
      { label: "Low Stock", value: "LOWSTOCK" },
      { label: "Out of Stock", value: "OUTOFSTOCK" },
    ];

    if (!this.zones) {
      this.getZone();
    }

    this.clusterListobj();
  }

  ngAfterViewInit() {
    // this.selectedTabIndex = this.tabGroup.selectedIndex;
    // console.log('selectedTabIndex: ', this.selectedTabIndex);
  }

  tabChanged(event) {
    this.selectedTabIndex = event.index;
    console.log("selectedTabIndex: ", this.selectedTabIndex);
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

        setTimeout(() => {
          this.loadingData = false;
        }, 500);
      },
      (error) => {
        this.clearLoading();
      }
    );
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

  onRowEditInit(zone) {
    // console.log("onRowEditInit zone: ", zone);
    // this.clonedZones[zone.id] = {...zone};
    // console.log("clonedZones: ", this.clonedZones);
    const index = this.zones.findIndex(
      (e) => e.id == zone.id
    );
    this.clonedZones[index] = this.zones[index];
    console.log("clonedZones: ", this.clonedZones);
  }

  onRowEditSave(zone){
    console.log("onRowEditInit zone: ", zone);
  }

  onRowEditCancel(zone, index: number){
    console.log("clonedZones: ", this.clonedZones);
    console.log("Zones: ", this.zones);
    this.zones[index] = this.clonedZones[zone.id];
    console.log("Zones: ", this.zones);
   delete this.zones[zone.id];
   console.log("Zones: ", this.zones);
  }
  

  VisitBaseReport() {}

  // getClusterObj(zoneparentId){
  //   let clusterObj= {};
  //   clusterObj = this.clusterList.filter(obj => {
  //     return obj.id === zoneparentId
  //   })[0];

  // }

  clusterListobj(){
    console.log("clusterList", this.clusterList);
    this.zones.forEach(element => {
      element.cluster = this.clusterList.filter(obj => {
        return obj.id == element.parentId
      })[0]
    });

    this.zones.forEach(element => {
      element.activeObj = this.statusList.filter(obj => {
        return obj.title == element.active
      })[0]
    });

    console.log("this.zones", this.zones);

  }

  showInsertModal(zone) {
    console.log("this.zone", zone);
    // this.selectedCluster= [];
    this.selectedZone = zone;
    // this.selectedRegion= [];

    this.insertForm.patchValue({
      zoneEmail: zone.zoneEmail
    });

    var node = document.getElementById("hello");

    // node.append("body");
    // document.body.append(this.hello);

    this.insertModal.show();
  
    // this.showModal.emit(zone);
    
    
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
