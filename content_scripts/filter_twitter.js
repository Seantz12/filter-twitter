function checkNode(addedNode) {
    setTimeout(() => {
      console.log("you called?");
      var imageElement = addedNode.querySelector('[aria-label="Image"]');
      if(imageElement == null) {
          addedNode.style.display = "none";
          console.log("DELETE IT");
      }
    }, 1000);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
  if(item.images) {
    console.log("ohhhh we filtering images")
    var config = {
      childList: true,
    };

    var observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(addedNode => {
          checkNode(addedNode);
        });
      });
    });
    var timeline = document.querySelector('[aria-label="Timeline: Your Home Timeline"]');
    observer.observe(timeline.firstChild, config);
  } else {
    console.log("no");
  }
}

const getting = browser.storage.sync.get("images");
getting.then(onGot, onError);
