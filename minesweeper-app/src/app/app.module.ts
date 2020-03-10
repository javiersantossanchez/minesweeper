import { BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardScoreComponent } from './components/board-score/board-score.component';
import { SquareComponent } from './components/square/square.component';
import { BoardGameComponent } from './components/board-game/board-game.component';
import { StoreModule } from '@ngrx/store';
import { getGameReducer } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { NgLetModule } from '@ngrx-utils/store';


@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    BoardGameComponent,
    BoardScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({rootState: getGameReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AppEffects]),
    NgLetModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
