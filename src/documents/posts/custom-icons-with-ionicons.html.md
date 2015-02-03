---
title: Adding custom icons to ionicons
layout: post
tags: ['ionic']
lead: "Adding custom icons to ionicons is very simple thanks to build scripts provided with the ionicons sources. I have listed out the basic steps to get a custom icon working natively with ionic"
date: 2014-10-29 22:46:13
---

## Download the ionicons source
The repo for ionicons is [here](https://github.com/driftyco/ionicons). Fork or straight up download the repo. We’ll need it to generate the ionicons for ionic. I assume ionicons is an entity like Voltron. The next step assumes you are using OS X and have Homebrew installed.

## Install some dependencies
Run the following commands to get Homebrew to install fontforge and ttfautohint. 

`brew install fontforge ttfautohint`

On my personal computer I encountered the error below so I had to install [XQuartz](https://xquartz.macosforge.org). I have another work computer which didn’t need XQuartz probably because it was already installed.

```
Homebrew does not package XQuartz. Installers may be found at:
  https://xquartz.macosforge.org
pango: Unsatisfied dependency: XQuartz 0.0.0
Homebrew does not package XQuartz. Installers may be found at:
  https://xquartz.macosforge.org
Error: Unsatisified requirements failed this build.
```

After XQuartz was installed it wanted me to logout. So I logged out and logged back in.

Run the command `brew install fontforge ttfautohint` again and wait since this could take a few minutes. Once that is over you will need to install Sass. You can run `gem install sass` if you have `gem` already working. If not then follow the [Sass install](http://sass-lang.com/install) instructions.

## Add your custom icon
So with all of the above installed it’s time to add the custom icon to ionicons. Add your custom svg icon to the `src` directory in the ionicons repo. I’m taking a public domain icon from [The Noun Project](http://thenounproject.com). Make sure you understand the conditions of usage for icons on The Noun Project before you add them to your app. I’m going to add the [Informal-Learning](http://thenounproject.com/term/informal-learning/27471/) icon. Rename the svg file to something meaningful. Right now the icon file is named `icon_27471` but that won’t be as useful to use with ionicons, since the build process will use the file name as the name of the icon. I’ve renamed the svg file to `informal-learning` and have added it to the ionicons `src` directory. With the custom file added to the `src` directory it’s time to run ionicons build script.

## Build ionicons
In the root of the ionicons directory run the following command `python ./builder/generate.py`. You should see output similar to this
```
Load Manifest, Icons: 601
New Icon: 
 - informal-learning
 - 0xf359
 - Standard Width: ios7-reload
 - Standard Width: load-a
 - Standard Width: load-b
 - Standard Width: load-c
 - Standard Width: load-d
 - Standard Width: loop
 - Standard Width: refresh
Save Manifest, Icons: 602
Save Build, Icons: 602
Generate SCSS
Generate CSS From SCSS
Generate Minified CSS From SCSS
Generate LESS
Generate Cheatsheet
Generate component.json
Generate composer.json
Generate bower.json
```

## Add the new ionicons files to your ionic project
Now copy the files from these folders to the destination folders
```
ionicons\css    ->    <ionicApp>/www/lib/ionic/css/
ionicons\fonts  ->    <ionicApp>/www/lib/ionic/fonts/
ionicons\scss   ->    <ionicApp>/www/lib/ionic/scss/ionicons/
```
It might seem like you wouldn’t need to copy the scss files. I thougth the same thing too but my icon wouldn’t work. So just copy them because they matter.

Start your app with `ionic serve` add the new icon with `icon="icon ion-informal-learning"` and behold such magical wizardry.

If you encounter any problems just figure it out. These instructions worked for me on two different computers.