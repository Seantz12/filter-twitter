function deleteNonImage() {
    var timeline = document.querySelector('[aria-label="Timeline: Your Home Timeline"]');
    console.log("you called?");
    var cells = timeline.querySelectorAll('[data-testid="cellInnerDiv"]');
    cells.forEach((currentElement) => {
        var imageElement = currentElement.querySelector('[aria-label="Image"]')
        if(imageElement == null) {
            currentElement.style.display = "none";
            console.log("DELETE IT");
        }
    });
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

    var observer = new MutationObserver(deleteNonImage);
    var timeline = document.querySelector('[aria-label="Timeline: Your Home Timeline"]');
    deleteNonImage();
    console.log(timeline);
    observer.observe(timeline.firstChild, config);
  } else {
    console.log("no");
  }
}

const getting = browser.storage.sync.get("images");
getting.then(onGot, onError);
