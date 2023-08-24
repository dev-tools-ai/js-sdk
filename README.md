[![dev-tools.ai sdk logo](https://docs.dev-tools.ai/img/logo.svg)](https://dev-tools.ai/)

[![npm version](https://badge.fury.io/js/@devtools-ai%2Fjs-sdk.svg)](https://badge.fury.io/js/@devtools-ai%2Fjs-sdk)

#### Getting started

This starts the sdk and allows us to start interacting with
the DevTools AI API.

```ts
const sdk = createSDK({ apiKey: 'YOUR_API_KEY_HERE' });
```

Sample usage:

```ts
const response = await sdk.createCheckIn('My test name');
```

API Methods:
| Command | Description |
| --- | --- |
| createCheckIn | Creates a test session |
| getIfScreenshotExists| Returns if a screenshot for a test already exists |
| getTestCaseBox | Returns an object with properties like width, height, and position |
| getIfFrozen | Returns if an element in a test is frozen |
| updateTestElement | Updates an element in a test |
| uploadTestElementScreenshot | Uploads a screenshot for an element in a test |

SDK Options:

| Option                      | Description                                                                               |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| apiKey                      | Sets the API key to interact with the DevTools AI API                                     |
| screenMultiplier            | Adjusts the display scaling ratio used when comparing element position within screenshots |
| useClassifierDuringCreation |                                                                                           |
| baseUrl                     | Changes the root address for the API. The default will work for most users.               |

#### Development

This repo uses pnpm as its package manager for [speed](https://pnpm.io/benchmarks) and efficient disk space management. In addition to having a node-js version >= 12.0 installed, you will need to install pnpm globally:

```
npm install -g pnpm
```

Afterwards you can all in the dependencies to run or build the SDK.

```sh
pnpm install
```

To run the TypeScript complier and build the files to
regular JS files, run:

```sh
pnpm run build
```

This will build the files to a dist folder.
