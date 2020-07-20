import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { config } from 'src/assets/config';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {EvaluationService} from '../evaluation.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'section-nine-view',
  templateUrl: './section-nine-view.component.html',
  styleUrls: ['./section-nine-view.component.scss']
})
export class SectionNineViewComponent implements OnInit {

  @Input('data') data;
  @ViewChild('childModal') childModal: ModalDirective;
  @Output('showModal') showModal: any = new EventEmitter<any>();
  @Input('isEditable') isEditable: any;
  @Output('productList') productForEmit: any = new EventEmitter<any>();
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
  visibilityData: any;
  availability: any;
  changeColor: boolean;
  updatingMSL: boolean;
  colorUpdateList: any = [];
  surveyId: any;
  flag = 0;
  evaluatorId: any;
  MSLCount = 0;
  MSLNAvailabilityCount: number;
  facing: any;
  availableDepth: any;
  desiredDepth: any;
  stock: any;
  total: any;

  selectedProduct: any = {};
  selectedFacing: any;
  selectedSku: any;
  loadingData: boolean;
  loading = false;

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
      this.visibilityData = this.data.genericTable || [];
    }



  }

  setSelectedImage(img) {
    this.selectedImage = img;

  }
  getFacingCount(products) {
    let sum = 0;
    products.forEach(el => {
      sum = +el.face_unit + sum;
    });
    return sum;
}

getAvailDepthCount(products) {
  let sum = 0;
  products.forEach(el => {
    sum =  + el.unit_available + sum;
  });
  return sum;
}

getDesDepthCount(products) {
  let sum = 0;
  products.forEach(el => {
    sum = sum + el.desiredDepth;
  });
  return sum;
}

getStockCount(products) {
  let sum = 0;
  products.forEach(el => {
    sum = sum + el.stock;
  });
  return sum;
}

getTotalCount(availableDepth, desiredDepth) {
  const percentage = ((availableDepth / desiredDepth) * 100).toFixed(1);
  return percentage;
}

    showChildModal(shop): void {
    this.selectedShop = shop;
    this.selectedFacing = this.selectedShop.face_unit;
    this.showModal.emit(this.selectedShop);
    // this.childModal.show();
  }


  showChillerChildModal(product, value) {
    if (value === 1) {
      this.flag = 1;
    } else {
      this.flag = 2;
    }
    this.selectedProduct = product;
      this.childModal.show();


}

  hideChildModal() {
    this.childModal.hide();
  }

changeFacing(product) {
  this.loading = true;
  if (this.isEditable) {
    this.changeColor = true;
    this.colorUpdateList.push(product.id);
     const obj = {
      msdId: product.detail_id,
      newValue: product.face_unit,
      evaluatorId: this.evaluatorId,
      type: 7
    };
this.httpService.updateData(obj).subscribe((data: any) => {
  if (data.success) {
    this.loading = false;
    this.toastr.success('Data Updated Successfully');
  } else {
    this.toastr.error(data.message, 'Update Data');
  }
});

  }
}



}

