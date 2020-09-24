import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetPositionPipe } from './get-position/get-position.pipe';
import { FindColumnPipe } from './find-column.pipe';
import { FindRowPipe } from './find-row.pipe';

@NgModule({
  declarations: [GetPositionPipe, FindColumnPipe, FindRowPipe],
  imports: [CommonModule],
  exports: [GetPositionPipe, FindColumnPipe, FindRowPipe],
})
export class PipesModule {}
