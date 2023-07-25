import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { DashboardService } from "../dashboard.service";

@Injectable({
  providedIn: "root",
})
export class EvaluationService {
  // ip:any=environment.ip;

  ip: any = "";
  user_id: string;
  // 'http://192.168.3.94:8080/audit/';

  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService
  ) {
    this.ip = dashboardService.ip;
    this.user_id = localStorage.getItem("user_id");
  }
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    }),
    withCredentials: true,
  };

  UrlEncodeMaker(obj) {
    let url = "";
    for (const key in obj) {
      url += `${key}=${obj[key]}&`;
    }
    const newUrl = url.substring(0, url.length - 1);
    return newUrl;
  }

  getData(obj) {
    const urlencoded = this.UrlEncodeMaker(obj);
    const url = this.ip + "shopList";
    return this.http.post(url, urlencoded, this.httpOptions);
  }

  getShopDetails(obj) {
    const urlencoded = this.UrlEncodeMaker(obj);
    const url = this.ip + "evaluationManager";
    return this.http.post(url, urlencoded, this.httpOptions);
  }

  evaluateShop(obj) {
    const url = this.ip + "evaluateShopNew";  //EvaluationShopControllerNew
    return this.http.post(url, obj);
  }

  insertOOSComment(obj) {
    const urlencoded = this.UrlEncodeMaker(obj);
    const url = this.ip + "insertOOSComment";    // InsertSkuCommentController
    return this.http.post(url, urlencoded, this.httpOptions);
  }
  updateMSLStatus(obj) {
    const urlencoded = this.UrlEncodeMaker(obj);

    const url = this.ip + "updateMSL";
    return this.http.post(url, urlencoded, this.httpOptions);
  }

  updateSOS(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "update-shopsos";
    return this.http.post(url, urlEncode, this.httpOptions);
  }

  updateChillerData(obj) {
    const urlencoded = this.UrlEncodeMaker(obj);
    const url = this.ip + "updateChiller";
    return this.http.post(url, urlencoded, this.httpOptions);
  }
  updateData(obj) {
    const urlencoded = this.UrlEncodeMaker(obj);

    const url = this.ip + "updateEvaluationData";
    return this.http.post(url, urlencoded, this.httpOptions);
  }
}
