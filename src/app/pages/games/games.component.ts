import { Component, OnInit } from '@angular/core';
import { ChessGame } from 'src/app/shared/models/game.model';

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
