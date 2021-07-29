import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Subject, of, BehaviorSubject } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Config } from "src/assets/config";
@Injectable({
  providedIn: "root",
})
export class PosmTrackingServiceService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ip: any = Config.BASE_URI;
  user_id: any;
  private dataSource = new Subject();
  data = this.dataSource.asObservable();

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

  getSurveyors(clusterId, zoneId, regionId) {
    const filter = JSON.stringify({
      act: 24,
      clusterId: clusterId,
      zoneId: zoneId,
      regionId: regionId,
    });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }

  updateSurveyorData(obj, url) {
    return this.http.post(this.ip + url, obj); // -----------> UpdateSurveyorController/ CreateSurveyorController
  }

  getRegion(zoneId) {
    this.user_id = localStorage.getItem("user_id");

    const filter = JSON.stringify({
      act: 1,
      zoneId: zoneId,
      userId: this.user_id,
    });
    const url = this.ip + "loadFilters";
    return this.http.post(url, filter);
  }
  getPosmImages(obj) {
    const urlEncode = this.UrlEncodeMaker(obj);
    const url = this.ip + "posmImageList";
    return this.http.post(url, urlEncode, this.httpOptions);
  }
}
