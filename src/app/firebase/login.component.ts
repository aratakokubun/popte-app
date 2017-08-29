import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../css/login.component.css'],
})
export class LoginComponent {
  items: FirebaseListObservable<any[]>;
  msgVal = '';

  constructor(
    public af: AngularFireDatabase,
    public authService: AuthService,
    public router: Router,
    public location: Location) {
    this.items = af.list('/messages', {
      query: {
        limitToLast: 50
      }
    });
  }

  public anonymousLogin(): void {
    this.authService.anonymousLogin().then(() => {
      this.routeToHome();
    });
  }

  public googleLogin(): void {
    this.authService.googleLogin().then(() => {
      this.routeToHome();
    });
  }

  public twitterLogin(): void {
    this.authService.twitterLogin().then(() => {
      this.routeToHome();
    });
  }

  public logout(): void {
    this.authService.signOut();
  }

  private routeToHome() {
    this.location.back();
  }

  public Send(desc: string) {
    this.items.push({ message: desc });
    this.msgVal = '';
  }
}
