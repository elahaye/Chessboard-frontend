import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChessGame } from '../../models/game.model';
import { ChessPlay } from '../../models/interfaces/chess-play.interface';
import {
  PiecePosition,
  PositionColumnPiece,
  PositionRowPiece,
} from '../../models/interfaces/position.model';
import { ChessPiece } from '../../models/piece.model';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss'],
})
export class ChessboardComponent implements OnInit, OnChanges {
  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
  selectedCase: string;
  turnColor: "white" | "black" = "white";

  @Input()
  game: ChessGame;
  @Input()
  selectedPiecePosition: string;
  @Input()
  potentialsMovements: string[] = [];
  @Input()
  potentialAttacks: string[] = [];
  @Input()
  defeatedPieces: Array<ChessPiece> = [];
  @Input()
  plays: ChessPlay[];
  @Input()
  goBack: boolean;

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    if (this.plays.length != 0) {
      this.turnColor = this.turnColor === "white" ? "black" : "white";
      this.goBack = false;
    }
    else {
      this.turnColor = "white";
    }
    this.selectedPiecePosition = '';
    this.potentialsMovements = [];
    this.potentialAttacks = [];
  }

  /**
   * Show all the available movements and attacks when you click on a piece. All movements and attacks are stored in two arrays.
   * @param chessPiece
   */
  pieceOnClick(chessPiece: ChessPiece) {
    // According to the color of the variable "turnColor", the player can only interact with same color pieces
    if (chessPiece.color == this.turnColor) {
      // We store the position of the chosen piece by the player
      this.selectedPiecePosition = chessPiece.position.column + chessPiece.position.row;

      var availablesMovements = chessPiece.getAvailableMovement(this.game.board);
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
    if (!this.selectedPiecePosition) {
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
        // We store the defeated piece in an array
        this.defeatedPieces.push(this.game.board.pieces[defeatedPiece]);
        this.game.board.pieces.splice(defeatedPiece, 1);
      }

      // Find the index in the board of the selected piece (before moving it)
      let indexOfPieceInBoard = this.findIndexOnBoard(this.selectedPiecePosition);

      // Modify the position of the piece on the board
      this.game.board.pieces[indexOfPieceInBoard].position.column = selectedCase[0] as PositionColumnPiece;
      this.game.board.pieces[indexOfPieceInBoard].position.row = parseInt(
        selectedCase[1]
      ) as PositionRowPiece;

      // Add a play to the the actual game (each play added allows to see the history of the game)
      let play: ChessPlay = {
        oldPosition: {
          row: parseInt(this.selectedPiecePosition[1]) as PositionRowPiece,
          column: this.selectedPiecePosition[0] as PositionColumnPiece
        },
        newPosition: this.game.board.pieces[indexOfPieceInBoard].position,
        piece: this.game.board.pieces[indexOfPieceInBoard].id
      };
      this.game.plays.push(play);

      this.selectedPiecePosition = '';
      this.potentialsMovements = [];
      this.potentialAttacks = [];

      this.turnColor = this.turnColor === "white" ? "black" : "white";
      this.goBack = true;
    }
  }

  /**
   * This function return the index of the piece given in the parameter in the actual board
   * @param selectedPiecePosition
   * @return number
   */
  findIndexOnBoard(selectedPiecePosition: string): number {
    return this.game.board.pieces.findIndex(
      (piece: ChessPiece) =>
        piece.position.row == parseInt(selectedPiecePosition[1]) &&
        piece.position.column == selectedPiecePosition[0]
    );
  }
}
