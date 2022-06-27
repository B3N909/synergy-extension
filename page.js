// TODO: use preview.js for pipping


class PageWrapper {

    constructor(page, session) {
        this.page = page;
        this.session = session;
    }

    async toSelectOptions (select) { 
        return await this.page.evaluate((e) => {
            const options = [];
            for (let i = 0; i < e.options.length; i++) {
                options.push({
                    text: e.options[i].text,
                    value: e.options[i].value
                });
            }
            return options;
        }, select);
    }

    async _recentClick() {
        await this.page.evaluate(recentClick => {
            window.recentClick = recentClick;
        }, Date.now());
    }

    async newDocument (emulation) {
        if(emulation !== "iphone") return;
        // const test = () => {
        //     const data = JSON.parse("{\"webgl\":{\"2849\":1,\"2885\":1029,\"2886\":2305,\"2928\":{\"0\":0,\"1\":1},\"2930\":true,\"2931\":1,\"2932\":513,\"2962\":519,\"2963\":2147483647,\"2964\":7680,\"2965\":7680,\"2966\":7680,\"2968\":2147483647,\"2978\":{\"0\":0,\"1\":0,\"2\":300,\"3\":150},\"3024\":true,\"3088\":{\"0\":0,\"1\":0,\"2\":300,\"3\":150},\"3106\":{\"0\":0,\"1\":0,\"2\":0,\"3\":0},\"3107\":[true,true,true,true],\"3317\":4,\"3333\":4,\"3379\":16384,\"3386\":{\"0\":16384,\"1\":16384},\"3408\":4,\"3410\":8,\"3411\":8,\"3412\":8,\"3413\":8,\"3414\":24,\"7936\":\"WebKit\",\"7937\":\"WebKit WebGL\",\"7938\":\"WebGL 1.0\",\"32773\":{\"0\":0,\"1\":0,\"2\":0,\"3\":0},\"32777\":32774,\"32936\":1,\"32937\":4,\"32938\":1,\"32969\":1,\"32971\":1,\"33170\":4352,\"33901\":{\"0\":1,\"1\":511},\"33902\":{\"0\":1,\"1\":16},\"34016\":33984,\"34024\":16384,\"34076\":16384,\"34467\":{},\"34816\":519,\"34817\":7680,\"34818\":7680,\"34819\":7680,\"34877\":32774,\"34921\":16,\"34930\":16,\"35660\":16,\"35661\":32,\"35724\":\"WebGL GLSL ES 1.0 (1.0)\",\"35738\":5121,\"35739\":6408,\"36004\":2147483647,\"36005\":2147483647,\"36347\":512,\"36348\":15,\"36349\":224,\"37443\":37444,\"37445\":\"Apple Inc.\",\"37446\":\"Apple GPU\"},\"navigator\":{\"cookieEnabled\":true,\"maxTouchPoints\":5,\"appCodeName\":\"Mozilla\",\"appName\":\"Netscape\",\"appVersion\":\"5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1\",\"platform\":\"iPhone\",\"product\":\"Gecko\",\"productSub\":\"20030107\",\"userAgent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1\",\"vendor\":\"Apple Computer, Inc.\",\"vendorSub\":\"null\",\"language\":\"en-us\",\"onLine\":true},\"navigatorFunctions\":{\"getStorageUpdates\":\"navigator.getStorageUpdates\",\"sendBeacon\":\"navigator.sendBeacon\",\"requestMediaKeySystemAccess\":\"navigator.requestMediaKeySystemAccess\",\"getGamepads\":\"navigator.getGamepads\",\"javaEnabled\":\"navigator.javaEnabled\"},\"navigatorObjects\":{\"geolocation\":{\"name\":\"Geolocation\"},\"mediaCapabilities\":{\"name\":\"MediaCapabilities\"},\"languages\":{\"length\":1,\"name\":\"Array\"},\"plugins\":{\"length\":0,\"name\":\"PluginArray\"},\"mimeTypes\":{\"length\":0,\"name\":\"MimeTypeArray\"}},\"window\":{\"innerHeight\":1702,\"innerWidth\":980,\"outerHeight\":896,\"outerWidth\":414,\"screenX\":0,\"screenLeft\":0,\"screenY\":0,\"screenTop\":0},\"windowObjects\":{\"screen\":{\"height\":896,\"width\":414,\"colorDepth\":32,\"pixelDepth\":32,\"availLeft\":0,\"availTop\":0,\"availHeight\":896,\"availWidth\":414,\"name\":\"Screen\"},\"visualViewport\":{\"offsetLeft\":0,\"offsetTop\":0,\"pageLeft\":0,\"pageTop\":0,\"width\":980,\"height\":1702,\"scale\":0.422448992729187,\"onresize\":null,\"onscroll\":null,\"name\":\"VisualViewport\"}}}");
        
        //     function overwrite (arr, name) {
        //         const properties = Object.keys(arr);
        //         for(let i = 0; i < properties.length; i++) {
        //             const property = properties[i];
        //             const value = arr[property];
        //             Object.defineProperty(name, property, {
        //                 value,
        //                 writable: false
        //             });
        //         }
        //     }
        //     overwrite(data.navigator, navigator);
        //     overwrite(data.window, window);
        
        //     // Properties
        //     delete Object.getPrototypeOf(navigator).doNotTrack;
        //     delete Object.getPrototypeOf(navigator).hardwareConcurrency;
        //     delete Object.getPrototypeOf(navigator).deviceMemory;
        //     delete Object.getPrototypeOf(navigator).userAgentData;
        
        //     Object.defineProperty(navigator, "standalone", {
        //         value: false,
        //         writable: false
        //     });
        
        //     // Functions
        //     delete Object.getPrototypeOf(navigator).userActivation;
        //     delete Object.getPrototypeOf(navigator).connection;
        //     delete Object.getPrototypeOf(navigator).webkitTemporaryStorage;
        //     delete Object.getPrototypeOf(navigator).webkitPersistentStorage;
        //     delete Object.getPrototypeOf(navigator).xr;
        //     delete Object.getPrototypeOf(navigator).permissions;
        //     delete Object.getPrototypeOf(navigator).locks;
        //     delete Object.getPrototypeOf(navigator).wakeLock;
        //     delete Object.getPrototypeOf(navigator).usb;
        //     delete Object.getPrototypeOf(navigator).mediaSession;
        //     delete Object.getPrototypeOf(navigator).clipboard;
        //     delete Object.getPrototypeOf(navigator).credentials;
        //     delete Object.getPrototypeOf(navigator).keyboard;
        //     delete Object.getPrototypeOf(navigator).mediaDevices;
        //     delete Object.getPrototypeOf(navigator).storage;
        //     delete Object.getPrototypeOf(navigator).serviceWorker;
        //     delete Object.getPrototypeOf(navigator).presentation;
        //     delete Object.getPrototypeOf(navigator).bluetooth;
        //     window.chrome = undefined;
        
        //     const hook = HTMLMediaElement.prototype.canPlayType;
        
        //     HTMLMediaElement.prototype.canPlayType = function() {
        //         if (arguments[0].includes('mp5a')) return '';
        //         return hook.apply(this, arguments);
        //     }
        // }

        // await this.session.send("Page.addScriptToEvaluateOnNewDocument", {
        //     source: "(" + test.toString() + ")()",
        //     includeCommandLineAPI: true
        // })
        return await this.page.evaluateOnNewDocument(() => {
            console.log("STARTED!");

            const data = JSON.parse("{\"webgl\":{\"2849\":1,\"2885\":1029,\"2886\":2305,\"2928\":{\"0\":0,\"1\":1},\"2930\":true,\"2931\":1,\"2932\":513,\"2962\":519,\"2963\":2147483647,\"2964\":7680,\"2965\":7680,\"2966\":7680,\"2968\":2147483647,\"2978\":{\"0\":0,\"1\":0,\"2\":300,\"3\":150},\"3024\":true,\"3088\":{\"0\":0,\"1\":0,\"2\":300,\"3\":150},\"3106\":{\"0\":0,\"1\":0,\"2\":0,\"3\":0},\"3107\":[true,true,true,true],\"3317\":4,\"3333\":4,\"3379\":16384,\"3386\":{\"0\":16384,\"1\":16384},\"3408\":4,\"3410\":8,\"3411\":8,\"3412\":8,\"3413\":8,\"3414\":24,\"7936\":\"WebKit\",\"7937\":\"WebKit WebGL\",\"7938\":\"WebGL 1.0\",\"32773\":{\"0\":0,\"1\":0,\"2\":0,\"3\":0},\"32777\":32774,\"32936\":1,\"32937\":4,\"32938\":1,\"32969\":1,\"32971\":1,\"33170\":4352,\"33901\":{\"0\":1,\"1\":511},\"33902\":{\"0\":1,\"1\":16},\"34016\":33984,\"34024\":16384,\"34076\":16384,\"34467\":{},\"34816\":519,\"34817\":7680,\"34818\":7680,\"34819\":7680,\"34877\":32774,\"34921\":16,\"34930\":16,\"35660\":16,\"35661\":32,\"35724\":\"WebGL GLSL ES 1.0 (1.0)\",\"35738\":5121,\"35739\":6408,\"36004\":2147483647,\"36005\":2147483647,\"36347\":512,\"36348\":15,\"36349\":224,\"37443\":37444,\"37445\":\"Apple Inc.\",\"37446\":\"Apple GPU\"},\"navigator\":{\"cookieEnabled\":true,\"maxTouchPoints\":5,\"appCodeName\":\"Mozilla\",\"appName\":\"Netscape\",\"appVersion\":\"5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1\",\"platform\":\"iPhone\",\"product\":\"Gecko\",\"productSub\":\"20030107\",\"userAgent\":\"Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1\",\"vendor\":\"Apple Computer, Inc.\",\"vendorSub\":\"null\",\"language\":\"en-us\",\"onLine\":true},\"navigatorFunctions\":{\"getStorageUpdates\":\"navigator.getStorageUpdates\",\"sendBeacon\":\"navigator.sendBeacon\",\"requestMediaKeySystemAccess\":\"navigator.requestMediaKeySystemAccess\",\"getGamepads\":\"navigator.getGamepads\",\"javaEnabled\":\"navigator.javaEnabled\"},\"navigatorObjects\":{\"geolocation\":{\"name\":\"Geolocation\"},\"mediaCapabilities\":{\"name\":\"MediaCapabilities\"},\"languages\":{\"length\":1,\"name\":\"Array\"},\"plugins\":{\"length\":0,\"name\":\"PluginArray\"},\"mimeTypes\":{\"length\":0,\"name\":\"MimeTypeArray\"}},\"window\":{\"innerHeight\":1702,\"innerWidth\":980,\"outerHeight\":896,\"outerWidth\":414,\"screenX\":0,\"screenLeft\":0,\"screenY\":0,\"screenTop\":0},\"windowObjects\":{\"screen\":{\"height\":896,\"width\":414,\"colorDepth\":32,\"pixelDepth\":32,\"availLeft\":0,\"availTop\":0,\"availHeight\":896,\"availWidth\":414,\"name\":\"Screen\"},\"visualViewport\":{\"offsetLeft\":0,\"offsetTop\":0,\"pageLeft\":0,\"pageTop\":0,\"width\":980,\"height\":1702,\"scale\":0.422448992729187,\"onresize\":null,\"onscroll\":null,\"name\":\"VisualViewport\"}}}");

            function overwrite (arr, name) {
                const properties = Object.keys(arr);
                for(let i = 0; i < properties.length; i++) {
                    const property = properties[i];
                    const value = arr[property];
                    Object.defineProperty(name, property, {
                        value,
                        writable: false
                    });
                }
            }
            overwrite(data.navigator, navigator);
            overwrite(data.window, window);

            // Properties
            delete Object.getPrototypeOf(navigator).doNotTrack;
            delete Object.getPrototypeOf(navigator).hardwareConcurrency;
            delete Object.getPrototypeOf(navigator).deviceMemory;
            delete Object.getPrototypeOf(navigator).userAgentData;

            Object.defineProperty(navigator, "standalone", {
                value: false,
                writable: false
            });

            // Functions
            delete Object.getPrototypeOf(navigator).userActivation;
            delete Object.getPrototypeOf(navigator).connection;
            delete Object.getPrototypeOf(navigator).webkitTemporaryStorage;
            delete Object.getPrototypeOf(navigator).webkitPersistentStorage;
            delete Object.getPrototypeOf(navigator).xr;
            delete Object.getPrototypeOf(navigator).permissions;
            delete Object.getPrototypeOf(navigator).locks;
            delete Object.getPrototypeOf(navigator).wakeLock;
            delete Object.getPrototypeOf(navigator).usb;
            delete Object.getPrototypeOf(navigator).mediaSession;
            delete Object.getPrototypeOf(navigator).clipboard;
            delete Object.getPrototypeOf(navigator).credentials;
            delete Object.getPrototypeOf(navigator).keyboard;
            delete Object.getPrototypeOf(navigator).mediaDevices;
            delete Object.getPrototypeOf(navigator).storage;
            delete Object.getPrototypeOf(navigator).serviceWorker;
            delete Object.getPrototypeOf(navigator).presentation;
            delete Object.getPrototypeOf(navigator).bluetooth;
            window.chrome = undefined;

            const hook = HTMLMediaElement.prototype.canPlayType;

            HTMLMediaElement.prototype.canPlayType = function() {
                if (arguments[0].includes('mp5a')) return '';
                return hook.apply(this, arguments);
            }
        });
    }

