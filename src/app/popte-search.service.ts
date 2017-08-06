import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Popte } from './popte';

@Injectable()
export class PopteSearchService {
  constructor (
    private http: Http
  ) {}

  search(term: string): Observable<Popte[]> {
    return this.http
      .get(`api/poptes/?name=${term}`)
      .map(response => response.json().data as Popte[]);
  }

  searchOnLabel(term: string): Observable<Popte[]> {
    return this.http
      .get(`api/poptes/?label=${term}`)
      .map(response => response.json().data as Popte[]);
  }
}
