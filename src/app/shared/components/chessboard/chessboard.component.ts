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
  letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  numbers: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];

  @Input()
  board: ChessBoard;
  @Input()
  pieces: ChessPiece[] = GamesToolsService.getDefaultStartingPosition();

  arrayOne(n: number): any[] {
    return Array(n);
  }

  constructor() {
    console.log(this.pieces);
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.board = new ChessBoard(this.pieces);
    var piece = this.pieces[14];
    console.log(piece.getAvailableMovement(this.board));
  }
}
