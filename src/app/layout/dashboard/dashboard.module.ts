

import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatGridListModule } from "@angular/material/grid-list";
import {
  MatDatepickerModule,
  MatDatepickerToggle,
} from "@angular/material/datepicker";
// import { ChartsModule, ChartsModule as Ng2Charts } from "ng2-charts";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTabsModule } from "@angular/material/tabs";
import { StatModule } from "../../shared/modules/stat/stat.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { HomeComponent } from "./innerComponents/home/home.component";
import { ShopListComponent } from "./innerComponents/shop-list/shop-list.component";
import { SummaryComponent } from "./innerComponents/summary/summary.component";
import { ProductivityComponent } from "./innerComponents/productivity/productivity.component";
import { FilterBarComponent } from "./innerComponents/filter-bar/filter-bar.component";
import { DetailsComponent } from "./innerComponents/details/details.component";
import { DailyVisitReportComponent } from "./innerComponents/daily-visit-report/daily-visit-report.component";
import { ShopDetailComponent } from "./innerComponents/shop-detail/shop-detail.component";
import { MslDashboardComponent } from "./innerComponents/msl-dashboard/msl-dashboard.component";
import { ProductivityDashboardComponent } from "./innerComponents/productivity-dashboard/productivity-dashboard.component";
import { TposmDeploymentReportComponent } from "./innerComponents/tposm-deployment-report/tposm-deployment-report.component";
import { LineChartComponent } from "./innerComponents/home/line-chart/line-chart.component";
import { UpdatePasswordComponent } from "./user/update-password/update-password.component";
import { RawDataComponent } from "./raw-data/raw-data.component";
import { MatTableComponent } from "./innerComponents/mat-table/mat-table.component";
import { MerchandiserListComponent } from "./innerComponents/merchandiser-list/merchandiser-list.component";
import { AbnormalityComponent } from "./innerComponents/abnormality/abnormality.component";
import { TimeAnalysisReportComponent } from "./innerComponents/time-analysis-report/time-analysis-report.component";
import { MerchandiserAttendanceComponent } from "./innerComponents/merchandiser-attendance/merchandiser-attendance.component";
import { DailyEvaluationReportComponent } from "./innerComponents/daily-evaluation-report/daily-evaluation-report.component";
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
import { ButtonsModule } from "ngx-bootstrap/buttons";


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
import { SupervisorChangeLogReportComponent } from "./innerComponents/supervisor-change-log-report/supervisor-change-log-report.component";
import { RoleManagementComponent } from "./innerComponents/change_menu/role_management.component";
import { AbnormalShopListReportComponent } from "./innerComponents/abnormal-shop-list-report/abnormal-shop-list-report.component";
import { AttendanceReportComponent } from "./innerComponents/attendance-report/attendance-report.component";
import { ManagePlanogramComponent } from "./innerComponents/manage-vd/manage-vd/manage-planogram.component";
import { UpdatePlanogramsComponent } from "./innerComponents/manage-vd/update-vd-planograms/update-planograms.component";
import { UpdateLocationComponent } from "./innerComponents/update-locations/update-location-component";
import { UpdateClusterComponent } from "./innerComponents/update-locations/update-cluster/update-cluster-component";
import { UpdateZoneComponent } from "./innerComponents/update-locations/update-zone/update-zone-component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Ng2OrderModule } from "ng2-order-pipe";
import { NgxPaginationModule } from "ngx-pagination";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ChartsModule, ChartsModule as Ng2Charts } from "ng2-charts";
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule as CModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import { ProductService } from "./innerComponents/update-locations/update-zone/productservice";
import { TabViewModule } from 'primeng/tabview';

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
    // ModalModule,
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
    TableModule,
    CModule,
    SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    TabViewModule
  ],
  declarations: [
    ManageSurveyorsComponent,
    ManageSuperviserComponent,
    ManageManagerComponent,
    ManageMerchandiserComponent,
    UploadRoutesNewComponent,
    RoleManagementComponent,
    SupervisorChangeLogReportComponent,
    AbnormalShopListReportComponent,
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
    AttendanceReportComponent,
    ManagePlanogramComponent,
    UpdatePlanogramsComponent,
    UpdateLocationComponent,
    UpdateClusterComponent,
    UpdateZoneComponent
  ],
  providers: [ProductService]
})
export class DashboardModule {}
