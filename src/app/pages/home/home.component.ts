import { Component, OnInit } from '@angular/core';
import { GamesToolsService } from '../../shared/services/games-tools/games-tools.service';
import { QueenPiece } from '../../shared/models/pieces/queen.model';
import { ChessPiece } from '../../shared/models/piece.model';
import { ChessBoard } from '../../shared/models/board.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const currentBoard: ChessBoard = new ChessBoard(
      GamesToolsService.getDefaultStartingPosition()
    );
  }
}
