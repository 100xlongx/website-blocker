document.addEventListener("DOMContentLoaded", function () {
  const blockButton = document.getElementById("blockButton");
  const websiteInput = document.getElementById("website");
  const blockedSitesList = document.getElementById("blockedSitesList");

  // Function to render the list of blocked sites
  function renderBlockedSites() {
    const sites = JSON.parse(localStorage.getItem("blockedSites") || "[]");
    blockedSitesList.innerHTML = ""; // Clear current list

    sites.forEach((site, index) => {
      const siteItem = document.createElement("div");
      siteItem.className = "site-item";
      siteItem.textContent = site;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.onclick = function () {
        removeSite(index);
      };

      siteItem.appendChild(removeButton);
      blockedSitesList.appendChild(siteItem);
    });
  }

  // Function to add a new site to the block list
  function addSite() {
    const site = websiteInput.value.trim();
    if (site) {
      const sites = JSON.parse(localStorage.getItem("blockedSites") || "[]");
      if (!sites.includes(site)) {
        sites.push(site);
        localStorage.setItem("blockedSites", JSON.stringify(sites));
        renderBlockedSites(); // Update the list display
        websiteInput.value = ""; // Clear input field
      }
    }
  }

  // Function to remove a site from the block list
  function removeSite(index) {
    const sites = JSON.parse(localStorage.getItem("blockedSites") || "[]");
    sites.splice(index, 1); // Remove the site at the specified index
    localStorage.setItem("blockedSites", JSON.stringify(sites));
    renderBlockedSites(); // Update the list display
  }

  blockButton.addEventListener("click", addSite);
  renderBlockedSites(); // Initial rendering of the blocked sites
});
