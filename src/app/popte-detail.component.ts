import { Component, Input, OnInit, AfterViewChecked, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Popte } from './popte';
import { PopteFireService } from './services/popte-fire.service';
import { RateComponent } from './parts/rate.component';
import { FontUtils } from './utils/fontUtils';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-popte-detail',
  templateUrl: './popte-detail.component.html',
  styleUrls: ['./popte-detail.component.css']
})

export class PopteDetailComponent implements OnInit, AfterViewChecked, AfterViewInit {
  @Input() _popte: Popte;
  @ViewChild(RateComponent) _viewChild: RateComponent;

  private _rateTitle: string;
  private _backButtonTitle: string;

  constructor(
    private popteFireService: PopteFireService,
    private _route: ActivatedRoute,
    private _location: Location
  ) { }

  public ngOnInit(): void {
    this._route.paramMap.switchMap((params: ParamMap) =>
      this.popteFireService.getPopte(+params.get('id')))
      .subscribe(popte => this._popte = popte);
    this._rateTitle = FontUtils.convertForPopte('コノポプテヲヒョウカスル');
    this._backButtonTitle = FontUtils.convertForPopte('マエニモドル');
  }

  public ngAfterViewChecked(): void {
    if (this._viewChild) {
      if (this._popte.rate !== +this._viewChild._rateValue) {
        setTimeout(() => {
          this._popte.rate = +this._viewChild._rateValue;
          this.popteFireService.update(this._popte);
        });
      }
    }
  }

  public ngAfterViewInit(): void {
    // if (this._viewChild) {
    //   setTimeout(() => {
    //     this._popte.rate = +this._viewChild._rateValue;
    //     this.popteFireService.update(this._popte);
    //   });
    // }
  }

  goBack(): void {
    this._location.back();
  }
}
