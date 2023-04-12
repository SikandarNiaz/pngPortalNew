import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatExpansionModule } from "@angular/material/expansion";
import { ModalModule } from "ngx-bootstrap/modal";
import { MatRadioModule } from "@angular/material/radio";
import { AccordionModule } from "ngx-bootstrap/accordion";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSliderModule } from "@angular/material/slider";
import { NgxImageZoomModule } from "ngx-image-zoom";
import { NgxPaginationModule } from "ngx-pagination";
import { ResizableModule } from "angular-resizable-element";
import { Ng5SliderModule } from "ng5-slider";
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PosmTrackingRoutingModule } from "./posm-tracking-routing.module";
import { PosmMainComponent } from "./posm-main/posm-main.component";
import { ManagePosmSurveyorsComponent } from "./manage-posm-surveyors/manage-posm-surveyors.component";
import { PosmImagesComponent } from './posm-images/posm-images.component';

@NgModule({
  declarations: [PosmMainComponent, ManagePosmSurveyorsComponent, PosmImagesComponent],
  imports: [
    CommonModule,
    PosmTrackingRoutingModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    AccordionModule,
    MatCardModule,
    MatCheckboxModule,
    MatSliderModule,
    NgxImageZoomModule,
    NgxPaginationModule,
    ResizableModule,
    Ng5SliderModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatNativeDateModule,
    MatListModule,
    MatMenuModule,
    MatDatepickerModule,
  ],
})
export class PosmTrackingModule {}
