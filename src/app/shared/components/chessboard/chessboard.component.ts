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
  status: boolean = false;

  board: ChessBoard;
  chosenChessPiece: ChessPiece;

  @Input()
  selectedPiece: string;
  @Input()
  potentialsMovements: string[] = [];
  @Input()
  potentialAttacks: string[] = [];

  arrayOne(n: number): any[] {
    return Array(n);
  }

  constructor() {}

  ngOnInit(): void {
    this.board = new ChessBoard(GamesToolsService.getDefaultStartingPosition());
  }

  ngAfterViewInit() {}

  pieceOnClick(chessPiece: ChessPiece) {
    this.chosenChessPiece = chessPiece;
    this.selectedPiece = chessPiece.position.column + chessPiece.position.row;
    console.log(this.selectedPiece);

    var potentialMovements = chessPiece.getAvailableMovement(this.board);
    this.potentialsMovements = [];

    for (let i = 0; i < potentialMovements.length; i++) {
      this.potentialsMovements.push(
        potentialMovements[i].column + potentialMovements[i].row
      );
    }
  }

  availableMovementsOnClick(event: any) {
    if (event.target.getAttribute('class').includes('availableMovements')) {
      this.chosenChessPiece.position.column = event.target.getAttribute(
        'data-position'
      )[0];
      this.chosenChessPiece.position.row = event.target.getAttribute(
        'data-position'
      )[1];
      this.selectedPiece = '';
      this.potentialsMovements = [];
    }
  }
}
