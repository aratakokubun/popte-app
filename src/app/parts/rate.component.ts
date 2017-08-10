import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-rate-parts',
  templateUrl: './rate.component.html',
  styleUrls: ['../css/rate.component.css'],
})
export class RateComponent implements OnInit, OnChanges {
  private number;
  private rateValue;
  constructor(
  ) { }

  ngOnInit(): void {
    // TODO
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    // TODO
  }

  public rate(rateValue: number): void {
    this.rateValue = rateValue;
  }
}
