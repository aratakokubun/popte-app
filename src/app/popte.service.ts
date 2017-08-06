import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Popte } from './popte';
import { POPTES } from './mock-poptes';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PopteService {
  private poptesUrl = 'api/poptes';
  private headers = new Headers({ 'Content-type': 'application/json' });
  private useMock = true;

  constructor(private http: Http) { }
  getPopte(id: number): Promise<Popte> {
    if (this.useMock) {
      return this.getPoptes()
        .then(heroes => heroes.find(hero => hero.id === id));
    } else {
      return this.getPopteWeb(id);
    }
  }

  private getPopteWeb(id: number): Promise<Popte> {
    const url = `${this.poptesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Popte)
      .catch(this.handleError);
  }

  getPoptes(): Promise<Popte[]> {
    if (this.useMock) {
      return Promise.resolve(POPTES);
    } else {
      return this.getPoptesWeb();
    }
  }

  private getPoptesWeb(): Promise<Popte[]>{
    return this.http.get(this.poptesUrl)
      .toPromise()
      .then(response => response.json().data as Popte[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
