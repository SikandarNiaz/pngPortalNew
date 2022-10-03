import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Config } from "src/assets/config";
import { ModalDirective } from "ngx-bootstrap";

@Component({
  selector: "app-image-view",
  templateUrl: "./image-view.component.html",
  styleUrls: ["./image-view.component.scss"],
})
export class ImageViewComponent implements OnInit {
  params: any;
  ip: any = Config.BASE_URI;
  imageUrl: any;
  @ViewChild("childModal") childModal: ModalDirective;
  selectedItem: any = {};
  isExternalUrl: boolean;

  constructor(public activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((p: any) => {
      this.params = p;
      if (this.params.url) {
        this.setImageUrl(this.params.url);
      }
    });
  }

  ngOnInit() {}

  showChildModal(): void {
    this.childModal.show();
  }
  hideChildModal(): void {
    this.childModal.hide();
  }
  setSelectedItem(item) {
    this.selectedItem = item;
  }
  setImageUrl(url) {
    if (url.indexOf("amazonaws.com") >= 0 || url.indexOf("http") >= 0) {
      this.isExternalUrl = true;
    }
  }
}
