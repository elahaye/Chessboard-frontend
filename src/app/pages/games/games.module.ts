import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import {ButtonModule} from 'primeng/button';
import { ChessboardModule } from 'src/app/shared/components/chessboard/chessboard.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [GamesComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    ButtonModule,
    ChessboardModule,
  ]
})
export class GamesModule { }
