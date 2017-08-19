import { Component, OnInit, Input } from '@angular/core';
import { FaderImage } from './fader-image';

@Component({
  selector: 'app-fader-component',
  templateUrl: './fader.component.html',
  styleUrls: ['../css/myNgFader.css'],
})
export class FaderComponent implements OnInit {
  private _images: Array<FaderImage>;
  private _selectedImage: number;
  private _autoSlide: boolean;
  private _intervalMillis: number;
  private _intervalPromise;
  private _onImageClick: (id: number) => any;

  constructor( ) {
    this._images = new Array();
    this._selectedImage = 0;
    this._autoSlide = false;
    this._intervalMillis = 4000;
    this._intervalPromise = null;
  }

  @Input()
  set images(faderImage: Array<FaderImage>) {
    this._images = faderImage;
  }
  get images(): Array<FaderImage> {
    return this._images;
  }

  @Input()
  set intervalMillis(intervalMillis: number) {
    this._intervalMillis = intervalMillis;
  }

  @Input()
  set onImageClick(onImageClick: (id: number) => any) {
    this._onImageClick = onImageClick;
  }

  ngOnInit(): void {
    this.startSlider();
  }

  public dots(): Array<number> {
    return Array.apply(null, { length: this._images.length }).map(Number.call, Number);
  }

  public tagCurrentDot(idx: number): string {
    return this._selectedImage === idx ? 'current' : 'incurrent';
  }

  public setSelected(idx: number): void {
    this.stopSlider();
    this._selectedImage = idx;
  }

  public sliderBack(): void {
    this.stopSlider();
    this._selectedImage = (this._selectedImage - 1) % this.images.length;
  }

  public sliderForward(): void {
    this.stopSlider();
    this.autoSlider();
  }

  public autoSlider(): void {
    this._selectedImage = (this._selectedImage + 1) % this.images.length;
  }

  public stopSlider(): void {
    if (this._autoSlide && this._intervalPromise) {
      clearInterval(this._intervalPromise);
      this._autoSlide = false;
    }
  }

  public tagStopButton(): string {
    return !this._autoSlide ? 'active' : 'inactive';
  }

  public toggleStartStop(): void {
    if (this._autoSlide) {
      this.stopSlider();
    } else {
      this.startSlider();
    }
  }

  public startSlider(): void {
    if (!this._autoSlide) {
      this._intervalPromise = setInterval(() => { this.autoSlider(); }, this._intervalMillis);
      this._autoSlide = true;
    }
  }

  public tagStartButton(): string {
    return this._autoSlide ? 'active' : 'inactive';
  }

  public show(idx): any {
    if (this._selectedImage === idx) {
      return 'show';
    }
  }
}
