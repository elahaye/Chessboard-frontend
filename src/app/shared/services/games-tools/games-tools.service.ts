import { Injectable } from '@angular/core';
import { PoundPiece } from '../../models/pieces/pound.model';
import { RookPiece } from '../../models/pieces/rook.model';
import { KnightPiece } from '../../models/pieces/knight.model';
import { BishopPiece } from '../../models/pieces/bishop.model';
import { KingPiece } from '../../models/pieces/king.model';
import { QueenPiece } from '../../models/pieces/queen.model';
import { AllChessPieces, ChessPiece } from '../../models/piece.model';

@Injectable({
  providedIn: 'root',
})
export class GamesToolsService {
  constructor() { }

  static getDefaultStartingPosition(): AllChessPieces[] {
    return [
      new PoundPiece({ row: 2, column: 'A' }, 'white'),
      new PoundPiece({ row: 2, column: 'B' }, 'white'),
      new PoundPiece({ row: 2, column: 'C' }, 'white'),
      new PoundPiece({ row: 2, column: 'D' }, 'white'),
      new PoundPiece({ row: 2, column: 'E' }, 'white'),
      new PoundPiece({ row: 2, column: 'F' }, 'white'),
      new PoundPiece({ row: 2, column: 'G' }, 'white'),
      new PoundPiece({ row: 2, column: 'H' }, 'white'),
      new RookPiece({ row: 1, column: 'A' }, 'white'),
      new RookPiece({ row: 1, column: 'H' }, 'white'),
      new KnightPiece({ row: 1, column: 'B' }, 'white'),
      new KnightPiece({ row: 1, column: 'G' }, 'white'),
      new BishopPiece({ row: 1, column: 'C' }, 'white'),
      new BishopPiece({ row: 1, column: 'F' }, 'white'),
      new KingPiece({ row: 1, column: 'D' }, 'white'),
      new QueenPiece({ row: 4, column: 'E' }, 'white'),
      new PoundPiece({ row: 7, column: 'A' }, 'black'),
      new PoundPiece({ row: 7, column: 'B' }, 'black'),
      new PoundPiece({ row: 7, column: 'C' }, 'black'),
      new PoundPiece({ row: 7, column: 'D' }, 'black'),
      new PoundPiece({ row: 7, column: 'E' }, 'black'),
      new PoundPiece({ row: 7, column: 'F' }, 'black'),
      new PoundPiece({ row: 7, column: 'G' }, 'black'),
      new PoundPiece({ row: 7, column: 'H' }, 'black'),
      new RookPiece({ row: 8, column: 'A' }, 'black'),
      new RookPiece({ row: 8, column: 'H' }, 'black'),
      new KnightPiece({ row: 8, column: 'B' }, 'black'),
      new KnightPiece({ row: 8, column: 'G' }, 'black'),
      new BishopPiece({ row: 8, column: 'C' }, 'black'),
      new BishopPiece({ row: 8, column: 'F' }, 'black'),
      new KingPiece({ row: 8, column: 'D' }, 'black'),
      new QueenPiece({ row: 8, column: 'E' }, 'black'),
    ];
  }
}
