
class WebSocketAPI {
    constructor() {
        const url = 'ws://140.238.54.136:8080/chat/chat';
        this.socket = new WebSocket(url);
        this.socket.onopen = () => {
            console.log('Connected to WebSocket API');
        };
        this.socket.onclose = (event) => {
            console.log(`Disconnected from WebSocket API: ${event.code}`);
        };
        this.socket.onerror = (error) => {
            console.error('WebSocket API Error:', error);
        };
    }

    send(data) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else {
            console.error('WebSocket API is not connected');
        }
    }

    on(eventName, callback) {
        this.socket.addEventListener(eventName, callback);
    }

    close() {
        this.socket.close();
    }
}
export default WebSocketAPI;
