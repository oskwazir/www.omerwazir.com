---
title: How to set your version of Visual Studio for npm
layout: post
tags: ['npm','visual studio','post']
lead: "Some npm packages look for a specific Visual Studio version. If you don't have the expected version than the npm package will fail to install."
date: 2014-27-03 21:57:12
---

When installing some npm modules on Windows an error may show up that says:

`error MSB8020: The build tools for Visual Studio 2010 (Platform Toolset = 'v100') cannot be found.` 

What you can do is set your installed version of Visual Studio when running npm install.

To do that simply run:

`npm install <module> -msvs_version=2013`

where `msvs_version` is equal to the version of Visual Studio that you have. 

Yay!