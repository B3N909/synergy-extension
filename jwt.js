const jwt = require("jsonwebtoken");
const key = jwt.sign({
    time: Date.now()
}, "ca982417-654e-48cc-bc96-6c17da20e457");
console.log(key);