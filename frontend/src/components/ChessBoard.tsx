import { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "./Game";

export function ChessBoard({ board, socket, setBoard, chess, setTurn, turn }: {
    turn: boolean;
    setTurn: any;
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
    const [selected, setSelected] = useState<Square | null>(null);

    return (
        <div>
            <div className="grid grid-cols-8 gap-0">
                {board.map((row, i) => (
                    row.map((square, j) => {
                        const squareRepresentation = String.fromCharCode(97 + j) + (8 - i) as Square;
                        return (
                        <div onClick={() => {
                            if(!turn) return;
                            else {
                                setTurn(true);
                            }

                            if(!from){
                                setFrom(square?.square ?? null);
                                setSelected(square?.square ?? null);
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
                                setSelected(null);
                                chess.move({
                                    from: from,
                                    to: squareRepresentation
                                });
                                setTurn(false);
                                setBoard(chess.board());
                            }
                        }} 
                        key={i * 8 + j} className={`items-center justify-center flex h-10 md:h-16 lg:h-24 xl:h-28 w-10 md:w-16 lg:w-24 xl:w-28 text-xs ${i % 2 === 0 ? j % 2 === 0 ? 'bg-white' : 'bg-gray-800' : j % 2 === 0 ? 'bg-gray-800' : 'bg-white'}`}>
                            {square ? <img className= {`transition-transform duration-300 ease-in-out transform hover:scale-110 ${square?.square === selected ? 'bg-red-500' : ''}`} src={`/${square?.color === "b" ? 
                                square?.type : `${square?.type.toUpperCase()}`
                            }.png`} alt="" /> : ''}
                        </div>
                        )
})
                ))}
            </div>
        </div>
    );
}
