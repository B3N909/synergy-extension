console.log("Started!");

const recordBtn = $("#record");
const playbackBtn = $("#playback");
const openBtn = $("#open");

const errorDiv = $("#error");
const bodyDiv = $("#body");

let isRecording = false;

bodyDiv.hide();

recordBtn.click(() => {
    isRecording = !isRecording;
    if(isRecording) {
        console.log("Started recording!");

        recordBtn.addClass("recording");
        recordBtn.html("Stop Recording");

        // send message to content script
        chrome.tabs.query({}, (tabs) => {
            for(let i = 0; i < tabs.length; i++) {
                chrome.tabs.sendMessage(tabs[i].id, {action: "startRecording"});
            }
        });

        // get active tab
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const tab = tabs[0];
            chrome.runtime.sendMessage({action: "startRecording", url: tab.url});
        });
    } else {
        console.log("Stopped recording!");

        recordBtn.removeClass("recording");
        recordBtn.html("Start Recording");

        // send message to content script
        chrome.tabs.query({}, (tabs) => {
            for(let i = 0; i < tabs.length; i++) {
                chrome.tabs.sendMessage(tabs[i].id, {action: "stopRecording"});
            }
        });
        // send message to background.js
        chrome.runtime.sendMessage({action: "stopRecording"});
    }
});

openBtn.click(() => {
    // send openPreview message
    chrome.runtime.sendMessage({action: "openPreview"});
});

playbackBtn.click(() => {
    fsOpenFile().then(events => {
        playbackEvents(events);
    });
});

const playbackEvents = async (events) => {
    
    if(events[0].name !== "header") {
        alert("Invalid recording file! The file you are using was most likely created using an outdated version...");
        return;
    }

    // const rootURL = events[0].url;
    // const tab = await new Promise(r => {
    //     chrome.tabs.create({
    //         url: rootURL,
    //         active: false
    //     }, (tab) => {
    //         r(tab);
    //     });
    // });

    // // remove first index from events array
    // events.shift();
    
    // // send event to background.js
    chrome.runtime.sendMessage({
        action: "playback",
        events
    });
    

    // wait for tab to load
    // await new Promise(r => {
    //     chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //         if(tabId === tab.id && changeInfo.status === "complete") {
    //             r();
    //         }
    //     });
    // });

    // // make tab active
    // chrome.tabs.update(tab.id, {active: true});
}

const fsSaveFile = (data) => {
    const url = window.webkitURL || window.URL || window.mozURL || window.msURL;
    // data is of type json
    const a = document.createElement("a");
    a.download = "recording.json";

    a.href = url.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {type: "text/plain"}));
    a.click();
};

const fsOpenFile = () => {
    return new Promise(r => {
        const a = document.createElement("input");
        a.type = "file";
        a.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                const json = JSON.parse(contents);
                r(json);
            };
            reader.readAsText(file);
        };
        a.click();
    });
}

chrome.runtime.sendMessage({
    action: "isRecording"
}, (response) => {
    if(response.isRecording) {
        recordBtn.text("Stop Recording");
        isRecording = true;
    } else {
        recordBtn.text("Start Recording");
        isRecording = false;
    }
});

// on message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.action === "saveRecord") {
        const events = request.events;
        console.log("Events recorded: " + events.length);
        // open save file dialog
        fsSaveFile(events);
    }


    // if(response.action === "checkConnectionResponse") {
    //     const data = response.action;
    //     if(data) {
    //         errorDiv.hide();
    //         bodyDiv.show();
    //     } else {
    //         errorDiv.show();
    //         bodyDiv.hide();
    //     }
    // }

});

// send checkConnection message to background.js and wait for response

const attemptConnection = () => {
    chrome.runtime.sendMessage({
        action: "attemptConnection"
    });
}

const waitForConnection = () => {
    return new Promise(async r => {
        chrome.runtime.sendMessage({action: "checkConnection"}, (response) => {
            console.log(response);
            const isConnected = response.isConnected;
            const hasAttemptedConnection = response.hasAttemptedConnection;
        
            console.log("is connected - " + isConnected);
            console.log("has attempted connection - " + hasAttemptedConnection);

            if(!hasAttemptedConnection) {
                waitForConnection().then(r);
                return;
            }


            // TODO: TEST HERE
            errorDiv.hide();
            bodyDiv.show();
            r(true);
            
            if(isConnected) {
                errorDiv.hide();
                bodyDiv.show();
                r(true);
            } else {
                errorDiv.text("Connection failed");
                errorDiv.show();
                bodyDiv.hide();
                r(false);
            }   
        });
    })
}

bodyDiv.hide();
errorDiv.text("Attempting connection...");


const checkPreview = async () => {
    const tabs = await new Promise(r => {
        chrome.tabs.query({
            title: "Remote Dashboard"
        }, r);
    });
    if(tabs.length > 0) {
        // make tab active
        chrome.tabs.update(tabs[0].id, {
            active: true
        });
        return true;
    }
    return false;
}

attemptConnection();
waitForConnection().then((connected) => {
    if(connected) console.log("FAILED CONNECTED");
    else          console.log("CONNECTION FAILED");
});