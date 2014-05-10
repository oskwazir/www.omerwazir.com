##Reducing Complexity
###Command Query Separation
Start writing smaller functions by separating the actions that a method peforms. Command query separation is about keeping commands and queries actions in different functions. Commands are functions that are similiar to <span class='italic'>setters</span> in that they <span class="italic">do</span> something. Queries then are similiar to <span class='italic'>getters</span> in that they <span class="italic">return</span> something. So you wouldn't want to combine <span class="italics">getters</span> and <span class="italics">setters</span> in one function. The benefit of this shows up once you try writing unit tests for functions where command query seperation was maintained. You'll end up being able to write tests that are focused for each function.

###Hinting and Linting
Keep your code sane. Run JSHint (or JSLint) on it. From the [JSHint website](http://www.jshint.com/about/)
 Any code base eventually becomes huge at some point, and simple mistakes—that would not show themselves when written—can become show stoppers and waste hours of debugging. And this is when static code analysis tools come into play and help developers to spot such problems. JSHint scans a program written in JavaScript and reports about commonly made mistakes and potential bugs. The potential problem could be a syntax error, a bug due to implicit type conversion, a leaking variable or something else.

###Cyclomatic Complexity
The number of independent paths a piece of code can take. Cylomatic Complexity is calcuated using numbers for each path, the higher the number the more complicated the code is. For each path you will need to write a test for it so try not to have all of the tests just for one function. Instead break up the function so that the tests are spread across functions. Maintaining the tests will then be simpler. Supposedly you should keep your cyclomatix complexity (sounds like a hair dryer) below 10. This is one thing that should never go to 11.

Browsing npm for ‘complexity’ resulted in these two popular tools. 
[complexity-report](https://www.npmjs.org/package/complexity-report) Software complexity analysis for JavaScript projects.
[plato](https://www.npmjs.org/package/plato) JavaScript source analysis and visualizer.
Pay attention to the issues on Github to see which tool is actively being maintained.

###Reusabe
Try to rely on a library or framework instead of writing code that does the same thing. jQuery, lo-dash, underscore,backbone,angular,knockout,node all do their job extremly well and writing code to mimic what they do for your application is just a bad idea. You already have plenty to worry about in writing code for your project. So reuse what's already avaialble.

Reusability also goes to your own code. You might have some code inside a function that converts GMT to Mountain Standard time. You might have another place in your code which converts Nepal Time to Tuvalu time. The code is probably nearly identical except for the timezones that are being converted from and to. Just write a timezone converter function that has it's logic in one place. And call that function from wherever you were converting time zones. That way if timezone calculations change you change the code in one place, not eleven different places.

###Fan-Out
The number of dependencies your function directly and indirectly depends on or references. Dependencies are in the form of external modules or objects. Tight coupling can be seen in an object or function with high fan-out. To reduce tight coupling you can use dependency injection or eventing. To reduce fan-out you can use a [facade pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#facadepatternjavascript). Testing code with high fan-out is difficult since mocking and stubbing dependencies is required. Yes really when you spend more time writing mocks and stubs you'll soon be making changes in your code. It's that obvious of a problem. 
 