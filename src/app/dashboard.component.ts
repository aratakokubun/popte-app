import { ArrayUtils } from './utils/arrayUtils';
import { selector } from 'rxjs/operator/publish';
import { Component, OnInit } from '@angular/core';
import { PopteService } from './popte.service';
import { Popte } from './popte';
import { FontUtils } from './utils/fontUtils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public dashboardTitle: string;
  public poptes: Popte[];
  constructor(
    private popteService: PopteService
  ) { }

  ngOnInit(): void {
    this.dashboardTitle = FontUtils.convertForPopte('ダッシュボード');
    this.popteService.getPoptes().then(poptes =>
      this.poptes = ArrayUtils.randomSelect(poptes, 4));
  }
}
