import { ChessPlay } from './interfaces/chess-play.interface';
import { GameState } from './enum/game-state.enum';
import { ChessBoard } from './board.model';
import { GamesToolsService } from '../services/games-tools/games-tools.service';
import { v4 as uuidv4 } from 'uuid';
import { AllChessPieces } from './piece.model';

export class ChessGame {
  public userId: string;
  public gameId: string;
  public createdAt: string;
  public finishedAt: string;
  public state: GameState;
  public plays: ChessPlay[];
  public board: ChessBoard;
  public defeatedPieces: AllChessPieces[];

  constructor(board?: ChessBoard, createdAt?: string, plays?: ChessPlay[], gameId?: string, defeatedPieces?: AllChessPieces[]) {
    if (board && createdAt && plays && gameId && defeatedPieces) {
      this.createdAt = createdAt;
      this.plays = plays;
      this.state = 0;
      this.gameId = gameId;
      this.board = board;
      this.defeatedPieces = defeatedPieces;
    } else {
      this.createdAt = new Date().toISOString();
      this.plays = [];
      this.state = 0;
      this.gameId = uuidv4();
      this.board = new ChessBoard(
        GamesToolsService.getDefaultStartingPosition()
      );
      this.defeatedPieces = [];
    }
  }
}
