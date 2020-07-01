import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-merchandiser-roaster',
  templateUrl: './merchandiser-roaster.component.html',
  styleUrls: ['./merchandiser-roaster.component.scss']
})
export class MerchandiserRoasterComponent implements OnInit {

  title = 'Merchandiser Roster';
  minDate = new Date(2000, 0, 1);
  maxDate: any = new Date();
  startDate: any = new Date();
  endDate = new Date();
  selectedZone: any = {};
  userId: any;
  zones: any = [];
  selectedRegion: any = {};
  selectedId = -1;
  loadingReportMessage = false;
  selectedEvaluator = -1;
  evaluatorList: any = [];
  userTypeId: any;
  ReEvaluatorId: any;
  merchandiserList: any = [];
  loading = true;
  loadingData: boolean;
  regions: any = [];
  p = 1;
  sortOrder = true;
  sortBy: 'merchandiser_code';
  constructor(private httpService: DashboardService, private toastr: ToastrService) {
    this.zones = JSON.parse(localStorage.getItem('zoneList'));
  }

  ngOnInit() {
    this.loadingData = false;
    this.userTypeId = localStorage.getItem('user_type');
    this.getMerchandiserList();
    this.sortIt('merchandiser_code');
  }



  getMerchandiserList() {
    this.loadingData = true;
    const obj = {
      evaluatorId: localStorage.getItem('user_id'),
      startDate: moment(this.startDate).format('YYYY-MM-DD'),
      endDate: moment(this.endDate).format('YYYY-MM-DD'),
      merId: this.selectedId
    };

    this.httpService.getMerchandiserRoaster(obj).subscribe((data: any) => {
      // console.log('merchandiser list for evaluation',data);
      if (data) {
        this.merchandiserList = data;
        this.loadingData = false;
        this.loading = false;
      }
    });
  }




  zoneChange() {
    this.loadingData = true;
      this.getMerchandiserList();

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

  getArrowType(key) {
    if (key === this.sortBy) {
      return this.sortOrder ? 'arrow_upward' : 'arrow_downward';
    } else { return ''; }
  }
  sortIt(key) {
    this.sortBy = key;
    this.sortOrder = !this.sortOrder;
  }

}
