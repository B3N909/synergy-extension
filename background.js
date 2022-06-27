// TODO: HIGH LEVEL SYNETHETIC MONITORING WITH ECOSYSTEM OF RELATED SOLUTIONS




// TODO:
// * Fix puppeteer library reference not working ? ?
// * Add Compiler for playback
// * - Cleanup above code
// * Add Remote Page support ? ?



// console.log(process);

let isRecording = false;

let _recordEvents = [];



class BxBridge {

    constructor () {
        this.isConnected = false;
    }

    async connect () {
        const resp = await fetch("http://127.0.0.1:3000/bx/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                headless: false
            })
        });
        const json = await resp.json();
        this.uuid = json.uuid;
        this.isConnected = true;
    }

    async eval (name, args, header) {
        const resp = await fetch("http://127.0.0.1:3000/bx/eval/", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uuid: this.uuid,
                name,
                args,
                url: header
            })
        });

        console.log(resp);
    }
}


// import puppeteer from './node_modules/puppeteer-web/lib/index.js';
// import initializePuppeteerNode from './node_modules/puppeteer-core/lib/esm/puppeteer/initialize-node.js';

// import pptr from './node_modules/puppeteer-web/lib/index.js';

// DUAL class for both puppeteer and to be in a content script?
// how do we manage IPC communication?
// -> background.js

let previewTab = false;

const createPreviewTab = async () => {
    // create tab
    

    // check if tab exists with title Remote Dashboard
    const tabs = await new Promise(r => {
        chrome.tabs.query({
            title: "Remote Dashboard"
        }, r);
    });
    console.log("Tabs found: ");
    console.log(tabs);
    if(tabs.length > 0) {
        previewTab = tabs[0];
    } else {
        previewTab = await new Promise(async r => {
            await chrome.tabs.create({
                url: "./preview.html",
                active: true
            }, tab => r(tab));
        });
    }
    return previewTab;
}



const createRemotePage = async () => {
    const tab = await new Promise(async r => {
        await chrome.tabs.create({
            url: "./page.html",
            active: true
        }, tab => r(tab));
    });
}

let browser;

const checkLocalConnection = () => {
    return new Promise(async r => {

        // TODO: TEST HERE
        return r(true);

        try {
            browser = await puppeteer.connect({
                browserURL: "http://127.0.0.1:9222"
            });
            r(true);
        } catch (err) {
            console.error(err);
            console.log("Error connecting to local browser");
            r(false);
        }
    });
}




const expose = () => {
    const window = {};

    // convert window to local scope so that window.test returns local variable test
    

    const test = "testing!!";
    return window.test;
}



class ResourceHelper {

    constructor(browser, page) {
        this.browser = browser;
        this.page = page;

        const fs = require("fs");
    }

    _cache(url, response, type) {
        // cache the response
        // save to disk
        
        this.fs.writeFileSync("cache/" + url, response.body());
        this.fs.writeFileSync("cache/" + url + "-type", type);
    }

    getCache(url) {
        if(this.fs.existsSync("cache/" + url)) {
            return {
                body: this.fs.readFileSync("cache/" + url),
                type: this.fs.readFileSync("cache/" + url + "-type")
            };
        }
        return false;
    }

    init (whitelist) {

        // cache any resources that are not in the whitelist 
        this.page.on("request", async request => {
            const url = request.url();
            
            if(!whitelist.includes(url)) {
                const cacheResponse = this.getCache(url);
                if(cacheResponse) {
                    request.respond({
                        status: 200,
                        contentType: cacheResponse.type,
                        body: cacheResponse.body
                    });
                } else {
                    const response = await request.continue();
                    const type = response.headers()["content-type"];
                    this.cache(url, response, type);
                }
            }
        });


        this.page.setRequestInterception(true);


    }
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


class ChromePlayback {

