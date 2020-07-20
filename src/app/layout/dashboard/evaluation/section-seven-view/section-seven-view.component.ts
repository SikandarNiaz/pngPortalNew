import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { config } from 'src/assets/config';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EvaluationService } from '../evaluation.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'section-seven-view',
  templateUrl: './section-seven-view.component.html',
  styleUrls: ['./section-seven-view.component.scss']
})
export class SectionSevenViewComponent implements OnInit {

  @Input('data') data;
  // @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild('childModal') childModal: ModalDirective;
  @Output('showModal') showModal: any = new EventEmitter<any>();
  @Input('isEditable') isEditable: any;
  @Output('psku') pskuForEmit: any = new EventEmitter<any>();
  selectedShop: any = {};
  selectedImage: any = {};
  // ip=environment.ip;
  configFile = config;

  ip: any = this.configFile.ip;
  hover = 'hover';
  zoomOptions = {
    Mode: 'hover'
  };
  zoomedImage = 'https://image.shutterstock.com/image-photo/micro-peacock-feather-hd-imagebest-260nw-1127238569.jpg';
  products: any;
  availability: any;
  changeColor: boolean;
  updatingMSL: boolean;
  selectedValue: any;
  selectedProduct: any = {};
  colorUpdateList: any = [];
  kbdData: any = [];
  visibilityData: any = [];
  selectedSku: any;
  surveyId: any;
  evaluatorId: any;
  MSLCount = 0;
  loadingData: boolean;
  loading = false;
  MSLNAvailabilityCount: number;
  facing: any;
  totalDesiredFacing: any;
  secondaryData: any = [];

  statusArray: any = [{ title: 'Yes', value: '1' }, { title: 'No', value: '0' }];

  constructor(private router: Router, private toastr: ToastrService, private httpService: EvaluationService) { }

