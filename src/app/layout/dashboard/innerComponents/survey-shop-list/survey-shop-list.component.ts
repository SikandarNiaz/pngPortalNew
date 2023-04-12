import { Component, OnInit,ViewChild } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Config } from 'src/assets/config';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-survey-shop-list',
  templateUrl: './survey-shop-list.component.html',
  styleUrls: ['./survey-shop-list.component.scss']
})
export class SurveyShopListComponent implements OnInit {

  ip: any = Config.BASE_URI;
  title = 'Shop Wise Score';
  minDate = new Date(2000, 0, 1);
  maxDate: any = new Date();
  startDate: any = new Date();
  endDate: any = new Date();
  loadingReportMessage = false;
  selectedEvaluator = -1;
  selectedZone: any = {};
  selectedRegion: any = {};
  evaluatorList: any = [];
  userTypeId: any;
  ReEvaluatorId: any;
  userId: any;
  merchandiserList: any = [];
  loading = true;
  loadingData: boolean;
  zones: any = [];
  regions: any = [];
  params: any = {};
  p = 1;
  sortOrder = true;
  sortBy: 'merchandiser_code';
  selectedItem: any = {};
  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild (MatPaginator) paginator: MatPaginator;
  constructor(private httpService: DashboardService, private toastr: ToastrService, private router: Router, public activatedRoute: ActivatedRoute) {
    this.maxDate.setDate(this.maxDate.getDate() - 1);
    this.zones = JSON.parse(localStorage.getItem('zoneList'));
    this.activatedRoute.queryParams.subscribe(p => {
      
        this.params = p;
        this.startDate = p.startDate;
        this.endDate = p.endDate;
      this.getMerchandiserWiseScore(p);
    });



  }



  ngOnInit() {
    this.loadingData = false;
    this.userTypeId = localStorage.getItem('user_type');
    this.ReEvaluatorId = localStorage.getItem('Reevaluator');

    this.sortIt('merchandiser_code');
    this.userId = localStorage.getItem('user_id');
  }

  getArrowType(key) {
    if (key === this.sortBy) {
      return this.sortOrder ? 'arrow_upward' : 'arrow_downward';
    } else { return ''; }
  }
  sortIt(key) {
    this.sortBy = key;
    this.sortOrder = !this.sortOrder;
  }

  modifyDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }
  showChildModal(): void {
    this.childModal.show();
  }
  hideChildModal(): void {
    this.childModal.hide();
  }
  setSelectedItem(item) {
    this.selectedItem = item;

  }

  gotoNewPage(item) {
    window.open(`${environment.hash}dashboard/evaluation/list/details/${item.survey_id}/${item.shop_id}`);
    }


    zoneChange() {
      this.loadingData = true;

      this.httpService.getRegion(this.selectedZone.id).subscribe(
        data => {
          const res: any = data;
          if (res) {
            this.regions = res;
          } else {
            this.loadingData = false;
            this.loading = false;
            this.toastr.info('Something went wrong,Please retry', 'Connectivity Message');
          }

          setTimeout(() => {
            this.loadingData = false;
            this.loading = false;
          }, 500);
        },
        error => {
          this.loadingData = false;
          this.loading = false;
        }
      );
    }

    getMerchandiserWiseScore(params) {
      this.loadingData = true;
      if (params.endDate >= params.startDate) {
      const obj = {
        act:2,
        surveyorId: params.surveyorId,
        startDate: params.startDate,
        endDate: params.endDate,
        zoneId: this.selectedZone.id || localStorage.getItem('zoneId'),
        regionId: this.selectedRegion.id || localStorage.getItem('regionId')
      };

      this.httpService.getSurveyShopList(obj).subscribe((data: any) => {
        if (data) {
          this.merchandiserList = data;
          this.loading = false;
          this.loadingData = false;
        }
      });
    } else {
      this.loading = false;
      this.loadingData = false;
      this.toastr.info('End date must be greater than start date', 'Date Selection');
    }
    }
}


