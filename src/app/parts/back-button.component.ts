
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FontUtils } from '../utils/fontUtils';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
})

export class BackButtonComponent implements OnInit {
  private _buttonLabel: string;

  constructor(
    private location: Location
  ) { }

  @Input()
  set buttonLabel(label: string) {
    this._buttonLabel = (label && label.trim()) || 'back';
  }

  get buttonLabel(): string { return this._buttonLabel; }
  ngOnInit(): void {
  }

  goBack(): void {
    this.location.back();
  }
}

