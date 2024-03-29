import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EvaluationRoutingModule } from "./evaluation-routing.module";
import { HomeComponent } from "./home/home.component";
import { DetailsPageComponent } from "./details-page/details-page.component";
import { MainPageComponent } from "./main-page/main-page.component";

import { SectionOneViewComponent } from "./section-one-view/section-one-view.component";
import { SectionTwoViewComponent } from "./section-two-view/section-two-view.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { SectionThreeViewComponent } from "./section-three-view/section-three-view.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { SectionFourViewComponent } from "./section-four-view/section-four-view.component";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSliderModule } from "@angular/material/slider";
import { NgxImageZoomModule } from "ngx-image-zoom";
import { SectionFiveComponent } from "./section-five/section-five.component";
import { NgxPaginationModule } from "ngx-pagination";
import { ResizableModule } from "angular-resizable-element";
import { Ng5SliderModule } from "ng5-slider";
import { SectionSixComponent } from "./section-six/section-six.component";
import { MatInputModule } from "@angular/material/input";
import { SectionSevenViewComponent } from "./section-seven-view/section-seven-view.component";
import { SectionEightViewComponent } from "./section-eight-view/section-eight-view.component";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
import { MatButtonModule } from "@angular/material/button";
import { MatNativeDateModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { SectionNineViewComponent } from "./section-nine-view/section-nine-view.component";
import { SectionOneDetailComponent } from "./section-one-detail/section-one-detail.component";
import { CommentsComponent } from "./comments/comments.component";
import { CommentboxComponent } from "./commentbox/commentbox.component";
import { SectionTenComponent } from "./section-ten/section-ten.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { AccordionModule } from "ngx-bootstrap/accordion";

// IR module imports
import { ImageCropperModule } from "ngx-image-cropper";
import { Ng2OrderModule } from "ng2-order-pipe";
import { HomeIRComponent } from "./home-ir/home-ir.component";
import { SectionSeventyIRViewComponent } from "./section-seventy-ir-view/section-seventy-ir-view.component";

@NgModule({
  declarations: [
    HomeComponent,
    HomeIRComponent,
    SectionSeventyIRViewComponent,
    DetailsPageComponent,
    MainPageComponent,
    SectionOneViewComponent,
    SectionTwoViewComponent,
    SectionThreeViewComponent,
    SectionFourViewComponent,
    SectionFiveComponent,
    SectionSixComponent,
    SectionSevenViewComponent,
    SectionEightViewComponent,
    SectionNineViewComponent,
    SectionOneDetailComponent,
    CommentsComponent,
    CommentboxComponent,
    SectionTenComponent
  ],
  imports: [
    CommonModule,
    EvaluationRoutingModule,
    ModalModule.forRoot(),
    // ModalModule,
    FormsModule,
    MatRadioModule,
    AccordionModule.forRoot(),
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
    MatDatepickerModule,
    MatSelectModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    ImageCropperModule,
    Ng2OrderModule,
  ],
  exports: [DetailsPageComponent],
})
export class EvaluationModule {}
