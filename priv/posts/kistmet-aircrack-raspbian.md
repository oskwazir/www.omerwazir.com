Download the latest version of Raspian from [https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/) and follow the instructions for burning the image to an SD card. You can find instructions [here](https://www.raspberrypi.org/documentation/installation/installing-images/README.md) I prefer to use the Raspbian Lite distrubution because I don’t use the desktop or any GUI applications.

##Get dependencies
```
sudo apt-get update

sudo apt-get upgrade -y
sudo apt-get install wget m4 vim libncurses5-dev libpcap-dev libpcre3-dev libnl-dev
ethtool iw rfkill build-essential autoconf openssl libssl-dev fop xsltproc unixodbc-dev git
'''

##Kismet

'''

mkdir /kismet
cd ./kismet
wget https://kismetwireless.net/code/kismet-2016-07-R1.tar.xz
tar -xf ./kismet-2016-07-R1
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
LibCapability (enhanced 
   privilege dropping): no                                                                              
         Linux Netlink: yes (mac80211 VAP creation) - libnl-1 
```

Continue with the following commands.

```

make dep 
make (you can walk away for now, this will take a few minutes)
sudo make suidinstall

```

##aircrack-ng

'''
cd ~/
mkidr aircrack
cd ./aircrack
wget http://download.aircrack-ng.org/aircrack-ng-1.2-rc4.tar.gz
tar -zxf aircrack-ng-1.2-rc4.tar
cd ./aircrack-ng-1.2-rc4.tar
make
sudo make install
airodump-ng-oui-update
'''
