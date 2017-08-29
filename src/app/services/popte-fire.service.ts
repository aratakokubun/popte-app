import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Popte } from '../popte';
import { PopteUser } from '../popte-user';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AuthService } from '../firebase/auth.service';
import 'rxjs/add/operator/toPromise';

import { PopteUtils } from '../utils/popte.utils';

@Injectable()
export class PopteFireService {
  private _poptesCommonsUrl = 'api/poptes';
  private _headers = new Headers({ 'Content-type': 'application/json' });
  private _poptesCommons: FirebaseListObservable<Popte[]>;
  private _poptesUsers: FirebaseListObservable<PopteUser[]>;

  constructor(
    private http: Http,
    private af: AngularFireDatabase,
    private authService: AuthService,
  ) {
    const uid = authService.currentUserId;
    this._poptesCommons = this.af.list('/poptes/commons');
    this._poptesUsers = this.af.list(`/poptes/users/${uid}`);
  }
  public getPopte(id: number): Promise<Popte> {
    const uid = this.authService.currentUserId;
    const popteCommon: FirebaseListObservable<Popte[]> = this.af.list('/poptes/commons', {
      query: {
        orderByChild: 'id',
        equalTo: id
      }
    });
    const popteUser: FirebaseListObservable<PopteUser[]> = this.af.list(`/poptes/users/${uid}`, {
      query: {
        orderByChild: 'id',
        equalTo: id.toString()
      }
    });
    return PopteUtils.combineDataSingle(popteCommon, popteUser);
  }

  public getPoptes(): Promise<Popte[]> {
    return PopteUtils.combineData(this._poptesCommons, this._poptesUsers);
  }

  public update(popte: Popte): Promise<Popte> {
    const uid = this.authService.currentUserId;
    const popteUser: FirebaseListObservable<PopteUser[]> = this.af.list(`/poptes/users/${uid}`, {
      query: {
        orderByChild: 'id',
        equalTo: popte.id.toString()
      }
    });
    popteUser.subscribe((data: PopteUser[]) => {
      if (data.length > 0) {
        const popteDatabaseKey = data[0].$key;
        firebase.database().ref(`/poptes/users/${uid}/${popteDatabaseKey}`).set({
          id: popte.id.toString(),
          rate: popte.rate.toString()
        });
      } else {
        this._poptesUsers.push({
          id: popte.id.toString(),
          rate: popte.rate.toString()
        });
      }
    });
    // TODO
    return null;
  }

  public delete(id: number): Promise<void> {
    // TODO
    // use remove() method to delete specified database location.
    return null;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
