document.addEventListener("DOMContentLoaded", function () {
  const blockButton = document.getElementById("blockButton");
  const websiteInput = document.getElementById("website");
  const blockedSitesList = document.getElementById("blockedSitesList");

  // Function to add a site to the block list
  function addSite() {
    const site = websiteInput.value.trim();
    if (!site) return; // Do nothing if the input is empty

    // Retrieve the current list, add the new site, and save it back
    chrome.storage.local.get(["blockedSites"], function (result) {
      const sites = result.blockedSites || [];
      if (!sites.includes(site)) {
        // Avoid duplicating sites
        sites.push(site);
        chrome.storage.local.set({ blockedSites: sites }, function () {
          renderBlockedSites();
          websiteInput.value = ""; // Clear the input field after adding
        });
      }
    });
  }

  // Function to remove a site from the block list
  function removeSite(siteToRemove) {
    chrome.storage.local.get(["blockedSites"], function (result) {
      const sites = result.blockedSites || [];
      const filteredSites = sites.filter((site) => site !== siteToRemove);
      chrome.storage.local.set(
        { blockedSites: filteredSites },
        renderBlockedSites,
      );
    });
  }

  // Function to render the list of blocked sites in the popup
  function renderBlockedSites() {
    chrome.storage.local.get(["blockedSites"], function (result) {
      const sites = result.blockedSites || [];
      blockedSitesList.innerHTML = ""; // Clear the list before rendering

      sites.forEach((site) => {
        const siteItem = document.createElement("div");
        siteItem.textContent = site;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", function () {
          removeSite(site);
        });

        siteItem.appendChild(removeButton);
        blockedSitesList.appendChild(siteItem);
      });
    });
  }

  blockButton.addEventListener("click", addSite);
  renderBlockedSites(); // Initial rendering of the block list
});
