import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "./Game";

export function ChessBoard({ board, socket, setBoard, chess }: {
    chess: any; 
    setBoard: any;
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][];
    socket: WebSocket;
}
){
    const [from, setFrom] = useState<Square | null>(null);

    return (
        <div>
            <div className="grid grid-cols-8 gap-0">
                {board.map((row, i) => (
                    row.map((square, j) => {
                        const squareRepresentation = String.fromCharCode(97 + j) + (8 - i) as Square;

                        return (
                        <div onClick={() => {
                            if(!from){
                                setFrom(square?.square ?? null);
                            } else {
                                socket.send(JSON.stringify({
                                    type: MOVE,
                                    payload: {
                                        move: {
                                            from: from,
                                            to: squareRepresentation
                                        }
                                    }
                                }))
                                console.log(from, squareRepresentation);
                                setFrom(null);
                                chess.move({
                                    from: from,
                                    to: squareRepresentation
                                });
                                setBoard(chess.board());
                            }

                        }} 
                        key={i * 8 + j} className={`p-1 text-blue-500 items-center justify-center flex h-10 md:h-16 lg:h-24 xl:h-28 w-10 md:w-16 lg:w-24 xl:w-28 text-xs ${i % 2 === 0 ? j % 2 === 0 ? 'bg-white' : 'bg-gray-800' : j % 2 === 0 ? 'bg-slate-950' : 'bg-white'}`}>
                            {square ? square.type : ''}
                        </div>
                        )
})
                ))}
            </div>
        </div>
    );
}