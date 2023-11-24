function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    images: document.querySelector("#images").checked,
  });
  console.log("saving...");
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#images").checked = result.images || false;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("images");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("#images").addEventListener("change", saveOptions);
