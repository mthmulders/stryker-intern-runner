
[![Build Status](https://travis-ci.org/mthmulders/stryker-intern-runner.svg?branch=master)](https://travis-ci.org/mthmulders/stryker-intern-runner)
[![NPM](https://img.shields.io/npm/dm/stryker-intern-runner.svg)](https://www.npmjs.com/package/stryker-intern-runner)
[![Node version](https://img.shields.io/node/v/stryker-intern-runner.svg)](https://img.shields.io/node/v/stryker-intern-runner.svg)

# Stryker Intern Runner
A plugin to use [Intern](https://theintern.io/) in [Stryker](https://stryker-mutator.io), the JavaScript mutation testing framework.
It works with Intern 4 and above.

## Status
A note on the status of this work.
It currently does the following:
1. Detects when Intern has ran a test
1. Detects when Intern has ran a test that failed
1. Detects when Intern has ran a test that timed out
1. Detects when Intern has skipped a test

But I guess it's far from complete yet.
Adding coverage support would be a great way to make it run _faster_.
There's probably a few other things that need to be ironed out.
With that said, I'm more than happy with any contributions. 

## Install
This package has not yet been published on npm.
For now, you can clone this repository and install it yourself.

## Configuring

You can configure the `stryker-intern-runner` using the `stryker.conf.js` config file.

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