    _sleep (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // TODO: FOR WHATEVER REASON FIRST _waitForSelector on CLICK DOES NOT GET RECEIVED, MAYBE IT IS BEING SENT TOO EARLY?


    constructor (tabId) {
        this.tabId = tabId;
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
        return new Promise(r => {
            chrome.tabs.sendMessage(this.tabId, {
                type: "waitForSelector",
                target
            }, async (resp) => {
                if(!resp) {
                    console.error("Wait for selector failed");
                    console.log(resp);
                    r(await this._waitForSelector(target));
                } else {
                    r(await resp);
                }
            });
        });
    }

    async _waitFor () {
        return new Promise(r => {
            chrome.tabs.sendMessage(this.tabId, {
                type: "waitFor"
            }, r);
        });
    }

    async click (target) {
        console.log("1");
        await this._waitForSelector(target);
        await this._sleep(this.MIN_WAIT_FOR);
        console.log("2");
        const v = await this._click(target);
        console.log("3");
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

    _click (target) {
        return new Promise(r => {
            chrome.tabs.sendMessage(this.tabId, {
                type: "click",
                target
            }, r);
        })
    }

    _type (target, text) {
        return new Promise(r => {
            chrome.tabs.sendMessage(this.tabId, {
                type: "type",
                target,
                text
            }, r);
        });
    }

    _input (target, value) {
        return new Promise(r => {
            chrome.tabs.sendMessage(this.tabId, {
                type: "input",
                target,
                value
            }, r);
        });
    }

    _select (target, value) {
        return new Promise(r => {
            chrome.tabs.sendMessage(this.tabId, {
                type: "select",
                target,
                value
            }, r);
        });
    }
}



let chromePlayback = false;

const playbackMap = new Map();

let isConnected = false;
let hasAttemptedConnection = false;


let lastCheck = false



// on message
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {


    if(request.action === "checkConnection") {
        console.log({ hasAttemptedConnection, isConnected });
        sendResponse({ hasAttemptedConnection, isConnected });
    }

    if(request.action === "save") {
        const event = request.event;
        _recordEvents.push(event);
    }


    if(request.action === "openPreview") {
        createPreviewTab()
            .then(createRemotePage())
            .then(() => {
                console.log("tabs created");
            });
    }

    if(request.action === "getPlayback") {
        const tabId = sender.tab.id;
        let events = playbackMap.get(tabId);
        if(!events) events = false;
        sendResponse(events);
    }

    if(request.action === "updateEvents") {
        const tabId = sender.tab.id;
        playbackMap.set(tabId, request.events);
    }

    if(request.action === "log") {
        console.log(request.message);
    }


    if(request.action === "startRecording") {
        isRecording = true;
        _recordEvents = [{
            "name": "header",
            "url": request.url
        }];
    } else if(request.action === "stopRecording") {
        isRecording = false;
        console.log("Events: " + _recordEvents.length);
        chrome.runtime.sendMessage({action: "saveRecord", events: _recordEvents });
    }

    if(request.action === "attemptConnection") {
        console.log("Attempting connected!!!!");
        checkLocalConnection().then(v => {
            hasAttemptedConnection = true;
            isConnected = v;
        });
    }

    if(request.action === "isRecording") {
        sendResponse({isRecording});
    }

    if(request.action === "playback") {
        const events = request.events;

        // if(events[0].name !== "header") {
        //     alert("Invalid recording file! The file you are using was most likely created using an outdated version...");
        //     return;
        // }
        //
        // const rootURL = events[0].url;
        // events.shift();
        //
        // console.log("Playing back events: " + events.length);
        //
        // const page = await browser.newPage();
        // await page.goto(rootURL);
        // let playback = new PuppeteerPlayback(browser, page);
        // const v = await playback.play(events);

        const bridge = new BxBridge();

        console.log("... connecting to cli bridge");
        await bridge.connect();
        console.log(" -> connected!");


        for(let i = 0; i < events.length; i++) {
            const event = events[i];
            const name = event.name;
            const args = event.args;

            console.log("\n");
            console.log("executing");
            console.log("name: " + name);
            console.log("args: " + JSON.stringify(args));

            let header = undefined;
            if(name === "header") {
                header = event.url;
            }
            await bridge.eval(name, args, header);
        }

        console.log("Playback finished");


        // send previewTab "playback" with events
        // chrome.tabs.sendMessage(previewTab.id, {
        //     action: "playback",
        //     events
        // });
    }
});

