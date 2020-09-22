import { Component, Input, OnInit } from '@angular/core';
import { ChessPiece } from '../../models/piece.model';
import { GamesToolsService } from '../../services/games-tools/games-tools.service';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss'],
})
export class ChessboardComponent implements OnInit {
  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];

  chessPieces: ChessPiece[] = GamesToolsService.getDefaultStartingPosition();

  arrayOne(n: number): any[] {
    return Array(n);
  }

  constructor() {}

  ngOnInit(): void {}
}
