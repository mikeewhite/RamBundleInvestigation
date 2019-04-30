# RAM Bundle Investigation

This is a test React Native application to demonstrate the current line mapping issues with RAM bundled apps.

## Setup
 1. Run `npm install` (or `yarn install`).
 1. Update the `projectRoot` in `packager/config.js`.


## Running the app
Run metro with `npm start` then either:
```bash
react-native run-android --variant release 

# or

react-native run-ios --configuration Release
```

## Generating source maps
Android:
```bash
react-native ram-bundle \
    --platform android \
    --dev false \
    --entry-file index.js \
    --bundle-output android.release.ram.bundle \
    --sourcemap-output android.release.ram.bundle.map
```
iOS:
```bash
react-native ram-bundle \
    --platform ios \
    --dev false \
    --entry-file index.js \
    --bundle-output ios.release.ram.bundle \
    --sourcemap-output ios.release.ram.bundle.map
```
## Symbolicating stack traces
1. Grab the filename (e.g. `13.js`), line, and column from the crashing frame.
1. Clone https://github.com/facebook/metro.
1. Navigate to `packages/metro-symbolicate`.
1. Run `npm install`.
1. Run `./src/symbolicate.js <path-to-sourcemap> <filename.js> <line-number> <column-number>`.