import { Component, OnInit } from '@angular/core';
import { ChessBoard } from 'src/app/shared/models/board.model';
import { ChessGame } from 'src/app/shared/models/game.model';
import { GamesToolsService } from 'src/app/shared/services/games-tools/games-tools.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  public currentGame: ChessGame;

  constructor() { }

  ngOnInit(): void {
  }

  startNewGame() {
    this.currentGame = new ChessGame();
  }

}
