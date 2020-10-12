import { Component, OnInit } from '@angular/core';
import { ChessGame } from 'src/app/shared/models/game.model';
import { ChessPlay } from 'src/app/shared/models/interfaces/chess-play.interface';
import { AllChessPieces, ChessPiece } from 'src/app/shared/models/piece.model';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  public game: ChessGame;
  public newGame: ChessGame;
  public defeatedPieces: Array<ChessPiece> = [];
  public plays: ChessPlay[] = [];
  public goBack: boolean;

  constructor() { }

  ngOnInit(): void {
    this.goBack = false;
    this.game = new ChessGame();
  }

  startNewGame() {
    this.newGame = new ChessGame();
    this.game = { ...this.newGame } as ChessGame;
    this.defeatedPieces = [];
  }

  goBackOneMovement() {
    this.plays = { ...this.game.plays };

    if (this.game.plays.length != 0) {
      let lastPlay: ChessPlay = this.game.plays[this.game.plays.length - 1];
      const findPieceIndex = (piece: ChessPiece) => piece.id === lastPlay.piece;
      let indexOfPiece: number = this.game.board.pieces.findIndex(findPieceIndex);
      this.game.board.pieces[indexOfPiece].position = lastPlay.oldPosition;
      if (this.defeatedPieces.length != 0) {
        if (this.defeatedPieces[this.defeatedPieces.length - 1].position.row == lastPlay.newPosition.row && this.defeatedPieces[this.defeatedPieces.length - 1].position.column == lastPlay.newPosition.column) {
          this.game.board.pieces.push(this.defeatedPieces[this.defeatedPieces.length - 1] as AllChessPieces);
          this.defeatedPieces.pop();
        }
      }
      this.game.plays.pop();
      this.plays = { ...this.game.plays };
    }
  }

}
