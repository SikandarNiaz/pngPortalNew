import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from "@angular/core";
import { DashboardService } from "../../../dashboard.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Config } from "src/assets/config";
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
  selector: "app-update-planograms",
  templateUrl: "./update-planograms.component.html",
  styleUrls: ["./update-planograms.component.scss"],
})
export class UpdatePlanogramsComponent implements OnInit {
  @Input() planogramList: any[];
  @Input() selectedAssetType: any;
  @Input() selectedChannel: any;
  @Output() openUploadModal = new EventEmitter<any>();

  ip = Config.BASE_URI;
  imgData: any;

  loading: boolean;
  updatedPlanogramList: any = [];
  @ViewChild("uploadModal") uploadModal: ModalDirective;
  uploadForm: any;
  img: any;

  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router
  ) {}

  ngOnInit() {
      // Perform any initialization or processing of planogramList here if needed
    }

  assignPlanograms(event, item) {
    const obj = {
      id: item.id,
      chillerId: this.selectedAssetType.id,
      channelId: this.selectedChannel.id || -1,
      active: event.checked ? "Y" : "N",
    };
    const i = this.updatedPlanogramList.findIndex(
      (p) => p.id == item.id && p.chillerId == this.selectedAssetType.id
    );
    if (i > -1) {
      this.updatedPlanogramList.splice(i, 1, obj);
    } else {
      this.updatedPlanogramList.push(obj);
    }
    console.log(this.updatedPlanogramList);
    console.log(this.planogramList);

    
  }

  updateChillerPlanograms() {
    this.loading = true;
    const obj = {
      planogramList: this.updatedPlanogramList,
    };
    this.httpService.updateChillerPlanograms(obj).subscribe(
      (data: any) => {
        console.log(data , "jhgfcg");
        console.log(this.planogramList);


        if (data.success) {
          this.toastr.success("Planograms Updated Successfully");
          this.updatedPlanogramList = [];
        } else {
          this.toastr.error("There was an error updating the product");
        }
        this.loading = false;
      },
      (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
  }
  
  
    onImageClick(img: any) {
      this.imgData = img; // Assign the img data to imgData
      this.openUploadModal.emit(this.imgData); // Emit imgData if needed
      console.log(this.planogramList , "aadddddddd");
      console.log(this.img , "cccccccccc");

      console.log(this.imgData , "dddddddddd");


    }
  }
