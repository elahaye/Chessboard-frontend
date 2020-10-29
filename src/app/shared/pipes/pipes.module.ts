import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetPositionPipe } from './get-position/get-position.pipe';
import { FindColumnPipe } from './find-column/find-column.pipe';
import { FindRowPipe } from './find-row/find-row.pipe';
import { AvailableMovementsPipe } from './available-movements/available-movements.pipe';

@NgModule({
  declarations: [
    GetPositionPipe,
    FindColumnPipe,
    FindRowPipe,
    AvailableMovementsPipe,
  ],
  imports: [CommonModule],
  exports: [
    GetPositionPipe,
    FindColumnPipe,
    FindRowPipe,
    AvailableMovementsPipe,
  ],
})
export class PipesModule {}
