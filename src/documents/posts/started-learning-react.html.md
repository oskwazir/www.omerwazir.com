---
title: I started learning React and so far I like it.
layout: post
tags: ['js','react']
lead: "I ignored React for a while. I would see comments on reddit and hacker news of people loving the way React worked. I just didn’t care enough to make an effort and understand what React was all about. After watching the keynote at React Conf I realized that React is dog food and the idea of building views made of components was something I advocated at work for a long time. Now I’m taking the slow effort of understanding how to build stuff with React."
date: 2015-02-03 11:08:02
---

###I should have been building atomic pieces
I’ve worked on projects in an  environment where we are told on Monday what needs to be working on Friday. Tuesday, Wednesday and Thursday are spent rapidly getting something to work without taking any time to plan how we really want to build our app. Functions get tossed in a ViewModel. Templates are placed somewhere. On Friday during an internal demo the app does what it is expected to do. Whenever we get time to take a step back and look at what we built we see that the ViewModel has 60 functions in it. Some functions are near duplicates of each other and some functions belong in another place. There are other major mistakes made but the mistake I want to talk about is that we started putting the whole app together without building atomic pieces of it first.

###Sharing atomic pieces
An atomic piece is just the smallest piece of UI that on its own can do something. Similar to a React component. I would imagine having an internal site like Bootstrap’s [Components](http://getbootstrap.com/components/) where team members can see the pieces that are already developed and from there they can build larger components from the smaller pieces. So I could have a component that takes Lat/Long values and converts to [MGRS](https://en.wikipedia.org/wiki/Military_grid_reference_system). That’s all it does and you can put it wherever you like. The conversion function and the UI are already put together just grab that component and place it wherever you want to. Don’t write a new UI for it. Just use what we have. The site would build off of existing code during CI so we could easily see if style sheets broke or if something doesn’t render correctly.

###I think React will help me break apps into pieces
It’s pretty easy to see what an app needs to do and feel a little overwhelmed. It takes some practice to break the functionality of an app into the smallest piece that makes sense and build those pieces. So far with React it seems like I build the view into small components and let other components be composed of the little pieces. I haven’t spent any time with Flux yet so I’m not sure how well I’ll understand it. So far I’m liking React and I hope I can get to make some good use of it.