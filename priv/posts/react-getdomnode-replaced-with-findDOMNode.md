---
title: getDOMNode in React is deprecated and replaced with findDOMNode.
layout: post
tags: ['js','react']
lead: "I have been using React 0.13.0-beta.1 and just last night got Jest to run my tests. There was a warning while running my tests that `getDOMNode` is deprecated but I didn't know what to use instead. Some digging around the React repo on Github indicated I should be using `React.findDOMNode`."
date: 2015-02-04
---

React 0.13.0-beta.1 supports writing ES6 classes instead of calling React.createClass. See this React blog [post](https://facebook.github.io/react/blog/2015/01/27/react-v0.13.0-beta-1.html) for more details. I’ve been building a little app with 0.13.0-beta.1 and spent some time getting Jest to work with the components (or are they elements now?) I wrote. I was able to get my tests to pass but a warning kept popping up.

```
jest.dontMock('../build/PokemonRow.react');
describe('PokemonRow', function() {
  it('displays the name of the Pokemon', function() {
    var React = require('react/addons');
    var PokemonRow = require('../build/PokemonRow.react');
    var TestUtils = React.addons.TestUtils;

    // Render a paragraph element with the name of a fake pokemon
    var pokemon = {name:'Wuzzy'};
    var pokemonRow = TestUtils.renderIntoDocument(<PokemonRow pokemon={pokemon} key={pokemon.name}/>);

    // Verify that it actually was made.
    var name = TestUtils.findRenderedDOMComponentWithTag(pokemonRow,'p');
    expect(name.getDOMNode().textContent).toEqual(pokemon.name);
  });
});
```
```
Using Jest CLI v0.2.2
 PASS  __tests__/PokemonRow-test.js (2.105s)
Warning: getDOMNode(...) is deprecated in plain JavaScript React classes.
Warning: getDOMNode(...) is deprecated in plain JavaScript React classes.
1 test passed (1 total)
Run time: 2.29s
```

The online documentation for React didn't say anything about `getDOMNode` being deprecated. I figured that since I'm using a beta version the docs aren't online yet. So I went to the React repo on Github and searched for the warning string `is deprecated in plain JavaScript React classes`. I found the message in `react/src/modern/class/ReactComponent.js` but I still didn't understand what to use instead of `getDOMNode`. I searched for `getDOMNode` and found a [pull request](https://github.com/facebook/react/pull/2802/files) updating the documentation to replace `getDOMNode` with `React.findDOMNode`. I replaced `getDOMNode` and `findRenderedDOMComponentWithTag` with just `React.findDOMNode` and the warnings went away.

```
jest.dontMock('../build/PokemonRow.react');
describe('PokemonRow', function() {
  it('displays the name of the Pokemon', function() {
    var React = require('react/addons');
    var PokemonRow = require('../build/PokemonRow.react');
    var TestUtils = React.addons.TestUtils;

    // Render a paragraph element with the name of a fake pokemon
    var pokemon = {name:'Wuzzy'};
    var pokemonRow = TestUtils.renderIntoDocument(<PokemonRow pokemon={pokemon} key={pokemon.name}/>);

    // Verify that it actually was made with the right name.
    var name = React.findDOMNode(pokemonRow).textContent;
    expect(name).toEqual(pokemon.name);
  });
});
```
```
Using Jest CLI v0.2.2
 PASS  __tests__/PokemonRow-test.js (2.047s)
1 test passed (1 total)
Run time: 2.243s
```

NOTE: Initially I did a very dumb thing and forgot to run an ES6 to ES5 transpiler before running unit tests. I was running gulp-react to transform the JSX to Javascript but had a total brain fart about needing to convert the ES6 class definition. During my regular build process I use 6to5 during my Browserify packaging which happens after JSX. My unit tests just use the post-JSX files. I kept getting errors about and `Unexpected reserved word` and I thought something about the html markup in my component was off. I realised my mistake and have JSX and 6to5 happening during the same gulp task.
