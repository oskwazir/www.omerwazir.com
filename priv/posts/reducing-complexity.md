---
title: Notes on Reducing Complexity
layout: post
tags: ['javascript','book notes']
lead: "I've written a collection of notes while reading Chapter 2 of Testable Javascript. Please don't assume what I've written is completely correct, these notes reflect my interpretation of the book's contents."
date: 2014-05-11
---

##How to reduce code complexity

###Command Query Separation
Start writing smaller functions by separating the actions that a method performs. Command query separation is about keeping command and query actions in different functions. Commands are functions that are similar to <span class='italic'>setters</span> in that they <span class="italic">do</span> something. Queries then are similar to <span class='italic'>getters</span> in that they <span class="italic">return</span> something. So you wouldn't want to combine <span class="italics">getters</span> and <span class="italics">setters</span> in one function. The benefit of this shows up once you try writing unit tests for functions where command query separation was maintained. You'll end up being able to write tests that are focused for each function.

###Hinting and Linting
Keep your code sane. Run JSHint (or JSLint) on it. From the [JSHint website](http://www.jshint.com/about/)
 > Any code base eventually becomes huge at some point, and simple mistakes—that would not show themselves when written—can become show stoppers and waste hours of debugging. And this is when static code analysis tools come into play and help developers to spot such problems. JSHint scans a program written in JavaScript and reports about commonly made mistakes and potential bugs. The potential problem could be a syntax error, a bug due to implicit type conversion, a leaking variable or something else.

###Cyclomatic Complexity
The number of independent paths a piece of code can take. Cyclomatic complexity is calculated using numbers for each path, the higher the number the more complicated the code is. For each path you will need to write a test for it, so try not to have all of the tests just be for one function. Instead break up the function so that the tests are spread across functions. Maintaining the tests will then be simpler. Supposedly you should keep your cyclomatic complexity (sounds like a hair dryer) below 10. This is one thing that should never go to 11.

Browsing npm for ‘complexity’ resulted in these two popular tools. 
* [complexity-report](https://www.npmjs.org/package/complexity-report) Software complexity analysis for JavaScript projects.
* [plato](https://www.npmjs.org/package/plato) JavaScript source analysis and visualizer.

Pay attention to the issues on Github to see which tool is actively being maintained.

###Reusability
Try to rely on a library or framework instead of writing code that does the same thing. jQuery, lo-dash, underscore,backbone,angular,knockout,node all do their job extremely well. Writing code to mimic what they do for your application is just a bad idea. You already have plenty to worry about in writing code for your project. So reuse what's already available.

Reusability also goes to your own code. You might have some code inside a function that converts GMT to Mountain Standard time. You might have another place in your code which converts Nepal Time to Tuvalu time. The code is probably nearly identical except for the timezones that are being converted from and to. Just write a timezone converter function that has it's logic in one place. And call that function from wherever you were converting time zones. That way if timezone calculations change you change the code in one place, not eleven different places.

###Fan-Out
The number of dependencies your function directly and indirectly depends on or references. Dependencies are in the form of external modules or objects. Tight coupling can be seen in an object or function with high fan-out. To reduce tight coupling you can use dependency injection or eventing. To reduce fan-out you can use a [facade pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternjavascript). Testing code with high fan-out is difficult since mocking and stubbing dependencies is required. Yes really when you spend more time writing mocks and stubs you'll soon be making changes in your code. It's that obvious of a problem.

###Fan-In
Think of fan-in as the inverse of fan-out. It counts how many modules reference a function or object. I've taken the official definition of fan-in from the book Testable Javascript:

> The fan-in of procedure A is the number of local flows into procedure A plus the number of data structures from which procedure A retrieves information.

High fan-in should exist for common or utility functions, think of something like authorization checks,logging, formatting, conversions etc... Those are tasks that can be called from anywhere or called frequently. They should have high fan-in. Code that isn't called frequently such as initialization code should have low fan-in. The idea being that code that isn't utilized frequently shouldn't be called or depended on a lot by other modules.

###Coupling
So fan-out counts the number of dependencies a module has, coupling is the relationship between modules. From my experience tight coupling makes it really hard to edit code since changing one thing usually requires editing code in a bunch of other unrelated places too. At first you'll wonder why in the world is this piece of code referenced all the way in this other place. And hey it's referenced here too but in a different way and it's not even used the way it's supposed to. Then you cry for a day or two and swear you'll never write tightly coupled code. Of course you don't write tightly coupled code. It's always someone else who did it and left you with a maintenance nightmare.

####The six levels of coupling <small>in descending order of tightness</small>
* Content Coupling. When you call a method/function on an external object directly, or mutate the object by adding or editing it's properties.

* Common Coupling. Your object is commonly coupled if it shares a global value with another object.

* Control Coupling. The object changes behavior based on an external flag or condition.

* Stamp Coupling. Passing an object to an external object, when the external object only utilizes a few properties but was sent properties it doesn't use.

* Data Coupling. Objects pass messages to each other with no transfer of control to an external object. I didn't really understand this the first time I read it.

* No Coupling. Easiest to understand.

* Instantiation. Not exactly a form of coupling but it still does couple code to an object. Every time you instantiate and object your code is now responsible for the life cycle of that object. You should at least make sure it's capable of being garbage collected. Closures are important to watch out for since they make garbage collection difficult even if their parent object goes out of scope.

To move from tight coupling to loose coupling you can use dependency injection. You can also utilize the [factory pattern](http://www.addyosmani.com/resources/essentialjsdesignpatterns/book/#factorypatternjavascript) (and abstract factory) to make it easier to just ask for an object.

###Dependency Injection
Dependency injection helps release the coupling of an object from it's dependencies. An object is handed it's dependencies instead of needing to instantiate them locally. If you aren't familiar with dependency injection you can read the [wikipedia article](http://en.wikipedia.org/wiki/Dependency_injection) and another explanation of dependency injection at the [AngularJS docs](https://docs.angularjs.org/guide/di).

###Comments
Commenting code is critical. Just because there is a test for the code that doesn't mean you are free from commenting your functions. You need to explain to other programmers what is going on. Testable Javascript mentions the following tools for converting comments to documents 
* [YUIDoc](http://yui.github.io/yuidoc/)
* [JSDoc](http://usejsdoc.org/)
* [Docco](http://jashkenas.github.io/docco/)
* [Rocco](http://rtomayko.github.io/rocco/) - Ruby port of Docco 

###Peer review
Finally have someone else review your code. If another programmer can't understand your code than there's a real obvious problem with complexity.

###Naming your variables
I'd like to add my own little thing here for reducing complexity. Use proper naming conventions for variables, objects, functions. Please don't do this:

```
var c = SomeFunction();
```
I have no clue at all what kind of thing c is supposed to be. Will it be an object, a number, a boolean. What is it for? Also don't do this:

```
var value = AnotherFunction();
```
Seriously I know value is a value, it's a value for what?
