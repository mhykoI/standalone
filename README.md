## Acord Standalone

## First of all

You need to install NodeJS to your device. You can download it from [here](https://nodejs.org/).
Also you can download latest version of Acord from [here](https://github.com/acord-standalone/standalone/archive/refs/heads/main.zip).

## Mac

First download Open Asar raw file from [app.asar](https://github.com/GooseMod/OpenAsar/releases/download/nightly/app.asar).

And replace `app.asar` on `Macintosh > Applications > Discord > Contents > Resources` location.

To inject on Mac and Linux, enter the command `npm i && cd ./renderer && npm i && cd .. && cd ./injector && npm i && cd .. && cd ./preload && npm i && cd .. && npm run inject:stable` in Acord's main directory.

## Windows

First install Open Asar from [openasar.dev](https://openasar.dev/).

To inject on Windows, enter the command `npm i && cd .\renderer && npm i && cd .. && cd .\injector && npm i && cd .. && cd .\preload && npm i && cd .. && npm run inject:stable` in Acord's main directory.

## Linux

1. Install all required [packages](#packages):
```
# Ubuntu
sudo apt install nodejs
# Arch
sudo pacman -S nodejs
```
2. Clone the repo:
```
git clone https://github.com/acord-standalone/standalone.git
```
3. Run the `conky-widgets.sh` script to start the widget (forks to background):
```
cd standalone
bash linux-install.sh
```
