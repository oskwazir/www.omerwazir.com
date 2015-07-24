---
title: How we built TwitBeat in 4 hours
tags: ['js','react']
lead: "For the Cactus Hack Hackathon my team built a very simple app called TwitBeat. I want to explain to you how we went about building the app and what I learned from the process."
date: 2015-07-23 18:30:40
---

[Cactus Hack](http://cactushack.com/) took place in Tucson and there was a pretty good turnout. People started showing up around 9:00am, sometime between 10:00am or 10:30am the hosts started a presentation explaining the rules and awards of the hackathon. Teams had to build something that was a web-app, no console or desktop apps. And there had to be a cactus or cacti somewhere in the app. After the presentation people broke into self-made groups of 4 or 5 and started to brainstorm ideas. We were only allowed to code between 1:00pm and 5:00pm so there was quite a bit of time to plan, and eat. I partnered with my friends [Charlie](https://github.com/bringking) and [Clay](https://github.com/theshortcut).

##What should we  build?

I had no ideas at all. Charlie had an idea of a heartbeat app, something that displayed a line like you see in an [ECG](https://en.wikipedia.org/wiki/Electrocardiography) chart or [Oscilloscope](https://en.wikipedia.org/wiki/Oscilloscope).Charlie thought we could hook into the [Github API](https://developer.github.com/v3/) and monitor the rate of stars on repos or something. There was some concern with rate limiting on the API so we turned towards Twitter. I’m not actually sure if the rate limiting would have been a problem, need to look into that later. There was concern again because the [Twitter REST API](https://dev.twitter.com/rest/public) has a rate limit on it, but I remembered from messing around with [Storm](http://storm.apache.org/) that Twitter has a [Streaming API](https://dev.twitter.com/streaming/overview).


##What tools would we use?

We basically agreed that we would use the Twitter Streaming API to monitor tweets with “javascript” in them. Anytime the streaming API responded with a tweet, we'd send the text of the tweet and some data about the tweet to the client UI. All three of us were comfortable using React for the UI, and Node for the server. Since I had some prior experience with [Socket.io](http://socket.io/) it was decided that was how we’d get data from the server to the UI. I started to look around npm and searched duckduckgo for any modules that helped connect to the Twitter Streaming API. I found several modules and decided to use [Twit](https://www.npmjs.com/package/twit) based on absolutely nothing. Since we could not start coding until 1:00pm I didn’t really have a chance to evaluate new modules.

We figured that the graph we were creating was going to be a SVG. I’ve worked with [D3](http://d3js.org/) and remembered that there are some excellent [examples](https://github.com/mbostock/d3/wiki/Gallery) to look at. I didn’t really see anything there of what we wanted to build but I then remembered that [Mike Bostock](http://bost.ocks.org/mike/) had written a blog post about [path transitions](http://bost.ocks.org/mike/path/) and the graph looked pretty close to what we wanted to build. Meanwhile Charlie remembered that [React Sparklines](http://borisyankov.github.io/react-sparklines/) was mentioned on the [Reactiflux Slack channel](http://www.reactiflux.com/) and the library provided all that we needed. So we started looking at how that component could be used. During all this time we just had to guess how everything was going to work, we couldn’t tinker and see how things were going to work. 

##How should it look?
I wish I took a picture of it, but we had sketched out a UI for the app and all we had was a squiggly line inside a rectangle. We also found some images like this that provided guidance on what we were to build. 

##Collaborating without destruction

Charlie had an existing React/Node project that had a gulpfile and package.json ready to go, so it made sense to just use whatever he had. We were going to use git/Github because there wasn’t enough time to stand up a Subversion server :). The plan was that at 1:00pm Charlie would build the file structure of our project, commit to Master and push to origin where everyone else could pull into their unique branches and start coding. Periodically we’d merge branches into Master and eventually end up with a working app inside Master ready to be presented.

##Working on different pieces 