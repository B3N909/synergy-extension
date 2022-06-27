const jimp = require("jimp");
const request = require("request");
const localCache = new Map();

const imageToBase64 = (url, timeout) => {
    return new Promise(async resolve => {
        let v = await new Promise(r => {
            if(localCache.has(url)) {
                r(localCache.get(url));
            }

            request({
                url: url,
                timeout: 1000,
                encoding: null
            }, async (err, resp, body) => {
                if (err || (resp && resp.statusCode !== 200)) {
                    r(false);
                } else {
                    // console.log("Raw length: " + body.toString("base64").length);
                    try {
                        jimp.read(body).then(image => {
                            image.resize(256, 256).getBase64(jimp.MIME_PNG, (err, base64) => {
                                if(err) r(false);
                                const compressedData = base64.split("base64,")[1];
                                localCache.set(url, compressedData);
                                r(compressedData);
                                // console.log("Compression length: " + compressedData.length);
                            });
                        });
                    } catch (err) {
                        r(false);
                    }
                }
            });
        });
        if(!v) {
            if(!timeout) timeout = 250;
            else timeout = timeout * 2;
            console.log("Failed fetching image data, retrying in " + timeout + "ms");
            setTimeout(async () => {
                resolve(await imageToBase64(url, timeout));
            }, timeout);
        } else {
            resolve(v);
        }
    });
}

imageToBase64("https://cdn.shopify.com/s/files/1/0274/7469/0125/products/JBDH7138-5061.jpg?v=1654678689").then(v => {
    console.log(v);
});