import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Popte } from './popte';
import { PopteService } from './popte.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-popte-detail',
  templateUrl: './popte-detail.component.html',
  styleUrls: ['./popte-detail.component.css']
})

export class PopteDetailComponent implements OnInit {
  @Input() popte: Popte;
  constructor(
    private popteService: PopteService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.paramMap.switchMap((params: ParamMap) =>
      this.popteService.getPopte(+params.get('id')))
      .subscribe(popte => this.popte = popte);
  }

  goBack(): void {
    this.location.back();
  }

  rate(rateValue: number): void {
    // TODO
    // Contract the number between 1 to 5
  }
}
