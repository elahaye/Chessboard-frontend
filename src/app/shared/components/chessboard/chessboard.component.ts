import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ChessBoard } from '../../models/board.model';
import { ChessPiece } from '../../models/piece.model';
import { GamesToolsService } from '../../services/games-tools/games-tools.service';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.scss'],
})

export class ChessboardComponent implements OnInit, AfterViewInit {
  @Input() board: ChessBoard;
  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];
  white: string = 'white';
  black: string = 'black';
  squareSize: number = 70;
  borderSize: number = 4;

  chessPieces: ChessPiece[] = GamesToolsService.getDefaultStartingPosition();
  chessboard: ChessBoard;

  arrayOne(n: number): any[] {
    return Array(n);
  }

  constructor() {
    console.log(this.chessPieces);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.chessboard = new ChessBoard(this.chessPieces);
    var piece = this.chessPieces[14];
    console.log(
      piece.getAvailableMovement(
        (this.chessboard = new ChessBoard(this.chessPieces))
      )
    );
  }
}
