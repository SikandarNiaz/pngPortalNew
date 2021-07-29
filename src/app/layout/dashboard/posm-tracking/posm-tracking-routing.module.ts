import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PosmMainComponent } from "./posm-main/posm-main.component";
import { ManagePosmSurveyorsComponent } from "./manage-posm-surveyors/manage-posm-surveyors.component";
import { PosmImagesComponent } from "./posm-images/posm-images.component";

const routes: Routes = [
  {
    path: "",
    component: PosmMainComponent,
    children: [
      {
        path: "",
        component: ManagePosmSurveyorsComponent,
        pathMatch: "full",
      },
      {
        path: "posm-images",
        component: PosmImagesComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosmTrackingRoutingModule {}
