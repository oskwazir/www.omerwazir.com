---
title: Things you can do in iex
layout: post
tags: ['coding']
intro: "For the Tucson Elixir meetup I gave a lightning talk on IEx, explaining some things that a new Elixir developer might not know."
date: 2017-03-01
---

## A few of the things IEx can do for you

* <a href="https://hexdocs.pm/iex/IEx.Helpers.html">IEx Helpers</a> which are AMAZING!</li>
* Autocomplete with . (dot) lookup</li>
* User shells &amp; Remote shells</li>
* Evaluates Code - not so good for benchmarks</li>
* Helps prevent involuntary regular expressions</li>
* Shell Configuration</li>

All features are detailed <a href="https://hexdocs.pm/iex/IEx.html">here</a></p>

## Start IEx
Interactive mode evalutes any Elixir expression which makes it an excellent place to get comfortable with Elixir &amp; OTP.

```
$ iex
Erlang/OTP 19 [erts-8.2] [source] [64-bit] [smp:8:8] [async-threads:10] [hipe] [kernel-poll:false]

Interactive Elixir (1.4.1) - press Ctrl+C to exit (type h() ENTER for help)
iex(1)> person = %{name: "Remo Williams"}
%{name: "Remo Williams"}
iex(2)>
```


## IEx.helpers
Run <span style="text-decoration: underline;"><code>h IEx.Helpers</code></span> inside IEx

Some examples:

* <code>h\1</code> - get module docs
* <code>i\1</code> - print stuff about a type
* <code>respawn\0</code> - respawn shell
* ... 24 total helpers available

## dot (.) helpers
If you don't know what functions are available in a module, type the module name with a dot on the end and press tab to see a list.

## #iex:break
```
iex(2)> %{user: "Artoo",
...(2)> name: "R2D2',
...(2)> type: 'robot'}
...(2)> .
...(2)> ;
...(2)> end
...(2)> %}
...(2)> #iex:break
** (TokenMissingError) iex:2: incomplete expression
```

## Shell Configuration

* :colors
* :inspect
* :width
* :history_size
* :default_prompt
* :alive_prompt

## :inspect
Inspect options used by the shell when printing results of expression evaluation.
If you want to see everything during IO.inspect\1 then do this:
```
IEx.configure [inspect: [limit: :infinity]]
```
<a href="https://hexdocs.pm/elixir/Inspect.Opts.html">Inspect.Opts</a>

## Different inspects
<code>inspect\1</code> and <code>i\1</code> are different.
```
iex(2)> foo = %{ name: "Bruce Wayne", location: "Gotham"}
%{location: "Gotham", name: "Bruce Wayne"}
iex(3)> inspect(foo)
"%{location: \"Gotham\", name: \"Bruce Wayne\"}"
iex(4)> i(foo)
Term
  %{location: "Gotham", name: "Bruce Wayne"}
Data type
  Map
Reference modules
  Map
Implemented protocols
  IEx.Info, Collectable, Enumerable, Inspect
```

## Pry into code
This is its own talk but IEx.pry is useful for debugging.
```
defmodule say do
 require IEx

 do something() do
  IEx.pry

  IO.puts("Hello, World")
 end
end
```
