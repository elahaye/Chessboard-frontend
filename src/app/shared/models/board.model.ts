import { ChessPiece } from './piece.model';
import { PiecePosition } from './interfaces/position.model';
import { BishopPiece } from './pieces/bishop.model';
import { QueenPiece } from './pieces/queen.model';
import { KingPiece } from './pieces/king.model';
import { PoundPiece } from './pieces/pound.model';
import { RookPiece } from './pieces/rook.model';
import { KnightPiece } from './pieces/knight.model';

export class ChessBoard {
    pieces: (BishopPiece | QueenPiece | KingPiece | PoundPiece | RookPiece | KnightPiece)[];

    constructor(pieces: ChessPiece[]) {
        this.pieces = pieces;
    }

    /**
     * Check a position in the board to see if there is already a piece on it
     * @param position The position to check on the current board
     */
    public hasPieceInPosition(position: PiecePosition): boolean {
        return this.pieces.filter((piece: ChessPiece) => piece.position.row === position.row
            && piece.position.column === position.column).length === 1;
    }

    /**
     * Return a piece for a given position. Returns undefined if there is no piece in this position
     * @param position
     */
    public getPieceInPosition(position: PiecePosition): ChessPiece | undefined {
        return this.pieces.find((piece: ChessPiece) => piece.position.row === position.row
            && piece.position.column === position.column);
    }
}