    async title () {
        return await this.page.evaluate(() => {
            return (location.hostname.includes(".")  ? (location.hostname.split(".").length > 1 ? location.hostname.split(".")[1] : location.hostname.split(".")[0]) : location.hostname);
        });
    }

    async tryEvaluate () {
        return await this.page.evaluate(() => { return location.href } );
    }

    async getPosition (handle) {
        return await this.page.evaluate((e) => {
            const rect = handle.getBoundingClientRect();
            return {
                x: rect.x,
                y: rect.y
            };
        }, handle);
    }

    compareTwoStrings(first, second) {
        first = first.replace(/\s+/g, '')
        second = second.replace(/\s+/g, '')
    
        if (first === second) return 1; // identical or empty
        if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string
    
        let firstBigrams = new Map();
        for (let i = 0; i < first.length - 1; i++) {
            const bigram = first.substring(i, i + 2);
            const count = firstBigrams.has(bigram)
                ? firstBigrams.get(bigram) + 1
                : 1;
    
            firstBigrams.set(bigram, count);
        };
    
        let intersectionSize = 0;
        for (let i = 0; i < second.length - 1; i++) {
            const bigram = second.substring(i, i + 2);
            const count = firstBigrams.has(bigram)
                ? firstBigrams.get(bigram)
                : 0;
    
            if (count > 0) {
                firstBigrams.set(bigram, count - 1);
                intersectionSize++;
            }
        }
    
        return (2.0 * intersectionSize) / (first.length + second.length - 2);
    }
    
