// BLACK BOX CONTAINER






class BlackboxClient {

    constructor (url) {
        this.url = url;
        // connect to WebSocket
        this.socket = new WebSocket(url);
        // listen for messages
        this.socket.onmessage = (event) => {
            // parse message
            let message = JSON.parse(event.data);
            // handle message
            this.handleMessage(message);
        }
    }

}


// Host WS server
const WebSocket = require('ws');
const port = 9771;
const wss = new WebSocket.Server({ port });

const puppeteer = require("puppeteer-core");

const checkConnection = (url) => {
    return new Promise(async r => {
        try {
            const browser = await browser.connect({
                browserURL: url
            });
            await browser.disconnect();
            r(true);
        } catch (err) {
            r(false);
            console.error("Failed connecting to browser: ");
            throw err;
        }
    });
}

wss.on("connection", async ws => {
    const onMessage = async msg => {
        try {
            const data = JSON.parse(msg);
            if (data.action === "check_connection") {
                checkConnection(data.url).then(r => {
                    ws.send(JSON.stringify({
                        action: "check_connection",
                        result: r
                    }));
                });
            }
        } catch (err) {
            console.error("Failed parsing ws message: ");
            throw err;
        }
    }

    ws.on("message", onMessage);
});

