import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DashboardService } from '../../dashboard.service';
import { Router } from "@angular/router";
import { Config } from "src/assets/config";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-upload-planogram',
  templateUrl: './upload-planogram.component.html',
  styleUrls: ['./upload-planogram.component.scss']
})
export class UploadPlanogramComponent implements OnInit {

  selectedStatus: string;
  selectedImage: any;
  image: File | null = null;
  selectedValue: any;
  insertType: any;
  assetTypesListForModel: any = [];
  filterValue: any;
  inputValue: any;
  selectedShopTitle: any;
  chillerList: any = [];
  channelList: any = [];
  assetTypesList: any = [];
  planogramTypeList: any = [];
  selectedChiller: any = {};
  selectedAssetType: any = {};
  selectedPlanogramType: any = {};
  selectedChannel: any = {};
  chillerProductList: any = [];
  codeVerification: any = ["Y", "N"];
  isSelected: boolean = true;
  loadingData: boolean;
  loading: boolean;
  loadingModalButton: boolean;
  isUpdateRequest: boolean;
  operationType = "";
  ip = Config.BASE_URI;
  planogramList: any = [];
  myControl = new FormControl('');
  selectedShop: any;
  picList: any = [];
  metaData: any = [];
  @ViewChild("uploadModal") uploadModal: ModalDirective;

