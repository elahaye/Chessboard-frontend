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
  white: string = 'white';
  black: string = 'black';
  squareSize: number = 100;
  borderSize: number = 4;

  chessPieces: ChessPiece[] = GamesToolsService.getDefaultStartingPosition();

  arrayOne(n: number): any[] {
    return Array(n);
  }

  constructor() {}

  ngOnInit(): void {}

  findColumn(letter: string) {
    var columnPlace = this.letters.indexOf(letter);
    return columnPlace * this.squareSize + this.borderSize;
  }
  findRow(number: number) {
    var rowPlace = this.numbers.indexOf(number.toString());
    return rowPlace * this.squareSize + this.borderSize;
  }
}
