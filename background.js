// Function to dynamically update the webRequest listener for blocking sites
function updateBlockedSites() {
  // First, remove any existing listener to avoid duplicate blocking
  chrome.webRequest.onBeforeRequest.removeListener(blockRequest);

  // Fetch the updated list of blocked sites from chrome.storage
  chrome.storage.local.get(["blockedSites"], function (result) {
    const blockedSites = result.blockedSites || [];
    // Convert the list of sites into a pattern that matches URLs
    const blockedUrls = blockedSites.map((site) => `*://*.${site}/*`);

    // If there are URLs to block, re-add the webRequest listener with the new list
    if (blockedUrls.length > 0) {
      chrome.webRequest.onBeforeRequest.addListener(
        blockRequest,
        { urls: blockedUrls, types: ["main_frame"] },
        ["blocking"],
      );
    }
  });
}

// The blocking function to be used as a callback in the webRequest listener
function blockRequest(details) {
  return { cancel: true };
}

// Listen for changes in the list of blocked sites in chrome.storage
chrome.storage.onChanged.addListener(function (changes, area) {
  if (changes.blockedSites) {
    updateBlockedSites(); // Update the list of blocked sites if there's a change
  }
});

// Initialize the webRequest listener with the current list of blocked sites
updateBlockedSites();
