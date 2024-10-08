import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, of, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { timeout, catchError } from 'rxjs/operators';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { Config } from 'src/assets/config';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.user_id = localStorage.getItem('user_id');
  }

  ip: any = Config.BASE_URI;
  user_id: any = 0;
  private dataSource = new Subject();
  data = this.dataSource.asObservable();

  // ip: any = 'http://localhost:8080/audit/';

  // ip: any='http://192.168.3.142:8080/audit/';
  // ip: any = 'http://192.168.3.189:8080/audit/';
  // ip: any = 'http://192.168.3.94:8080/audit/';
  // ip: any = 'http://192.168.3.162:8080/audit/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    withCredentials: true,
  };

  httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    responseType: "json",
    withCredentials: true
  };

  updatedDownloadStatus(data) {
    this.dataSource.next(data);
  }

  login(credentials: any) {
    // let body=JSON.stringify(credentials)
    const url = this.ip + 'pictureLogin';
    return this.http.post(url, credentials);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout')
    //     return of(null);
    //   })
    // );
  }

  updatePassword(obj) {
    const url = this.ip + 'change-password';
    return this.http.post(url, obj, this.httpOptions);
  }

  removePlanedCall(obj) {
    obj = this.UrlEncodeMaker(obj);
    const url = this.ip + 'remove-plan-call';
    return this.http.post(url, obj, this.httpOptions);
  }

  UrlEncodeMaker(obj) {
    let url = '';
    for (const key in obj) {
      url += `${key}=${obj[key]}&`;
    }
    const newUrl = url.substring(0, url.length - 1);
    return newUrl;
  }
  getDashboardData(obj) {
    let body = null;
    if (obj != null) {
      body = this.UrlEncodeMaker(obj);
      // `zoneId=${obj.zoneId}&regionId=${obj.regionId}&endDate=${obj.endDate}&startDate=${obj.startDate}&distributionId=${obj.distributionId}&cityId=${obj.cityId}&storeType=${obj.storeType}&channelId=${obj.channelId}`;
    }
    const url = this.ip + 'dashboardDataSummary';
    return this.http.post(url, body, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  checkDate() {
    // let date=new Date()
    // let today=localStorage.getItem('today');
    // if(today && moment(date).format('YYYY-MM-DD')!==today){
    //   localStorage.clear();
    //   alert('Your session is expired ,please login again.');
    //   this.router.navigate(['/login']);
    // }
  }

  getLineChartData() {
    const url = this.ip + 'completionData';
    return this.http.post(url, {}, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getTableList(obj) {
    const body = this.UrlEncodeMaker(obj);
    // `zoneId=${obj.zoneId}&regionId=${obj.regionId}&endDate=${obj.endDate}&startDate=${obj.startDate}&merchandiserId=${obj.merchandiserId}`;
    const url = this.ip + 'completedShopList';
    return this.http.post(url, body, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getTableListIR(obj) {
    const body = this.UrlEncodeMaker(obj);
    // `zoneId=${obj.zoneId}&regionId=${obj.regionId}&endDate=${obj.endDate}&startDate=${obj.startDate}&merchandiserId=${obj.merchandiserId}`;
    const url = this.ip + 'irCompletedShopListController';
    return this.http.post(url, body, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getMerchandiserListForEvaluation(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + 'merchandiserList';
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getOOSProductivity(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + 'oosProductivityList';   // OutOfStockProductivityController
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  getMerchandiserScore(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + 'merchandiserScore';
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  merchandiserShopList(obj) {
    const body = `zoneId=${obj.zoneId}&regionId=${obj.regionId}&endDate=${obj.endDate}&startDate=${obj.startDate}&distributionId=${obj.distributionId}&cityId=${obj.cityId}&storeType=${obj.storeType}&channelId=${obj.channelId}&type=${obj.type}&routeId=${obj.routeId} `;
    const url = this.ip + 'merchandiserShopList';
    return this.http.post(url, body, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }
  //#region FILTER CALL
  getZone() {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({ act: 0, userId: this.user_id });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getQueryTypeList(reportId) {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({ act: 12, reportId: reportId });
    const url = this.ip + '/loadFilters';
    return this.http.post(url, filter);
  }

  getRemarksList() {
    const filter = JSON.stringify({ act: 11 });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }

  getRegion(zoneId) {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({
      act: 1,
      zoneId: zoneId,
      userId: this.user_id,
    });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getCities(regionId) {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({
      act: 2,
      regionId: regionId,
      userId: this.user_id,
    });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getProducts(categoryId) {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({
      act: 5,
      category: categoryId,
      userId: this.user_id,
    });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getAreas(channelId) {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({
      act: 3,
      channelId: channelId,
      userId: this.user_id,
    });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }
  getMerchandiserList(obj) {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({
      act: 4,
      regionId: obj.regionId,
      zoneId: obj.zoneId,
      date: obj.startDate,
      userId: this.user_id,
    });
    const url = this.ip + 'loadFilters';

    // const url = this.ip + 'cbl-pdf';
    return this.http.post(url, filter);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }
  //#endregion

  downloadMerchandiserPDF(obj) {
    const httpParams = new FormData();
    httpParams.append('reportType', '');
    httpParams.append('zoneId', obj.zoneId);
    httpParams.append('regionId', obj.regionId);
    httpParams.append('startDate', obj.startDate);
    httpParams.append('surveyorId', obj.surveyorId);

    const url = this.ip + `cbl-pdf`;
    const o = `surveyorId=${obj.surveyorId}&startDate=${obj.startDate}`;
    return this.http.post(url, o, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }
  getKeyForProductivityReport(body, reportUrl) {
    this.updatedDownloadStatus(true);
    const url = this.ip + reportUrl;
    return this.http.post(url, body, this.httpOptions);
    // .pipe(
    //   timeout(60000),
    //   catchError(e => {
    //     this.toastr.error('Due to limited connectivity your request could not be completed, please try again', 'Request Timeout');
    //     return of(null);
    //   })
    // );
  }

  getProductSets() {
    const filter = JSON.stringify({ act: 25 });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }

  getEvaluatorData() {
    const filter = JSON.stringify({ act: 26 });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }

  updateSurveyorData(obj) {
    const url = this.ip + "updateSurveyor"; // -----------> UpdateSurveyorController
    return this.http.post(url, obj);
  }

  public DownloadResource(obj, url) {
    let path;

    path = this.ip + url;

    const form = document.createElement('form');

    form.setAttribute('action', path);

    form.setAttribute('method', 'post');
    // form.setAttribute('target', '_blank');

    document.body.appendChild(form);

    this.appendInputToForm(form, obj);

    form.submit();

    document.body.removeChild(form);
  }
  private appendInputToForm(form, obj) {
    Object.keys(obj).forEach((key) => {
      const input = document.createElement('input');

      input.setAttribute('value', obj[key]);

      input.setAttribute('name', key);

      form.appendChild(input);
    });
  }

  updateImeiStatus(obj) {
    const body = this.UrlEncodeMaker(obj);
    const url = this.ip + 'add-imei-update-imei-status';
    return this.http.post(url, body, this.httpOptions);
  }
  getImeis() {
    const url = this.ip + 'add-imei-update-imei-status';
    return this.http.get(url, this.httpOptions);
  }
  uploadImei(obj) {
    const url = this.ip + 'add-imei-update-imei-status';
    // @ts-ignore
    return this.http.post(url, obj);
  }
  getEvaluatorList() {
    const filter = JSON.stringify({ act: 15 });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }

  getMerchandiserRoaster(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + 'merchandiser-roaster';
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getKey(obj) {
    const body = this.UrlEncodeMaker(obj);
    return this.http.post(this.ip + 'tableauTicket', body, this.httpOptions);
  }
  getMerchandiserWiseScore(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + 'merchandiserWiseScore';
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  getEvaluationSummary(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + 'evaluatorSummaryData';
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  getSurveySurveyorList(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + 'survey-shop-view';
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  getSurveyShopList(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + 'survey-shop-view';
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getRegions() {
    const url = this.ip + '/loadFilters';
    const filter = JSON.stringify({ act: 13 });
    return this.http.post(url, filter);
  }
  getDistributionCheckInList(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + 'distCheckInList';
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  getSurveyors(clusterId, zoneId, regionId) {
    const filter = JSON.stringify({
      act: 19,
      clusterId: clusterId,
      zoneId: zoneId,
      regionId: regionId,
    });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }

  insertSurveyor(obj) {
    console.log("insertSurveyor: ", obj);
    const filter = JSON.stringify({
      obj: obj,
    });
    //return obj;
    const url = this.ip + "addSurveyorController";
    return this.http.post(url, filter);
  }

  displayRouteStatus(obj) {
    const url = this.ip + "shopWiseRouteCount";      //SurveyorRouteListController
    return this.http.post(url, obj);
  }

  getAllShops(zoneId, regionId) {
    const filter = JSON.stringify({
      act: 16,
      zoneId: zoneId,
      regionId: regionId,
    });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }

  insertShopsIds(data) {
    const obj2 = {
      obj: data,
    };
    const urlencoded = this.UrlEncodeMaker(obj2);
    const url = this.ip + "insertShopsIds"; //surveyorroutelistcontroller
    return this.http.post(url, obj2);
  }

  
  updateRouteStatus(obj) {
    const urlencoded = this.UrlEncodeMaker(obj);
    const url = this.ip + "shopWiseRouteCount"; //surveyorroutelistcontroller
    return this.http.post(url, obj);
  }

  
  uploadRoutes(obj) {
    const url = this.ip + "UploadRoutesControllerNew";
    return this.http.post(url, obj);
  }

  downloadFile(obj, url) {
    let path;

    path = this.ip + url;

    const form = document.createElement("form");

    form.setAttribute("action", path);

    form.setAttribute("method", "post");

    document.body.appendChild(form);

    this.appendInputToForm(form, obj);

    form.submit();

    document.body.removeChild(form);
  }

  getZoneByCluster(clusterId) {
    this.user_id = localStorage.getItem('user_id');
    const filter = JSON.stringify({
      act: 18,
      userId: this.user_id,
      clusterId: clusterId,
    });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }

  getAreaByRegion(regionId) {
    this.user_id = localStorage.getItem('user_id');

    const filter = JSON.stringify({
      act: 27,
      regionId: regionId,
      userId: this.user_id,
    });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }

  getQueryList(reportId) {
    this.user_id = localStorage.getItem('user_id');
    const filter = JSON.stringify({ act: 30, userId: this.user_id, reportId: reportId });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }
  getKeyForDashboardReport(reportUrl, obj) {
    this.updatedDownloadStatus(true);
    const url = this.ip + reportUrl;
    return this.http.post(url, obj);
  }
  getDistinctSkuList() {
    const filter = JSON.stringify({ act: 31, userId: this.user_id });
    const url = this.ip + 'loadFilters';
    return this.http.post(url, filter);
  }

  updateUserData(
    id,
    name,
    password,
    active,
    roleId,
    clusterIds,
    zoneIds,
    regionIds
  ) {
    const filter = JSON.stringify({
      // act: 1,
      id: id,
      name: name,
      password: password,
      active: active,
      roleId: roleId,
      clusterIds: clusterIds,
      zoneIds: zoneIds,
      regionIds: regionIds,
    });
    const url = this.ip + "updateUserController";
    return this.http.post(url, filter);
  }

  getRoles() {
    const url = this.ip + "loadFilters";
    const filter = JSON.stringify({ act: 28 });
    return this.http.post(url, filter);
  }

  displayMenus(roleId) {
    //type_description
    const filter = JSON.stringify({ roleId: roleId });
    const url = this.ip + "menusListController";
    return this.http.post(url, filter);
  }

  displayUsers(roleId) {
    const filter = JSON.stringify({ roleId: roleId });
    const url = this.ip + "usersListController";
    return this.http.post(url, filter);
  }

  updateMenus(roleId, menus) {
    //const filter = JSON.stringify({ act: 30, obj: obj });
    const obj = JSON.stringify({
      // act: 2,
      roleId: roleId,
      menus: menus,
    });
    const url = this.ip + "updateMenu";
    return this.http.post(url, obj);
  }

  insertRole(type_description, active) {
    const filter = JSON.stringify({
      // act: 1,
      type_description: type_description,
      active: active,
    });
    const url = this.ip + "createRoleController";
    return this.http.post(url, filter);
  }

  insertUser(data) {
    const filter = JSON.stringify({
      // act: 1,
      obj: data,
    });
    const url = this.ip + "createUserController";
    return this.http.post(url, filter);
  }


  updateChillerPlanograms(obj) {
    const url = this.ip + "updateChillerPlanogram"; //----------> UpdateChillerPlanogramController
    return this.http.post(url, obj);
  }
  getChillerPlanogramList(obj) {
    const urlEncode = this.UrlEncodeMaker(obj); // ---------> ChillerPlanogramListController
    const url = this.ip + "chillerPlanogramList";
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  insertChillerPlanogram(obj) {
    const url = this.ip + "insert-chiller-planogramNew"; // -----------> InsertChillerPlanogramNewController
    return this.http.post(url, obj);
  }
  updatePlanogramStatus(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "updatestatusplanogram"; // -----------> UpdateStatusPlanogramController
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  getImageMetaData(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "getImageMetaData"; // -----------> PlanogramImageMetaDataController
    return this.http.post(url, urlEncode, this.httpOptions);
  }
  getPlanogramTypeList() {
    const filter = JSON.stringify({ act: 34});
    const url = this.ip + '/loadFilters';
    return this.http.post(url, filter);
  }
  // getShopTitleList() {
  //   const filter = JSON.stringify({ act: 45});
  //   const url = this.ip + '/loadFilters';
  //   return this.http.post(url, filter);
  // }
  getShopTitleList(parnetChannelId: string) {
    debugger;
    const filter = JSON.stringify({ act: 45, channel: parnetChannelId });
    const url = this.ip + '/loadFilters';
    return this.http.post(url, filter);
  }
  

  
  uploadSOS(obj) {
    const url = this.ip + "update-desied-sos"; //  ---------> UploadDesiredSOSController
    return this.http.post(url, obj);
  }
  getDesiredSOS(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "get_desired_sos";
  //   return this.http.post(url, urlEncode, {  headers: new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     'Accept': 'application/json',
  //   }),
  //   responseType: "json",
  //   withCredentials: true
  // }
  //   );
  return this.http.post(url, urlEncode, this.httpOptions);
  }

  getShopLocationApprovalData(obj) {
    const filter = JSON.stringify({ regionId: obj.regionId, zoneId: obj.zoneId });
    const url = this.ip + "/shopLocationApprovalController";
    return this.http.post(url, filter);
  }
  updateShopLocationApproval(obj){
    const filter = JSON.stringify({obj: obj});
    const url = this.ip + "/updateShopLocationApprovalController"; 
    return this.http.post(url, filter);
  }
  fetchData(obj){
    const filter = JSON.stringify({obj: obj});
    const url = this.ip + "/updatee"; 
    return this.http.post(url, filter);
  }
  

}
