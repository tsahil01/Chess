import { useEffect, useState } from "react";

const WS_URL = 'wss://192.168.1.6:8080';

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(()=>{
        const ws = new WebSocket(WS_URL);
        ws.onopen = ()=>{
            console.log('Connected to server');
            setSocket(ws);
        }
        ws.onclose = ()=>{
            console.log('Disconnected from server');
            setSocket(null);
        }
        return ()=>{
            ws.close();
        }
    }, [])
    return socket;
}