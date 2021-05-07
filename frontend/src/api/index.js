import TokenService from '../components/Config/config'

// api/index.js
var socket

let connect = (cb) => {
    console.log("Connexion en cours...")
    socket = new WebSocket('wss://93.1.76.4:8080/chat');

    socket.onopen = () => {
        console.log("Connexion acceptée");
        sendMsg(JSON.stringify({ Type: "pseudo", Body: TokenService.getToken() }))
    }

    socket.onmessage = (msg) => {
        // console.log("Message from WebSocket: ", msg);
        console.log("Message reçu")
        cb(msg);
    }

    socket.onclose = (event) => {
        // console.log("Socket Closed Connection: ", event)
        console.log("Connexion fermée ou perdue")
    }

    socket.onerror = (error) => {
        // console.log("Socket Error: ", error)
        console.log("Erreur de connexion")
    }
};

let sendMsg = (msg) => {
    socket.send(msg)
};

export { connect, sendMsg };
