import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessboardComponent } from './chessboard.component';

@NgModule({
  declarations: [ChessboardComponent],
  imports: [CommonModule],
  exports: [ChessboardComponent],
})
export class ChessboardModule {}
