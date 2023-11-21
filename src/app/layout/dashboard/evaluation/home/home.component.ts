import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Location } from "@angular/common";
import { EvaluationService } from "../evaluation.service";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { ResizeEvent } from "angular-resizable-element";
import { Config } from "src/assets/config";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import * as moment from "moment";

// IR imports
import {
  ImageCroppedEvent,
  ImageTransform,
  LoadedImage,
} from "ngx-image-cropper";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  // IR variables
  irImageLoading: boolean = false;
  modalConfig = {};
  transform: ImageTransform = {};
  scale = 0.7;
  cropperDisabled: boolean = true;
  croppedData: any = [];
  imageChangedEvent: any = "";
  croppedImage: any = "";
  isCroppingMode: boolean = false;
  cropperPosition: any = {};
  modeList: any = [
    { id: 1, title: "SKU" },
    { id: 2, title: "Block" },
    { id: 3, title: "Shelf" },
  ];

  selectedProductId = -1;
  selectedMode: any = {};

  x1: number = 0;
  x2: number = 111;
  y1: number = 0;
  y2: number = 111;

  imageWidth: number;
  imageHeight: number;
  imageLeft: number;
  imageTop: number;
  // IR variables end

  sortOrder: any = true;
  sortBy: "is_competition";

  data: any = [];
  // ip = environment.ip;
  ip: any = Config.BASE_URI;
  loading = false;
  selectedShop: any = {};
  comments: any = [];
  count: number;
  @ViewChild("scrollMe") private myScrollContainer: ElementRef;
  @ViewChild("childModal") childModal: ModalDirective;
  @ViewChild("commentModal") commentModal: ModalDirective;
  @ViewChild("remarksModal") remarksModal: ModalDirective;
  @ViewChild("evaluationRemarksModal") evaluationRemarksModal: ModalDirective;
  @ViewChild("sosModal") sosModal: ModalDirective;

  score: any = 0;

  indexList: any = [];
  assetTypeId = -1;
  surveyId: any = 0;
  remarksList: any = [];
  panelOpenState = false;
  selectedRemarks: any = false;
  selectedRemarksList: any = [];
  childArray: any = [];
  selectedCriteria: any = {};
  isTotalScore = 0;
  surveyorId = -1;
  remarkId: any = [];
  evaluationArray: any = [];
  products: any = [];
  productList: any = [];
  totalSkus = 0;
  achievedSkus = 0;
  msl: any;
  p: any = {};
  availabilityCount: number;
  cloneArray: any = [];
  sectionList: any = [];
  isFromShop = true;
  rotationDegree = 0;
  isEditable: any = false;
  visitDay = "";
  selectedIndex = -1;
  facing: any;
  desiredFacing: any;
  criteriaDesireScore: any = 0;
  totalAchieveScore = 0;
  selectedEvaluationRemark = -1;
  MSLCount: number;
  existingRemarks: any = [];
  evaluationRemarks: any = [];
  userType: any;
  reevaluatorRole: any;
  isCritical = true;
  isNoNCritical = false;
  isDragging = false;
  selectedSoS: any = {};
  evaluatorRole: any;
  surveyDetails: any;
  oosComments: any = [];
  j = -1;
  i = 0;
  m = 0;
  viewType = 1;
  showCriteria = false;
  selectedProduct: any = {};

  evaluationStartDateTime: String;
  @ViewChild("startEvaluationModal") startEvaluationModal: ModalDirective;
  surveyorType: any;
  rolesIdsList: string;
  imageWidthStart: number;
  imageHeightStart: number;
  base64Image: any;
  selectedProductsIds: any = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoutes: ActivatedRoute,
    private httpService: EvaluationService,
    private evaluationService: EvaluationService,
    private readonly location: Location,
    private formBuilder: FormBuilder
  ) {
    this.surveyId;
    this.rolesIdsList = localStorage.getItem("RolesIdsList");

    this.activatedRoutes.queryParams.subscribe((q) => {
      if (q.viewType) {
        this.viewType = q.viewType;
        this.surveyorType = q.surveyorType || 1;
      }
    });
    this.activatedRoutes.params.subscribe((params) => {
      this.p = params;
      this.surveyId = params.id;

      const obj = {
        surveyId: this.surveyId,
        userTypeId: localStorage.getItem("user_type"),
        viewType: this.viewType,
        surveyorType: this.surveyorType,
      };

      this.getData(obj);
    });
  }
  value = 5;
  options: any = {
    showTicksValues: true,
    stepsArray: [{ value: 1 }],
  };

  createTickForSlider(maxTicks) {
    const result: any = [];

    for (let index = 0; index < maxTicks.score; index++) {
      result.push({ value: index });
    }
    this.options.stepsArray = result;
  }

  ngOnInit() {
    this.availabilityCount = 0;
    this.reevaluatorRole = localStorage.getItem("Reevaluator");
    this.evaluatorRole = localStorage.getItem("Evaluator");
    this.userType = localStorage.getItem("user_type");
  }
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    if (value >= 1000) {
      return Math.round(value / 1000);
    }

    return value;
  }

  onResizeEnd(event: ResizeEvent): void {
    // console.log('Element was resized', event);
    this.isDragging = !this.isDragging;
  }

  rotateImage() {
    if (this.rotationDegree === 360) {
      this.rotationDegree = 90;
    } else {
      this.rotationDegree += 90;
    }
  }
  getData(obj) {
    this.httpService.getShopDetails(obj).subscribe(
      (data) => {
        if (data) {
          this.data = data;
          this.surveyDetails = this.data.shopDetails.sectionMap;
          document.title =
            this.surveyDetails.surveyorName +
            " - " +
            this.surveyDetails.shopTitle;
          this.setImageUrl();
          if (this.data.criteria) {
            this.evaluationArray = this.data.criteria;
            this.cloneArray = this.evaluationArray.slice();
            this.existingRemarks = this.data.ExistingRemarks || [];
            this.evaluationRemarks = this.data.EvaluationRemarks || [];
            this.calculateScore();
          }

          // console.log(this.data)
          this.remarksList = this.data.remarks;
          this.productList = this.data.productList;
          this.sectionList = this.data.section;
          console.log(
            "this.userType",
            this.userType,
            "this.evaluatorRole ",
            this.evaluatorRole
          );
          if (this.userType) {
            if (this.userType == this.evaluatorRole) {
              this.setViewForEvaluation();
            } else if (this.userType == this.reevaluatorRole) {
              this.setViewForReeevaluation();
            } else {
              this.setDefaultView();
            }
          } else {
            this.setDefaultView();
          }
          this.oosComments = this.data.comments || [];
          this.totalAchieveScore = this.getTotalAchieveScore();
        }
      },
      (error) => {}
    );
  }

  setViewForEvaluation() {
    if (this.surveyDetails.evaluationStatus == -1) {
      this.setPSKUCriteria();
      this.isEditable = true;
      this.showCriteria = true;
      this.startEvaluationModal.show();
    }
  }

  setViewForReeevaluation() {
    if (this.surveyDetails.evaluationStatus != -1) {
      this.showCriteria = true;
      this.isEditable = true;
      this.checkEvaluatedRemarks();
      this.setRemarksForReEvaluation();
    }
  }

  setDefaultView() {
    if (this.surveyDetails.evaluationStatus != -1) {
      if (this.rolesIdsList) {
        //let temp: any = this.rolesIdsList.split(",");
        let temp: any = this.rolesIdsList.split(/[ ,]+/); // spaces trimmed, empty values skipped
        // String[] list=str.split("\\s*,\\s*");       // in JAVA spaces trimmed,

        for (let roleId of temp) {
          if (roleId == this.userType) {
            this.checkEvaluatedRemarks();
            this.setRemarksForReEvaluation();
            this.showCriteria = true;
            break;
          }
        }
      }
    }
  }

  checkEvaluatedRemarks() {
    if (this.existingRemarks.length > 0) {
      this.existingRemarks.forEach((element1) => {
        if (element1.id > 0) {
          const obj = {
            id: element1.id,
            description: element1.description,
            criteriaId: element1.criteriaId,
            isChecked: element1.isChecked,
          };
          this.remarksList.forEach((element) => {
            const i = this.remarksList.findIndex((e) => e.id === element1.id);
            if (i !== -1) {
              this.remarksList.splice(i, 1, obj);
            }
          });
        }
      });
    }
  }
  setEvaluationCriteria() {
    if (this.sectionList.length > 0) {
      for (const element of this.sectionList) {
        if (element.imageViewType === 7) {
          for (const element1 of this.cloneArray) {
            if (element.assetTypeId === element1.assetTypeId) {
              const obj = {
                id: element1.id,
                title: element1.title,
                score: element1.score,
                criteriaMapId: element1.criteriaMapId,
                assetTypeId: element1.assetTypeId,
                achievedScore: this.getFacingScore(
                  element.skuTable,
                  element1.score
                ),
                isEditable: element1.isEditable,
                isChecked: 0,
              };
              this.cloneArray.splice(this.m, 1, obj);
            } else {
              this.m++;
            }
          }
          this.m = 0;
        }
      }
    }

    this.totalAchieveScore = this.getTotalAchieveScore();
  }

  setPSKUCriteria() {
    if (this.sectionList.length > 0) {
      for (const element of this.sectionList) {
        if (element.imageViewType === 7) {
          element.skuTable.forEach((p) => {
            // tslint:disable-next-line:triple-equals
            if (p.is_competition == 1 && p.nestle_brand_id == 2) {
              this.totalSkus++;
              if (p.available_sku >= 1) {
                this.achievedSkus++;
              }
            }
          });
        }
      }
    }
    const percentage = ((this.achievedSkus / this.totalSkus) * 100).toFixed();
    this.setScore(percentage);
    this.totalAchieveScore = this.getTotalAchieveScore();
    this.totalSkus = 0;
    this.achievedSkus = 0;
  }

  setScore(score) {
    if (score > 80) {
      score = 25;
    } else if (score >= 71 && score <= 80) {
      score = 20;
    } else if (score >= 61 && score <= 70) {
      score = 15;
    } else if (score >= 56 && score <= 60) {
      score = 10;
    } else if (score >= 51 && score <= 55) {
      score = 5;
    } else {
      score = 0;
    }
    for (const element1 of this.cloneArray) {
      // tslint:disable-next-line:triple-equals
      if (element1.id == 116) {
        const obj = {
          id: element1.id,
          title: element1.title,
          score: element1.score,
          criteriaMapId: element1.criteriaMapId,
          hasChild: element1.hasChild,
          parentId: element1.parentId,
          achievedScore: score,
          isEditable: element1.isEditable,
          isChecked: 0,
        };
        this.cloneArray.splice(this.m, 1, obj);
      } else {
        this.m++;
      }
    }
    this.m = 0;
  }

  setRemarksForReEvaluation() {
    if (this.existingRemarks.length > 0) {
      for (const element1 of this.existingRemarks) {
        for (const element of this.cloneArray) {
          if (element1.criteriaId === element.id) {
            if (this.cloneArray[this.i].remarkId) {
              this.cloneArray[this.i].remarkId.push(element1.id);
              this.i++;
            } else {
              this.cloneArray[this.i].remarkId = [];
              this.cloneArray[this.i].remarkId.push(element1.id);
              this.i++;
            }
          } else {
            this.i++;
          }
        }
        this.i = 0;
      }
    }
  }

  calculateMSLAgain(products) {
    this.msl = this.data.msl;
    localStorage.setItem("productList", JSON.stringify(products));
    this.productList = localStorage.getItem("productList");

    this.availabilityCount = Math.round(this.getMSLNAvailbilityCount(products)); // Math.round(this.getAvailabilityCount(products));
  }

  calculateFacing(assetTypeId) {
    localStorage.setItem("assetTypeId", JSON.stringify(assetTypeId));
    // tslint:disable-next-line:radix
    this.assetTypeId = parseInt(localStorage.getItem("assetTypeId"));
    for (const element1 of this.cloneArray) {
      // tslint:disable-next-line:triple-equals
      if (element1.assetTypeId == this.assetTypeId) {
        const obj = {
          remarkId: this.getRemarkId(element1.remarkId, element1.id),
          id: element1.id,
          title: element1.title,
          score: element1.score,
          assetTypeId: element1.assetTypeId,
          criteriaMapId: element1.criteriaMapId,
          achievedScore: 0,
          isEditable: element1.isEditable,
          isChecked: 1,
        };
        this.cloneArray.splice(this.m, 1, obj);
        break;
      } else {
        this.m++;
      }
    }
    this.totalAchieveScore = this.getTotalAchieveScore();
    this.m = 0;
    this.remarkId = [];
  }

  getMSLNAvailbilityCount(products) {
    const pro = [];
    const msl = [];
    products.forEach((p) => {
      let obj = {};
      if (p.MSL === "Yes" && p.available_sku === 1) {
        obj = {
          available_sku: p.available_sku,
          MSL: p.MSL,
        };
        pro.push(obj);
      }

      if (p.MSL === "Yes") {
        msl.push(p);
      }
    });
    this.MSLCount = msl.length;

    const MSLScore = (pro.length / this.MSLCount) * 10;
    return MSLScore;
  }
  getAvailabilityCount(products) {
    if (!products) {
      products = localStorage.getItem("productList");
    }
    const pro = products.map((p) => p.available_sku);
    const sum = pro.reduce((a, v) => a + v);
    return (sum / pro.length) * this.msl;
  }

  getRemarkId(remarkId, criteriaId) {
    console.log("remark criteriaId", criteriaId);
    for (const element of this.remarksList) {
      // tslint:disable-next-line:triple-equals
      if (
        element.criteriaId == criteriaId &&
        element.description === "Data Inaccuracy"
      ) {
        if (remarkId) {
          for (let i = 0; i < remarkId.length; i++) {
            // tslint:disable-next-line:triple-equals
            if (remarkId[i] == element.id) {
              return remarkId;
            }
          }
          remarkId.push(element.id);
          return remarkId;
        } else {
          this.remarkId.push(element.id);
          return this.remarkId;
        }
      }
    }
  }

  getFacingScore(list, score) {
    this.products = list;
    let totalFacing = 0;
    let totalDesiredFacing = 0;
    let total = 0;
    this.products.forEach((element) => {
      totalFacing = totalFacing + element.face_unit;
      totalDesiredFacing = totalDesiredFacing + element.desired_facing;
    });
    if (totalFacing > totalDesiredFacing) {
      totalFacing = totalDesiredFacing;
    }
    total = parseFloat(((totalFacing / totalDesiredFacing) * score).toFixed(2));
    return total;
  }

  getCriteriaWithRemarks(remarks, criteria) {
    const obj = {
      remarkId: remarks,
      id: criteria.id,
      title: criteria.title,
      score: criteria.score,
      criteriaMapId: criteria.criteriaMapId,
      // achievedScore: (criteria.isEditable)? (this.criteriaDesireScore==criteria.score)?0:this.criteriaDesireScore : 0,
      parentId: criteria.parentId,
      hasChild: criteria.hasChild,
      achievedScore: criteria.isEditable ? this.criteriaDesireScore : 0,
      isEditable: criteria.isEditable,
      isChecked: 1,
    };
    this.cloneArray.forEach((element) => {
      const i = this.cloneArray.findIndex((e) => e.id === criteria.id);
      this.cloneArray.splice(i, 1, obj);
    });
    // this.subtractScore(this.selectedCriteria);
    // this.evaluationArray.push(obj);
    console.log("evaluation array clone", this.cloneArray);
    // this.updateAchieveScore(criteria.id);
    this.hideRemarksModal();
    this.selectedRemarks = "";
    this.selectedRemarksList = [];
    this.criteriaDesireScore = 0;
  }

  checkboxChange(event, id) {
    console.log("checkbox event", !event.checked, id);

    if (!event.checked) {
      this.selectedRemarksList.push(id);
    } else {
      for (let i = 0; i < this.selectedRemarksList.length; i++) {
        if (this.selectedRemarksList[i] === id) {
          this.selectedRemarksList.splice(i, 1);
        }
      }
    }
    // this.selectedRemarksList.pop(id)

    console.log("remarks list", this.selectedRemarksList);
  }

  updateAchieveScore(id) {
    for (let index = 0; index < this.cloneArray.length; index++) {
      const element = this.cloneArray[index];
      const aScore = element.achievedScore;

      if (element.id === id) {
        this.cloneArray[index].achievedScore =
          this.criteriaDesireScore > 0 ? this.criteriaDesireScore : aScore;
      }
    }
    this.totalAchieveScore = this.getTotalAchieveScore();
  }

  getTotalAchieveScore() {
    let score = 0;
    this.cloneArray.forEach((element) => {
      if (element.achievedScore >= 0) {
        score = score + element.achievedScore;
      }
    });
    return score;
  }

  subtractScore(criteria) {
    this.totalAchieveScore =
      this.criteriaDesireScore > 0
        ? this.totalAchieveScore -
          Math.abs(criteria.score - this.criteriaDesireScore)
        : this.totalAchieveScore - Math.abs(criteria.achievedScore);
  }

  isAnyCriteriaCheck() {
    let result = false;
    this.cloneArray.forEach((element) => {
      if (element.isChecked) {
        result = true;
      }
    });

    return result;
  }

  counter(event, criteria, index) {
    this.selectedIndex = index;
    // console.dir(event.checked)
    if (event.checked) {
      if (criteria.id === 20) {
        this.isCritical = false;
      } else {
        this.isNoNCritical = true;
        this.isCritical = true;
      }

      this.indexList.push(index);
      this.updateAchieveScore(criteria.id);

      this.selectedCriteria = criteria;
      if (!criteria.isEditable) {
        this.subtractScore(this.selectedCriteria);
      }
      this.showRemarksModal();
    } else {
      this.totalAchieveScore =
        this.totalAchieveScore + Math.abs(criteria.score);

      const i = this.indexList.indexOf(index);
      this.indexList.splice(i, 1);

      if (this.evaluationArray.length > 0) {
        const obj = {
          remarkId: [],
          id: criteria.id,
          title: criteria.title,
          score: criteria.score,
          criteriaMapId: criteria.criteriaMapId,
          parentId: criteria.parentId,
          hasChild: criteria.hasChild,
          achievedScore:
            criteria.score > criteria.achievedScore || criteria.score < 0
              ? criteria.score
              : criteria.achievedScore,
          isEditable: criteria.isEditable,
          isChecked: 0,
        };
        const e = this.evaluationArray.findIndex((i) => i.id === criteria.id);
        this.cloneArray.splice(e, 1, obj);
        console.log("unchecked evaluation array", this.cloneArray);
        this.selectedRemarksList = [];
        this.updateAchieveScore(criteria.id);
        this.checkForCritical(criteria);
      }
    }
  }

  cancelCriteriaSelection() {
    const inputs: any = document.querySelectorAll(".checkbox");
    for (let j = 0; j < inputs.length; j++) {
      if (this.selectedCriteria.id === inputs[j].id) {
        inputs[j].checked = false;
      }
    }
    const criteria = this.selectedCriteria;
    this.totalAchieveScore = this.totalAchieveScore + Math.abs(criteria.score);
    const i = this.indexList.indexOf(this.selectedIndex);
    this.indexList.splice(i, 1);

    if (this.evaluationArray.length > 0) {
      const obj = {
        remarkId: [],
        id: criteria.id,
        title: criteria.title,
        score: criteria.score,
        criteriaMapId: criteria.criteriaMapId,
        achievedScore:
          criteria.score > criteria.achievedScore
            ? criteria.score
            : criteria.achievedScore,
        hasChild: criteria.hasChild,
        parentId: criteria.parentId,
        isEditable: criteria.isEditable,
        isChecked: 0,
      };
      const e = this.evaluationArray.findIndex((i) => i.id === criteria.id);
      this.cloneArray.splice(e, 1, obj);
      console.log(
        "unchecked evaluation array,using cancel button",
        this.cloneArray
      );
    }

    this.checkForCritical(criteria);

    this.hideRemarkModalForCancelOption();
  }
  checkForCritical(criteria) {
    if (criteria.id === 20) {
      this.isCritical = true;
      this.isNoNCritical = false;
    } else {
      const result = this.isAnyCriteriaCheck();
      if (!result) {
        this.isNoNCritical = false;
      }
      this.isCritical = true;
    }
  }
  calculateScore() {
    this.score;
    this.data.criteria.map((c) => {
      if (c.score > 0) {
        this.score += c.score;
      }
    });
    // this.score=this.score-(this.msl);

    console.log("total score is", this.score);
  }

  // makeScoreZero(){
  //   let result=[];
  //   this.cloneArray.forEach(element => {

  //     if()

  //   });
  // }
  evaluateShop() {
    const user_id = localStorage.getItem("user_id");
    this.loading = true;
    const req = true;

    if (req) {
      for (const element of this.data.shopDetails.tagsList) {
        // tslint:disable-next-line:triple-equals
        if (element.heading == "surveyorId") {
          this.surveyorId = element.value;
          // tslint:disable-next-line:triple-equals
        } else if (element.heading == "Visit Date") {
          this.visitDay = element.value;
        }
      }

      // tslint:disable-next-line:triple-equals
      if (this.userType == this.reevaluatorRole) {
        const obj = {
          criteria: this.cloneArray,
          surveyId: this.surveyId,
          evaluatorId: user_id,
          surveyorId: this.surveyorId,
          visitDate: this.visitDay,
          evaluationRemark: this.selectedEvaluationRemark,
          status: this.checkForSlectedRemarks(this.cloneArray),

          // evaluationStartDateTime: this.evaluationStartDateTime,
          // evaluationEndDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        };

        this.evaluationService.evaluateShop(obj).subscribe(
          (data: any) => {
            // console.log('evaluated shop data',data);
            this.loading = false;

            // tslint:disable-next-line:triple-equals
            if (data.success == "true") {
              this.hideRemarksModalWithNoChange();
              this.toastr.success("shop evaluated successfully ");
              this.evaluationArray = [];
              this.cloneArray = [];
              this.indexList = [];
              setTimeout(() => {
                window.close();
              }, 2000);
            } else {
              this.toastr.error(data.errorMessage, "error");
            }
          },
          (error) => {
            // console.log('evaluated shop error',error)
            // window.close()
            this.loading = false;
            this.toastr.error(error.message, "Error");
          }
        );
      } else {
        const obj = {
          criteria: this.cloneArray,
          surveyId: this.surveyId,
          evaluatorId: user_id,
          visitDate: this.visitDay,
          surveyorId: this.surveyorId,
          status: this.checkForSlectedRemarks(this.cloneArray),

          evaluationStartDateTime: this.evaluationStartDateTime,
          evaluationEndDateTime: moment(new Date()).format(
            "YYYY-MM-DD HH:mm:ss"
          ),
        };

        this.evaluationService.evaluateShop(obj).subscribe(
          (data: any) => {
            // console.log('evaluated shop data',data);
            this.loading = false;

            // tslint:disable-next-line:triple-equals
            if (data.success == "true") {
              this.toastr.success("shop evaluated successfully ");
              this.evaluationArray = [];
              this.cloneArray = [];
              this.indexList = [];
              setTimeout(() => {
                window.close();
              }, 2000);
            } else {
              this.toastr.error(data.errorMessage, "error");
            }
          },
          (error) => {
            // console.log('evaluated shop error',error)
            // window.close()
            this.loading = false;
            this.toastr.error(error.message, "Error");
          }
        );
      }
    }
  }

  evaluateShopIR() {
    const irBoolean = true
    const user_id = localStorage.getItem("user_id");
    this.loading = true;
    const req = true;

    if (req) {
      for (const element of this.data.shopDetails.tagsList) {
        // tslint:disable-next-line:triple-equals
        if (element.heading == "surveyorId") {
          this.surveyorId = element.value;
          // tslint:disable-next-line:triple-equals
        } else if (element.heading == "Visit Date") {
          this.visitDay = element.value;
        }
      }

      // tslint:disable-next-line:triple-equals
      if (this.userType == this.reevaluatorRole) {
        const obj = {
          criteria: this.cloneArray,
          surveyId: this.surveyId,
          evaluatorId: user_id,
          surveyorId: this.surveyorId,
          visitDate: this.visitDay,
          evaluationRemark: this.selectedEvaluationRemark,
          status: this.checkForSlectedRemarks(this.cloneArray),

          // evaluationStartDateTime: this.evaluationStartDateTime,
          // evaluationEndDateTime: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        };

        this.evaluationService.evaluateShop(obj).subscribe(
          (data: any) => {
            // console.log('evaluated shop data',data);
            this.loading = false;

            // tslint:disable-next-line:triple-equals
            if (data.success == "true") {
              this.hideRemarksModalWithNoChange();
              this.toastr.success("IR shop evaluated successfully ");
            
              setTimeout(() => {
                window.close();
              }, 2000);
            } else {
              this.toastr.error(data.errorMessage, "error");
            }
          },
          (error) => {
            // console.log('evaluated shop error',error)
            // window.close()
            this.loading = false;
            this.toastr.error(error.message, "Error");
          }
        );
      } else {
        const obj = {
          criteria: this.cloneArray,
          surveyId: this.surveyId,
          evaluatorId: user_id,
          visitDate: this.visitDay,
          surveyorId: this.surveyorId,
          status: this.checkForSlectedRemarks(this.cloneArray),

          evaluationStartDateTime: this.evaluationStartDateTime,
          evaluationEndDateTime: moment(new Date()).format(
            "YYYY-MM-DD HH:mm:ss"
          ),

          // when IR Evaluate button is clicked
          // for ir_evaluated_shop col change in merchandiser_survey_image_recognition
          irBoolean : irBoolean ? irBoolean : false,
        };

        this.evaluationService.evaluateShop(obj).subscribe(
          (data: any) => {
            // console.log('evaluated shop data',data);
            this.loading = false;

            // tslint:disable-next-line:triple-equals
            if (data.success == "true") {
              this.toastr.success("IR shop evaluated successfully ")
            
              setTimeout(() => {
                window.close();
              }, 2000);
            } else {
              this.toastr.error(data.errorMessage, "error");
            }
          },
          (error) => {
            // console.log('evaluated shop error',error)
            // window.close()
            this.loading = false;
            this.toastr.error(error.message, "Error");
          }
        );
      }
    }
  }

  // setImageUrl(data, imageView) {
  //   for (const image of data.imageList) {
  //     if (image.url != null) {
  //       if (image.url.indexOf("http") >= 0) {
  //         const i = data.imageList.findIndex((e) => e.url == image.url);
  //         data.imageList[i].isExternalUrl = true;
  //       }
  //     }
  //   }

  // }

  checkForSlectedRemarks(list) {
    let result = 1;
    list.forEach((element) => {
      if (element.remarkId && element.remarkId.length > 0) {
        result = 2;
      }
    });

    return result;
  }
  updateSoS() {
    if (this.selectedSoS.total_com_height <= 0) {
      this.toastr.warning("Height must be greater than zero.");
    } else {
      this.hideSoSModal();
    }

    const obj = {
      userId: parseInt(localStorage.getItem("user_id")),
      width: parseInt(this.selectedSoS.total_width),
      com_width: parseInt(this.selectedSoS.total_com_width),
      merchandiserId: parseInt(this.selectedSoS.merchandiser_survey_id),
    };

    console.log("final SoS object", obj);
    this.httpService.updateSOS(obj).subscribe(
      (data: any) => {
        if (data.success) {
          this.toastr.info("SOS width is updated");
        }
        // alert(data)
      },
      (error) => {
        // alert(error)
      }
    );
  }

 showChildModal(shop) {
    this.modalConfig = { backdrop: true, keyboard: true };
    // await this.getImage(shop?.url);

    // for image proxy: not working
    // console.log("Shop: ", shop);
    // var hi = shop.url.replace("https://s3.us-east-1.wasabisys.com/png-android/", "/apibiz/")
    // shop.url = hi;
    // console.log("Shop: ", shop);

    // working for font end base64- conversion not working due to cors
    //  console.log("Shop 1: ", shop);
    // this.convertImageUrlToBase64(shop.url);
    //  console.log("Shop 2: ", shop);

    // base64 image conversion using proxyServlet: working
    this.selectedShop = shop;
    this.getImageNew(shop.url);


    
    console.log("this. selectedShop in showChildModal: ", this.selectedShop);
    // this.getImageDimensions();
    this.selectedShop.recognizedResult = this.isJSONString(
      shop.recognizedResult
    )
      ? JSON.parse(shop.recognizedResult)
      : shop.recognizedResult;
    this.croppedData = this.selectedShop.recognizedResult
      ? this.selectedShop.recognizedResult.detectedSKU
      : [];
    this.setCroppedDataProperties();
    this.setProductFacing();
    this.setCompetition();
    this.rotationDegree = 0;
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  showSoSModal(item): void {
    console.log("output item", item);
    this.selectedSoS = item;
    this.sosModal.show();
  }

  hideSoSModal(): void {
    this.sosModal.hide();
  }

  showRemarksModal() {
    this.criteriaDesireScore = 0; // this.selectedCriteria.achievedScore;
    if (this.existingRemarks.length > 0) {
      this.existingRemarks.forEach((element) => {
        if (element.criteriaId === this.selectedCriteria.id) {
          this.selectedRemarksList.push(element.id);
        }
      });
    }

    this.remarksModal.show();
  }

  hideRemarkModalForCancelOption() {
    if (this.selectedCriteria.isEditable) {
      this.subtractScore(this.selectedCriteria);
    }

    // this.updateAchieveScore(this.selectedCriteria.id)
    this.remarksModal.hide();
  }
  hideRemarksModal() {
    if (this.selectedCriteria.isEditable) {
      this.subtractScore(this.selectedCriteria);
    }

    // this.updateAchieveScore(this.selectedCriteria.id)
    // if(this.selectedRemarksList.length>0)
    this.remarksModal.hide();
    // else{
    //   this.toastr.info(`please select remarks for "${this.selectedCriteria.title}"`)
    // }
  }

  showEvaluationRemarksModal() {
    this.evaluationRemarksModal.show();
  }

  singleCheckboxChange(id) {
    this.selectedEvaluationRemark = id;
  }

  hideRemarksModalWithNoChange() {
    this.evaluationRemarksModal.hide();
  }

  expand(id) {
    this.remarksList.forEach((element) => {
      // tslint:disable-next-line:triple-equals
      if (element.criteriaId == id && element.isChecked == 1) {
        this.childArray.push(element.description);
      }
    });
  }

  setImageUrl() {
    for (const data of this.data.section) {
      for (const image of data.imageList) {
        if (image.url != null) {
          if (
            image.url.indexOf("amazonaws.com") >= 0 ||
            image.url.indexOf("http") >= 0
            || image.url.indexOf("base64") >= 0
          ) {
            const i = data.imageList.findIndex(
              (e) => e.url == image.url && e.title == image.title
            );
            data.imageList[i].isExternalUrl = true;
          }
        }
      }
    }
  }
  showCommentModal(product) {
    this.selectedProduct = product;
    this.setComments();
    this.commentModal.show();
  }
  hideCommentModal() {
    this.comments = [];
    this.commentModal.hide();
  }
  setComments() {
    for (const element of this.oosComments) {
      if (element.merchandiserSurveyDetailId == this.selectedProduct.id) {
        this.comments.push(element);
      }
    }
  }

  receiveComment(comment) {
    this.loading = true;
    this.evaluationService.insertOOSComment(comment).subscribe(
      (data: any) => {
        this.loading = false;

        // tslint:disable-next-line:triple-equals
        if (data.success) {
          this.oosComments.push(comment);
          this.comments.push(comment);
          this.count = this.comments.length;
          this.toastr.success("Comment added Successfully");
        } else {
          this.toastr.error(
            "Something went wrong please try again later",
            "error"
          );
        }
      },
      (error) => {
        this.loading = false;
        this.toastr.error(error.message, "Error");
      }
    );
  }

  recieveCount($event) {
    this.comments = $event;
    this.count = this.comments.length;
  }
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  getEvaluationStartTime() {
    this.evaluationStartDateTime = moment(new Date()).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    this.startEvaluationModal.hide();
  }

  // IR working

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event;
  
    // event.blob can be used to upload the cropped image
  }

  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  showCropper() {
    console.log("this. selectedShop in showCropper|Identify Brands B: ", this.selectedShop);
    this.isCroppingMode = true;
    this.modalConfig = { backdrop: "static", keyboard: false };
  }
  hideCropper() {
    console.log("this. selectedShop in hideCropper|Close B: ", this.selectedShop);
    this.modalConfig = { backdrop: true, keyboard: true };
    this.closeProductEditor();
    this.imageWidth = this.imageWidthStart;
   this.imageHeight = this.imageHeightStart;
   this.resizeImage(this.imageWidth, this.imageHeight);
    this.isCroppingMode = false;
    this.cropperDisabled = true;
    this.cropperPosition = {};
    this.selectedProductId = -1;
    this.scale = 0.7;
  }

  getCoordinates() {
    console.log('in getCoordinates');
    // if sku is in editing mode, then save in existing object else add it in the list
    const scaleAdjustment = 1 / this.scale;
  
    const obj = {
      tempId: Math.floor(Math.random() * 1000000000 + 1),
      inEditingMode: false,
      x: this.croppedImage.cropperPosition.x1 * scaleAdjustment,
      y: this.croppedImage.cropperPosition.y1 * scaleAdjustment,
      w: this.croppedImage.cropperPosition.x2 * scaleAdjustment,
      h: this.croppedImage.cropperPosition.y2 * scaleAdjustment,
      type: this.selectedMode,
      active: "Y",
    };
    const index = this.croppedData.findIndex(
      (e) => e.skuId == this.selectedProductId
    );
    if (index > -1) {
      const coordinateIndex = this.croppedData[index].boundingBox.findIndex(
        (e) => e.inEditingMode == true
      );
      if (coordinateIndex > -1) {
        this.croppedData[index].boundingBox[coordinateIndex].inEditingMode =
          false;
        this.croppedData[index].boundingBox[coordinateIndex].x =
          this.croppedImage.cropperPosition.x1 * scaleAdjustment;
        this.croppedData[index].boundingBox[coordinateIndex].y =
          this.croppedImage.cropperPosition.y1 * scaleAdjustment;
        this.croppedData[index].boundingBox[coordinateIndex].w =
          this.croppedImage.cropperPosition.x2 * scaleAdjustment;
        this.croppedData[index].boundingBox[coordinateIndex].h =
          this.croppedImage.cropperPosition.y2 * scaleAdjustment;
        this.croppedData[index].boundingBox[coordinateIndex].type =
          this.selectedMode;
      } else {
        this.croppedData[index].boundingBox.push(obj);
      }
    } else {
      const objLis: any = [];
      objLis.push(obj);
      const croppedDataObj = {
        skuId: this.selectedProductId,
        // boundingBox: obj,

        boundingBox: objLis,
      };
      this.croppedData.push(croppedDataObj);
    }
    this.selectedShop.recognizedResult = this.selectedShop.recognizedResult ? this.selectedShop.recognizedResult : {};
    this.selectedShop.recognizedResult.detectedSKU = this.croppedData;
    this.saveRecognizedResult();
    this.cropperDisabled = true;
    this.cropperPosition = {};
    console.log("this.croppedData in getCoordinates|Save B: ",this.croppedData);
  }

  // to handle right click on image-container div
  handleRightClick(event: MouseEvent) {
    event.preventDefault(); // Prevent default context menu
    console.log('handleRightClick');
    if(
      !this.cropperDisabled 
      && this.selectedProductId!=-1
      && this.selectedMode.title
      && this.croppedImage.cropperPosition
      ){
      this.getCoordinates();
    }
    
  }

  changeCropperStatus(event: MouseEvent) {
    // if (event.button === 0) {
    //   console.log('Left click');
    // } else if (event.button === 2) {
    //   console.log('Right click');
    // }
    let cropperWidth = 100;
    let cropperHeight = 150;
    if (this.cropperDisabled) {
      this.cropperDisabled = false;
      const imgElement = event.target as HTMLImageElement;
      const imgRect = imgElement.getBoundingClientRect();
      const clickX = event.clientX - imgRect.left;
      const clickY = event.clientY - imgRect.top;

      // Calculate the cropper position based on the click coordinates
      this.croppedData.forEach((element) => {
        if (
          element.skuId == this.selectedProductId &&
          element.boundingBox?.length > 0
        ) {
          cropperWidth =
            (element.boundingBox[element.boundingBox.length - 1].w -
              element.boundingBox[element.boundingBox.length - 1].x) *
            this.scale;
          cropperHeight =
            (element.boundingBox[element.boundingBox.length - 1].h -
              element.boundingBox[element.boundingBox.length - 1].y) *
            this.scale;
        }
      });
      this.cropperPosition = {
        x1: clickX - cropperWidth / 2,
        y1: clickY - cropperHeight / 2,
        x2: clickX + cropperWidth / 2,
        y2: clickY + cropperHeight / 2,
      };
    }
  }

  selectProduct(productId, event) {
    if (event.checked == true) {
      this.selectedProductId = productId;
    } else {
      this.selectedProductId = -1;
    }
    this.closeProductEditor();
  }

  closeProductEditor() {
    this.croppedData.forEach((element) => {
      element.boundingBox.forEach((coordinate) => {
        coordinate.inEditingMode = false;
      });
    });
  }
  showCropperOnImage(tempId) {
    this.closeProductEditor();
    const index = this.croppedData.findIndex(
      (e) => e.skuId == this.selectedProductId
    );
    const coordinateIndex = this.croppedData[index].boundingBox.findIndex(
      (e) => e.tempId == tempId
    );
    this.croppedData[index].boundingBox[coordinateIndex].inEditingMode = true;
    this.cropperPosition = {
      x1: this.croppedData[index].boundingBox[coordinateIndex].x * this.scale,
      x2: this.croppedData[index].boundingBox[coordinateIndex].w * this.scale,
      y1: this.croppedData[index].boundingBox[coordinateIndex].y * this.scale,
      y2: this.croppedData[index].boundingBox[coordinateIndex].h * this.scale,
    };
    this.cropperDisabled = false;
  }

  deleteImage(tempId) {
    const index = this.croppedData.findIndex(
      (e) => e.skuId == this.selectedProductId
    );
    const coordinateIndex = this.croppedData[index].boundingBox.findIndex(
      (e) => e.tempId == tempId
    );
    this.croppedData[index].boundingBox[coordinateIndex].active = "N";
    this.croppedData[index].boundingBox[coordinateIndex].inEditingMode = false;
    this.selectedShop.recognizedResult.detectedSKU = this.croppedData;
    this.saveRecognizedResult();
  }

  setCroppedDataProperties() {
    console.log("croppedData setCroppedDataProperties: ", this.croppedData);
    this.croppedData?.forEach((sku) => {
      sku.boundingBox.forEach((coordinate) => {
        coordinate.tempId =
          coordinate.tempId || Math.floor(Math.random() * 1000000000 + 1);
        coordinate.inEditingMode = coordinate.inEditingMode || false;
        coordinate.active = coordinate.active || "Y";
      });
    });
    console.log("croppedData setCroppedDataProperties: ", this.croppedData);
  }
  saveRecognizedResult() {
    const obj = {
      id: this.selectedShop.id,
      recognizedResult: this.selectedShop.recognizedResult,
    };

    this.evaluationService.saveRecognizedResult(obj).subscribe(
      (data: any) => {
        if (data.success) {
          this.setProductFacing();
          this.toastr.success("Data Updated Successfully");
        } else {
          this.toastr.error(data.message, "Update Data");
        }
      },
      (error) => {
        this.toastr.error(error.message, "Error");
      }
    );
  }
  setProductFacing() {
    this.selectedShop.productList?.forEach((element) => {
      const skuIndex = this.croppedData.findIndex(
        (e) => e.skuId == element.product_id
      );
      if (skuIndex > -1) {
        let totalActiveFacingData = this.croppedData[
          skuIndex
        ].boundingBox?.filter((a) => a.active == "Y");

        element.skuCount = totalActiveFacingData?.length;
      } else {
        element.skuCount = 0;
      }
    });
  }

  setCompetition() {
    this.selectedShop.productList?.forEach((element) => {
      if (element?.is_competition == 1) {
        element.competition = "N";
      } else {
        element.competition = "Y";
      }
    });
  }

  resizeImage(width: number, height: number) {
    const img = new Image();
    img.src = this.selectedShop?.base64Image;
    console.log("this. selectedShop in resizeImage: ", this.selectedShop);
    console.log(" img. src resizeImage: ",  img.src);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error('Canvas 2D context not available.');
        return;
      }
      canvas.width = width;
      canvas.height = height;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(img, 0, 0, width, height);
      this.selectedShop.base64Image = canvas.toDataURL("image/png");
    };
    img.onerror = (error) => {
      console.error('Error loading image:', error);
    };
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
  zoomIn() {
    this.scale = parseFloat((this.scale + 0.1).toFixed(1));
    this.updateImagePosition();
    this.cropperDisabled= true;


   
  }

  // Function to handle zoom out
  zoomOut() {
    this.scale = parseFloat((this.scale - 0.1).toFixed(1));
    this.updateImagePosition();
    this.cropperDisabled= true;

    
  }

  // Function to update the image position based on zoom level
  updateImagePosition(): void {
    const w = this.imageWidth * this.scale;
    const h = this.imageHeight * this.scale;
    this.resizeImage(w, h);
  }

  getImageDimensions() {
    const img = new Image();
    img.src = this.selectedShop?.base64Image;

    img.onload = () => {
      this.imageWidth = img.width;
      this.imageHeight = img.height;
      this.imageHeightStart = img.height;
      this.imageWidthStart = img.width;

      // Update the dimensions as needed or perform other actions with the dimensions
      console.log(`Image Width: ${this.imageWidth}px`);
      console.log(`Image Height: ${this.imageHeight}px`);
    };
    // this.updateImagePosition();
  }

  adjustOverlayImageSize(scaleFactor: number) {
    const imageContainer: HTMLElement =
      document.querySelector(".image-container");
    const containerWidth = parseFloat(
      imageContainer.getAttribute("data-width")
    );
    const containerHeight = parseFloat(
      imageContainer.getAttribute("data-height")
    );
    imageContainer.style.width = containerWidth * this.scale + "px";
    imageContainer.style.height = containerHeight * this.scale + "px";
    const overlayImages = document.querySelectorAll(".rectangle-overlay"); // Get all overlay images

    overlayImages.forEach((image: HTMLImageElement) => {
      // Get the original size of the overlay image
      const originalTop = parseFloat(image.getAttribute("data-top"));
      const originalLeft = parseFloat(image.getAttribute("data-left"));
      const originalWidth = parseFloat(image.getAttribute("data-width"));
      const originalHeight = parseFloat(image.getAttribute("data-height"));

      // Calculate the new size of the overlay image based on the zoom level
      const newTop = originalTop * scaleFactor;
      const newLeft = originalLeft * scaleFactor;
      const newWidth = (originalWidth - newLeft) * scaleFactor;
      const newHeight = (originalHeight - newTop) * scaleFactor;

      // const positionAdjustmentX = (originalWidth - newWidth) / 2;
      // const positionAdjustmentY = (originalHeight - newHeight) / 2;

      // Update the style of the overlay image
      image.style.top = newTop + "px";
      image.style.left = newLeft + "px";
      image.style.width = newWidth + "px";
      image.style.height = newHeight + "px";
    });
  }

  getTransformStyle(): string {
    return `scale(${this.scale})`;
  }

  updateImageContainerSize() {
    this.cropperPosition.resizeCanvas(
      this.imageWidth * this.scale,
      this.imageHeight * this.scale
    );
    const imageContainer: HTMLElement =
      document.querySelector(".image-container");
    const containerWidth = parseFloat(
      imageContainer.getAttribute("data-width")
    );
    const containerHeight = parseFloat(
      imageContainer.getAttribute("data-height")
    );
    imageContainer.style.width = containerWidth * this.scale + "px";
    imageContainer.style.height = containerHeight * this.scale + "px";
  }

  isJSONString(value: string): boolean {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      return false;
    }
  }

  onModalHide() {
    this.selectedShop = {};
  }

  // base64 image conversion using proxyServlet : working
  getImageNew(imageUrl: string){
    this.irImageLoading = true;
    const data = this.evaluationService.getImageNew(imageUrl).then((data: any) => {
     console.log("imageProxyServlet res data.base64Image: ", data.base64Image);
     this.selectedShop.base64Image =data.base64Image;
     this.getImageDimensions();
    
    this.irImageLoading = false;
 
   })
   .catch(error => {
     console.error("Error converting image:", error);
   });
   }

  // converting to base64: not working due to cors issue
  convertImageUrlToBase64(imageUrl: string){
   const data = this.evaluationService.convertImageUrlToBase64(imageUrl).then((base64Image) => {
    console.log("data:::: ", base64Image);
   this.selectedShop.imageBase644 =base64Image;

  })
  .catch(error => {
    console.error("Error converting image:", error);
  });
  }

  // selectUnselectAllProduct(event, product){
  //   if (event.checked == true) {
  //     this.selectedProductsIds.push(product.product_id);
  //     console.log(this.selectedProductsIds);

  //     // this.selectedProductId = productId;
  //   } else {
  //     const i = this.selectedProductsIds.indexOf(product.product_id);
  //     this.selectedProductsIds.splice(i, 1);

  //     // this.selectedProductId = -1;
  //   }
  //   if(this.selectedProductsIds.length>1){
  //     this.closeProductEditor();
  //   this.cropperDisabled = true;
  //   }
    
  // }
}
