import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Location} from '@angular/common';
import { EvaluationService } from '../evaluation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ResizeEvent } from 'angular-resizable-element';
import { config } from 'src/assets/config';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: any = [];
  // ip = environment.ip;
  configFile = config;

  ip: any = this.configFile.ip;
  loading = false;
  selectedShop: any = {};

  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('remarksModal') remarksModal: ModalDirective;
  @ViewChild('evaluationRemarksModal') evaluationRemarksModal: ModalDirective;
  @ViewChild('sosModal') sosModal: ModalDirective;



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
  j = -1;
  i = 0;
  m = 0;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activatedRoutes: ActivatedRoute,
    private httpService: EvaluationService,
    private evaluationService: EvaluationService,
    private readonly location: Location

  ) {
    this.surveyId;

    this.activatedRoutes.queryParams.subscribe(q => {
      if (q.location) { this.isFromShop = false; }
    });
    this.activatedRoutes.params.subscribe(params => {
      this.p = params;
      this.surveyId = params.id;

      const obj = {
        surveyId: this.surveyId,
        userTypeId: localStorage.getItem('user_type')
        // userId:localStorage.getItem('user_id')
      };

      this.getData(obj);
    });
  }
  value = 5;
  options: any = {
    showTicksValues: true,
    stepsArray: [
      { value: 1 },

    ]
  };

  createTickForSlider(maxTicks) {
    const result: any = [];

   for (let index = 0; index < maxTicks.score; index++) {
     result.push({value: index});

   }
    this.options.stepsArray = result;
  }

  ngOnInit() {
    this.location.replaceState('/details/');
    this.availabilityCount = 0;
    this.reevaluatorRole = localStorage.getItem('Reevaluator');
    this.userType = localStorage.getItem('user_type');
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
      data => {
        if (data) {
          this.data = data;
         if (this.p.isEditable) {
          this.isEditable = false;
          document.title = this.data.section[0].sectionTitle;
          if (this.data.criteria) {
            this.evaluationArray = this.data.criteria;
            this.cloneArray = this.evaluationArray.slice();
            this.totalAchieveScore = this.getTotalAchieveScore();
          }

          // console.log(this.data)
          this.remarksList = this.data.remarks;
          this.productList = this.data.productList;
          this.sectionList = this.data.section;

          this.existingRemarks = this.data.ExistingRemarks || [];
         this.setRemarksForReEvaluation();
         this.checkEvaluatedRemarks();

          if (this.data.criteria) { this.calculateScore(); }


         } else {
          document.title = this.data.section[0].sectionTitle;
          if (this.data.criteria) {
            this.evaluationArray = this.data.criteria;
            this.cloneArray = this.evaluationArray.slice();
            this.totalAchieveScore = this.getTotalAchieveScore();
          }

          // console.log(this.data)
          this.remarksList = this.data.remarks;
          this.productList = this.data.productList;
          this.sectionList = this.data.section;

          this.existingRemarks = this.data.ExistingRemarks || [];
          this.evaluationRemarks = this.data.EvaluationRemarks || [];


         // tslint:disable-next-line:triple-equals
         if (this.userType == this.reevaluatorRole) {
         this.checkEvaluatedRemarks();
         this.setRemarksForReEvaluation();
         // tslint:disable-next-line:triple-equals
         } else {
          this.setPSKUCriteria();
         }
         this.isEditable = this.data.isEditable || this.isEditable;
          if (this.data.criteria) { this.calculateScore(); }
         }

        }
      },
      error => {}
    );
  }



