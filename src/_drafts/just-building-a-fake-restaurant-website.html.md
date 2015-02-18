---
title: Just building a fake restaurant website
layout: post
tags: ['books']
lead: "The only way to get better is with practice. I really need to improve my front-end skills and I've started a project called Just Build Websites that consists of real layouts for fake websites. In this post I'll explain how I built a fake restaurant website using skills I learned from Greg Smith's related post"
date: 2014-05-08 23:48:32
---

##How I created the website for Ichiro Sushi

Greg Smith has an [article](http://bocoup.com/weblog/nom/) about his process for designing a website for a fictional restaurant. There's a lot to learn in what he does and I won't repeat it here, just read his article. A restaurant website is a pretty straight forward project and was something I had previously thought about building. So using what I've learned from Greg Smith's article I'm going to explain how I built the first website for Just Build Websites.

###Evaluating local restaurant websites

Before I start building out the website for Ichiro Sushi I want to look at three of my favorite restaurants in Tucson. I'll see what I like and what I don't like about the site as a customer. Usually when I visit a restaurant's webite I need to know the following:

* what their hours are
* the menu
* where they are located.

I <strong>do not</strong> want to see Flash,Quicktime,canvas or even Java. I want the site to load correctly and quickly on my iPhone. If the restaurant has multiple locations in a city I want to be able to see hours and and the address for each location in a list. This information should be easily available from the home page or navigation. The menu should be in text, not a freaking picture of their menu.

<a href="http://www.tacogiro.com/"><h4>Taco Giro</h4></a>
Location prominent on first page. Locations featured again on Contact page, with address and map for each restaurant. Hours are not prominent and I think the hours aren't even on the site. There are four links on  the home page that lead to the menu. Menu not in a text format, it's an image of the physical menu. The site is wrapped in a canvas and I don't know why. title in head is used for meta.description.


<a href="http://maynardstucson.com/"><h4>Maynards Kitchen</h4></a>
Site is responsive (or adaptive) to mobile.
The hours are prominent at the top of the page. Hours for the different servces are clear and posted at the top. The menu is also easy to find and is in text. There are prices for each menu item which is nice to see. The location is in the footer. The font-size is 12px which is looks small in Georgia. I don't think many people would be able to easily see the address. Maynards is unique in that there is a Market and a Kitchen both physically seperate entities but across from one another. The site is split between the two which I think makes it really easy for people to know that the Market and Kitchen are not the same thing.

<a href="https://plus.google.com/117442289112852087109/about"><h4>Hot Wok Asian bistro</h4></a>
So this is weird. They use a Google+ page and if I search for “Hot Wok Tucson” in Google on my iPhone I see the little Google Maps info card that shows the location and the hours. I can't figure out how to get to the Google+ page from Google search. If I use DuckDuckGo I don't see anything about their being a Google+ page. On my laptop I was able to find the Google+ site from a Google search. WTF.
Location and hours are posted in the top in a fat header. There is a link to a menu, which actually takes me to Urbanspoon.com where I can look at some pictures of a menu. It's a Google+ site and I wanted to see custom made sites so I won't count this and will now use another restaurant. Onwards we go.


<a href="http://www.bluewillowtucson.com/"><h4>Blue Willow</h4></a>
Site loads slowly. Many images in carousel causing this? Site does not use the meta thing to load page correctly in mobile device. 
Address and hours are posted at the top. The menus are two clicks away from the home page, a link to Food and then you pick the menu you want to see. Not that big of a deal since Food is pretty descriptive of what the link is about. Each menu is in text with prices for each item. This is the simplest site I've seen so far and it's simplicity works really well.

So I've seen different ways of hours being posted or not being posted, locations being prominent or difficult to see, menus in images and menus in text. No site required flash. Maynards is the only restaurant that accepts reservations and making a reservation was very prominent on the site. The concepts of creating a restaurant site are simple. Content needs to be prominent, navigation needs to be clear, don't waste the (potential) customer's time.


###A structured process for creating a website

In a normal business environment the order of actions consist of manager telling you to create a prototype from unrelated requirements to an expecation that your prototype is production ready. The order of actions below are taken from Greg's article. I've never seen information architecture as a process before. I've usually seen a direct jump from requirements to prototyping. Sometimes a designer is trying their best to create an elegant solution to the customers needs, but rarely have I seen anyone really appreciate the effort a designer puts in. Often people over estimate their abilities to design a UI and they think good UI/UX is only for other projects, not their text entry form application. That's the incorrect mindset to have.

####Objectives
####Requirements
####Information Architecture
####Interface Wireframing
####Prototype and Visual Design