    findBestMatch(mainString, targetStrings) {
        if (!this.areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
        
        const ratings = [];
        let bestMatchIndex = 0;
    
        for (let i = 0; i < targetStrings.length; i++) {
            const currentTargetString = targetStrings[i];
            const currentRating = this.compareTwoStrings(mainString, currentTargetString)
            ratings.push({target: currentTargetString, rating: currentRating})
            if (currentRating > ratings[bestMatchIndex].rating) {
                bestMatchIndex = i
            }
        }
        
        
        const bestMatch = ratings[bestMatchIndex]
        
        return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
    }
    
    areArgsValid(mainString, targetStrings) {
        if (typeof mainString !== 'string') return false;
        if (!Array.isArray(targetStrings)) return false;
        if (!targetStrings.length) return false;
        if (targetStrings.find( function (s) { return typeof s !== 'string'})) return false;
        return true;
    }


    async getElementByText(text, skip) {
        if(!skip) this.startTime = Date.now();
        let v = await this.page.evaluateHandle((text) => {

            function compareTwoStrings(first, second) {
                first = first.replace(/\s+/g, '')
                second = second.replace(/\s+/g, '')
            
                if (first === second) return 1; // identical or empty
                if (first.length < 2 || second.length < 2) return 0; // if either is a 0-letter or 1-letter string
            
                let firstBigrams = new Map();
                for (let i = 0; i < first.length - 1; i++) {
                    const bigram = first.substring(i, i + 2);
                    const count = firstBigrams.has(bigram)
                        ? firstBigrams.get(bigram) + 1
                        : 1;
            
                    firstBigrams.set(bigram, count);
                };
            
                let intersectionSize = 0;
                for (let i = 0; i < second.length - 1; i++) {
                    const bigram = second.substring(i, i + 2);
                    const count = firstBigrams.has(bigram)
                        ? firstBigrams.get(bigram)
                        : 0;
            
                    if (count > 0) {
                        firstBigrams.set(bigram, count - 1);
                        intersectionSize++;
                    }
                }
            
                return (2.0 * intersectionSize) / (first.length + second.length - 2);
            }
            
            function findBestMatch(mainString, targetStrings) {
                if (!areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
                
                const ratings = [];
                let bestMatchIndex = 0;
            
                for (let i = 0; i < targetStrings.length; i++) {
                    const currentTargetString = targetStrings[i];
                    const currentRating = compareTwoStrings(mainString, currentTargetString)
                    ratings.push({target: currentTargetString, rating: currentRating})
                    if (currentRating > ratings[bestMatchIndex].rating) {
                        bestMatchIndex = i
                    }
                }
                
                
                const bestMatch = ratings[bestMatchIndex]
                
                return { ratings: ratings, bestMatch: bestMatch, bestMatchIndex: bestMatchIndex };
            }
            
            function areArgsValid(mainString, targetStrings) {
                if (typeof mainString !== 'string') return false;
                if (!Array.isArray(targetStrings)) return false;
                if (!targetStrings.length) return false;
                if (targetStrings.find( function (s) { return typeof s !== 'string'})) return false;
                return true;
            }


            const all = document.querySelectorAll("*");
            
            let best = false;
            
            let matches = [];

            for(let i = 0; i < all.length; i++) {
                let a = all[i];
                let content = "";
                if(a.textContent) {
                    let THRESHOLD = 5;
                    if(a.textContent.length > text.length - THRESHOLD && a.textContent.length < text.length + THRESHOLD) {
                        content = a.textContent;
                    }
                }
                matches.push(content);
            }

            let match = findBestMatch(text, matches);
            let bestMatchIndex = match.bestMatchIndex;

            if(match.bestMatch.rating > 0.5) {
                return all[bestMatchIndex];
            }
            return false;
        }, text);
        if((await v.jsonValue()) === false) {
            if((Date.now() - this.startTime) > 2000) {
                console.log(" (Timeout) getElementsByText timed out".red);
                return false;
            }
            return await new Promise(r => {
                setTimeout(async () => {
                    r(await this.getElementByText(text, true));
                }, 200);
            });
        }
        return v;




        return await this.page.evaluateHandle((path) => {
            const p = `//*[text()=` + path + `]`;
            console.log(p);
            return document.evaluate(p, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        }, text);
    }

    async getElementByKeywords(keywords, skip) {
        if(!skip) this.startTime = Date.now();
        return await this.page.evaluateHandle((keywords) => {
            
            const all = document.querySelectorAll("*");
            
            let best = false;
            
            for(let i = 0; i < all.length; i++) {
                let a = all[i];
                if(!a || !a.textContent) continue;
                let text = a.textContent;
                if(text.length < 3) continue;

                let good = false;
                for(let j = 0; j < keywords.length; j++) {
                    let isPositive = keywords[j].includes("+");
                    let keyword = keywords[j].substr(1, keywords[j].length).replace(/'/g, "");

                    // check if text includes && is NOT positive

                    if(text.toLowerCase().includes(keyword.toLowerCase()) && !isPositive) {
                        good = false;
                        break;
                    }
                    if(text.toLowerCase().includes(keyword.toLowerCase()) && isPositive) {
                        good = true;
                    }
                }
                if(good && a.tagName !== "SCRIPT") {
                    best = a;
                }
            }

            return best;
        }, keywords);
    }
    
    async getCursor(x, y) {
        return await this.page.evaluate((a) => {
            const element = document.elementFromPoint(a[0], a[1]);
            if(element) {
                return getComputedStyle(element).cursor;
            } else {
                return "unset";
            }
        }, [x, y]);
    }

    async is (x, y) {
        return await this.page.evaluate(a => {
            const x = a[0];
            const y = a[1];
            
            /**
             * Get a unique CSS selector for a given DOM node
             * @param {HTMLElement} element - DOM node
             * @return {string} Unique CSS selector for the given DOM node
             */
             function ____getPath (element) {
                /**
                * Gets the element node that is a sibling to this element node (a direct child of the same parent) and is immediately
                * previous to it in the DOM tree. It's a fix for IE that does not support :nth-child pseudoselector
                * @param {HTMLElement} element - DOM node
                * @return {string} Unique CSS selector for the given DOM node
                */
                const previousElementSiblingPolyfill = (element) =>{
                    element = element.previousSibling;
                    // Loop through ignoring anything not an element
                    while(element !== null) {
                        if(element.nodeType === Node.ELEMENT_NODE) {
                            return element;
                        } else {
                            element = element.previousSibling;
                        }
                    }
                }
            
            
                /**
                 * Gets the element node that is a sibling to this element node (a direct child of the same parent) and is immediately
                 * previous to it in the DOM tree. It's a fix for IE that does not support :nth-child pseudoselector
                 * @param {HTMLElement} element - DOM node
                 * @return {string} Unique CSS selector for the given DOM node
                 */
                const previousElementSibling = (element) =>{
                    if(element.previousElementSibling !== 'undefined') {
                        return element.previousElementSibling
                    } else {
                        return previousElementSiblingPolyfill(element);
                    }
                }
            
                const ____getPath = (element) => {
                    // False on non-elements
                    if(!(element instanceof Element)) {
                        return false;
                    }
                
                    const path = [];
                    // If element is null it's the end of partial. It's a loose element which has, sofar, not been attached to a parent in the node tree.
                    while(element !== null && element.nodeType === Node.ELEMENT_NODE) {
                        let selector = element.nodeName;
                
                        if (element.id) {
                            selector += `#${element.id}`;
                        } else {
                            // Walk backwards until there is no previous sibling
                            let sibling = element;
                
                            // Will hold nodeName to join for adjacent selection
                            let siblingSelectors = [];
                
                            while(sibling !== null && sibling.nodeType === Node.ELEMENT_NODE) {
                                siblingSelectors.unshift(sibling.nodeName);
                                sibling = previousElementSibling(sibling);
                            }
                
                            // :first-child does not apply to HTML
                            if(siblingSelectors[0] !== 'HTML') {
                                siblingSelectors[0] = siblingSelectors[0] + ':first-child';
                            }
                
                            selector = siblingSelectors.join(' + ');
                        }
                        path.unshift(selector);
                        element = element.parentNode;
                    }
                    return path.join(' > ');
                }

                return ____getPath(element);
            }

            const element = document.elementFromPoint(x, y);

            let k = 0;
            const uniquePath = (e) => {
                let path = ____getPath(e);
                if(k < 4 && !path) {
                    k++;
                    return uniquePath(e.parentElement);
                }
                return path;
            }

            let path = uniquePath(element);
            return [path.includes("INPUT"), path.includes("SELECT")]
        }, [x, y]);
    }

    async selector(x, y, type, variableName, variableValue) {
        return await this.page.evaluate(a => {
            const x = a[0];
            const y = a[1];
            const type = a[2];
            const variableName = a[3];
            const variableValue = a[4];

            /**
             * Get a unique CSS selector for a given DOM node
             * @param {HTMLElement} element - DOM node
             * @return {string} Unique CSS selector for the given DOM node
             */
            function ____getPath (element) {
                /**
                * Gets the element node that is a sibling to this element node (a direct child of the same parent) and is immediately
                * previous to it in the DOM tree. It's a fix for IE that does not support :nth-child pseudoselector
                * @param {HTMLElement} element - DOM node
                * @return {string} Unique CSS selector for the given DOM node
                */
                const previousElementSiblingPolyfill = (element) =>{
                    element = element.previousSibling;
                    // Loop through ignoring anything not an element
                    while(element !== null) {
                        if(element.nodeType === Node.ELEMENT_NODE) {
                            return element;
                        } else {
                            element = element.previousSibling;
                        }
                    }
                }
            
            
                /**
                 * Gets the element node that is a sibling to this element node (a direct child of the same parent) and is immediately
                 * previous to it in the DOM tree. It's a fix for IE that does not support :nth-child pseudoselector
                 * @param {HTMLElement} element - DOM node
                 * @return {string} Unique CSS selector for the given DOM node
                 */
                const previousElementSibling = (element) =>{
                    if(element.previousElementSibling !== 'undefined') {
                        return element.previousElementSibling
                    } else {
                        return previousElementSiblingPolyfill(element);
                    }
                }
            
                const ____getPath = (element) => {
                    // False on non-elements
                    if(!(element instanceof Element)) {
                        return false;
                    }
                
                    const path = [];
                    // If element is null it's the end of partial. It's a loose element which has, sofar, not been attached to a parent in the node tree.
                    while(element !== null && element.nodeType === Node.ELEMENT_NODE) {
                        let selector = element.nodeName;
                
                        if (element.id) {
                            selector += `#${element.id}`;
                        } else {
                            // Walk backwards until there is no previous sibling
                            let sibling = element;
                
                            // Will hold nodeName to join for adjacent selection
                            let siblingSelectors = [];
                
                            while(sibling !== null && sibling.nodeType === Node.ELEMENT_NODE) {
                                siblingSelectors.unshift(sibling.nodeName);
                                sibling = previousElementSibling(sibling);
                            }
                
                            // :first-child does not apply to HTML
                            if(siblingSelectors[0] !== 'HTML') {
                                siblingSelectors[0] = siblingSelectors[0] + ':first-child';
                            }
                
                            selector = siblingSelectors.join(' + ');
                        }
                        path.unshift(selector);
                        element = element.parentNode;
                    }
                    return path.join(' > ');
                }

                return ____getPath(element);
            }


            if(type === "none") {
                // no X, Y, type specified: return element at cursor / last element
                const lastElement = (() => {
                    var node = document.getSelection().anchorNode;
                    return (node.nodeType == 3 ? node.parentNode : node);
                 })();
                 return "path:" + ____getPath(lastElement);
            }

            console.log("TYPE: " + type);

            const element = document.elementFromPoint(x, y);

            let k = 0;
            const uniquePath = (e) => {
                let path = ____getPath(e);
                if(k < 4 && !path) {
                    k++;
                    return uniquePath(e.parentElement);
                }
                return path;
            }



            if(type === "Full Path") {
                // Use normal full path

                // return unique full path
                return `path:${uniquePath(element)}`;

            } else if(type === "Text") {
                // Use element's text as our selector
                if(variableName) {
                    return `text:var?${variableName}`;
                }
                const text = element.textContent;

                return `text:'${text}'`;
            } else if(type === "Keywords") {
                // Use element's text as a keywords selector
                if(variableName) {
                    return `keywords:var?${variableName}`;
                }
                const text = element.textContent;
                return `keywords:+${text}`;
            } else {
                console.log(`Unknown event selector type: ${type}`.red);
            }
        }, [x, y, type, variableName, variableValue]);
    }

    async toInputValue (element) {
        let v = await this.page.evaluate((element) => {
            if(element.tagName !== "input") {
                let ni = element.querySelector("input");
                if(ni && ni.value) return ni.value;
                return "";
            } else {
                if(element && element.value) return element.value;
                return "";
            }
        }, element);
        if(!v) return "";
        return v;
    }

    async getSelect (elementHandle) {
        return await this.page.evaluate((element) => {
            
            /**
             * Get a unique CSS selector for a given DOM node
             * @param {HTMLElement} element - DOM node
             * @return {string} Unique CSS selector for the given DOM node
             */
             function ____getPath (element) {
                            /**
                            * Gets the element node that is a sibling to this element node (a direct child of the same parent) and is immediately
                            * previous to it in the DOM tree. It's a fix for IE that does not support :nth-child pseudoselector
                            * @param {HTMLElement} element - DOM node
                            * @return {string} Unique CSS selector for the given DOM node
                            */
                            const previousElementSiblingPolyfill = (element) =>{
                                element = element.previousSibling;
                                // Loop through ignoring anything not an element
                                while(element !== null) {
                                    if(element.nodeType === Node.ELEMENT_NODE) {
                                        return element;
                                    } else {
                                        element = element.previousSibling;
                                    }
                                }
                            }
                        
                        
                            /**
                             * Gets the element node that is a sibling to this element node (a direct child of the same parent) and is immediately
                             * previous to it in the DOM tree. It's a fix for IE that does not support :nth-child pseudoselector
                             * @param {HTMLElement} element - DOM node
                             * @return {string} Unique CSS selector for the given DOM node
                             */
                            const previousElementSibling = (element) =>{
                                if(element.previousElementSibling !== 'undefined') {
                                    return element.previousElementSibling
                                } else {
                                    return previousElementSiblingPolyfill(element);
                                }
                            }
                        
                            const ____getPath = (element) => {
                                // False on non-elements
                                if(!(element instanceof Element)) {
                                    return false;
                                }
                            
                                const path = [];
                                // If element is null it's the end of partial. It's a loose element which has, sofar, not been attached to a parent in the node tree.
                                while(element !== null && element.nodeType === Node.ELEMENT_NODE) {
                                    let selector = element.nodeName;
                            
                                    if (element.id) {
                                        selector += `#${element.id}`;
                                    } else {
                                        // Walk backwards until there is no previous sibling
                                        let sibling = element;
                            
                                        // Will hold nodeName to join for adjacent selection
                                        let siblingSelectors = [];
                            
                                        while(sibling !== null && sibling.nodeType === Node.ELEMENT_NODE) {
                                            siblingSelectors.unshift(sibling.nodeName);
                                            sibling = previousElementSibling(sibling);
                                        }
                            
                                        // :first-child does not apply to HTML
                                        if(siblingSelectors[0] !== 'HTML') {
                                            siblingSelectors[0] = siblingSelectors[0] + ':first-child';
                                        }
                            
                                        selector = siblingSelectors.join(' + ');
                                    }
                                    path.unshift(selector);
                                    element = element.parentNode;
                                }
                                return path.join(' > ');
                            }
            
                            return ____getPath(element);
            }
            
            
            if(element.nodeName === "SELECT") {


                const options = element.options;

                let formattedOptions = [];

                for(let i = 0; i < options.length; i++) {
                    const option = options[i];
                    formattedOptions.push({
                        text: option.text,
                        value: option.value
                    });
                }
                return {
                    options: formattedOptions,
                    rect: JSON.parse(JSON.stringify(element.getBoundingClientRect())),
                    selector: ____getPath(element)
                };
            }
            return false;
        }, elementHandle);
    }

    async scroll (x, y) {
        return await this.page.evaluate((a) => {
            window.scrollTo(a[0], a[1]);
        }, [x, y]);
    }

    async scrollBy (x, y) {
        return await this.page.evaluate((a) => {
            window.scrollBy(a[0], a[1]);
        }, [x, y]);
    }

    async awaitAjax () {
        return await this.page.evaluate(async () => {
            $._ajax = $.ajax;
            return await new Promise(r2 => {
                $.ajax = (...args) => {
                    let aj = $._ajax(...args);
                    if(window.recentClick && Math.abs((window.recentClick - Date.now())) < 500) {
                        window.xhrArgs = args;
                        delete window.xhrArgs[0].error;
                        $.ajax = $._ajax;
                        r2(args);
                    }
                    return aj;
                }
            });
        });
    }

    async sendAjax () {
        return await this.page.evaluate(() => {
            if(window.xhrArgs) {
                $.ajax(window.xhrArgs[0]);
                return true;
            } else {
                return false;
            }
        });
    }
}


class BrowserInstance {
    constructor() {
        this.ready = false;
        this.queueReady = true;
    }

    async launch (pptr, cloudKey) {
        this.browser = await pptr.cloud(cloudKey);
        this.page = await this.browser.newPage();
        this._page = new PageWrapper(this.page);

        await this._page.newDocument();
        this.client = await this.page.target().createCDPSession();
        await this.client.send("Animation.enable");
        await this.client.send("Animation.setPlaybackRate", {
            playbackRate: 999999
        });

        await this.page.on("load", () => {
            console.log(`Page loaded`.grey);
        });

        await this.page.on("console", (msg) => {
            for (let i = 0; i < msg.args().length; ++i)
                console.log(" (JS) ".green + msg.args()[i]);
        });


        // await this.page.setViewport({width: this.width , height: this.height, deviceScaleFactor: 1, isMobile: this.emulation === "iphone", hasTouch: this.emulation === "iphone"});


        // TODO: await this.page.goto(this.siteURL);

        const target = this.page.target();
        this.session = await target.createCDPSession();

        this.ready = true;
        this.fakeQueue = [];
    }

    async _recentClick () {
        await this._page._recentClick();
    }

    async goto (url) {
        await this._goto({url});
    }
    async _goto (q) {
        await this._queue("goto", q);
        console.log(`Going to `.gray + q.url.blue);
        await this.page.goto(q.url);
        await this._waitFor();
    }

    async wait (ms) {
        await this._wait({ms});
    }
    async _wait (q) {
        await this._queue("wait", q);
        await this.page.waitForTimeout(q.ms);
        await this._waitFor();
    }

    // TODO: Remove cursor lock on scroll

    async getCursor (x, y) {
        // return "pointer";
        if(!this.queueReady) return "wait";

        x = x * this.width;
        y = y * this.height;
        // console.log("X: " + x + " Y: " + y);
        try {
            let cursor =  await this._page.getCursor(x, y);
            return cursor;
        } catch (err) {
            return "wait";
        }
    
    }

    url () {
        return this.page.url();
    }

    handleError () {
        this.stopPlayback();

        if(!this.didError) {
            console.error("TODO: ERROR HAPPENED");
        }

        this.didError = true;
        setTimeout(() => {
            this.didError = false;
        }, 250);
    }

    _queue (type, data, doSkip) {
        if(typeof this.queue === "undefined") this.queue = [];

        return new Promise(resolve => {
            let b = type === "key";

            const fakeResolve = () => {

                let skip = false;
                if(doSkip) skip = true;

                if(typeof this.wasTyping === "undefined") this.wasTyping = false;

                if(type === "keyelement") {

                    // if we are a different selector && we are typing- we need to push what we have queued before its overriden
                    if(this.wasTyping) {
                        if((this.lastKeySelector && this.lastKeySelector !== data.selector) || data.key === "Tab") {
                            if(this.wasTypingNormal) {
                                this.fakeQueue.push({
                                    type: "keyarray",
                                    text: this.lastInputValue
                                });
                            } else {
                                this.fakeQueue.push({
                                    type: "keyelementarray",
                                    text: this.lastInputValue,
                                    selector: this.lastKeySelector
                                });
                            }
                        }
                    }

                    skip = true; // don't add
                    this.wasTyping = true;
                    this.wasTypingNormal = false;
                    
                    this.lastKeySelector = data.selector;

                    
                    // TODO: if key selector are different, set wasTyping false and push queue
                } else if(type === "key") {
                    skip = true;
                    this.wasTyping = true;
                    this.wasTypingNormal = true;
                } else {
                    if(this.wasTyping) {
                        if(this.wasTypingNormal) {
                            this.fakeQueue.push({
                                type: "keyarray",
                                text: this.lastInputValue
                            });
                        } else {
                            this.fakeQueue.push({
                                type: "keyelementarray",
                                text: this.lastInputValue,
                                selector: this.lastKeySelector
                            });
                        }
                    }
                    this.wasTyping = false;
                }

                if(!skip) {
                    this.fakeQueue.push({
                        type,
                        ...data
                    });
                }

                // add wait after click while recording
                if(this.recording && type === "click" && this.addClickWait) {
                    this.fakeQueue.push({
                        type: "wait",
                        ms: this.clickWait
                    });
                }

                let change = 0;
                if(this.lastTime) change = Date.now() - this.lastTime;
                this.lastTime = Date.now();
                console.log(`[${change}ms] `.white + "Processing ".gray + type.cyan + " with ".gray + (data ? JSON.stringify(data).white : "{ }".white) + " - `left in queue`: ".gray + this.queue.length.toString().cyan);
                resolve(); // allow command to execute
            }

            if(this.queueReady) {
                this.queueReady = false; // disable queue, we are using this one
                fakeResolve();
            } else {
                this.queue.push({ /*b,*/ resolve: fakeResolve });
            }
        });
    }

    // might be b: true-with _waitFor or no b: true but without waitFor,
    // if no _waitFor, it stops?


    _waitFor () {
        return new Promise(async r => {
            const pageCaughtUp = () => {
                // this.screenshot().then(base64 => {
                //     global.browserToolWindow.webContents.send("hasPreview", {
                //         uuid: this.taskID,
                //         base64: `data:image/png;base64, ${base64}`
                //     });
                // })

                let q = this.queue.shift();
                if(q) {
                    // console.log(q);
                    // if(!q.b) this.queueReady = false;

                    q.resolve(); // execute next command in queue
                } else {
                    this.queueReady = true; // nothing left in queue, we can use it again
                }
            }

            let i = 0;
            let interval = -1;
            const func = async () => {
                try {
                    await this._page.tryEvaluate();
                    if(interval !== -1) clearInterval(interval);
                    pageCaughtUp();
                    r();
                } catch (err) { 
                    if(i % 2 === 0) console.log(`${this.taskID} ...waiting for page to catch up`.bgRed);
                    i++;
                }
            }
            func();
            interval = setInterval(func, 200);
        });
    }

    async forward () {
        await this._queue("forward");
        await this.page.goForward();
        await this._waitFor();
    }

    async back () {
        await this._queue("back");
        await this.page.goBack();
        await this._waitFor();
    }

    // get x, y position from element
    async _getPosition (elementHandle) {
        return await this._page.getPosition(elementHandle);
    }

    _condenseSelector (path) {
        let splits = path.split(" > ");
        if(splits.length > 0) {
            let last = splits[splits.length - 1];
            if(last.includes("#")) {
                return last;
            }
        }
        return path;
    }

    async elementFromSelector (selector) {
        if(selector.includes(":")) {
            let splits = selector.split(":");
            const type = splits[0];
            let value = splits.splice(1, splits.length).join(":");
            if(value.includes(" > ")) {
                value = this._condenseSelector(value);
            }

            if(value.includes("var?")) {
                let variableName = value.split("var?")[1];
                value = await this._getVar(variableName);
            }

            if(type === "path") {
                // get JSHandle of DOM element
                console.log("Waiting for selector: " + selector);
                console.log(value);
                await this.page.waitForSelector(value, {
                    visible: true,
                    timeout: 2000,
                });

                const elementHandle = await this.page.$(value);
                // if(!elementHandle) return false;
                return elementHandle;
            } else if(type === "text") {
                // get JSHandle of DOM element
                return await this._page.getElementByText(value);
            } else if(type === "keywords") {
                let keywords = value.split(",");
                
                return await this._page.getElementByKeywords(keywords);
            } else {
                console.log(`Invalid type: ${selector}`.red);
            }
        } else {
            console.log(`Invalid selector: ${selector}`.red);
        }
    }

    _promptSelectorType () {
        return new Promise(r => {
            // TODO: Prompt selector type
        });
    }

    async selector (x, y, doPrompt, doMiddlePrompt) {
        let type = "none";
        let variableName = false;
        let variableValue = false;
        if(x && y) {
            x = x * this.width;
            y = y * this.height;

            // console.log("X: " + x + " Y: " + y);

            let is = await this._page.is(x, y);
            let isInput = is[0];
            let isSelect = is[1];

            if(!isInput && !isSelect && (doPrompt || doMiddlePrompt)) {
                // Prompt
                // TODO: Prompt selector type

                const resolveData = await new Promise(r => {
                    // TODO: Wait for selection
                });

                type = resolveData.type;
                variableName = resolveData.variableName;
                variableValue = resolveData.variableValue;
                console.log(`Event type selected: `.gray + type.toString().cyan);
            } else {
                type = "Full Path";
                console.log(`Event type defaulted: `.gray + type.toString().cyan);
            }
        
        }

        // console.log("Fetch element at " + x + " " + y);
        // await this._queue("_element", {x, y});
        console.log("STARTING FIND SELECTOR");
        let v = await this._page.selector(x, y, type, variableName, variableValue);
        console.log("FOUND SELECTOR");
        return v;
    }

    async waitForSelector (selector) {
        await this.page.waitForSelector(selector);
    }

    async _getVar(variable) {
        // TODO: Get variable value
        return await new Promise(r => {
            // TODO: wait for variable response
        });
    }

    async keyElementArray(selector, text) {
        let q = {
            selector,
            text
        }
        await this._queue("keyelementarray", q);

        await this._keyElementArray(q);

        await this._waitFor();
    }
    async _keyElementArray(q) {
        const elementHandle = await this.elementFromSelector(q.selector);

        if(q.text.includes("vars?")) {
            let variable = q.text.split("vars?")[1];
            q.text = await this._getVar(variable);
        }

        for(let i = 0; i < q.text.length; i++) {
            let k = q.text[i];
            await this.__keyElement(elementHandle, k);
        }
    
    }


    async startScreencast () {
        // console.log("Using quality 100".cyan);
        // await this.session.send("Page.stopScreencast");
        // return new Promise(r => {
        //     setTimeout(async () => {
        //         await this.session.send("Page.startScreencast", {
        //             format: "jpeg",
        //             quality: 100,
        //             // maxWidth: this.width,
        //             // maxHeight: this.height,
        //             everyNthFrame: 1,
        //         });
        //         r();
        //     }, 100);
        // })
    }

    async stopScreencast () {
        // console.log("Using quality 10.2".cyan);
        // await this.session.send("Page.stopScreencast");
        // return new Promise(r => {
        //     setTimeout(async () => {
        //         await this.session.send("Page.startScreencast", {
        //             format: "jpeg",
        //             quality: 5,
        //             // maxWidth: this.width,
        //             // maxHeight: this.height,
        //             everyNthFrame: 1,
        //         });
        //         r();
        //     }, 100);
        // })
    }

    // this needs to be [key, mode, element] since the arguments are directly serialized
    async keyElement (mode, key, selector) {
        await this._keyElement({ mode, key, selector });
    }
    async _keyElement (q) {
        await this._queue("keyelement", q);
        // await this.waitForSelector(q.selector);
        const element = await this.elementFromSelector(q.selector);
        await this.__keyElement(element, q.key);

        await this._waitFor();
    }
    async __keyElement (element, key) {
        await element.press(key);

        const value = await this._page.toInputValue(element);
        this.lastInputValue = value;
    }

    async _keyArray (q) {
        await this._queue("keyarray", q);
        for(let i = 0; i < q.text.length; i++) {
            let k = q.text[i];
            await this.page.keyboard.press(k);
        }
        await this._waitFor();
    }
    async key (key, mode, absolute) {
        if(absolute) {
            if(mode === "keyup") return;
            const selector = await this.selector();
            await this._keyElement({ mode, key, selector });
        } else {
            await this._key({key, mode}); 
        }
    }
    async _key (q) {
        await this._queue("key", q);
        await this.__key(q);
        await this._waitFor();
    }
    async __key (q) {
        if(q.mode === "keydown") {
            await this.page.keyboard.down(q.key);
        } else if(q.mode === "keyup") {
            await this.page.keyboard.up(q.key);
        }

        const selector = await this.selector(); // gets last selector
        const element = await this.elementFromSelector(selector);
        this.lastInputValue = await this._page.toInputValue(element);
    }

    async select (selector, value) {
        await this._select({selector, value});
    }
    async _select (q) {
        await this._queue("select", q);

        if(q.value.includes("var?")) {
            let variableName = q.value.split("var?")[1];
            let variableValue = await this._getVar(variableName);
            const element = await this.elementFromSelector(q.selector);
            const options = await this._page.toSelectOptions(element);
            console.log(JSON.stringify(options));
            let closest = options.find(o => o.text.includes(variableValue));
            if(!closest) {
                closest = options.find(o => o.text.toLowerCase().includes(variableValue.toLowerCase()));
            }
            if(!closest) {
                closest = options.find(o => o.text.toUpperCase().includes(variableValue.toUpperCase()));
            }
            q.value = closest.value;
        }
        if(q.selector.includes("path:")) {
            let splits = q.selector.split(":");
            q.selector = splits.splice(1, splits.length).join(":");
        }

        await this.page.select(q.selector, q.value);
        await this._waitFor();
    }

    _eventLog (name, data) {
        console.log(name.toString().bgRed);
        console.log(typeof data === "undefined" ? "undefined?" : data);
    }


    async _retry (func, q) {
        console.log("(Timeout) Page reloading, event timed out".red);
        await this.page.reload({
            waitUntil: "domcontentloaded"
        });
        await func(q, true);
        await this._waitFor();
    }

    async clickElement(selector) {
        await this._clickElement({ selector });
    }
    async _clickElement (q, skip) {
        if(!skip) await this._queue("clickelement", q);
        this._recentClick();
        this.lastClickedSelector = q.selector;
        const element = await this.elementFromSelector(q.selector);

        const box = await element.boundingBox();
        let ripple = {
            x: box.x / this.width,
            y: box.y / this.height,
            width: box.width / this.width,
            height: box.height / this.height,
            uuid: this.taskID
        };
        this.lastRipple = ripple;
        
        // TODO: apply ripple effect?

        await element.click();
        // await this.page.click(q.selector);
        if(!skip) await this._waitFor();
    }

    // user originated events
    async click (x, y, mode, absolute, rightClick, middleClick) {
        if(absolute) {
            if(mode === "mouseup") {
                if(this.disableNextMouseUp) {
                    this.disableNextMouseUp = false;
                }
                return;
            };

            const selector = await this.selector(x, y, rightClick, middleClick);
            console.log("MiddleClick: " + middleClick);
            console.log("Selector Includes: " + selector.includes("INPUT"));
            console.log("Selector: " + selector);
               
            if(middleClick && selector.includes("INPUT")) {
                
                // TODO: Prompt variable
                let v = await new Promise(r => {
                    // TODO: Wait for variable selection
                });
                if(v) {
                    console.log("Variable selected: ".gray + v.toString().cyan);
                    await this.keyElementArray(selector, `vars?${v}`);
                    return;
                }
            } else if(selector.includes("SELECT")) {
                const element = await this.elementFromSelector(selector);
                const select = await this._page.getSelect(element);

                if(select && select !== false) {
                    if(middleClick) {
                        // TODO: Prompt variable
                        let v = await new Promise(r => {
                            // TODO: Wait for variable selection
                        });
                        if(v) {
                            console.log("Variable selected: ".gray + v.toString().cyan);
                            await this.select(selector, `var?${v}`)
                        }
                    } else {
                        this.disableNextMouseUp = true;
        
                        select["pageWidth"] = this.width;
                        select["pageHeight"] = this.height;
                        select["uuid"] = this.taskID;
                        // TODO: Spawn select?
                    }
                    return;
                }
            }
            await this._clickElement({ mode, selector });
        } else {
            if(mode === "mouseup") {
                if(this.disableNextMouseUp) {
                    this.disableNextMouseUp = false;
                }
                return;
            };

            console.log("CL: " + (this.queue ? this.queue.length : "0?"));
            const selector = await this.selector(x, y, false, false);
            
            if(selector.includes("SELECT")) {
                const element = await this.elementFromSelector(selector);
                const select = await this._page.getSelect(element);

                if(select && select !== false) {
                    this.disableNextMouseUp = true;
    
                    select["pageWidth"] = this.width;
                    select["pageHeight"] = this.height;
                    select["uuid"] = this.taskID;
                    // TODO: Spawn select?
                    return;
                }
            }
        
            await this._click({x, y, mode});
        }
    }
    async _click (q) {
        console.log(this.queue ? this.queue.length : "0?");
        let x = q.x;
        let y = q.y;
        let type = q.mode;


        await this._queue("click", q);

        this._recentClick();


        const selector = await this.selector(x, y, false);
        const element = await this.elementFromSelector(selector);
        // if(!element) {
        //     await this._retry(this._click, q);
        //     return;
        // }
        const box = await element.boundingBox();

        let ripple = {
            x: box.x / this.width,
            y: box.y / this.height,
            width: box.width / this.width,
            height: box.height / this.height,
            uuid: this.taskID
        };
        this.lastRipple = ripple;
        // TODO: Ripple effect?

        x = x * this.width;
        y = y * this.height;


        await this.page.mouse.click(x, y);
        await this._waitFor();
    }

    async playback (filePath) {
        return new Promise(async resolve => {
            const fs = require("fs");
            console.log("(Playback) Reading file: ".gray + filePath.cyan);
            const queue = JSON.parse(fs.readFileSync(filePath, "utf8"));
            for(let i = 0; i < queue.length; i++) {
                const q = queue[i];
                const type = q.type;
                delete q.type;

                let func;   

                switch (type) {
                    case "scroll": func = await this._scroll(q); break;
                    case "select": func = await this._select(q); break;
                    case "goto":  func = await this._goto(q); break;
                    case "wait": func = await this._wait(q); break;
                    case "forward": func = await this.forward(); break;
                    case "back": func = await this.back(); break;
                    case "click": func = await this._click(q); break;
                    case "key": func = await this._key(q); break;
                    case "keyarray": func = await this._keyArray(q); break;
                    case "keyelement": func = await this._keyElement(q); break;
                    case "keyelementarray": func = await this._keyElementArray(q); break;
                    case "clickelement": func = await this._clickElement(q); break;
                }
                
                // console.log(q);
                // if(func) {
                //     await func(q);
                // } else {
                //     console.log("Unknown type:", type);
                // }
            }


            let j = 0;
            let threshold = 2;
            this.resolve = resolve;
            this.interval = setInterval(() => {
                if(this.queue.length === 0) j++;

                if(j > threshold) {
                    this.fakeQueue = [];
                    resolve();

                    clearInterval(this.interval);
                }
            }, 500);
        });
    }

    async stopPlayback () {
        this.queue = [];
        this.fakeQueue = [];
        this.queueReady = true;
        if(this.interval) {
            this.resolve();
            clearInterval(this.interval);
            this.interval = undefined;
        } else {
            // TODO: Playback complete?
        }
    }

    async startRecording () {
        this.recording = true;
        this.fakeQueue = [];
    }

    async stopRecording (filePath) {
        this.recording = false;
        if(filePath) {
            let fakeQueue = JSON.parse(JSON.stringify(this.fakeQueue));
            this.fakeQueue = [];

            let parsedQueue = [];
            let word = [];
            let selector = "";
            

            for(let i = 0; i < fakeQueue.length; i++) {
                let o = fakeQueue[i];
                
                if(o.type === "keyelement") {
                    if(o.selector === selector || selector === "") {

                    }
                    

                }

            }

            const fs = require("fs");
            if(!fs.existsSync("./records")) fs.mkdirSync("./records");
            fs.writeFileSync(filePath, JSON.stringify(fakeQueue));
            return fakeQueue;
        }
        this.fakeQueue = [];
    }


    async scrollSync (x, y, origin) {
        let q = { x, y }

        await this._queue("scrollSync", q);

        if(this.taskID !== origin) {
            await this._page.scrollBy(x, y);
        }

        await this._waitFor();
    }



    async scroll (x, y) {
        await this._scroll({x, y});
    }
    async _scroll (q) {
        let x = q.x;
        let y = q.y;

        await this._queue("scroll", q);
        this.page.mouse.wheel({
            deltaX: x,
            deltaY: y,
        });
        // await this._page.scroll(x, y);
        await this._waitFor();
    }

    async screenshot () {
        return await this.page.screenshot({
            // quality: 100,
            type: "jpeg",
            quality: 20,
            encoding: "base64"
        });
    }

    async cleanup () {
        await this.browser.close();
    }
}

const img = document.querySelector("img");

// (async () => {
//     const instance = new BrowserInstance();
//     await instance.launch(puppeteer, `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1lIjoxNjU0NDA3OTkwNjgyLCJpYXQiOjE2NTQ0MDc5OTB9.9ND29_73IJ2a9QxVpzbMfvWtWO3Qy2UuaU4asPmRPMc`);

//     const client = instance.client;

//     // on screencast
//     client.on("Page.screencastFrame", async (e) => {
//         img.src = "data:image/jpeg;base64," + e.data;
//         await client.send("Page.screencastFrameAck", {
//             sessionId: e.sessionId,
//         });
//     });

//     // start screencast
//     await client.send("Page.startScreencast", {
//         format: "jpeg",
//         quality: 20
//     });
//     console.log("Going to!");
//     await instance.page.goto("https://google.com");
//     // move mouse to 0 0
//     await instance.page.mouse.move(0, 0);
// })();