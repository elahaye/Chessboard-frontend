import { ChessPlay } from './interfaces/chess-play.interface';
import { GameState } from './enum/game-state.enum';
import { ChessBoard } from './board.model';

export class ChessGame {
    public userId: string;
    public gameId: string;
    public createdAt: string;
    public finishedAt: string;
    public state: GameState;
    public plays: ChessPlay[];
    public board: ChessBoard;
}
