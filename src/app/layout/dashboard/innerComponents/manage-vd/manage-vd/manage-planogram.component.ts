import { Component, OnInit, ViewChild } from "@angular/core";
import { DashboardService } from "../../../dashboard.service";
import { Router } from "@angular/router";
import { Config } from "src/assets/config";
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ModalDirective } from "ngx-bootstrap/modal";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: "app-manage-planogram",
  templateUrl: "./manage-planogram.component.html",
  styleUrls: ["./manage-planogram.component.scss"],
})
export class ManagePlanogramComponent implements OnInit {
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
      chillerId: new FormControl("", [Validators.required]),
      selectedShop: new FormControl("", [Validators.required]),

    });
   
  }

  ngOnInit(): void {
    this.getPlanogramTypeList();
    //this.getShopTitleList();
    // this.loadData();
  }
  

  getChillerPlanogramList(): void {
    this.getShopTitleList();
    
    this.loadingData = true;
    const obj = {
      chillerId: this.selectedAssetType === -1 ? -1 : this.selectedAssetType?.id,
    type: this.selectedPlanogramType === -1 ? -1 : this.selectedPlanogramType?.planogram_type,
    channelId: this.selectedChannel === -1 ? -1 : this.selectedChannel?.id,
      status: this.selectedStatus
    };
  
    this.httpService.getChillerPlanogramList(obj).subscribe(
      (data: any) => {
      //  console.log(obj , "pix data")
        if (data) {
          this.planogramList = data;
        }
        console.log(this.planogramList , "planogramList")

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
    this.uploadModal.show();
   
   // this.uploadForm.reset();
    this.selectedShop = null;
    this.selectedImage = img;
    this.imageSrc = img?.src || '';
    this.uploadForm.patchValue({
    title: this.selectedImage?.title || '',
    channelId:this.selectedImage.channel?.title || '',
    chillerId:this.selectedImage?.title || '',
    selectedShop:this.selectedImage?.shopTitle || '',
    
    });

    if (img.id) {
      const obj = {
          selectedImageId: img.id,
      };
      this.getImageMetaData(obj, '');
  }
  console.log("picListaaaaaaaa",img);  

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

  uploadPlanogram(post: any, status: string): void {
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
          this.toastr.success(data.message);
          this.getChillerPlanogramList();
          this.hideUploadModal();
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
  debugger
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
          // this.uploadForm.patchValue({
          //   selectedShop:this.picList[0].shop_title        
          //   });
            console.log("picList",this.selectedImage);  
            console.log("shop_title",this.planogramList);  
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

  // getShopTitleList(): void {
  //   this.httpService.getShopTitleList().subscribe(
  //     (data: any) => {
  //       if (data) {
  //         this.shopTitleList = data;
  //         this.filterShopTitleList = this.shopTitleList;
  //       }
  //     },
  //     (error) => {
  //       error.status === 0
  //         ? this.toastr.error("Please check Internet Connection", "Error")
  //         : this.toastr.error(error.description, "Error");
  //     }
  //   );
  // }


  getShopTitleList(): void {
    debugger
    if (!this.selectedChannel) {
      this.toastr.error("Please select a channel", "Error");
      return;
    }
  
    this.httpService.getShopTitleList(this.selectedChannel.parnetChannelId).subscribe(
      (data: any) => {
        if (data) {
          this.shopTitleList = data;
          this.filterShopTitleList = this.shopTitleList;
          console.log('filterShopTitleList:', this.filterShopTitleList);

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
    const filterValue = (event.target as HTMLInputElement).value;
    if (!filterValue) {
      this.filterShopTitleList = this.shopTitleList;
    } else {
      this.filterShopTitleList = this.shopTitleList.filter(option =>
        option.shop_title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
  }

  loadData(): void {
    // Implement your data loading logic here
    // Example:
    this.getChillerPlanogramList();
  }
}
