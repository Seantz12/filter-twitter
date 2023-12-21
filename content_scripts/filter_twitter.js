function hasImage(element) {
  var imageElement = element.querySelector('[aria-label="Image"]');
  return imageElement != null;
}

function hasVideo(element) { // Seems to also catch gifs
  var videoElement = element.querySelector('[data-testid="videoPlayer"]')
  return videoElement != null;
}

function isTweet(element) { // Checks if tweet or not actually a tweet
  var showElement = element.querySelector('article');
  return showElement != null;
}
// If we want a separate gif filter, look for videoPlayer with span that has GIF text in it

function checkNode(addedNode, filterFunctions) {
  setTimeout(() => {
    if(filterFunctions.length == 0 || !isTweet(addedNode)) return; // no filters
    var conditionMet = false;
    // this is a dumb name, im bad at english, filter function implies if it meets we filter, but i have the opposite
    for(filterFunction of filterFunctions) {
      if(filterFunction(addedNode)) {
        conditionMet = true;
        break;
      }
    }
    if(!conditionMet) {
        addedNode.style.display = "none";
    }
  }, 500);
}

function filterTimeline(timeline, filterFunctions) {  // used for initial load (or manual trigger if needed at any point?)
  for(const child of timeline.children) {
    checkNode(child, filterFunctions)
  }
}

function onError(error) { // Probably called when no filters set which is fine
  console.log(`Error: ${error}`);
}

function onGot(settings) {
  var filters = settings.filters;
  var filterFunctions = [];
  if(filters.images) {
    filterFunctions.push(hasImage);
  }
  if(filters.videos) {
    filterFunctions.push(hasVideo);
  }
  main(filterFunctions);
}


function main(filterFunctions) {
  const timelineObserver = new MutationObserver(function (mutations, mutationInstance) {
    var timeline = document.querySelector('[aria-label="Timeline: Your Home Timeline"] > div');
    if(timeline && timeline.childElementCount > 1) {
      filterTimeline(timeline, filterFunctions);
      attachTimelineListener(timeline, filterFunctions);
      mutationInstance.disconnect();
    }
  });

  timelineObserver.observe(document, {
      childList: true,
      subtree:   true
  });
}


function attachTimelineListener(timeline, filterFunctions) {
  var observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(addedNode => {
        checkNode(addedNode, filterFunctions);
      });
    });
  });

  var config = { childList: true };
  observer.observe(timeline, config);
}

browser.runtime.onMessage.addListener((request) => {
  const getting = browser.storage.sync.get("filters");
  getting.then(onGot, onError);
});