  form: FormGroup;
  uploadForm: FormGroup;
  imageSrc: string | ArrayBuffer = '';
  shopTitleList: any[] = [];
  filterShopTitleList: any[] = [];
  searchValue: any;
  selectedAssetTypeForModel: any;
  selected: any;
  excelFile: File | null = null;
  data: any[] = [];
  picList2: string;
//  cdr: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    public formBuilder: FormBuilder
  ) {
    this.assetTypesList = JSON.parse(localStorage.getItem("assetList")) || [];
    this.assetTypesListForModel = this.assetTypesList;
    this.channelList = JSON.parse(localStorage.getItem("channelList")) || [];
    this.form = formBuilder.group({
      id: new FormControl(""),
      title: new FormControl("", [Validators.required]),
      channelId: new FormControl("", [Validators.required]),
      selectedShop: new FormControl("", [Validators.required]),
      codeVerification: new FormControl("", [Validators.required]),
      desiredShelves: new FormControl("")
    });
    this.uploadForm = formBuilder.group({
      title: new FormControl("", [Validators.required]),
      path: new FormControl("", [Validators.required]),
      channelId: new FormControl("", [Validators.required]),
      chillerId: new FormControl("", [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getPlanogramTypeList();
    //this.getShopTitleList();
    // this.loadData();
  }

  getChillerPlanogramList(): void {
    this.loadingData = true;
    const obj = {
      chillerId: this.selectedAssetType?.id,
      type: this.selectedPlanogramType?.planogram_type,
      channelId: this.selectedChannel?.id,
      status: this.selectedStatus
    };
    this.httpService.getChillerPlanogramList(obj).subscribe(
      (data: any) => {
        if (data) {
          this.planogramList = data;
        //  this.picList = data;
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

  showUploadModal(img: any): void {
    this.getShopTitleList();

    this.uploadModal.show();
   
    this.uploadForm.reset();
    this.selectedShop = null;
    this.selectedImage = img;
    this.imageSrc = img?.src || '';
    this.uploadForm.patchValue({
    title: this.selectedAssetType?.title || '',
    channelId:this.selectedChannel?.title || '',
    chillerId:this.selectedAssetType?.title || '',
   // selectedShop:this.shopTitleList[1]?.shop_title
    });
    if (img.id) {
      const obj = {
          selectedImageId: img.id,
      };
      this.getImageMetaData(obj, '');
  }
}
  // hideUploadModal(): void {
  //   this.uploadForm.reset();
  //   if (this.uploadModal) {
  //     this.uploadForm.reset();
  //     this.selectedShop = null;
  //     this.uploadModal.hide(); 
  //     this.selectedImage = null; 
  //   }
  // }
  hideUploadModal(): void {
    if (this.uploadForm) {
      this.uploadForm.reset(); 
      this.uploadForm.patchValue({
      });
    }
    this.picList = null;
    this.selectedShop = null;
    this.selectedImage = null;
    if (this.uploadModal) {
      this.uploadModal.hide(); 
    }
    this.cdr.detectChanges();
  }

  onSelectFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.image = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
    }
  }

  selectPlanogramMeta(event: any): void {
    this.excelFile = event.target.files[0] || null;
    this.isSelected = false;
  }

  uploadPlanogram( status: string): void {
    debugger
    const post:any={}

    post.channelId=this.selectedChannel?.id;
    post.chillerId=this.selectedAssetType?.id;
    post.title=this.selectedAssetType?.title;
    post.status = status;

    if (this.selectedShop) {
      const shopObj = this.shopTitleList.find(shop => shop.shop_title === this.selectedShop);
      if (shopObj) {
        post.shopId = shopObj.id;
      }
    }

    this.loadingModalButton = true;
    const formData = new FormData();
    post.type = this.selectedPlanogramType?.planogram_type || "Chiller_Verification";
    
    formData.append("planogramData", JSON.stringify(post));
    if (this.image) formData.append("path", this.image);
    if (this.excelFile) formData.append("uploadPlanogramMeta", this.excelFile);

    this.httpService.insertChillerPlanogram(formData).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.success === "true") {
          this.metaData=data.data;
          console.log(this.metaData,"sdfg");
          this.toastr.success(data.message);
          this.getChillerPlanogramList();
         // this.hideUploadModal();
        } else {
          this.toastr.error(data.message, "Error");
        }
      },
      error: (err) => {
        this.toastr.error('An error occurred while uploading the planogram', 'Error');
        console.error('Upload error:', err);
      },
      complete: () => {
        this.loadingModalButton = false;
      }
    });
  }

//   updatePlanogram(post: any, status: string): void {
//     debugger;
//     post.status = status;
//     if (this.selectedImage?.id) {
//         post.selectedImageId = this.selectedImage.id;
//     }
//     this.loadingModalButton = true;

//     this.httpService.updatePlanogramStatus(post).subscribe((response: any) => {
//        // console.log(response); 
//         if (response.statusUpdateSuccess) {
//            // this.picList = response.data;
//            // console.log(this.picList); 
//             this.toastr.success('Status updated successfully');
//             this.getChillerPlanogramList();
//             // this.hideUploadModal();
//         } else {
//             this.toastr.error('Status is not updated ');
//            // this.picList = response.data;  
//           //  console.log(this.picList);  
//         }
//         this.loadingModalButton = false;
//     }, (error) => {
//         this.toastr.error(error, "Error");
//         this.loadingModalButton = false;
//     });
// }

updatePlanogram(post: any, status: string) {
  post.status = status;
  if (this.selectedImage.id) {
    post.selectedImageId = this.selectedImage.id;
  }
  this.loadingModalButton = true;

  this.httpService.updatePlanogramStatus(post).subscribe(
    (response: any) => {
      if (response.statusUpdateSuccess) {
        this.toastr.success("Status updated successfully");
        this.getChillerPlanogramList();
      } else {
        this.toastr.error("Error updating status", "Error");
      }
      this.loadingModalButton = false;
      this.hideUploadModal();
    },
    (error: any) => {
      this.toastr.error("Error updating status", "Error");
      this.loadingModalButton = false;
      this.hideUploadModal();
    }
  );
}

onOptionSelected(event: MatAutocompleteSelectedEvent) {
  this.selectedShop = event.option.value;
}


getImageMetaData(post: any, status: string): void {
  if (this.selectedImage?.id) {
      post.selectedImageId = this.selectedImage.id;
  }
  this.loadingModalButton = true;

  this.httpService.getImageMetaData(post).subscribe((response: any) => {
      console.log(response); 
      if (response.statusUpdateSuccess) {
          this.picList = response.data;
          console.log(this.picList); 
          this.getChillerPlanogramList();
          // this.hideUploadModal();
      } else {
          this.picList = response.data;  
          console.log(this.picList);  
      }
      this.loadingModalButton = false;
  }, (error) => {
      this.toastr.error(error, "Error");
      this.loadingModalButton = false;
  });
}
  getPlanogramTypeList(): void {
    this.loadingData = true;
    this.httpService.getPlanogramTypeList().subscribe(
      (data: any) => {
        if (data) {
          this.planogramTypeList = data;
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

  getShopTitleList(): void {
    this.httpService.getShopTitleList(this.selectedChannel.parnetChannelId).subscribe(
      (data: any) => {
        if (data) {
          this.shopTitleList = data;
          this.filterShopTitleList = this.shopTitleList;
        }
      },
      (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
      }
    );
  }

  filterShops(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    
    if (!filterValue) {
      this.filterShopTitleList = this.shopTitleList;
    } else {
      this.filterShopTitleList = this.shopTitleList.filter(shop =>
        shop.shop_title.toLowerCase().includes(filterValue) ||
        shop.shop_code.toLowerCase().includes(filterValue)
      );
    }
  }

  
  // filterShops(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   if (!filterValue) {
  //     this.filterShopTitleList = this.shopTitleList;
  //   } else {
  //     this.filterShopTitleList = this.shopTitleList.filter(option =>
  //       option.shop_title.toLowerCase().includes(filterValue.toLowerCase())
  //     );
  //   }
  // }

  loadData(): void {
    // Implement your data loading logic here
    // Example:
    this.getChillerPlanogramList();
  }
}
