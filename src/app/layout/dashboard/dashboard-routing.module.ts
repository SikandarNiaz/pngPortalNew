import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { AuthGuard } from "src/app/shared/guard";
import { DashboardGuard } from "./dashboard.guard";
import { HomeComponent } from "./innerComponents/home/home.component";
import { ShopListComponent } from "./innerComponents/shop-list/shop-list.component";
import { SummaryComponent } from "./innerComponents/summary/summary.component";
import { ProductivityComponent } from "./innerComponents/productivity/productivity.component";
import { DetailsComponent } from "./innerComponents/details/details.component";
import { DailyVisitReportComponent } from "./innerComponents/daily-visit-report/daily-visit-report.component";
import { pathToFileURL } from "url";
import { ShopDetailComponent } from "./innerComponents/shop-detail/shop-detail.component";
import { MslDashboardComponent } from "./innerComponents/msl-dashboard/msl-dashboard.component";
import { ProductivityDashboardComponent } from "./innerComponents/productivity-dashboard/productivity-dashboard.component";
import { TposmDeploymentReportComponent } from "./innerComponents/tposm-deployment-report/tposm-deployment-report.component";
import { UpdatePasswordComponent } from "./user/update-password/update-password.component";
import { RawDataComponent } from "./raw-data/raw-data.component";
import { MerchandiserListComponent } from "./innerComponents/merchandiser-list/merchandiser-list.component";
import { AbnormalityComponent } from "./innerComponents/abnormality/abnormality.component";
import { TimeAnalysisReportComponent } from "./innerComponents/time-analysis-report/time-analysis-report.component";
import { MerchandiserAttendanceComponent } from "./innerComponents/merchandiser-attendance/merchandiser-attendance.component";
import { DailyEvaluationReportComponent } from "./innerComponents/daily-evaluation-report/daily-evaluation-report.component";
import { EmailManagerComponent } from "./innerComponents/email-manager/email-manager.component";
import { UploadRoutesComponent } from "./innerComponents/upload-routes/upload-routes.component";
import { SingleRouteDetailComponent } from "./innerComponents/upload-routes/routes-inner-pages/single-route-detail/single-route-detail.component";
import { ShopsForSingleRouteComponent } from "./innerComponents/upload-routes/routes-inner-pages/shops-for-single-route/shops-for-single-route.component";
import { AddDeviceComponent } from "./innerComponents/add-device/add-device.component";
import { SupervisorWwwrSummaryComponent } from "./innerComponents/supervisor-wwwr-summary/supervisor-wwwr-summary.component";
import { ShopListReportComponent } from "./innerComponents/shop-list-report/shop-list-report.component";
import { MerchandiserRoasterComponent } from "./innerComponents/merchandiser-roaster/merchandiser-roaster.component";
import { MerchandiserScoreComponent } from "./innerComponents/merchandiser-score/merchandiser-score.component";
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
import { ImageViewComponent } from "./innerComponents/image-view/image-view.component";
import { UniqueBasedProductivityReportComponent } from "./innerComponents/unique-based-productivity-report/unique-based-productivity-report.component";
import { OosProductivityListComponent } from "./innerComponents/oos-productivity-list/oos-productivity-list.component";
import { SOSandSODComponent } from "./innerComponents/sos-and-sod/sos-and-sod.component";
import { DashboardDataComponent } from "./dashboard-data/dashboard-data.component";


import { CurrentRoutesReportComponent } from "./innerComponents/operations/current-routes-report/current-routes-report.component";
//import { CurrentRoutesReportComponent } from "./innerComponents/operations/current-routes-report/current-routes-report.component";

