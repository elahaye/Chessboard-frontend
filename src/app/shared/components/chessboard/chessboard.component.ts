import { Component, Input, OnInit } from '@angular/core';
import { ChessBoard } from '../../models/board.model';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss'],
})
export class ChessboardComponent implements OnInit {
  @Input() board: ChessBoard;
  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
  white: string = 'white';
  black: string = 'black';
  squareSize: number = 70;
  borderSize: number = 4;

  arrayOne(n: number): any[] {
    return Array(n);
  }

  constructor() {}

  ngOnInit(): void {}

  findColumn(letter: string) {
    var columnPlace = this.letters.indexOf(letter);
    return columnPlace * this.squareSize + this.borderSize + 5;
  }

  findRow(number: number) {
    var rowPlace = this.numbers.indexOf(number.toString());
    return rowPlace * this.squareSize + this.borderSize + 5;
  }
}
