import { ChessPlay } from './interfaces/chess-play.interface';
import { GameState } from './enum/game-state.enum';
import { ChessBoard } from './board.model';
import { GamesToolsService } from '../services/games-tools/games-tools.service';
import { v4 as uuidv4 } from 'uuid';

export class ChessGame {
    public userId: string;
    public gameId: string;
    public createdAt: string;
    public finishedAt: string;
    public state: GameState;
    public plays: ChessPlay[];
    public board: ChessBoard;

    constructor(board?: ChessBoard) {
        if (!board) {
            this.board = new ChessBoard(
                GamesToolsService.getDefaultStartingPosition()
            );
        }
        this.createdAt = new Date().toISOString();
        this.plays = [];
        this.state = 0;
        this.gameId = uuidv4();
    }
}
