import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { Router } from "@angular/router";
import * as moment from "moment";
import { Location } from "@angular/common";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private location: Location) {}

  canActivate() {
    const t = moment(new Date()).format("YYYY-MM-DD");
    const st = localStorage.getItem("today");
    // if (t > st) this.router.navigate(['/login']);
    // tslint:disable-next-line:triple-equals
    if (
      (localStorage.getItem("isLoggedin") && t <= st) ||
      this.location.path().indexOf("/details/") > -1 ||
      this.location.path().indexOf("/details_ir") > -1 ||
      this.location.path().indexOf("/image-view") > -1
      || this.location.path().indexOf('/list/home') > -1
    ) {
      return true;
    }

    this.router.navigate(["/login"]);
    return false;
  }
}
