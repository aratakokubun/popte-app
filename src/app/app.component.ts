import { Observable } from 'rxjs/Rx';
import { Component } from '@angular/core';
import { FontUtils } from './utils/fontUtils';
import { AuthService } from './firebase/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public _toDashboardTitle = FontUtils.convertForPopte('ダッシュボードヘ');
  public _toLoginTitle = FontUtils.convertForPopte('ログインヘ');

  constructor(
    public authService: AuthService,
    public router: Router) {
    this.checkLogin();
    this.setOnRouteChange();
  }

  private setOnRouteChange(): void {
    this.router.events.subscribe((event: NavigationEnd) => {
      if (event.url) {
        const regexp = new RegExp('/login');
        const test = regexp.test(event.url);
        if (!test) {
          this.checkLogin();
        }
      }
    });
  }

  private checkLogin(): void {
    // this.afAuth.authState.subscribe(res => {
    //   if (res && res.uid) {
    //     console.log(`user id: {$res.uid} logged in.`);
    //   } else {
    //     console.log('any user not logged in');
    //     this.routeToLogin();
    //   }
    // });
    if (!this.authService.authenticated) {
      this.routeToLogin();
    }
  }

  private routeToLogin(): void {
    const link = ['/login'];
    this.router.navigate(link);
  }
}
