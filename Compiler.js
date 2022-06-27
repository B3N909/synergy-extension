// utilize this for playback recordings

class Compiler {

    constructor () {

    }

    compileEvent (name, args, doDebug) {
        let compiledText = ``;

        if(name === "page.click") {
            if (args.length !== 1) throw new Error("page.click requires one argument");

            compiledText += `
                
                // < STEP page.click >
                await waitFor("${args[0]}");
                await page.click("${args[0]}");
                `;
        } else if(name === "page.type") {
            if (args.length !== 2) throw new Error("page.type requires 2 arguments");

            compiledText += `
                
                // < STEP page.type >
                await waitFor("${args[0]}");
                await page.type("${args[0]}", "${args[1]}");
                `;
        } else if(name === "page.select") {
            if (args.length !== 2) throw new Error("page.select requires 2 arguments");

            compiledText += `
                
                // < STEP page.select >
                await waitFor("${args[0]}");
                await page.select("${args[0]}", "${args[1]}");
                `;
        } else if(name === "page.input") {
            if(args.length !== 2) throw new Error("page.input requires 2 arguments");

            compiledText += `

                // < STEP page.input >
                await waitFor("${args[0]}");
                await page.evaluate((target, value) => {
                    document.querySelector(target).value = value;
                }, "${args[0]}", "${args[1]}");
                `;
        } else {
            throw new Error("Unknown step: " + name);
        }

        if(doDebug) {
            compiledText += `
                console.log("\\n");
                console.log("Executed ${name}");
                console.log(" -> args: ${args}");
                console.log("\\n");
                `;
        }

        return compiledText;
    }

    compile (json, doDebug) {

        // check that json is an array
        if (!(json instanceof Array)) throw new Error("JSON is not an array");
        if(json.length === 0) throw new Error("JSON is empty");
        if(json[0].name !== "header") throw new Error("JSON does not contain a header");

        const header = json[0];
        json.shift();

        let compiledText = `
        (async () => {
        
        // Starts on ${header.url}
        // Compiled on ${new Date()}
        
        // Static variables
        const waitForDelay = 500;
        
        // Utility functions
        const waitFor = async (selector) => {
            ${ doDebug ? `console.log("Waiting for", selector);` : '' }
            await page.waitForSelector(selector);
            await page.waitForTimeout(waitForDelay);
            ${ doDebug ? `console.log(" -> Found");` : '' }
        }
        
        // < HEADER >
        await page.goto("${header.url}");
        `;

        for(let i = 0; i < json.length; i++) {
            const name = json[i].name;
            const args = json[i].args;

            const addText = this.compileEvent(name, args, doDebug);
            compiledText += addText;
        }

        compiledText += `})();`;
        return compiledText;
    }
}
module.exports = Compiler;