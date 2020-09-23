import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessboardComponent } from './chessboard.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [ChessboardComponent],
  imports: [CommonModule, PipesModule],
  exports: [ChessboardComponent],
})
export class ChessboardModule {}
