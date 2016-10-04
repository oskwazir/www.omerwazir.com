---
title: Building something with Kismet and Elixir
tags: ['coding']
intro: "Kismet is a wireless sniffing tool that can pull an insane amount of information from wireless data. I want to build something with Elixir so lets build a web UI to show data we get from Kismet."
date: 2016-10-03
---


Download the latest version of Raspian from [https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/) and follow the instructions for burning the image to an SD card. You can find instructions [here](https://www.raspberrypi.org/documentation/installation/installing-images/README.md) I prefer to use the Raspbian Lite distrubution because I don’t use the desktop or any GUI applications.

## Get dependencies
```
sudo apt-get update

sudo apt-get upgrade -y

sudo apt-get install wget m4 vim libncurses5-dev libpcap-dev libpcre3-dev \
libnl-dev ethtool iw rfkill build-essential autoconf openssl libssl-dev \
fop xsltproc unixodbc-dev git
```

## Compiling & installing Kismet

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

Continue with the following commands.

```

make dep 
make (you can walk away for now, this will take a few minutes)
sudo make suidinstall
sudo adduser <user> kismet //add user that will run `kismet_server` to the `kismet` group
```

## Edit kismet.conf
```
popd
rm -rf ./kismet
//Current directory should be your home folder i.e. ~/
mkdir kismet_logs
sudo cp /usr/local/etc/kismet.conf /usr/local/etc/kismet.conf.bak
sudo vim /usr/local/etc/kismet.conf
```

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

### Increasing current on USB

In case your using an Alfa wireless antenna and you don't have a powered usb hub,
you will need to increase the power output that the rpi is delivering over usb.

```
sudo cp /boot/config.txt /boot/config.txt.bak
sudo vim /boot/config.txt

# Find max_usb_current and set the value to 1 
max_usb_current=1
```


## Install Erlang & Elixir
```
mkdir erlang
pushd ./erlang
git clone https://github.com/erlang/otp.git
cd ./otp
git checkout OTP-19.0.2 // Or whatever is the most recent release
./otp_build autoconf
./configure
export LANG=C   # Assuming bash/sh
make -j4
sudo make install
popd
rm -rf ./erlang
```
