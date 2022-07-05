import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatNativeDateModule,
  MatRadioModule,
  MatCheckboxModule,
  MatMenuModule,
} from "@angular/material";
import { MatGridListModule } from "@angular/material/grid-list";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
} from "@angular/material/datepicker";

import { StatModule } from "../../shared/modules/stat/stat.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from "./innerComponents/home/home.component";
import { ShopListComponent } from "./innerComponents/shop-list/shop-list.component";
import { SummaryComponent } from "./innerComponents/summary/summary.component";
import { ProductivityComponent } from "./innerComponents/productivity/productivity.component";
import { FilterBarComponent } from "./innerComponents/filter-bar/filter-bar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DetailsComponent } from "./innerComponents/details/details.component";
import { DailyVisitReportComponent } from "./innerComponents/daily-visit-report/daily-visit-report.component";
import { ShopDetailComponent } from "./innerComponents/shop-detail/shop-detail.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { MslDashboardComponent } from "./innerComponents/msl-dashboard/msl-dashboard.component";
import { ProductivityDashboardComponent } from "./innerComponents/productivity-dashboard/productivity-dashboard.component";
import { ChartsModule as Ng2Charts } from "ng2-charts";
import { TposmDeploymentReportComponent } from "./innerComponents/tposm-deployment-report/tposm-deployment-report.component";
import { MatTooltipModule } from "@angular/material/tooltip";
import { LineChartComponent } from "./innerComponents/home/line-chart/line-chart.component";
import { UpdatePasswordComponent } from "./user/update-password/update-password.component";
import { RawDataComponent } from "./raw-data/raw-data.component";
import { MatTableComponent } from "./innerComponents/mat-table/mat-table.component";
import { Ng2OrderModule } from "ng2-order-pipe";
import { ButtonsModule } from "ngx-bootstrap";
import { MerchandiserListComponent } from "./innerComponents/merchandiser-list/merchandiser-list.component";
import { AbnormalityComponent } from "./innerComponents/abnormality/abnormality.component";
import { TimeAnalysisReportComponent } from "./innerComponents/time-analysis-report/time-analysis-report.component";
import { NgxPaginationModule } from "ngx-pagination";
import { MerchandiserAttendanceComponent } from "./innerComponents/merchandiser-attendance/merchandiser-attendance.component";
import { DailyEvaluationReportComponent } from "./innerComponents/daily-evaluation-report/daily-evaluation-report.component";
import { BsDropdownModule } from "ngx-bootstrap";
import { EmailManagerComponent } from "./innerComponents/email-manager/email-manager.component";
import { MessageStatusListComponent } from "./innerComponents/email-manager/childComponents/message-status-list/message-status-list.component";
import { AddNewMessageComponent } from "./innerComponents/email-manager/childComponents/add-new-message/add-new-message.component";
import { UploadRoutesComponent } from "./innerComponents/upload-routes/upload-routes.component";
import { SingleRouteDetailComponent } from "./innerComponents/upload-routes/routes-inner-pages/single-route-detail/single-route-detail.component";
import { ShopsForSingleRouteComponent } from "./innerComponents/upload-routes/routes-inner-pages/shops-for-single-route/shops-for-single-route.component";
import { AddEditGroupComponent } from "./innerComponents/email-manager/childComponents/add-edit-group/add-edit-group.component";
import { AddDeviceComponent } from "./innerComponents/add-device/add-device.component";
import { SupervisorWwwrSummaryComponent } from "./innerComponents/supervisor-wwwr-summary/supervisor-wwwr-summary.component";
import { ShopListReportComponent } from "./innerComponents/shop-list-report/shop-list-report.component";
import { MerchandiserRoasterComponent } from "./innerComponents/merchandiser-roaster/merchandiser-roaster.component";
import { MatTabsModule } from "@angular/material/tabs";
import { EvaluationModule } from "./evaluation/evaluation.module";
import { MerchandiserScoreComponent } from "./innerComponents/merchandiser-score/merchandiser-score.component";
import { TableauHelperComponent } from "./Tableau/tableau-helper/tableau-helper.component";
import { SkuDashboardTableauComponent } from "./Tableau/sku-dashboard-tableau/sku-dashboard-tableau.component";
import { SosDashboardTableauComponent } from "./Tableau/sos-dashboard-tableau/sos-dashboard-tableau.component";
import { ProductivityDashboardTableauComponent } from "./Tableau/productivity-dashboard-tableau/productivity-dashboard-tableau.component";
import { StfDashboardComponent } from "./Tableau/stf-dashboard/stf-dashboard.component";
import { VoErrorReportComponent } from "./innerComponents/vo-error-report/vo-error-report.component";
import { MerchandiserWiseScoreComponent } from "./innerComponents/merchandiser-wise-score/merchandiser-wise-score.component";
import { SosReportComponent } from "./innerComponents/sos-report/sos-report.component";
import { PngOosReportComponent } from "./innerComponents/png-oos-report/png-oos-report.component";
import { SurveyShopsSurveyorComponent } from "./innerComponents/survey-shops-surveyor/survey-shops-surveyor.component";
import { SurveyShopListComponent } from "./innerComponents/survey-shop-list/survey-shop-list.component";
import { DistributionCheckInCardComponent } from "./innerComponents/distribution-check-in-card/distribution-check-in-card.component";
import { CalenderDemoComponent } from "./innerComponents/calender/calender-demo/calender-demo.component";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { CalendarHeaderComponent } from "./innerComponents/calender/calendar-header/calendar-header.component";
import { ImageViewComponent } from "./innerComponents/image-view/image-view.component";