import { SkuReportComponent } from "./innerComponents/sku-report/sku-report.component";
import { SupervisorProductivityComponent } from "./innerComponents/supervisor-productivity/supervisor-productivity.component";
import { MerchandiserAttendanceMapViewComponent } from "./innerComponents/merchandiser-attendance-map-view/merchandiser-attendance-map-view.component";
import { ManageSurveyorsComponent } from "./innerComponents/manage-surveyors/manage-surveyors.component";
import { UploadRoutesNewComponent } from "./innerComponents/upload-routes-new/upload-routes-new.component";
import { SupervisorChangeLogReportComponent } from "./innerComponents/supervisor-change-log-report/supervisor-change-log-report.component";
import { RoleManagementComponent } from "./innerComponents/change_menu/role_management.component";
import { AbnormalShopListReportComponent } from "./innerComponents/abnormal-shop-list-report/abnormal-shop-list-report.component";
import { AttendanceReportComponent } from "./innerComponents/attendance-report/attendance-report.component";
import { ManagePlanogramComponent } from "./innerComponents/manage-vd/manage-vd/manage-planogram.component";
import { UpdateLocationComponent } from "./innerComponents/update-locations/update-location-component";
import { UploadDesiredSosComponent } from "./innerComponents/upload-desired-sos/upload-desired-sos.component";
import { ShopLocationApprovalComponent } from "./innerComponents/shop-location-approval/shop-location-approval.component";
import { ShopDetailIRAssetTypesComponent } from "./innerComponents/shop-detail-ir-assettypes/shop-detail-ir-assettypes-component";
import { TableauHelperComponent } from "./Tableau/tableau-helper/tableau-helper.component";
import { UploadPlanogramComponent } from "./innerComponents/upload-planogram/upload-planogram.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [DashboardGuard],
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      {
        path: "tableau",
        component: TableauHelperComponent,
      },
      { path: "home", component: HomeComponent },
      { path: "daily_visit_report", component: DailyVisitReportComponent },
      { path: "oos_details_report", component: DetailsComponent },
      { path: "shop_list_report", component: ShopListComponent },
      { path: "summary_report", component: SummaryComponent },
      { path: "productivity_report", component: ProductivityComponent },
      { path: "msl_dashboard", component: MslDashboardComponent },
      { path: "image-view", component: ImageViewComponent },
      { path: "current-routes", component: CurrentRoutesReportComponent },
      { path: "manage_surveyors", component: ManageSurveyorsComponent },
      { path: "upload_routes_new", component: UploadRoutesNewComponent },
      { path: "role_management", component: RoleManagementComponent },
      { path: "attendance-report", component: AttendanceReportComponent },
      {path: "manage-planogram", component: ManagePlanogramComponent},
      {path: "update-location", component: UpdateLocationComponent},
      {path: "upload-planogram", component: UploadPlanogramComponent},
     
      
      {
        path: "distribution-check-in",
        component: DistributionCheckInCardComponent,
      },
      {
        path: "productivity_dashboard",
        component: ProductivityDashboardComponent,
      },
      {
        path: "tposm_deployment_report",
        component: TposmDeploymentReportComponent,
      },
      {
        path: "daily_evaluation_report",
        component: DailyEvaluationReportComponent,
      },

      {
        path: "sku-report",
        component: SkuReportComponent,
      },

      {
        path: "shareofshelf",
        component: SOSandSODComponent,
      },
      {
        path: "supervisor-productivity",
        component: SupervisorProductivityComponent,
      },

      {
        path: "merchandiser-attendance-map-view",
        component: MerchandiserAttendanceMapViewComponent,
      },

      { path: "update_password", component: UpdatePasswordComponent },
      { path: "raw_data", component: RawDataComponent },
      {
        path: "supervisor_wwwr_summary",
        component: SupervisorWwwrSummaryComponent,
      },
      { path: "data_abnormality_report", component: AbnormalityComponent },
      { path: "time-analysis-report", component: TimeAnalysisReportComponent },
      { path: "supervisor-change-log-report", component: SupervisorChangeLogReportComponent },
      { path: "abnormal_shop_list_report", component: AbnormalShopListReportComponent },
      { path: "shop-list-report", component: ShopListReportComponent },
      { path: "merchandiser_List", component: MerchandiserListComponent },
      {
        path: "merchandiser_attendance",
        component: MerchandiserAttendanceComponent,
      },
      { path: "sms_manager", component: EmailManagerComponent },
      { path: "upload_routes/route_list", component: UploadRoutesComponent },
      {
        path: "upload_routes/single_route_details",
        component: SingleRouteDetailComponent,
      },
      {
        path: "upload_routes/shops_for_single_route",
        component: ShopsForSingleRouteComponent,
      },
      { path: "add_device", component: AddDeviceComponent },
      { path: "merchandiser_roster", component: MerchandiserRoasterComponent },
      { path: "sku-dashboard", component: SkuDashboardTableauComponent },
      { path: "sos-dashboard", component: SosDashboardTableauComponent },
      {
        path: "productivity-tableau",
        component: ProductivityDashboardTableauComponent,
      },
      { path: "stf-dashboard", component: StfDashboardComponent },
      { path: "vo_error_report", component: VoErrorReportComponent },
      { path: "merchandiser_score", component: MerchandiserScoreComponent },
      {
        path: "merchandiser_wise_score",
        component: MerchandiserWiseScoreComponent,
      },
      {
        path: "merchandiser_score/:surveyorId/:startDate/:endDate",
        component: MerchandiserScoreComponent,
      },
      { path: "sos-report", component: SosReportComponent },
      { path: "oos-detail-report", component: PngOosReportComponent },
      { path: "survey_shop_view", component: SurveyShopsSurveyorComponent },
      { path: "survey_shop_list", component: SurveyShopListComponent },
      { path: "upload_desired_sos", component: UploadDesiredSosComponent },
      { path: "shop_location_approval", component: ShopLocationApprovalComponent },
      {
        path: "oos-productivity-list",
        component: OosProductivityListComponent,
      },
      {
        path: "survey_shop_list/:surveyorId/:startDate/:endDate",
        component: SurveyShopListComponent,
      },
      { path: "raw_data/:reportId", component: RawDataComponent },
      { path: "dashboard_data", component: DashboardDataComponent },
      { path: "dashboard_data/:reportId", component: DashboardDataComponent },
    ],
  },
  // { path: 'shop_detail/:id', component: ShopDetailComponent },
  { path: "shop_detail/:id", component: ShopDetailComponent },
  { path: "shop_detail_ir", component: ShopDetailIRAssetTypesComponent },
  

  {
    path: "evaluation",
    loadChildren: () => import('./evaluation/evaluation.module').then(m => m.EvaluationModule),
  },
  {
    path: "posm-tracking",
    loadChildren: () => import('./posm-tracking/posm-tracking.module').then(m => m.PosmTrackingModule),
  },
  {
    path: "capturedAbnormalUnvisited",
    component: UniqueBasedProductivityReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
