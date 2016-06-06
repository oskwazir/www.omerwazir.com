---
title: Problems running Homebrew on Yosemite
layout: post
tags: ['homebrew']
lead: "I’ve been running Yosemite since beta and now am running the release version. In that much time I never tried to use Homebrew until today and of course Homebrew wouldn’t work. I searched around online and found how to fix the two probelms I was having."
date: 2014-10-24
---

## My first problem was running `brew`

Just trying to run `brew` would cause this error to show up. 

```
/usr/local/bin/brew: /usr/local/Library/brew.rb:
/System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin/ruby:
bad interpreter: No such file or directory
```

Easily enough I found how to fix the above error from [John Assael](http://blog.ic3man.gr/2014/06/homebrew-ruby-bad-interpreter-no-such-file-or-directory/). I had to change the first line in the ` /usr/local/Library/brew.rb` file so that the path

`#!/System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/bin/ruby -W0`

was changed to use the `Current` folder under `Versions` like this:

`#!/System/Library/Frameworks/Ruby.framework/Versions/Current/usr/bin/ruby -W0`

## My next problem was running `brew update`

Now `brew` would run but I couldn’t run `brew update` because of this error:

```
brew update
error: Your local changes to the following files would be overwritten by merge:
  Library/brew.rb
Please, commit your changes or stash them before you can merge.
Aborting
Error: Failure while executing: git pull -q origin refs/heads/master:refs/remotes/origin/master
```
I found a way to fix this in [Brew issue #11448](https://github.com/Homebrew/homebrew/issues/11448). All I had to do is listed below.
```
cd `brew --prefix`
git remote add origin https://github.com/mxcl/homebrew.git
git fetch origin
git reset --hard origin/master
```

Hopefully that fixes some of your problems with Homebrew on Yosemite.