# filter-twitter
An automatic filtering of posts that you're not interested in

So far all it does is filter posts without images, because I'm not browsing internet for text, I'm browsing it for art.

May look into doing things like

* Only images! Aka by deleting even the text captions
* If we're super cool, maybe even classification of images!

Problems:

* Pretty stuttery, I'm assuming because it's calling the function each time timeline gets updated on the entire thing
* * Maybe there's some way to only call on new elements instead of the entire timeline