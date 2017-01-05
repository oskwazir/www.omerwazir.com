---
title: Installing Kismet on a Raspberry Pi
layout: post
tags: ['coding']
intro: "Kismet is a wireless sniffing tool that can pull an insane amount of information from wireless data. In this guide I explain how to install Kismet on a Raspberry Pi running Raspbian."
date: 2017-01-04
---

Download the latest version of Raspian from [https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/) and follow the instructions for burning the image to an SD card. You can find instructions [here](https://www.raspberrypi.org/documentation/installation/installing-images/README.md). I prefer to use the Raspbian Lite distrubution because I don’t use the desktop or any GUI applications.

## Set a static IP
It's useful to have a static IP so you can easily remember where to ssh.

Open the `/etc/dhcpcd.conf` file and at the bottom of the file add the following settings:

```
interface eth0
static ip_address=<some ip address>
static routers=<router IP>
static domain_name_servers=8.8.8.8 8.8.4.4 <or your network dns ip>

```

## Apply system updates
```
sudo apt-get update
sudo apt-get upgrade
```

## Install dependencies
```
sudo apt-get install wget m4 vim libncurses5-dev libpcap-dev libpcre3-dev \
libnl-dev ethtool iw rfkill build-essential autoconf openssl libssl-dev \
fop xsltproc unixodbc-dev git screen
```

## Compile & install Kismet
```
cd ~/
mkdir kismet
pushd ./kismet
wget https://kismetwireless.net/code/kismet-2016-07-R1.tar.xz
tar -xf ./kismet-2016-07-R1.tar.xz
rm kismet-2016-07-R1.tar.xz
cd ./kismet-2016-07-R1
./configure

```

After running `./configure` you should see at the end of output a list similar to the one below.

```
Configuration complete:
         Compiling for: linux-gnueabihf (armv7l)
           C++ Library: stdc++
   Installing as group: root
    Man pages owned by: man
       Installing into: /usr/local
          Setuid group: kismet
      Terminal Control: ncurses
   Linux WEXT capture : yes
   OSX/Darwin capture : n/a (only OSX/Darwin)
   PCRE Regex Filters : yes
          pcap capture: yes
       airpcap control: n/a (only Cygwin/Win32)
        PPI log format: yes
   privilege dropping): no
         Linux Netlink: yes (mac80211 VAP creation) - libnl-1 
```

Continue with the following commands:

```
make dep 
make
# you can walk away for now, make will take a few minutes
sudo make suidinstall
sudo adduser <user> kismet //add user that will run `kismet_server` to the `kismet` group
```

## Edit kismet.conf
```
popd
rm -rf ./kismet
# Current directory should be your home folder i.e. ~/
mkdir kismet_logs
sudo cp /usr/local/etc/kismet.conf /usr/local/etc/kismet.conf.bak
sudo vim /usr/local/etc/kismet.conf
```

Change line #14 to `~/kismet_logs`.

Enable line #20 and make sure it is set to `hidedata=true`.

Add `ncsource=wlan1mon` under line 32. `wlan1mon` will be configured with airmon-ng.

Save and exit the file.

## Compile & install Aircrack-ng
```
mkdir aircrack
pushd ./aircrack
wget http://download.aircrack-ng.org/aircrack-ng-1.2-rc4.tar.gz
tar -zxf aircrack-ng-1.2-rc4.tar.gz
cd ./aircrack-ng-1.2-rc4
make
sudo make install
sudo airodump-ng-oui-update
popd
rm -rf ./aircrack
```

### Increase the current on USB

In case your using an Alfa wireless antenna and you don't have a powered usb hub,
you will need to increase the power output that the rpi is delivering over usb.

```
sudo cp /boot/config.txt /boot/config.txt.bak
sudo vim /boot/config.txt

# Find max_usb_current and set the value to 1 
max_usb_current=1
```

##  Switch wireless device to monitor mode

Run `sudo airmon-ng` to see a list of attached network devices.

You should hopefully see a `wlan1` device which is the usb wireless device attached to the rpi. There should also be a driver listed as well. If you see `??????` listed as the driver it is likely that the wifi device can't be set to monitor mode.

Run 

```
sudo airmon-ng check kill
sudo airmon-ng start wlan1
```

If successful the `wlan1` interface will have changed to `wlan1mon`. Make sure the name of this interface matches the name set on line 33 in `/usr/local/etc/kismet.conf`.


## Start Kismet_Server

For development I just run the kismet server inside a `screen` shell (or whatever the session is called).

```
screen
# follow prompts
kismet_server
# ctrl+a, d to exit
```

Now `kismet_server` should be running on the rpi.

## Connecting to Kismet_Server with Netcat

`netcat` should already be installed on the rpi, to connect to the `kismet_server` run
```
nc localhost 2501
```
and you should start to see the output from the `kismet_server`.

You can also send commands to the `kismet_server` instructing it on the type of messages you want to see.
```
echo -e '\n!0 enable CLIENT mac,firsttime,lasttime,signal_dbm' | nc localhost 2501 -i 1
```

and this will output messages from `kismet_server` on a 1 second interval.

To understand all of the messages you can get from kismet you can query a protocol for its capabilities.

The structure of a capability inquiry message is
```
 CAPABILITY <protocol>
```

So in the example below we are asking for the capability of CLIENT:

```
echo -e '\n!2 CAPABILITY CLIENT' | nc localhost 2501

#response from kismet is below

*KISMET: 0.0.0 1483556987 pi101 pcapdump,netxml,nettxt,gpsxml,alert 1000
*PROTOCOLS: KISMET,ERROR,ACK,PROTOCOLS,CAPABILITY,TERMINATE,TIME,PACKET,STATUS,PLUGIN,SOURCE,ALERT,COMMON,
TRACKINFO,WEPKEY,STRING,GPS,BSSID,SSID,CLIENT,BSSIDSRC,CLISRC,NETTAG,CLITAG,REMOVE,CHANNEL,INFO,BATTERY,CRITFAIL
*CAPABILITY: CLIENT bssid,mac,type,firsttime,lasttime,manuf,llcpackets,datapackets,cryptpackets,gpsfixed,
minlat,minlon,minalt,minspd,maxlat,maxlon,maxalt,maxspd,agglat,agglon,aggalt,aggpoints,signal_dbm,noise_dbm,
minsignal_dbm,minnoise_dbm,maxsignal_dbm,maxnoise_dbm,signal_rssi,noise_rssi,minsignal_rssi,minnoise_rssi,
maxsignal_rssi,maxnoise_rssi,bestlat,bestlon,bestalt,atype,ip,gatewayip,datasize,maxseenrate,encodingset,
carrierset,decrypted,channel,fragments,retries,newpackets,freqmhz,cdpdevice,cdpport,dot11d,dhcphost,
dhcpvendor,datacryptset
*ACK: 2 OK
```

In the response above you can also see PROTOCOLS returned from kismet, any of those protocols can be queried for capabilities.

Now go build something 😀

