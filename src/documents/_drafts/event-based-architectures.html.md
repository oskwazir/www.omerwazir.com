---
title: Notes on Event Based Architectures
layout: post
tags: ['javascript','book notes']
lead: "I've written a collection of notes while reading Chapter 3 of Testable Javascript. Please don't assume what I've written is completely correct, these notes reflect my interpretation of the book's contents."
date: 2014-05-13 15:43:24
---

### Using events to reduce complexity
The basic idea here is that code quite often relies on external objects to pass or get messages from. You don't want to spend more time managing these 
In chapter 2 we've seen how dependency injection and factories can reduce coupling. There's still an issue of maintaining an DI framework and that maintenance is not directly related to the functionality that the application provides. The basic idea is that we need external objects to pass messages to or get messages from but what are the ways we can simplify our code so we aren't as concernced about what to send or receive messages from. 