'use strict';
import { Observable } from 'rxjs/Rx';

import { Popte } from '../popte';
import { PopteUser } from '../popte-user';
import { AngularFireDatabase, FirebaseListFactory, FirebaseListObservable } from 'angularfire2/database';

export class PopteUtils {
  public static combineData(popteCommons: FirebaseListObservable<Popte[]>, popteUsers: FirebaseListObservable<PopteUser[]>)
  : Promise<Popte[]> {
    return PopteUtils.combineAsObservable(popteCommons, popteUsers).first().toPromise();
  }

  public static combineDataSingle(popteCommons: FirebaseListObservable<Popte[]>, popteUsers: FirebaseListObservable<PopteUser[]>)
  : Promise<Popte> {
    return PopteUtils.combineAsObservable(popteCommons, popteUsers).first()
      .map(poptes => poptes[0])
      .toPromise();
  }

  private static combineAsObservable(popteCommons: FirebaseListObservable<Popte[]>, popteUsers: FirebaseListObservable<PopteUser[]>)
  : Observable<Popte[]> {
    return Observable.combineLatest(
      popteCommons, popteUsers,
      (commons: Popte[], users: PopteUser[]) => ({commons, users})
    ).map(({commons, users}) => {
      commons.forEach(
        popteCommon => {
          const popteUser = users.find(user => user.id.toString() === popteCommon.id.toString());
          if (popteUser !== undefined && popteUser !== null) {
            popteCommon.rate = popteUser.rate;
          }
        }
      );
      return commons;
    });
  }
}
