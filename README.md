# RAM Bundle Investigation

See https://github.com/facebook/metro/issues/399

This is a test React Native application to demonstrate the current line mapping issues with RAM bundled apps.

It has four crash scenarios (each one can be triggered by pressing the appropriate button when the app is running):

- Unhandled error 1 : Crashing code lies outside of JSX within a vanilla JS block.
- Unhandled error 2 : Same as (1) but the crashing call is padded with additional lines.
- Unhandled error 3 : Same as (1) but calls out to crashing code in another file.
- Handled error 1 : Same as (1) except that the crashing code is wrapped in a try/catch block within a JSX component.

## Running the app

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
