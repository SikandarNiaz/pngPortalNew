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

  getShopDetailsIR(obj) {
    const urlencoded = this.UrlEncodeMaker(obj);
    const url = this.ip + "irevaluationManager";
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

  // IR service
  saveRecognizedResult(obj) {
    const url = this.ip + "/updateRecognizedResult";
    return this.http.post(url, obj);
  }

  // base64 image conversion using proxyServlet : working
  getImageNew(imageUrl) : Promise<string>{
    const obj = {
      imageUrl: imageUrl
      }
    const urlencoded = this.UrlEncodeMaker(obj);

    // const url = "/api"+ "/imageProxyServletNew";
    const url = this.ip + "/imageProxyServlet";
    return this.http.post(url, urlencoded, this.httpOptions).toPromise()
    .then((response:any) => {
      // const base64Image = this.arrayBufferToBase64(response);
      return response;
    });
  }

  convertImageUrlToBase64(imageUrl: string): Promise<string> {
    return this.http.get(imageUrl, { responseType: 'arraybuffer' })
      .toPromise()
      .then((response) => {
        const base64Image = this.arrayBufferToBase64(response);
        return `data:image/png;base64,${base64Image}`;
      });
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
