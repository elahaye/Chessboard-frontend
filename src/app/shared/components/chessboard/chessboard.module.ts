import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChessboardComponent } from './chessboard.component';
import { FindColumnPipe } from '../../pipes/find-column.pipe';
import { FindRowPipe } from '../../pipes/find-row.pipe';

@NgModule({
  declarations: [ChessboardComponent, FindColumnPipe, FindRowPipe],
  imports: [CommonModule],
  exports: [ChessboardComponent],
})
export class ChessboardModule {}
