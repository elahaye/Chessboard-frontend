import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ChessBoard } from '../../models/board.model';
import {
  PiecePosition,
  PositionColumnPiece,
  PositionRowPiece,
} from '../../models/interfaces/position.model';
import { ChessPiece } from '../../models/piece.model';
import { GamesToolsService } from '../../services/games-tools/games-tools.service';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss'],
})
export class ChessboardComponent implements OnInit, AfterViewInit {
  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];

  board: ChessBoard;
  selectedCase: string;

  @Input()
  turn: "white" | "black" = "white";
  @Input()
  selectedPiece: string;
  @Input()
  potentialsMovements: string[] = [];
  @Input()
  potentialAttacks: string[] = [];
  @Input()
  defeatedPieces: Array<ChessPiece> = [];

  arrayOne(n: number): any[] {
    return Array(n);
  }

  constructor() { }

  ngOnInit(): void {
    this.board = new ChessBoard(GamesToolsService.getDefaultStartingPosition());
  }

  ngAfterViewInit() { }

  pieceOnClick(chessPiece: ChessPiece) {
    if (chessPiece.color == this.turn) {
      this.selectedPiece = chessPiece.position.column + chessPiece.position.row;
      var availablesMovements = chessPiece.getAvailableMovement(this.board);
      this.potentialsMovements = [];
      this.potentialAttacks = [];

      for (let i = 0; i < availablesMovements[0].length; i++) {
        this.potentialsMovements.push(
          availablesMovements[0][i].column + availablesMovements[0][i].row
        );
      }
      for (let i = 0; i < availablesMovements[1].length; i++) {
        this.potentialAttacks.push(
          availablesMovements[1][i].column + availablesMovements[1][i].row
        );
      }
    }
  }

  availableMovementsOnClick(indexRow: number, indexColumn: number, potentialsMovements: string[], potentialAttacks: string[]) {
    if (!this.selectedPiece) {
      return;
    }
    this.selectedCase = PiecePosition.transformNumberToColumn(indexColumn + 1) + (indexRow + 1);

    this.potentialMovementsAndAttacks(potentialsMovements, potentialAttacks, this.selectedCase);
  }

  potentialMovementsAndAttacks(potentialsMovements: string[], potentialAttacks: string[], selectedCase: string) {

    if (potentialsMovements.includes(this.selectedCase) || potentialAttacks.includes(selectedCase)) {

      if (potentialAttacks.includes(selectedCase)) {
        let defeatedPiece = this.findIndexOnBoard(this.selectedCase);
        this.defeatedPieces.push(this.board.pieces[defeatedPiece]);
        this.board.pieces.splice(defeatedPiece, 1);
      }

      let pieceOnPreviousBoard = this.findIndexOnBoard(this.selectedPiece);
      this.selectedPiece = selectedCase;

      this.board.pieces[pieceOnPreviousBoard].position.column = this
        .selectedPiece[0] as PositionColumnPiece;
      this.board.pieces[pieceOnPreviousBoard].position.row = parseInt(
        this.selectedPiece[1]
      ) as PositionRowPiece;

      this.selectedPiece = '';
      this.potentialsMovements = [];
      this.potentialAttacks = [];

      this.turn = this.turn === "white" ? "black" : "white";
    }
  }

  findIndexOnBoard(selectedPiece: string) {
    return this.board.pieces.findIndex(
      (piece: ChessPiece) =>
        piece.position.row == parseInt(selectedPiece[1]) &&
        piece.position.column == selectedPiece[0]
    );
  }
}
