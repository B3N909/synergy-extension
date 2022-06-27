const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const app = express();
const port = 3000;

const uuid = require("uuid");
const puppeteer = require("puppeteer");
const chromePaths = require("chrome-paths");

const Compiler = require("../Compiler.js");
const compiler = new Compiler();

const bxMap = new Map();




app.post("/bx/", jsonParser, async (req, res) => {
    // create puppeteer browser with options
    const id = uuid.v4();

    // log body
    console.log(req.body);

    // console.log(req);

    req.body.executablePath = chromePaths.chrome;

    const browser = await puppeteer.launch(req.body);
    const page = await browser.newPage();

    bxMap.set(id, {
        browser,
        page
    });

    // return uuid of browser in json { uuid }
    res.json({ uuid: id });
});

app.post("/bx/eval/", jsonParser, async (req, res) => {
    const uuid = req.body.uuid;

    // check if uuid exists
    if (!bxMap.has(uuid)) {
        res.status(404).send("uuid not found");
        console.error("eval: uuid not found!");
        return;
    }

    const bx = bxMap.get(uuid);
    const page = bx.page;

    console.log(req.body);
    const name = req.body.name;
    const args = req.body.args;

    console.log("\n");
    console.log("name:", name);
    console.log("args:", args);

    if(name === "header") {
        const url = req.body.url;
        console.log("header: " + url);
        await page.goto(url);
    } else {
        let compiledCode = compiler.compileEvent(name, args, true);
        compiledCode = `
        // Static variables
        const waitForDelay = 500;
        
        // Utility functions
        const waitFor = async (selector) => {
            console.log("Waiting for", selector);
            await page.waitForSelector(selector);
            await page.waitForTimeout(waitForDelay);
            console.log(" -> Found");
        }` + compiledCode;
        compiledCode = `try { ${compiledCode} } catch(e) { console.log(e); }`;
        await eval(`(async () => { ${compiledCode} })()`);
    }

    res.json({
        success: true,
    });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

const figlet = require("figlet");
const colors = require("colors");
const prompt = require("prompt");
const consoleClear = require("console-clear");
const filePrompt = require("file-prompt").default;
const fs = require("fs");

const log = (callback) => {
    consoleClear();

    figlet("Synergy", (err, data) => {
        console.log(data.blue);
        if(callback) {
            callback();
        }

        prompt.start();
        prompt.get(["cmd"], (err, result) => {
            const cmd = result.cmd;

            if(cmd === "help") {
                log(() => {
                    console.log("Commands:");
                    console.log("\n");
                    console.log("  help - show this help");
                    console.log("  exit - exit the program");
                    console.log("\n");
                    console.log("  open <optional file> <optional variables> - starts a browser and plays back the given file");
                    console.log("\n");
                    console.log("  cloud <api key> - authenticates to cloud with the given api key");
                    console.log("  cloud open <optional file> <optional variables> - starts a browser(s) and plays back the given file in the cloud");
                    console.log("  cloud status - shows the status of the cloud");
                });
            } else if(cmd === "open") {

                consoleClear();

                filePrompt({
                    base: __dirname,
                    // glob: "*.json",
                }).then(file => {
                    console.log(file);
                    console.log("DONE!");
                });
                //
                // log(() => {
                //     console.log("Started browser!".green);
                // });


            } else {
                log(() => {
                    console.log("Command not recognized.".red);
                })
            }
        });
    });
}

log(() => {
    console.log("\nBxBridge started on port 3000!");
    console.log("\nType 'help' for a list of commands.".gray);
});