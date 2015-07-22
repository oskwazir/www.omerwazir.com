---
title: Getting CoreOS to work properly with Vagrant and VirtualBox
layout: post
tags: ['coreos','vagrant','virtualization']
lead: "I wanted to start playing with CoreOS and decided to use Vagrant and VirtualBox. There were steps I needed to do to get the cluster working correctly. The documentation covered what I needed to do, I just jumped a step too soon and had some problems."
date: 2015-02-23 22:52:40
---

I read the [instructions](https://coreos.com/docs/running-coreos/platforms/vagrant/) on setting up CoreOS on Vagrant. I followed the [cloud config](https://coreos.com/docs/running-coreos/platforms/vagrant/#cloud-config) steps because I wanted to see what it was like to work with a cluster. Then I followed the steps on [starting up CoreOS](https://coreos.com/docs/running-coreos/platforms/vagrant/#start-up-coreos) and I decided it was time to run `vagrant up` and get things going. Well I ended up with `core-01` not being able to authenticate...huh.

```
vagrant up
...
==> core-01: Waiting for machine to boot. This may take a few minutes...
    core-01: SSH address: 127.0.0.1:2222
    core-01: SSH username: vagrant
    core-01: SSH auth method: private key
    core-01: Warning: Connection timeout. Retrying...
    core-01: Warning: Authentication failure. Retrying...

```

Of course I did what I always do and searched [DuckDuckGo for “authentication failure retrying coreos”](https://duckduckgo.com/?q=authentication+failure+retrying+coreos) and found this Stack Overflow answer: [CoreOS Authentication failure on vagrant up](http://stackoverflow.com/questions/24867490/coreos-authentication-failure-on-vagrant-up). The answer indicated that I should have read the [quickstart](https://coreos.com/docs/quickstart/) part of the CoreOS documentation where it plainly states that if you were to use Vagrant you must do the following:

```
$ ssh-add ~/.vagrant.d/insecure_private_key
```

After doing that `vagrant up` worked correctly. I could `ssh` into any core using `vagrant ssh core-<number> -- -A`

Now that I can `ssh` into a core I tried to write to `etcd` following this [example](https://coreos.com/docs/quickstart/#service-discovery-with-etcd) but I ended up with another problem.
```
curl -L http://127.0.0.1:4001/v1/keys/message -d value="Hello world"
Failed connect to 127.0.0.1:4001; Connection refused
```

Huh I missed something because this should be working. I searched issues on the CoreOS Github repo and found [issue #21](https://github.com/coreos/docs/issues/21) where [this comment](https://github.com/coreos/docs/issues/21#issuecomment-68761331) illustrated to me that I should have adjusted the `config.rb` file before trying to test `etcd`. I needed to uncomment lines to allow the following code to become functional.

```

$new_discovery_url='https://discovery.etcd.io/new'

# To automatically replace the discovery token on 'vagrant up', uncomment
# the lines below:
#
if File.exists?('user-data') && ARGV[0].eql?('up')
 require 'open-uri'
 require 'yaml'

 token = open($new_discovery_url).read

 data = YAML.load(IO.readlines('user-data')[1..-1].join)
 data['coreos']['etcd']['discovery'] = token

 yaml = YAML.dump(data)
 File.open('user-data', 'w') { |file| file.write("#cloud-config\n\n#{yaml}") }
end
#

```

After fixing that I could run the following on core-01
```
curl -L http://127.0.0.1:4001/v1/keys/message -d value="Hello world"

```

and I could read the value of `message` across all of the cores. Pretty neat.