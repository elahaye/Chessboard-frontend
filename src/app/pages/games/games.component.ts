import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChessGame } from 'src/app/shared/models/game.model';
import { ChessPlay } from 'src/app/shared/models/interfaces/chess-play.interface';
import { AllChessPieces, ChessPiece } from 'src/app/shared/models/piece.model';
import { PlaysService } from 'src/app/shared/services/plays/plays.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {
  public games: ChessGame[] = [];
  private gamesSub: Subscription;
  public selectedGame: boolean = false;

  public game: ChessGame;
  public newGame: ChessGame;
  public plays: ChessPlay[] = [];
  public goBack: boolean;


  constructor(private playsService: PlaysService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.gamesSub = this.playsService.plays$.subscribe(
      (games) => {
        this.games = games;
      }
    );
    this.playsService.getPlays();
    this.route.params.subscribe(
      (params) => {
        if (params.gameId) {
          this.selectedGame = true;
          this.initializeGame(params.gameId);
        }
      }
    );
  }

  piecePlayed() {
    this.goBack = true;
  }

  ngOnDestroy() {
    this.gamesSub.unsubscribe();
  }

  startNewGame() {
    const newPlay = new ChessGame();
    this.playsService.createPlay(newPlay);
    this.initializeGame(newPlay.gameId);
    this.goBack = false;
  }

  deleteGame(gameId: string) {
    this.playsService.deletePlay(gameId).then(
      () => {
        this.gamesSub = this.playsService.plays$.subscribe(
          (games) => {
            this.games = games;
          }
        );
        this.playsService.getPlays();
      }
    );

  }

  initializeGame(gameId: string) {
    this.gamesSub = this.playsService.play$.subscribe(
      (game) => {
        this.game = game;
      }
    );
    this.selectedGame = true;
    this.router.navigate(['/games/' + gameId]);
    this.goBack = false;
  }

  changeGame() {
    this.gamesSub = this.playsService.plays$.subscribe(
      (games) => {
        this.games = games;
        this.router.navigate(['/games/']);
      }
    );
    this.playsService.getPlays();
    this.selectedGame = false;
  }

  resetGame() {
    this.goBack = false;
    this.newGame = new ChessGame();
    this.game = { ...this.newGame, gameId: this.game.gameId };

    // Save the game in the database
    this.playsService.modifyPlay(this.game.gameId, this.game);
  }

  goBackOneMovement() {
    this.plays = { ...this.game.plays };

    if (this.game.plays.length != 0) {
      let lastPlay: ChessPlay = this.game.plays[this.game.plays.length - 1];
      const findPieceIndex = (piece: ChessPiece) => {
        if (piece.id === lastPlay.piece) {
          return piece.id
        } else {
          return false;
        };
      };
      let indexOfPiece: number = this.game.board.pieces.findIndex(findPieceIndex);
      this.game.board.pieces[indexOfPiece].position = lastPlay.oldPosition;
      if (this.game.defeatedPieces.length != 0) {
        if (this.game.defeatedPieces[this.game.defeatedPieces.length - 1].position.row == lastPlay.newPosition.row && this.game.defeatedPieces[this.game.defeatedPieces.length - 1].position.column == lastPlay.newPosition.column) {
          this.game.board.pieces.push(this.game.defeatedPieces[this.game.defeatedPieces.length - 1] as AllChessPieces);
          this.game.defeatedPieces.pop();
        }
      }
      this.game.plays.pop();
      this.plays = { ...this.game.plays };
      this.goBack = false;

      // Save the game in the database
      this.playsService.modifyPlay(this.game.gameId, this.game);
    }
  }

}
