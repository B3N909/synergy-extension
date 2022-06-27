const img = document.querySelector("img");



let browser = false;

const connect = async () => {
    try {
        browser = await puppeteer.connect({
            browserURL: "http://127.0.0.1:9222"
        });
        return true;
    } catch (err) {
        return false;
    }
}

const waitForConnection = () => {
    return new Promise(r => {
        if(browser) {
            r(true);
        } else {
            setTimeout(() => {
                waitForConnection().then(r);
            }, 1000);
        }
    });    
}

class PuppeteerPlayback {

    _sleep (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // TODO: FOR WHATEVER REASON FIRST _waitForSelector on CLICK DOES NOT GET RECEIVED, MAYBE IT IS BEING SENT TOO EARLY?


    constructor (browser, page) {
        this.browser = browser;
        this.page = page;
        this.MIN_WAIT_FOR = 1500;
    }

    async play (events) {
        for(let i = 0; i < events.length; i++) {
            const event = events[i];
            const args = event.args;
            let v;

            console.log("EXECUTE: ");
            console.log(event);
            if(event.name === "page.click") {
                v = await this.click(args[0]);
            } else if(event.name === "page.type") {
                v = await this.type(args[0], args[1]);
            } else if(event.name === "page.select") {
                v = await this.select(args[0], args[1]);
            } else if(event.name === "page.input") {
                v = await this.input(args[0], args[1]);
            } else {
                console.log("Unknown event: ", event);
                return false;
            }

            console.log("RESPPONSE: ");
            console.log(v);

            if(!v.success) {
                console.error("Playback failed on step");
                console.log(event);
                console.log(v);
                return false;
            }
        }
        return true;
    }

    async _waitForSelector (target) {
        await (await this.page.evaluate(target => {
            return new Promise(r => {
                const interval = setInterval(() => {
                    if(document.querySelector(target)) {
                        clearInterval(interval);
                        r(true);
                    }
                }, 100);
            });
        }, target));
    }

    async _waitFor () {
        return new Promise(r => {
            r(true);
        });
    }

    async click (target) {
        await this._waitForSelector(target);
        await this._sleep(this.MIN_WAIT_FOR);
        const v = await this._click(target);
        await this._waitFor();
        return v;
    }

    async type (target, text) {
        await this._waitForSelector(target);
        await this._sleep(this.MIN_WAIT_FOR);
        const v = await this._type(target, text);
        await this._waitFor();
                
        return v;
    }

    async input (target, value) {
        await this._waitForSelector(target);
        await this._sleep(this.MIN_WAIT_FOR);
        const v = await this._input(target, value);
        await this._waitFor();
                
        return v;
    }

    async select (target, value) {
        await this._waitForSelector(target);
        await this._sleep(this.MIN_WAIT_FOR);
        const v = await this._select(target, value);
        await this._waitFor();

        return v;
    }

    async _click (target) {
        await this.page.click(target);
    }

    async _type (target, text) {
        await this.page.type(target, text);
    }

    async _input (target, value) {
        await this.page.evaluate((target, value) => {
            document.querySelector(target).value = value;
        }, target, value);
    }

    async _select (target, value) {
        await this.page.evaluate((target, value) => {
            document.querySelector(target).value = value;
        }, target, value);
    }
}


// on message
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if(request.action === "screenshot") {
        img.src = request.data;
    }

    if(request.action === "checkLocalConnection") {
        
        try {
            const browser = await puppeteer.connect({
                browserURL: "http://127.0.0.1:9222"
            });
            await browser.disconnect();
            // send background.js checkLocalConnection
            chrome.runtime.sendMessage({
                action: "checkLocalConnection",
                data: true
            });

            connect();
        } catch (err) {
            chrome.runtime.sendMessage({
                action: "checkLocalConnection",
                data: false
            });
        }
    }

    if(request.action === "playback") {
        const events = request.events;

        if(events[0].name !== "header") {
            alert("Invalid recording file! The file you are using was most likely created using an outdated version...");
            return;
        }

        const rootURL = events[0].url;
        events.shift();

        console.log("Playing back events: " + events.length);

        page = await browser.newPage();
        await page.goto(rootURL);
        let playback = new PuppeteerPlayback(browser, page);
        const v = await playback.play(events);
        console.log("Playback finished with status: " + v);
    }
});


waitForConnection().then(async () => {
    // we are connected, browser object is available

    
    // add <h1>Connected</h1> to page
    const h1 = document.createElement("h1");
    h1.innerText = "Connected";
    document.body.appendChild(h1);


});