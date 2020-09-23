import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'findColumn' })
export class FindColumnPipe implements PipeTransform {
  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  squareSize: number = 100;
  borderSize: number = 10;

  transform(letter: string): number {
    var columnPlace = this.letters.indexOf(letter);
    return columnPlace * this.squareSize + this.borderSize;
  }
}
