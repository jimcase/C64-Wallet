# C64 Minter Wallet


**How to use**

The package.json contains following commands:

```bash
# install dependencies
npm install

# starts electron with React and Node in development mode
npm start

# builds the react application, the output will be in /build
npm run react-build

# starts the react application on localhost:3000
npm run react-start

# builds the node application, the output will be in /build-server
npm run server-build

# runs the node application in development mode
npm run server-start

# starts the electron process and enables live reload
npm run electron-dev

# Starts the packaging process for Electron, output will be in /dist
npm run electron-pack

# Will be automatically started by electron-pack, builds the react and node applications
npm run preelectron-pack
```

**Multi-platform**

```bash
npm run preelectron-pack
npm run electron-pack
npm run electron-builder --linux
npm run electron-builder --mac
npm run electron-builder --win
npm run electron-builder --x64

# Build app for MacOS, Windows and Linux:
npm run electron-builder --mwl
```

**Folder structure**

An overview of the folder structure can be found below:

```
|
|-- /build (output of the built react application)
|
|-- /build-server (output of the built node application)
|
|-- /dist (output of the completely built Electron app)
|
|-- /public (contains the index.html and electron.js, which will be picked up by react-app-rewired)
|
|-- /scripts (scripts to enable live reload)
|
|-- /server (node source files)
|
|-- /src (react source files)
```
