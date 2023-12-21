function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    filters: {
      images: document.querySelector("#images").checked,
      videos: document.querySelector("#videos").checked
    },
  });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#images").checked = result.filters.images || false;
    document.querySelector("#videos").checked = result.filters.videos || false;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("filters");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#images").addEventListener("change", saveOptions);
document.querySelector("#videos").addEventListener("change", saveOptions);

browser.tabs
  .executeScript({ file: "/content_scripts/filter_twitter.js" })
  .then(listenForClicks)
  .catch(reportExecuteScriptError);