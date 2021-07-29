import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { PosmTrackingServiceService } from "../posm-tracking-service.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: "app-manage-posm-surveyors",
  templateUrl: "./manage-posm-surveyors.component.html",
  styleUrls: ["./manage-posm-surveyors.component.scss"],
})
export class ManagePosmSurveyorsComponent implements OnInit {
  @ViewChild("surveyorInfoModal") surveyorInfoModal: ModalDirective;
  zonePlaceholder = "";
  regionPlaceholder = "";
  zones: any = [];
  regions: any = [];
  selectedZone: any = {};
  selectedRegion: any = {};
  surveyorList: any = [];
  supervisorList: any = [];
  loadingData: boolean;
  title = "Manage Surveyors";
  projectType: any;
  sortOrder = true;
  sortBy: "m_code";
  form: FormGroup;
  loadingModal: boolean;
  loadingModalButton: boolean;
  activeStatus: any = ["Y", "N"];
  selectedSurveyor: any = {};
  isUpdateRequest: boolean;
  modalTitle: any;

  constructor(
    private toastr: ToastrService,
    private httpService: PosmTrackingServiceService,
    public router: Router,
    public formBuilder: FormBuilder
  ) {
    this.zones = JSON.parse(localStorage.getItem("zoneList"));
    this.projectType = localStorage.getItem("projectType");
    this.zonePlaceholder = "District";
    this.regionPlaceholder = "City";
    this.form = formBuilder.group({
      id: new FormControl(""),
      surveyorType: new FormControl(""),
      m_code: new FormControl("", [Validators.required]),
      fullName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      supervisorId: new FormControl(""),
      email: new FormControl(""),
      phone: new FormControl(""),
      cnic: new FormControl(""),
      active: new FormControl("", [Validators.required]),
      region_id: new FormControl("", [Validators.required]),
      zoneId: new FormControl(""),
    });
  }

  ngOnInit() {
    this.loadSurveyors();
  }

  zoneChange(zone) {
    this.loadingModal = true;
    this.selectedRegion = {};
    this.httpService.getRegion(zone).subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.regions = res;
        } else {
          this.loadingModal = false;
          this.toastr.info(
            "Something went wrong,Please retry",
            "Connectivity Message"
          );
        }

        setTimeout(() => {
          this.loadingModal = false;
        }, 500);
      },
      (error) => {
        this.loadingModal = false;
      }
    );
  }

  loadSurveyors() {
    this.loadingData = true;
    this.httpService
      .getSurveyors(
        -1,
        this.selectedZone.id || -1,
        this.selectedRegion.id || -1
      )
      .subscribe(
        (data) => {
          const res: any = data;
          if (res) {
            this.surveyorList = res;
            this.getSupervisors();
          } else {
            this.toastr.info("No data Found", "Info");
          }
          this.loadingData = false;
        },
        (error) => {
          this.loadingData = false;
          error.status === 0
            ? this.toastr.error("Please check Internet Connection", "Error")
            : this.toastr.error(error.description, "Error");
        }
      );
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

  updateSurveyorData(data) {
    this.loadingModalButton = true;
    const formData = new FormData();
    formData.append("formData", JSON.stringify(data));
    const url = this.isUpdateRequest ? "updateSurveyor" : "insertSurveyor";
    this.httpService
      .updateSurveyorData(formData, url)
      .subscribe((data: any) => {
        if (data.success == "true") {
          if (this.surveyorList.length > 0) {
            this.loadSurveyors();
          }
          this.hideSurveyorInfoModal();
          this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message, "Error");
        }
        this.loadingModalButton = false;
      });
  }

  showSurveyorUpdateInfoModal(surveyor) {
    this.modalTitle = "Update Surveyor";
    this.zoneChange(surveyor.zoneId);
    this.isUpdateRequest = true;
    this.selectedSurveyor = surveyor;
    this.form.patchValue({
      id: surveyor.id,
      surveyorType: "posm",
      m_code: surveyor.m_code,
      fullName: surveyor.fullName,
      password: surveyor.password,
      supervisorId: surveyor.supervisorId,
      email: surveyor.email,
      phone: surveyor.phone,
      active: surveyor.active,
      cnic: surveyor.cnic,
      region_id: surveyor.region_id,
      zoneId: surveyor.zoneId,
    });
    this.surveyorInfoModal.show();
  }

  showSurveyorInsertModal() {
    this.isUpdateRequest = false;
    this.modalTitle = "Create Surveyor";
    this.form.patchValue({
      id: -1,
      surveyorType: "posm",
      supervisorId: -1,
    });
    this.surveyorInfoModal.show();
  }

  hideSurveyorInfoModal() {
    this.selectedSurveyor = {};
    this.regions = [];
    this.form.reset();
    this.surveyorInfoModal.hide();
  }

  getSupervisors() {
    this.supervisorList = [];
    for (const surveyor of this.surveyorList) {
      if (surveyor.type == 2) {
        this.supervisorList.push(surveyor);
      }
    }
    console.log(this.supervisorList);
  }
}
