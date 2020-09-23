export type PositionRowPiece = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type PositionColumnPiece = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';

export class PiecePosition {
  row: PositionRowPiece;
  column: PositionColumnPiece;

  /**
   * String column name cannot be manipulated properly so we use number instead. But we still want
   * to store the column as the string equivalent. This function is to transform the string into a
   * usable number
   * @param column The string to be transformed to a number
   */
  static transformColumnToNumber(column: PositionColumnPiece) {
    return 'ABCDEFGH'.indexOf(column) + 1;
  }

  /**
   * String column name cannot be manipulated properly so we use number instead. But we still want
   * to store the column as the string equivalent. This function is to transform the number equivalent
   * back to the string name of the column
   * @param columnNumberEquivalent The number equivalent to the string in the alphabet
   */
  static transformNumberToColumn(
    columnNumberEquivalent: number
  ): PositionColumnPiece {
    const array: PositionColumnPiece[] = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
    ];
    return array[columnNumberEquivalent - 1];
  }

  /**
   *
   * @param column
   * @param modifier
   */
  static getColumnByModifier(column: PositionColumnPiece, modifier: number) {
    return PiecePosition.transformNumberToColumn(
      PiecePosition.transformColumnToNumber(column) + modifier
    );
  }
}
