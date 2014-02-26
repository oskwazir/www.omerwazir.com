---
title: The silent failure of Safari, websockets and self signed certificates.
layout: post
tags: ['safari','websockets','post']
lead: "Safari and mobile safari silently refuse to create a secure websocket connection if the certificate used is not from a recognized CA."
---

I spent quite a while figuring out why my app would revert to xhr-polling when running on my iPhone.