import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'availableMovements',
})
export class AvailableMovementsPipe implements PipeTransform {
  transform(position: string, array: string[]): boolean {
    return array.includes(position);
  }
}
