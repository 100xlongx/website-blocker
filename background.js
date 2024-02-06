chrome.declarativeNetRequest.onRuleMatched.removeRules(undefined, () => {
  chrome.declarativeNetRequest.onRuleMatched.addRules([
    {
      id: 1,
      condition: {
        urlFilter: "||reddit.com^",
        resourceTypes: ["main_frame"],
      },
      action: {
        type: "block",
      },
    },
  ]);
});
