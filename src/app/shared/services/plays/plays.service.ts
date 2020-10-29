import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChessBoard } from '../../models/board.model';
import { ChessGame } from '../../models/game.model';
import { AllChessPieces, ChessPiece } from '../../models/piece.model';
import { BishopPiece } from '../../models/pieces/bishop.model';
import { KingPiece } from '../../models/pieces/king.model';
import { KnightPiece } from '../../models/pieces/knight.model';
import { PoundPiece } from '../../models/pieces/pound.model';
import { QueenPiece } from '../../models/pieces/queen.model';
import { RookPiece } from '../../models/pieces/rook.model';

@Injectable({
  providedIn: 'root'
})
export class PlaysService {
  private plays: ChessGame[] = [];
  private play: ChessGame;
  public plays$ = new Subject<ChessGame[]>();
  public play$ = new Subject<ChessGame>()

  constructor(private http: HttpClient) { }

  getPlays() {
    this.http.get('http://localhost:3000/api/plays').subscribe(
      (plays: ChessGame[]) => {
        if (plays) {
          this.plays = plays;
          this.plays$.next(this.plays);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createPlay(play: ChessGame) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/plays', play).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getOnePlay(gameId: string) {
    this.http.get('http://localhost:3000/api/plays/' + gameId).subscribe(
      (play: ChessGame) => {
        if (play) {
          let newBoard = new ChessBoard(this.mapToObject(play.board.pieces));
          let newDefeatedPieces = this.mapToObject(play.defeatedPieces);
          this.play = new ChessGame(newBoard, play.createdAt, play.plays, play.gameId, newDefeatedPieces);
          this.play$.next(this.play);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  modifyPlay(gameId: string, play: ChessGame) {
    return new Promise((resolve, reject) => {
      this.http.put('http://localhost:3000/api/plays/' + gameId, play).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  deletePlay(gameId: string) {
    return new Promise((resolve, reject) => {
      this.http.delete('http://localhost:3000/api/plays/' + gameId).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  mapToObject(chessPieces: any[]): AllChessPieces[] {
    let listPieces: AllChessPieces[] = [];

    chessPieces.forEach(chessPiece => {
      switch (chessPiece._type) {
        case "pound":
          listPieces.push(new PoundPiece(chessPiece._position, chessPiece._color));
          break;
        case "queen":
          listPieces.push(new QueenPiece(chessPiece._position, chessPiece._color));
          break;
        case "king":
          listPieces.push(new KingPiece(chessPiece._position, chessPiece._color));
          break;
        case "bishop":
          listPieces.push(new BishopPiece(chessPiece._position, chessPiece._color));
          break;
        case "rook":
          listPieces.push(new RookPiece(chessPiece._position, chessPiece._color));
          break;
        case "knight":
          listPieces.push(new KnightPiece(chessPiece._position, chessPiece._color));
          break;
      }
    });

    return listPieces;
  }

}
