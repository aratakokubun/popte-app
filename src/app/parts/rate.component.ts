import { Component, SimpleChange, Input } from '@angular/core';

@Component({
  selector: 'app-rate-parts',
  templateUrl: './rate.component.html',
  styleUrls: ['../css/rate.component.css'],
})
export class RateComponent {
  public _rateValue: string;

  @Input()
  set rateValue(rate: number) {
    this._rateValue = rate.toString();
  }
}
