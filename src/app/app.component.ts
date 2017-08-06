import { Component } from '@angular/core';
import { FontUtils } from './utils/fontUtils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = FontUtils.convertForPopte('ポプテピピック アプリ');
}
