import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetPositionPipe } from './get-position/get-position.pipe';

@NgModule({
  declarations: [GetPositionPipe],
  imports: [
    CommonModule
  ],
  exports: [
    GetPositionPipe
  ]
})
export class PipesModule { }
