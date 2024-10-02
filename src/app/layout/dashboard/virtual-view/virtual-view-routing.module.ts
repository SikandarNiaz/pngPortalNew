import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RouteTrackerComponent } from './route-tracker/route-tracker.component';
import { VoLiveTrackingComponent } from './vo-live-tracking/vo-live-tracking.component';
import { VoTrackingComponent } from './vo-tracking/vo-tracking.component';
import { RouteTracker2Component } from './route-tracker2/route-tracker2.component'; 
import { RouteTracker3Component } from './route-tracker3/route-tracker3.component'; 

const routes: Routes = [
  { path: '',redirectTo:'list' ,pathMatch:'full' },
  { path: 'list', component:MainComponent,
children:[
  { path: '', redirectTo:'tracking',pathMatch:'full'},
  { path: 'tracking',component:VoTrackingComponent },
  { path: 'vo-live-tracking',component:VoLiveTrackingComponent },
  { path: 'route-tracker',component:RouteTrackerComponent },


 
] 
},
{ path: 'route_tracker_2',component:RouteTracker2Component },
{ path: 'route_tracker_3',component:RouteTracker3Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualViewRoutingModule { }
