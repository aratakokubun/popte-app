import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { selector } from 'rxjs/operator/publish';
import { Component, OnInit } from '@angular/core';
import { PopteService } from '../popte.service';
import { Popte } from '../popte';
import { FontUtils } from '../utils/fontUtils';
import { FaderImage } from './fader-image';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fader-component',
  templateUrl: './fader.component.html',
  styleUrls: ['../css/ngFader.css'],
})
export class FaderComponent implements OnInit {
  private numberOfImages: number;
  private selectedImage: number;
  private activePause: boolean;
  private activeStart: boolean;
  private images: Array<FaderImage>;
  private setTime: number;
  private intervalPromise;

  constructor(
    private popteService: PopteService,
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.popteService.getPoptes().then(poptes => this.init(poptes));
  }

  private init(poptes: Popte[]): void {
      this.images = poptes.map(this.popteToImage);
      this.numberOfImages = this.images.length;
      this.selectedImage = 0;
      this.setTime = 4000;
      this.startSlider();
  }

  private popteToImage(popte: Popte): FaderImage {
    return {
      src: popte.imageUrl, alt: popte.name
    };
  }

  public dots(): any {
    return this.dotsMultiple(this.numberOfImages);
  }

  public dotsMultiple(num: number): any {
    return new Array(num);
  }

  public setSelected(idx: number): void {
    this.stopSlider();
    this.selectedImage = idx;
  }

  public sliderBack(): void {
    this.stopSlider();
    this.selectedImage === 0 ? this.selectedImage = this.numberOfImages - 1 : this.selectedImage--;
  }

  public sliderForward(): void {
    this.stopSlider();
    this.autoSlider();
  }

  public autoSlider(): void {
    console.log(this.selectedImage);
    this.selectedImage < this.numberOfImages - 1 ? this.selectedImage++ : this.selectedImage = 0;
  }

  public stopSlider(): void {
    stop();
    this.activePause = true;
    this.activeStart = false;
  }

  public toggleStartStop(): void {
    if (this.activeStart) {
      this.stopSlider();
    } else {
      this.startSlider();
    }
  }

  public startSlider(): void {
    this.selectedImage = 0;
    setInterval(() => { this.autoSlider(); }, this.setTime);
    this.activeStart = true;
    this.activePause = false;
  }

  public show(idx): any {
    if (this.selectedImage === idx) {
      return 'show';
    }
  }
}
