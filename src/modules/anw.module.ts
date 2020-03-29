import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AnwRoutingModule } from '../routes/anw-routing.module';
import {DevToolsExtension, NgRedux, NgReduxModule} from '@angular-redux/store';
import { Root } from '../pages/root';
import {StoreEnhancer} from 'redux';
import {AppState} from '../state/app-state.interface';
import {environment} from '../environments/environment';
import {INITIAL_APP_STATE, rootReducer} from '../state/root.reducer';

@NgModule({
  declarations: [
    Root
  ],
  imports: [
    BrowserModule,
    AnwRoutingModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [Root]
})
export class AnwModule {
  constructor(private _ngRedux: NgRedux<AppState>, private _reduxDevTools: DevToolsExtension) {
    const enhancers: StoreEnhancer<AppState>[] = !environment.production && this._reduxDevTools.isEnabled() ?
      [this._reduxDevTools.enhancer()] : [];

    this._ngRedux.configureStore(rootReducer, INITIAL_APP_STATE, [], enhancers);
  }
}
