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

  constructor() { }

  ngOnInit(): void {
    this.board = new ChessBoard(GamesToolsService.getDefaultStartingPosition());
  }

  ngAfterViewInit() { }

  /**
   * Show all the available movements and attacks when you click on a piece. All movements and attacks are stored in two arrays.
   * @param chessPiece
   */
  pieceOnClick(chessPiece: ChessPiece) {
    // According to the color of the variable "turn", the player can only interact with same color pieces
    if (chessPiece.color == this.turn) {
      // We store the position of the chosen piece by the player
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

  /**
   * Store the position of the selected case and move the chosen piece by the player in it (case available or to attack an ennemy piece)
   * @param indexRow
   * @param indexColumn
   * @param potentialsMovements
   * @param potentialAttacks
   */
  availableMovementsOnClick(indexRow: number, indexColumn: number, potentialsMovements: string[], potentialAttacks: string[]) {
    // If any piece is selected, you can't click on an other case
    if (!this.selectedPiece) {
      return;
    }
    // We store the position of the selected case by the player
    this.selectedCase = PiecePosition.transformNumberToColumn(indexColumn + 1) + (indexRow + 1);

    // Move the piece in the selected case
    this.potentialMovementsAndAttacks(potentialsMovements, potentialAttacks, this.selectedCase);
  }

  /**
   * Verify if the selected case is found on the availableMovements arrays (include attacks) and modify the position of the selected piece to match the position of the selected case
   * @param potentialsMovements
   * @param potentialAttacks
   * @param selectedCase
   */
  potentialMovementsAndAttacks(potentialsMovements: string[], potentialAttacks: string[], selectedCase: string) {

    if (potentialsMovements.includes(this.selectedCase) || potentialAttacks.includes(selectedCase)) {

      // In case of an attack, the piece defeated is removed from the board
      if (potentialAttacks.includes(selectedCase)) {
        let defeatedPiece = this.findIndexOnBoard(this.selectedCase);
        this.defeatedPieces.push(this.board.pieces[defeatedPiece]);
        this.board.pieces.splice(defeatedPiece, 1);
      }

      // Find the index in the board of the selected piece (before moving it)
      let previousPositionOfPiece = this.findIndexOnBoard(this.selectedPiece);
      // The position of the selected case become the new position of the selected piece
      this.selectedPiece = selectedCase;

      // Modify the position of the piece on the board
      this.board.pieces[previousPositionOfPiece].position.column = this
        .selectedPiece[0] as PositionColumnPiece;
      this.board.pieces[previousPositionOfPiece].position.row = parseInt(
        this.selectedPiece[1]
      ) as PositionRowPiece;

      this.selectedPiece = '';
      this.potentialsMovements = [];
      this.potentialAttacks = [];

      this.turn = this.turn === "white" ? "black" : "white";
    }
  }

  /**
   * This function return the index of the piece given in the parameter in the actual board
   * @param selectedPiece
   * @return number
   */
  findIndexOnBoard(selectedPiece: string): number {
    return this.board.pieces.findIndex(
      (piece: ChessPiece) =>
        piece.position.row == parseInt(selectedPiece[1]) &&
        piece.position.column == selectedPiece[0]
    );
  }
}
