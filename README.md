
[![Build Status](https://travis-ci.org/mthmulders/stryker-intern-runner.svg?branch=master)](https://travis-ci.org/mthmulders/stryker-intern-runner)
[![NPM](https://img.shields.io/npm/dm/stryker-intern-runner.svg)](https://www.npmjs.com/package/stryker-intern-runner)
[![Node version](https://img.shields.io/node/v/stryker-intern-runner.svg)](https://img.shields.io/node/v/stryker-intern-runner.svg)

# Stryker Intern Runner
A plugin to use [Intern](https://theintern.io/) in [Stryker](https://stryker-mutator.io), the JavaScript mutation testing framework.

## Install
This package has not yet been published on npm.
For now, you can clone this repository and install it yourself.

## Configuring

You can configure the `stryker-karma-runner` using the `stryker.conf.js` config file.

```javascript
// Stryker.conf.js
module.exports = function (config) {
    config.set({
        // ...
        testRunner: 'intern',
        // ...
    });
}
```