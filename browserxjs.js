const cloudWS = "ws://35.208.194.25:8060"
import { sign } from './node_modules/jsonwebtoken-esm/dist/index.js';
puppeteer.cloud = async (key, options) => {
    if(!key) throw new Error("[browserx-cloud] No key provided, call browserx.authorizeCloud(key) first");
    const token = sign({
        time: Date.now()
    }, key);

    return await puppeteer.connect({
        browserWSEndpoint: `${cloudWS}?token=${token}`,
        // browserWSEndpoint: `${cloudWS}?token=${key}`,
        ignoreHTTPSErrors: true,
        ...options
    });
}