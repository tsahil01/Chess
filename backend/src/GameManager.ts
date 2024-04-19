import { WebSocket } from "ws";
import { INIT_GAME, MOVE } from "./messages";
import { Game } from "./Game";

export class GameManager {
    private games: Game[];
    private users: WebSocket[];
    private pendingUser: WebSocket | null;

    constructor() {
        this.games = [];
        this.pendingUser = null;
        this.users  = [];
    }

    addUser(socket: WebSocket){
        this.users.push(socket);
        this.addHandler(socket);
    }

    removeUser(socket: WebSocket){
        this.users = this.users.filter(user => user !== socket);

    }

    private addHandler(socket: WebSocket){
        socket.on(('message'), (data) => {
            const message = JSON.parse(data.toString());

            if(message.type === INIT_GAME){
        
                if(this.pendingUser){
                    console.log("Game started");
                    const game = new Game(this.pendingUser, socket);
                    this.games.push(game);
                    this.pendingUser = null;

                } else {
                    console.log("Pending user");
                    this.pendingUser =  socket;
                }
            }

            if(message.type === MOVE){
                // console.log("Inside MOVE of GameManager");

                const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
                if(game){
                    game.makeMove(socket, message.payload.move);
                }
            }

        })
    }

}