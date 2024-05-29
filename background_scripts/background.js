browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (tab.status == "complete" && tab.active) { 
            browser.tabs.sendMessage(tab.id, { message: "loaded!" });
        // Perform you task after page loaded completely 
        }
    },
    { urls: ["*://x.com/home"] },
);