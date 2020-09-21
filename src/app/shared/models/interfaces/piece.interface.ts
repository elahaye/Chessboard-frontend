import { PiecePosition } from './position.model';
import { ChessBoard } from '../board.model';
export interface PieceInterface {
    getAvailableMovement: (currentBoard: ChessBoard) => PiecePosition[];
}
