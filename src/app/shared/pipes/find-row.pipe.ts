import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'findRow' })
export class FindRowPipe implements PipeTransform {
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
  squareSize: number = 100;
  borderSize: number = 10;

  transform(number: number): number {
    var rowPlace = this.numbers.indexOf(number.toString());
    return rowPlace * this.squareSize + this.borderSize;
  }
}
