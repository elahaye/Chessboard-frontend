import { PiecePosition } from './position.model';

export interface ChessPlay {
  oldPosition: PiecePosition;
  newPosition: PiecePosition;
  piece: string;
}