checkEvaluatedRemarks() {
  if (this.existingRemarks.length > 0) {
    this.existingRemarks.forEach(element1 => {
      if (element1.id > 0) {
        const obj = {
          id: element1.id,
          description: element1.description,
          criteriaId: element1.criteriaId,
          isChecked: element1.isChecked
        };
    this.remarksList.forEach(element => {
      const i = this.remarksList.findIndex(e => e.id === element1.id);
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
                achievedScore: this.getFacingScore(element.skuTable, element1.score),
                isEditable: element1.isEditable,
                isChecked: 0
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
          element.skuTable.forEach(p => {
           this.totalSkus++;
           if (p.available_sku >= 1) {
             this.achievedSkus++;
           }
          });
        }
      }
    }
    console.log('TOTAL: ', this.totalSkus++);
    console.log('Achieved: ', this.achievedSkus);
    const percentage = ((this.achievedSkus / this.totalSkus) * 100).toFixed();
    console.log('percentage: ', percentage);
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
          parentId: element1.parentId,
          achievedScore: score,
          isEditable: element1.isEditable,
          isChecked: 0
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
    localStorage.setItem('productList', JSON.stringify(products));
    this.productList = localStorage.getItem('productList');

    this.availabilityCount = Math.round(this.getMSLNAvailbilityCount(products)); // Math.round(this.getAvailabilityCount(products));
  }


  calculateFacing(assetTypeId) {

    localStorage.setItem('assetTypeId', JSON.stringify(assetTypeId));
    // tslint:disable-next-line:radix
    this.assetTypeId = parseInt(localStorage.getItem('assetTypeId'));
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
        isChecked: 1
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
    products.forEach(p => {
      let obj = {};
      if (p.MSL === 'Yes' && p.available_sku === 1) {
        obj = {
          available_sku: p.available_sku,
          MSL: p.MSL
        };
        pro.push(obj);
      }

      if (p.MSL === 'Yes') {
        msl.push(p);
      }
    });
    this.MSLCount = msl.length;

    const MSLScore = (pro.length / this.MSLCount) * 10;
    return MSLScore;
  }
  getAvailabilityCount(products) {
    if (!products) {
      products = localStorage.getItem('productList');
    }
    const pro = products.map(p => p.available_sku);
    const sum = pro.reduce((a, v) => a + v);
    return (sum / pro.length) * this.msl;
  }

  getRemarkId(remarkId, criteriaId) {
    console.log('remark criteriaId', criteriaId);
    for (const element of this.remarksList) {
      // tslint:disable-next-line:triple-equals
      if (element.criteriaId == criteriaId && element.description === 'Data Inaccuracy') {
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
this.products.forEach(element => {
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
      achievedScore: criteria.isEditable ? this.criteriaDesireScore : 0,
      isEditable: criteria.isEditable,
      isChecked: 1
    };
    this.cloneArray.forEach(element => {
      const i = this.cloneArray.findIndex(e => e.id === criteria.id);
      this.cloneArray.splice(i, 1, obj);
    });
    // this.subtractScore(this.selectedCriteria);
    // this.evaluationArray.push(obj);
    console.log('evaluation array clone', this.cloneArray);
    // this.updateAchieveScore(criteria.id);
    this.hideRemarksModal();
    this.selectedRemarks = '';
    this.selectedRemarksList = [];
    this.criteriaDesireScore = 0;
  }

  checkboxChange(event, id) {
    console.log('checkbox event', !event.checked, id);

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

    console.log('remarks list', this.selectedRemarksList);
  }

  updateAchieveScore(id) {
    for (let index = 0; index < this.cloneArray.length; index++) {
      const element = this.cloneArray[index];
      const aScore = element.achievedScore;

      if (element.id === id) {
        this.cloneArray[index].achievedScore = this.criteriaDesireScore > 0 ? this.criteriaDesireScore : aScore;
      }
    }
    this.totalAchieveScore = this.getTotalAchieveScore();
  }

  getTotalAchieveScore() {
    let score = 0;
    this.cloneArray.forEach(element => {
      if (element.achievedScore >= 0) {
        score = score + element.achievedScore;
      }
    });
    return score;
  }

  subtractScore(criteria) {
    this.totalAchieveScore =
      this.criteriaDesireScore > 0
        ? this.totalAchieveScore - Math.abs(criteria.score - this.criteriaDesireScore)
        : this.totalAchieveScore - Math.abs(criteria.achievedScore);
  }

  isAnyCriteriaCheck() {
    let result = false;
    this.cloneArray.forEach(element => {
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
      this.totalAchieveScore = this.totalAchieveScore + Math.abs(criteria.score);

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
          achievedScore: criteria.score > criteria.achievedScore || criteria.score < 0 ? criteria.score : criteria.achievedScore,
          isEditable: criteria.isEditable,
          isChecked: 0
        };
        const e = this.evaluationArray.findIndex(i => i.id === criteria.id);
        this.cloneArray.splice(e, 1, obj);
        console.log('unchecked evaluation array', this.cloneArray);
        this.selectedRemarksList = [];
        this.updateAchieveScore(criteria.id);
        this.checkForCritical(criteria);
      }
    }
  }

  cancelCriteriaSelection() {
    const inputs: any = document.querySelectorAll('.checkbox');
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
        achievedScore: criteria.score > criteria.achievedScore ? criteria.score : criteria.achievedScore,
        parentId: criteria.parentId,
        isEditable: criteria.isEditable,
        isChecked: 0
      };
      const e = this.evaluationArray.findIndex(i => i.id === criteria.id);
      this.cloneArray.splice(e, 1, obj);
      console.log('unchecked evaluation array,using cancel button', this.cloneArray);
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
    this.data.criteria.map(c => {
      if (c.score > 0) {
        this.score += c.score;
      }
    });
    // this.score=this.score-(this.msl);

    console.log('total score is', this.score);
  }

  // makeScoreZero(){
  //   let result=[];
  //   this.cloneArray.forEach(element => {

  //     if()

  //   });
  // }
  evaluateShop() {
    const user_id = localStorage.getItem('user_id');
    this.loading = true;
    const req = true;

    if (req) {


      for (const element of this.data.shopDetails.tagsList) {
        // tslint:disable-next-line:triple-equals
        if (element.heading == 'surveyorId') {
          this.surveyorId = element.value;
        }
      }

      // tslint:disable-next-line:triple-equals
      if (this.userType == this.reevaluatorRole) {
        const obj = {
          criteria: this.cloneArray,
          surveyId: this.surveyId,
          evaluatorId: user_id,
          surveyorId: this.surveyorId,
          evaluationRemark: this.selectedEvaluationRemark,
          status: this.checkForSlectedRemarks(this.cloneArray)
        };

        this.evaluationService.evaluateShop(obj).subscribe(
          (data: any) => {
            // console.log('evaluated shop data',data);
            this.loading = false;

            // tslint:disable-next-line:triple-equals
            if (data.success == 'true') {
              this.hideRemarksModalWithNoChange();
              this.toastr.success('shop evaluated successfully ');
              this.evaluationArray = [];
              this.cloneArray = [];
              this.indexList = [];
              setTimeout(() => {
                window.close();
              }, 2000);
            } else {
              this.toastr.error(data.errorMessage, 'error');
            }
          },
          error => {
            // console.log('evaluated shop error',error)
            // window.close()
            this.loading = false;
            this.toastr.error(error.message, 'Error');
          }
        );
      } else {
        const obj = {
          criteria: this.cloneArray,
          surveyId: this.surveyId,
          evaluatorId: user_id,
          surveyorId: this.surveyorId,
          status: this.checkForSlectedRemarks(this.cloneArray)
        };

        this.evaluationService.evaluateShop(obj).subscribe(
          (data: any) => {
            // console.log('evaluated shop data',data);
            this.loading = false;

            // tslint:disable-next-line:triple-equals
            if (data.success == 'true') {
              this.toastr.success('shop evaluated successfully ');
              this.evaluationArray = [];
              this.cloneArray = [];
              this.indexList = [];
              setTimeout(() => {
                window.close();
              }, 2000);
            } else {
              this.toastr.error(data.errorMessage, 'error');
            }
          },
          error => {
            // console.log('evaluated shop error',error)
            // window.close()
            this.loading = false;
            this.toastr.error(error.message, 'Error');
          }
        );

      }

  }
}



  checkForSlectedRemarks(list) {
    let result = 1;
    list.forEach(element => {
      if (element.remarkId && element.remarkId.length > 0) {
      result = 2;
      }

    });


    return result;

  }
  updateSoS() {

    if (this.selectedSoS.total_com_height <= 0) {
    this.toastr.warning('Height must be greater than zero.');
    } else {
    this.hideSoSModal();
    }


    const obj = {
      userId: parseInt(localStorage.getItem('user_id')),
      width: parseInt(this.selectedSoS.total_width),
      com_width: parseInt(this.selectedSoS.total_com_width),
      merchandiserId: parseInt(this.selectedSoS.merchandiser_survey_id)
    };

    console.log('final SoS object', obj  );
    this.httpService.updateSOS(obj).subscribe((data: any) => {
      if (data.success) {
        this.toastr.info('SOS width is updated');

      }
// alert(data)
    }, error => {
      // alert(error)
    }
    );
  }

  showChildModal(shop): void {
    this.selectedShop = shop;
    this.rotationDegree = 0;
    this.childModal.show();
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  showSoSModal(item): void {
  console.log('output item', item);
  this.selectedSoS = item;
    this.sosModal.show();
  }

  hideSoSModal(): void {
    this.sosModal.hide();
  }

  showRemarksModal() {
    this.criteriaDesireScore = 0; // this.selectedCriteria.achievedScore;
    if (this.existingRemarks.length > 0) {
      this.existingRemarks.forEach(element => {
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
    this.remarksList.forEach(element => {
      // tslint:disable-next-line:triple-equals
      if (element.criteriaId == id && element.isChecked == 1) {
        this.childArray.push(element.description);
      }
    });

}

}

