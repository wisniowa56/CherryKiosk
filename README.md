# cherrykiosk

## Project setup

```bash
npm install
```

or

```bash
yarn install
```

### Compiles and hot-reloads for development

```bash
npm run electron:serve
```

or

```bash
yarn electron:serve
```

### Compiles and minifies for production

```bash
npm run electron:build
```

or

```bash
yarn electron:build
```

### Lints and fixes files

```bash
npm run lint
```

### Debugging

This project already contains a Visual Studio Code debugging configuration. Just create some breakpoints and run `Electron: All`.

### Debugging in a browser

```bash
npm run serve
```

or

```bash
yarn serve
```

And open `localhost:8080` in your browser or choice.

#### Warning: additional steps will be required in Firefox:

1. Go to `about:config`
2. search for a `dom.postMessage.sharedArrayBuffer.bypassCOOP_COEP.insecure.enabled` flag and change it to `true`

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
