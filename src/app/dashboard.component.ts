import { ArrayUtils } from './utils/arrayUtils';
import { selector } from 'rxjs/operator/publish';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopteFireService } from './services/popte-fire.service';
import { PopteService } from './popte.service';
import { Popte } from './popte';
import { FontUtils } from './utils/fontUtils';
import { FaderImage } from './fader/fader-image';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private _dashboardTitle: string;
  private _popteFaderImages: Array<FaderImage>;
  constructor(
    private popteFireService: PopteFireService,
    private popteService: PopteService,
    private router: Router,
  ) {
    this._popteFaderImages = new Array<FaderImage>();
  }

  ngOnInit(): void {
    this._dashboardTitle = FontUtils.convertForPopte('ダッシュボード');
    // this.popteService.getPoptes().then(poptes => {
    //   this._popteFaderImages = ArrayUtils.randomSelect(poptes, 8).map(this.popteToImage);
    // });
    this.popteFireService.getPoptes().then(poptes => {
      this._popteFaderImages = ArrayUtils.randomSelect(poptes, 6).map(this.popteToImage);
    });
  }

  private popteToImage(popte: Popte): FaderImage {
    return {
      src: popte.imageUrl,
      alt: popte.name,
      id: popte.id,
    };
  }

  public onImageClick(id: number): any {
    const link = ['/detail', id];
    this.router.navigate(link);
  }
}
