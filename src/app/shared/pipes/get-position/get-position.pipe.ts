import { Pipe, PipeTransform } from '@angular/core';
import { PiecePosition } from '../../models/interfaces/position.model';

@Pipe({
  name: 'getPosition',
})
export class GetPositionPipe implements PipeTransform {
  transform(row: number, column: number): string {
    return PiecePosition.transformNumberToColumn(column + 1) + (row + 1);
  }
}
