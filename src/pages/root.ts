import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {NgRedux} from '@angular-redux/store';
import {Title} from '@angular/platform-browser';
import {AppState} from '../state/app-state.interface';
import {CHANGE_ROUTE} from '../state/root.actions';

@Component({
  selector: 'anw-root',
  templateUrl: './root.html'
})
export class Root implements OnInit {
  title = 'angular-nigeria-website';

  constructor(
    private _router: Router,
    private _ngRedux: NgRedux<AppState>,
    private _title: Title,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setRoute();
  }

  setRoute() {
    this._router.events.subscribe((data) => {
      if (data instanceof NavigationEnd) {
        let title;
        let child = this._route.firstChild;
        while (child.firstChild) {
          child = child.firstChild;
        }
        if (child.snapshot.data['title']) {
          title = child.snapshot.data['title'];
          this._title.setTitle(title);
        }
        this._ngRedux.dispatch({
          type: CHANGE_ROUTE,
          url: data.urlAfterRedirects
        });
      }
    });
  }
}
