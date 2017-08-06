import { selector } from 'rxjs/operator/publish';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { FontUtils } from './utils/fontUtils';
// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { PopteSearchService } from './popte-search.service';
import { Popte } from './popte';

@Component({
  selector: 'app-popte-search',
  templateUrl: './popte-search.component.html',
  styleUrls: ['./popte-search.component.css'],
  providers: [PopteSearchService],
})
export class PopteSearchComponent implements OnInit {
  private poptes: Observable<Popte[]>;
  private searchTerms = new Subject<string>();
  private searchTermsLabel = new Subject<string>();
  private componentTitle = '';

  constructor(
    private router: Router,
    private popteSearchService: PopteSearchService,
  )  {}

  ngOnInit(): void {
      this.componentTitle = FontUtils.convertForPopte('ポプテピピックヲサガス');
      this.poptes = this.searchTerms
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.popteSearchService.search(term) : this.searchOnEmpty())
      .catch(error => {
        console.log(error);
        return Observable.of<Popte[]>([]);
      });
      this.poptes = this.searchTermsLabel
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap(term => term ? this.popteSearchService.searchOnLabel(term) : this.searchOnEmpty())
      .catch(error => {
        console.log(error);
        return Observable.of<Popte[]>([]);
      });
  }

  private searchOnEmpty(): Observable<Popte[]> {
    return Observable.of<Popte[]>([]);
  }

  search(searchTerm: string): void {
    this.searchTerms.next(searchTerm);
  }

  searchOnLabel(searchTerm: string): void {
    this.searchTermsLabel.next(searchTerm);
  }

  gotoDetail(popte: Popte): void {
    const link = ['/detail', popte.id];
    this.router.navigate(link);
  }
}
