import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { DashboardService } from "../../dashboard.service";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
  selector: "role_management",
  templateUrl: "./role_management.component.html",
  styleUrls: ["./role_management.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RoleManagementComponent implements OnInit {
  title = "Role Management";
  loadingData: boolean;
  rolesList: any = [];
  selectedRole: any = {};
  selectedStatus: any;
  insertForm: FormGroup;
  userInsertForm: FormGroup;
  roles: any = new FormControl({}, [Validators.required]);
  menus: any = [];
  selectedMenus: any = [];
  selectedMenu: any = {};
  //@ViewChildren("checked") private myCheckbox: any;
  labels: any;

  //insertForm: FormGroup;
  loadingModalButton: boolean;
  @ViewChild("insertModal") insertModal: ModalDirective;
  @ViewChild("userInsertModal") userInsertModal: ModalDirective;
  @ViewChild("userInfoModal") userInfoModal: ModalDirective;
  activeStatus: any = [
    { id: 1, value: "Y" },
    { id: 2, value: "N" },
  ];
  disable: boolean = true;

  users: any = [];
  form: FormGroup;
  clusterList: any = [];
  usersClusterIds: any;
  usersClusterIdsSplit: void;
  loadingUserList: boolean = false;
  selecteduser: any;
  checkedList: any = [];
  selectedCluster: any;
  currentSelected: {};
  taggedClusters: any = [];
  taggedClusterIds: any;
  taggedClusterTitles: any;
  adminId: any;
  selectedZone: any;
  selectedRegion: any = [];
  selectedCity: any = [];
  selectedDistribution: {};
  zoneList: any = [];
  userDataList: any;
  regionList: any = [];
  selectedType: any = {};
  zonePlaceholder = "District";
  regionPlaceholder = "City";

  constructor(
    private toastr: ToastrService,
    private httpService: DashboardService,
    public router: Router,
    public formBuilder: FormBuilder
  ) {
    this.clusterList = JSON.parse(localStorage.getItem("clusterList")) || [];
    this.zoneList = JSON.parse(localStorage.getItem("zoneList")) || [];
    this.insertForm = formBuilder.group({
      type_description: new FormControl("", [Validators.required]),
      active: new FormControl("", [Validators.required]),
    });

    this.userInsertForm = formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      active: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      cluster:
      this.clusterList.length > 0
        ? new FormControl("", [Validators.required])
        : new FormControl(""),
        zone:  this.zoneList.length > 0
        ? new FormControl("", [Validators.required])
        : new FormControl(""),
        region:  this.regionList.length > 0
        ? new FormControl("", [Validators.required])
        : new FormControl(""),
    });

    this.labels = JSON.parse(localStorage.getItem("labelProperties"));
    
    this.form = formBuilder.group({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      roleId: new FormControl(""),
      active: new FormControl("", [Validators.required]),
      cluster:
      this.clusterList.length > 0
        ? new FormControl("", [Validators.required])
        : new FormControl(""),
        zone:  this.zoneList.length > 0
        ? new FormControl("", [Validators.required])
        : new FormControl(""),
        region:  this.regionList.length > 0
        ? new FormControl("", [Validators.required])
        : new FormControl(""),
    });
  }

  ngOnInit() {
    this.getRoles();
    this.form.get("cluster").valueChanges.subscribe((val) => {
      if (val) {
        this.getZoneByCluster(val, this.userDataList);
      }
    });

    this.form.get("zone").valueChanges.subscribe((val) => {
      if (val) {
        this.zoneChange(val, this.userDataList);
      }
    });
  }

  showUserInsertModal() {
    this.userInsertModal.show();
  }

  showUserInfoModal(user) {
    this.userDataList = user;
    this.adminId = user.id;
    this.selecteduser = user;
    let selectedCluster = [];

    let clusterIdsUnsplitted = user.cluster_id;
    let clusterIds: [] = clusterIdsUnsplitted.split(",");

    for (let i of clusterIds) {
      if (i == -1) {
        selectedCluster = this.clusterList;
        const k = selectedCluster.findIndex((c) => c.id == -1);
        if (k > -1) {
          selectedCluster.splice(k, 1);
        }
        // selectedCluster = this.clusterList;
        break;
      } else {
        const k = this.clusterList.findIndex((c) => c.id == i);
        if (k > -1) {
          const obj = {
            cluster_id: i,
          };
          selectedCluster.push(this.clusterList[k]);
        }
      }
    } //end for

    this.form.patchValue({
      username: user.username,
      password: user.password,
      type_id: user.type_id,
      active: user.active,
      roleId: this.selectedRole.id,
      cluster: selectedCluster,
      //zone: ""
    });

    setTimeout(() => {
      this.userInfoModal.show();
      // And any other code that should run only after 1s
    }, 1500);

    // this.userInfoModal.show();
  }

  updateUserData(data) {
    this.loadingModalButton = true;
    this.userDataList = data;
    const name = data.username;
    const password = data.password;
    const active = data.active;
    const roleId = data.roleId;
    const clusterIdsList = data.cluster;
    const zoneIdsList = data.zone;
    const regionIdsList = data.region;
    const id = this.adminId;
    let clusterIds = this.joinIds(clusterIdsList);
    let zoneIds = this.joinIds(zoneIdsList);
    let regionIds = this.joinIds(regionIdsList);
    //let clusterIds= clusterIdsList.map(e => e.id).join(",");
    this.httpService
      .updateUserData(
        id,
        name,
        password,
        active,
        roleId,
        clusterIds ? clusterIds : -1,
        zoneIds,
        regionIds
      )
      .subscribe((data: any) => {
        if (data) {
          this.toastr.success("User Details Updated");
          this.getUsersByRole();
        } else {
          this.toastr.error(data.message, "Error");
        }
        this.loadingModalButton = false;
      });

    // console.log([
    //   {name: "Joe", age: 22},
    //   {name: "Kevin", age: 24},
    //   {name: "Peter", age: 21}
    // ].map(e => e.name).join(","));
  }

  hideUserInfoModal() {
    this.selecteduser = {};
    this.selectedCluster = [];
    this.selectedZone = [];
    this.selectedRegion = [];
    this.form.reset();
    this.userInfoModal.hide();
  }

  getRoles() {
    this.loadingData = true;
    this.httpService.getRoles().subscribe(
      (data) => {
        const res: any = data;
        if (res) {
          this.rolesList = res;
        }
        if (!res) {
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

  getMenus() {
    // //this.selectedSurveyors = [];

    this.loadingData = true;
    // const obj = {
    //   roleId: this.roleId,
    //  // action: action,
    // };
    this.selectedMenus = [];
    console.log(this.selectedRole.id);
    console.log(this.selectedRole.type_description);
    this.httpService.displayMenus(this.selectedRole.id).subscribe(
      (data) => {
        if (data) {
          this.menus = data;
        }
        this.clearLoading();
      },
      (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
        this.clearLoading();
      }
    );
  }

  getUsersByRole() {
    this.loadingUserList = true;
    this.selectedMenus = [];
    this.httpService.displayUsers(this.selectedRole.id).subscribe(
      (data) => {
        if (data) {
          this.users = data;
          //this.usersClusterIdsSplit=names.split(',');
          console.log("users list: ", this.users);
        }
        this.loadingUserList = false;
      },
      (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
        this.loadingUserList = false;
      }
    );
  }

  changeMenu(event, menu) {
    const i = this.selectedMenus.findIndex((c) => c.menu_id == menu.menu_id);
    if (i > -1) {
      const obj = {
        menu_id: menu.menu_id,
        menu_header: menu.menu_header,
        menu_title: menu.menu_title,
        active: event.checked ? "Y" : "N",
      };
      this.selectedMenus.splice(i, 1, obj);
      let disablesave: boolean = false;
      this.disable = disablesave;
    } else {
      const obj = {
        menu_id: menu.menu_id,
        menu_header: menu.menu_header,
        menu_title: menu.menu_title,
        msl: menu.mustHave,
        active: event.checked ? "Y" : "N",
      };
      this.selectedMenus.push(obj);
      let disablesave: boolean = false;
      this.disable = disablesave;
    }
  }

  saveMenus() {
    this.loadingData = true;
    // const obj = {
    //   roleId: this.selectedRole.id,
    //   menus: this.selectedMenus,

    // };
    const roleId = this.selectedRole.id;
    const menus = this.selectedMenus;
    this.httpService.updateMenus(roleId, menus).subscribe(
      (data) => {
        if (data) {
          //if (data.success) {
          this.toastr.success("Menus Updated Successfully ");
          this.selectedMenus = [];
          //this.showCount("show");
        }
        this.clearLoading();
      },
      (error) => {
        error.status === 0
          ? this.toastr.error("Please check Internet Connection", "Error")
          : this.toastr.error(error.description, "Error");
        this.clearLoading();
      }
    );
  }

  clearLoading() {
    this.loadingData = false;
  }

  showInsertModal() {
    this.insertModal.show();
  }

  hideInsertModal() {
    this.insertForm.reset();
    this.insertModal.hide();
  }

  hideUserInsertModal() {
    this.userInsertForm.reset();
    this.userInsertModal.hide();
  }

  insertUser(data) {
    console.log("data: ", data);
    this.loadingModalButton = true;
    const obj = {
      username: data.username,
      password: data.password,
      active: data.active,
      type: data.type,
      cluster: this.clusterList.length > 0 ? data.cluster : -1,
      zone: data.zone? data.zone: -1 ,
      region: data.region? data.region: -1,
    };
    this.httpService.insertUser(obj).subscribe((data: any) => {
      if (data.id == 1) {
        this.toastr.success(data.title, data.description);
        if (this.selectedRole.id) {
          this.getUsersByRole();
        }
        this.hideUserInsertModal();
      } else {
        this.toastr.error(data.title, data.description);
      }
      this.loadingModalButton = false;
    });
  }

  insertRole(data) {
    this.loadingModalButton = true;
    // const formData = new FormData();
    const type_description = data.type_description;
    const active = data.active;

    // formData.append("formData", JSON.stringify(data));
    this.httpService
      .insertRole(type_description, active)
      .subscribe((data: any) => {
        if (data) {
          this.toastr.success("Role Added");
          this.getRoles();
          this.hideInsertModal();
        } else {
          this.toastr.error(data.message, "Error");
        }
        this.loadingModalButton = false;
      });
  }

  getSelectedValue(status: Boolean, value: String) {
    if (status) {
      this.checkedList.push(value);
    } else {
      var index = this.checkedList.indexOf(value);
      this.checkedList.splice(index, 1);
    }

    this.currentSelected = { checked: status, name: value };
  }

  async getZoneByCluster(clusterIdsList, userDataList) {
    let clusterIds;
    if (isNaN(clusterIdsList)) {
      clusterIds = this.joinIds(clusterIdsList);
    }
    // let clusterIds= this.joinClusterIds(clusterIdsList);

    this.loadingData = true;
    //this.selectedZone = {};
    // this.selectedRegion = [];
    //this.selectedRole = {};
    this.selectedCity = {};
    this.selectedDistribution = {};
    let selectedZone = [];

    const data: any = await this.httpService
      .getZoneByCluster(clusterIds || -1)
      .toPromise();
    // const data: any = this.httpService.getZoneByCluster(clusterIds || -1).subscribe((data: any) => {
    if (data) {
      const res: any = data;
      console.log(res);
      this.zoneList = res;

      let zoneIdsUnsplitted = userDataList.zone_id;
      let zoneIds: [] = zoneIdsUnsplitted.split(",");

      for (let i of zoneIds) {
        if (i == -1) {
          selectedZone = this.zoneList;
          const k = selectedZone.findIndex((c) => c.id == -1);
          if (k > -1) {
            selectedZone.splice(k, 1);
          }
          // selectedZone = this.zoneList;
          break;
        } else {
          const k = this.zoneList.findIndex((c) => c.id == i);
          if (k > -1) {
            //  const obj = {
            //    zone_id: i,
            //  };
            selectedZone.push(this.zoneList[k]);
          }
        }
      } //end for
    }

    this.form.get("zone").setValue(selectedZone);
    this.loadingData = false;

    (error) => {
      error.status === 0
        ? this.toastr.error("Please check Internet Connection", "Error")
        : this.toastr.error(error.description, "Error");
      this.loadingData = false;
    };
  }

  getAllRegions() {
    this.loadingData = true;
    this.httpService.getRegions().subscribe(
      (data) => {
        const res: any = data;
        if (res.regionList) {
          this.regionList = res.regionList;
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

  async zoneChange(zoneIdsList, userDataList) {
    let zoneIds;
    if (isNaN(zoneIdsList)) {
      zoneIds = this.joinIds(zoneIdsList);
    }

    // let zoneIds = this.joinZoneIds(zoneIdsList);

    let selectedRegion = [];
    let selected = [];
    this.loadingData = true;
    // this.selectedRegion = [];
    const data: any = await this.httpService
      .getRegion(zoneIds || -1)
      .toPromise();
    if (data) {
      this.regionList = data;

      let regionIdsUnsplitted = userDataList.region_id;
      let regionIds: [] = regionIdsUnsplitted.split(",");

      for (let i of regionIds) {
        if (i == -1) {
          selectedRegion = this.regionList;
          const k = selectedRegion.findIndex((c) => c.id == -1);
          if (k > -1) {
            selectedRegion.splice(k, 1);
          }
          // selected = selectedRegion;
          break;
        } else {
          const k = this.regionList.findIndex((c) => c.id == i);
          if (k > -1) {
            //  const obj = {
            //    zone_id: i,
            //  };
            selectedRegion.push(this.regionList[k]);
          }
        }
      } //end for
    }

    this.form.get("region").setValue(selectedRegion);
    this.loadingData = false;
  }

  // joinZoneIds(zoneIdsList: any) {
  //   return zoneIdsList.map(e => e.id).join(",");
  // }

  joinIds(idsList: any) {
    return idsList.map((e) => e.id).join(",");
  }

  async getZoneByClusterId() {
    console.log("cluster: ", this.selectedCluster);
    try {
      const data: any = await this.httpService
        .getZoneByCluster(this.selectedCluster || -1)
        .toPromise();
      if (data) {
        this.zoneList = data;
      }
    } catch (error) {
      this.toastr.error(error, "Please check Internet Connection");
    }
  }

  async getRegionByZoneId() {
    try {
      const data: any = await this.httpService
        .getRegion(this.selectedZone || -1)
        .toPromise();
      if (data) {
        this.regionList = data;
      }
    } catch (error) {
      this.toastr.error(error, "Please check Internet Connection");
    }
  }
}