  ngOnInit() {
    const arr = this.router.url.split('/');
    this.surveyId = +arr[arr.length - 1];
    this.evaluatorId = localStorage.getItem('user_id');
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.data.currentValue) {
      this.data = changes.data.currentValue;
      this.selectedImage = this.data.imageList[0];
      this.products = this.data.skuTable || [];
      this.visibilityData = this.data.genericTable || [];
      this.secondaryData = this.data.secondaryData || [];
      this.kbdData = this.data.kbdList || [];
      if (this.products.length > 0) {
      this.availability = this.getAvailabilityCount(this.products);
      this.facing = this.getFacingCount(this.products);
      this.totalDesiredFacing = this.getTotalDesiredFacing(this.products);
      }
      console.log('is editable', this.isEditable);
      this.MSLNAvailabilityCount = this.getMSLNAvailbilityCount(this.products);
    }


  }

  setSelectedImage(img) {
    this.selectedImage = img;

  }


  getAvailabilityCount(products) {
    const sum = [];
    products.forEach(element => {
      if (element.available_sku === 1) {
      sum.push(element);
      }

    });
    return sum.length;
  }

  getTotalDesiredFacing(products) {
    let sum = 0;
    products.forEach(el => {
      sum = +el.desired_facing + sum;
    });
    return sum;
  }

  getFacingCount(products) {
    let sum = 0;
    products.forEach(el => {
      sum = +el.face_unit + sum;
    });
    return sum;
}

  getMSLNAvailbilityCount(products) {
    const pro = [];
    const msl = [];
    products.forEach(p => {
      let obj = {};
     if (p.MSL === 'Yes'  && p.available_sku === 1 ) {
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
    return  pro.length;
  }

  updateString(value) {
    return value ? 'Yes' : 'No';
  }

  changeSku(value) {
    this.loading = true;
    if (this.isEditable) {
      this.changeColor = true;
      this.updatingMSL = true;

      this.colorUpdateList.push(value.id);
      const obj = {
        msdId: value.id,
        facing: -1,
        type: 1,
        newValue: !!value.available_sku ? 0 : 1,
        surveyId: value.survey_id,
        evaluatorId: this.evaluatorId
      };



      // return value?'YES':'NO';

  this.httpService.updateData(obj).subscribe((data: any) => {
    if (data.success) {
      this.loading = false;
      this.toastr.success('Data Updated Successfully');
      // this.products=data.productList;
      const key = data.msdId;
      this.products.forEach(e => {

      // for (const key of this.colorUpdateList) {
        if (key === e.id) {
          const i = this.products.findIndex(p => p.id === key);
          const obj = {
            id: e.id,
            available_sku: (e.available_sku === 0) ? e.available_sku = 1 : e.available_sku = 0,
            MSL: e.MSL,
            product_title: e.product_title,
            face_unit: e.face_unit,
            survey_id: e.survey_id,
            desired_facing: e.desired_facing,
            category_title: e.category_title,
            color: 'red'
          };

          this.products.splice(i, 1, obj);

          // console.log(this.products[i])
        }
        // localStorage.setItem('assetTypeId', JSON.stringify(this.data.assetTypeId));




      // }

      this.availability = this.getAvailabilityCount(this.products);
      this.MSLNAvailabilityCount = this.getMSLNAvailbilityCount(this.products);

      });

       this.pskuForEmit.emit();

    } else {
      this.toastr.error(data.message, 'Update Data');
    }
  });

    }
  }



  changeFacing(value) {

    this.loading = true;
    if (this.isEditable) {
      this.changeColor = true;
      this.updatingMSL = true;

      this.colorUpdateList.push(value.id);
      const obj = {
        msdId: value.id,
        newValue: value.face_unit,
        type: 2,
        unitAvailable: -1,
        surveyId: value.survey_id,
        evaluatorId: this.evaluatorId
      };



      // return value?'YES':'NO';

  this.httpService.updateData(obj).subscribe((data: any) => {
    if (data.success) {
      this.loading = false;
      this.toastr.success('Data Updated Successfully');
      // this.products=data.productList;
      const key = data.msdId;
      this.products.forEach(e => {

      // for (const key of this.colorUpdateList) {
        if (key === e.id) {
          const i = this.products.findIndex(p => p.id === key);
          const obj = {
            id: e.id,
            available_sku: e.available_sku,
            MSL: e.MSL,
            product_title: e.product_title,
            survey_id: e.survey_id,
            face_unit: e.face_unit,
            desired_facing: e.desired_facing,
            category_title: e.category_title,
            color: 'red'
          };

          this.products.splice(i, 1, obj);

          // console.log(this.products[i])
        }
        // localStorage.setItem('assetTypeId', JSON.stringify(this.data.assetTypeId));




      // }

      this.facing = this.getFacingCount(this.products);
      this.totalDesiredFacing = this.getTotalDesiredFacing(this.products);
      });

      //  this.assetTypeForEmit.emit(this.data.assetTypeId);

    } else {
      this.toastr.error(data.message, 'Update Data');
    }
  });

    }
  }

  changeUtilization(value) {
    this.loading = true;
    if (this.isEditable) {

      const obj = {
        msdId: value.secondarySurveyId,
        newValue: value.utilization,
        type: 3,
        evaluatorId: this.evaluatorId
      };




  this.httpService.updateData(obj).subscribe((data: any) => {
    if (data.success) {
      this.loading = false;
      this.toastr.success('Data Updated Successfully');
      const key = data.msdId;
      this.products.forEach(e => {

      // for (const key of this.colorUpdateList) {
        if (key === e.id) {
          const i = this.products.findIndex(p => p.id === key);
          // const obj = {
          //   id: e.id,
          //   available_sku: e.available_sku,
          //   MSL: e.MSL,
          //   product_title: e.product_title,
          //   face_unit: e.face_unit,
          //   desired_facing: e.desired_facing,
          //   category_title: e.category_title,
          //   color: 'red'
          // };

          // this.products.splice(i, 1, obj);

          // console.log(this.products[i])
        }

      // }
      });

    } else {
      this.toastr.error(data.message, 'Update Data');
    }
  });

    }
  }


  showChildModal(shop): void {
    this.selectedShop = shop;
    this.showModal.emit(this.selectedShop);
    // this.childModal.show();
  }

  showFacingChildModal(product) {
    if (this.isEditable) {
    this.selectedProduct = product;
    this.childModal.show();
  }

}
 hideChildModal() {
    this.childModal.hide();
  }
  changeKbd(newVal, value ) {
    this.loading = true;
    if (this.isEditable) {

      const obj = {
        msdId: value.merchQuestId,
        newValue: newVal,
        type: 4,
        evaluatorId: this.evaluatorId
      };




  this.httpService.updateData(obj).subscribe((data: any) => {
    if (data.success) {
      this.loading = false;
      this.toastr.success('Data Updated Successfully');
      const key = data.msdId;
      this.kbdData.forEach(e => {

      // for (const key of this.colorUpdateList) {
        if (key === e.merchQuestId) {
          const i = this.kbdData.findIndex(p => p.id === key);
          // const obj = {
          //   merchQuestId: e.merchQuestId,
          //   optionId: e.optionId,
          //   MSL: e.MSL,
          //   product_title: e.product_title,
          //   face_unit: e.face_unit,
          //   desired_facing: e.desired_facing,
          //   category_title: e.category_title,
          // };

          // this.kbdData.splice(i, 1, obj);

          // console.log(this.products[i])
        }

      // }
      });

    } else {
      this.toastr.error(data.message, 'Update Data');
    }
  });

    }
  }
}

