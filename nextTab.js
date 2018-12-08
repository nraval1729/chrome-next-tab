const CREATE_NEXT_TAB = 'create-next-tab';

chrome.commands.onCommand.addListener(function (command) {
    if (command === CREATE_NEXT_TAB) {
        createNextTab();
    }
});

function createNextTab() {
    // https://developer.chrome.com/extensions/tabs#method-query
    chrome.tabs.query(computeTabQueryInfo(), tabs => {
        const currentTab = getCurrentTab(tabs);
        createNewTab(computeNextTabProperties(currentTab));
    })
}

function computeTabQueryInfo() {
    return {
        active: true,
        currentWindow: true
    }
}

function getCurrentTab(tabs) {
    return tabs[0];
}

function computeNextTabProperties(currentTab) {
    const nextTabIndex = currentTab.index + 1;
    return {index: nextTabIndex};
}

function createNewTab(createProperties) {
    // https://developer.chrome.com/extensions/tabs#method-create
    chrome.tabs.create(createProperties);
}