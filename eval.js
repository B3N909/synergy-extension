// const puppeteer = require("puppeteer");
//
// const Compiler = require("./Compiler.js");
// const compiler = new Compiler();
//
// const recording = [
//     {
//         "name": "header",
//         "url": "https://www.supremenewyork.com/"
//     },
//     {
//         "name": "page.click",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > NAV:first-child > UL:first-child > LI:first-child + LI + LI + LI > A:first-child > SPAN:first-child"
//         ]
//     },
//     {
//         "name": "page.click",
//         "args": [
//             "HTML > HEAD:first-child + BODY > FOOTER#nav > DIV:first-child + NAV > UL#nav-store > LI:first-child > A:first-child"
//         ]
//     },
//     {
//         "name": "page.click",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > H2:first-child + NAV > UL#nav-categories > LI:first-child + LI + LI + LI + LI + LI + LI + LI + LI + LI + LI + LI > A:first-child"
//         ]
//     },
//     {
//         "name": "page.click",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > UL#container > LI:first-child + LI + LI + LI > DIV:first-child > A:first-child > IMG:first-child"
//         ]
//     },
//     {
//         "name": "page.click",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > DIV#container > DIV#details > DIV#cctrl > FORM#cart-add > FIELDSET#add-remove-buttons > LEGEND:first-child + INPUT"
//         ]
//     },
//     {
//         "name": "page.click",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > DIV#container > DIV:first-child > DIV#cart > UL:first-child + A + A"
//         ]
//     },
//     {
//         "name": "page.click",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > DIV#content > FORM#checkout_form > DIV#cart-body > DIV#cart-address > H2:first-child + FIELDSET > LEGEND:first-child + P + DIV > INPUT#order_billing_name"
//         ]
//     },
//     {
//         "name": "page.click",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > DIV#content > FORM#checkout_form > DIV#cart-body > DIV#cart-address > H2:first-child + FIELDSET > LEGEND:first-child + P + DIV + DIV > INPUT#order_email"
//         ]
//     },
//     {
//         "name": "page.type",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > DIV#content > FORM#checkout_form > DIV#cart-body > DIV#cart-address > H2:first-child + FIELDSET > LEGEND:first-child + P + DIV > INPUT#order_billing_name",
//             "First Name"
//         ]
//     },
//     {
//         "name": "page.click",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > DIV#content > FORM#checkout_form > DIV#cart-body > DIV#cart-cc > H2:first-child + FIELDSET > DIV#card_details > DIV#vvr > DIV:first-child > SELECT#credit_card_month"
//         ]
//     },
//     {
//         "name": "page.input",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > DIV#content > FORM#checkout_form > DIV#cart-body > DIV#cart-address > H2:first-child + FIELDSET > LEGEND:first-child + P + DIV + DIV > INPUT#order_email",
//             "email@gmail"
//         ]
//     },
//     {
//         "name": "page.select",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > DIV#content > FORM#checkout_form > DIV#cart-body > DIV#cart-cc > H2:first-child + FIELDSET > DIV#card_details > DIV#vvr > DIV:first-child > SELECT#credit_card_month",
//             "07"
//         ]
//     },
//     {
//         "name": "page.click",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > DIV#content > FORM#checkout_form > DIV#cart-body > DIV#cart-cc > H2:first-child + FIELDSET > DIV#card_details > DIV#vvr > DIV:first-child > SELECT#credit_card_year"
//         ]
//     },
//     {
//         "name": "page.select",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > DIV#content > FORM#checkout_form > DIV#cart-body > DIV#cart-cc > H2:first-child + FIELDSET > DIV#card_details > DIV#vvr > DIV:first-child > SELECT#credit_card_year",
//             "2028"
//         ]
//     },
//     {
//         "name": "page.click",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > DIV#content > FORM#checkout_form > DIV#cart-body > DIV#cart-cc > H2:first-child + FIELDSET > DIV#card_details > DIV#vvr > DIV:first-child + DIV > INPUT#credit_card_verification_value"
//         ]
//     },
//     {
//         "name": "page.type",
//         "args": [
//             "HTML > HEAD:first-child + BODY > DIV#wrap > DIV#content > FORM#checkout_form > DIV#cart-body > DIV#cart-cc > H2:first-child + FIELDSET > DIV#card_details > DIV#vvr > DIV:first-child + DIV > INPUT#credit_card_verification_value",
//             "555"
//         ]
//     }
// ];
//
// (async () => {
//
//     const browser = await puppeteer.launch({
//         headless: false
//     });
//     const page = await browser.newPage();
//
//     // console.log(compiler.compile(recording, true));
//     eval(compiler.compile(recording, true));
// })();