import { UniqueBasedProductivityReportComponent } from "./innerComponents/unique-based-productivity-report/unique-based-productivity-report.component";
import { OosProductivityListComponent } from "./innerComponents/oos-productivity-list/oos-productivity-list.component";
import { SOSandSODComponent } from "./innerComponents/sos-and-sod/sos-and-sod.component";
import { DashboardDataComponent } from "./dashboard-data/dashboard-data.component";


import { CurrentRoutesReportComponent } from "./innerComponents/operations/current-routes-report/current-routes-report.component";

//import { CurrentRoutesReportComponent } from "./innerComponents/operations/current-routes-report/current-routes-report.component";

import { SkuReportComponent } from "./innerComponents/sku-report/sku-report.component";
import { SupervisorProductivityComponent } from "./innerComponents/supervisor-productivity/supervisor-productivity.component";
import { SearchBoxComponent } from "./innerComponents/search-box/search-box.component";

import { MerchandiserAttendanceMapViewComponent } from "./innerComponents/merchandiser-attendance-map-view/merchandiser-attendance-map-view.component";
import { ManageSurveyorsComponent } from "./innerComponents/manage-surveyors/manage-surveyors.component";
import { ManageSuperviserComponent } from "./innerComponents/manage-surveyors/manage-superviser/manage-superviser.component";
import { ManageManagerComponent } from "./innerComponents/manage-surveyors/manage-manager/manage-manager.component";
import { ManageMerchandiserComponent } from "./innerComponents/manage-surveyors/manage-merchandiser/manage-merchandiser.component";
import { UploadRoutesNewComponent } from "./innerComponents/upload-routes-new/upload-routes-new.component";

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    DashboardRoutingModule,
    MatGridListModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    StatModule,
    MatCardModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    ModalModule.forRoot(),
    Ng2Charts,
    Ng2OrderModule,
    ButtonsModule.forRoot(),
    NgxPaginationModule,
    MatRadioModule,
    EvaluationModule,
    MatCheckboxModule,
    BsDropdownModule.forRoot(),
    MatMenuModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  declarations: [
    ManageSurveyorsComponent,
    ManageSuperviserComponent,
    ManageManagerComponent,
    ManageMerchandiserComponent,
    UploadRoutesNewComponent,
    SOSandSODComponent,
    CurrentRoutesReportComponent,
    DashboardComponent,
    HomeComponent,
    ShopListComponent,
    SummaryComponent,
    ProductivityComponent,
    FilterBarComponent,
    DetailsComponent,
    DailyVisitReportComponent,
    ShopDetailComponent,
    MslDashboardComponent,
    ProductivityDashboardComponent,
    TposmDeploymentReportComponent,
    LineChartComponent,
    UpdatePasswordComponent,
    RawDataComponent,
    MatTableComponent,
    MerchandiserListComponent,
    AbnormalityComponent,
    TimeAnalysisReportComponent,
    MerchandiserAttendanceComponent,
    DailyEvaluationReportComponent,
    EmailManagerComponent,
    MessageStatusListComponent,
    AddNewMessageComponent,
    UploadRoutesComponent,
    SingleRouteDetailComponent,
    ShopsForSingleRouteComponent,
    AddEditGroupComponent,
    AddDeviceComponent,
    SupervisorWwwrSummaryComponent,
    ShopListReportComponent,
    MerchandiserRoasterComponent,
    MerchandiserScoreComponent,
    TableauHelperComponent,
    SkuDashboardTableauComponent,
    SosDashboardTableauComponent,
    ProductivityDashboardTableauComponent,
    StfDashboardComponent,
    VoErrorReportComponent,
    MerchandiserWiseScoreComponent,
    SosReportComponent,
    PngOosReportComponent,
    SurveyShopsSurveyorComponent,
    SurveyShopListComponent,
    DistributionCheckInCardComponent,
    CalenderDemoComponent,
    CalendarHeaderComponent,
    ImageViewComponent,
    UniqueBasedProductivityReportComponent,
    OosProductivityListComponent,
    DashboardDataComponent,
    SkuReportComponent,
    SupervisorProductivityComponent,
    SearchBoxComponent,
    MerchandiserAttendanceMapViewComponent,
  ],
})
export class DashboardModule {}
