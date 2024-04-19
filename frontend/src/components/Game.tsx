import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { ChessBoard } from "./ChessBoard";
import { Chess } from "chess.js";

export const INIT_GAME = 'init_game';
export const MOVE = 'move';
export const GAME_OVER = 'game_over';

export default function Game(){
    const socket = useSocket();
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [gameStarted, setGameStarted] = useState(false);
    const [waitingForPlayer, setWaitingForPlayer] = useState(false);
    const [color, setColor] = useState('');


    useEffect(() => {
        if(!socket) {
            return;
        }
        socket.onmessage = (event) =>{
            const message = JSON.parse(event.data);
            console.log(message);

            switch(message.type){   
                case INIT_GAME:
                    setBoard(chess.board());
                    setGameStarted(true);
                    setWaitingForPlayer(false); 
                    console.log('Game is starting');
                    setColor(message.payload.color);
                    break;

                case MOVE:
                    const move = message.payload;
                    console.log("MOVE: ", move);
                    chess.move(move);
                    setBoard(chess.board());
                    console.log('Move is being made');
                    break;

                case GAME_OVER:
                    console.log('Game is over');
                    break;
            }
        }
    }, [socket]);

    if(!socket) return <>
    <div>Connecting....</div>
    </>
    return <>
    <div className="flex justify-center items-center h-screen w-screen bg-zinc-900 text-white md:p-5 p-3">
      <div className="grid md:grid-cols-3 w-full h-full">
        <div className="flex justify-center md:col-span-2 w-full h-full items-center overflow-auto">
            <ChessBoard chess={chess} setBoard = {setBoard} board = {board} socket = {socket}/>
        </div>

        {!gameStarted && !waitingForPlayer && (
            <div className="w-full h-full flex flex-col sm:justify-center items-center">
                <button onClick={() => {
                    socket.send(JSON.stringify({
                        type: INIT_GAME
                    }))
                    setWaitingForPlayer(true);
                }} className="text-white rounded-xl p-3 text-sm hover:border font-bold bg-blue-900">Start Game</button>
            </div>
        )}

        {!gameStarted && waitingForPlayer && ( 
            <div className="w-full h-full flex flex-col sm:justify-center items-center">
                <p>Waiting for Player 2 to join...</p>
            </div>
        )}

        {gameStarted && (
            <div className="w-full h-full flex flex-col sm:justify-center items-center">
                <p className="text-xl font-bold">Your asset color is {color}</p>
            </div>
        )}
      </div>
    </div>
    </>
}