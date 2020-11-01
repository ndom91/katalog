/* eslint-disable @typescript-eslint/no-var-requires */

// @ts-ignore
const hljs = require('highlight.js/lib/highlight');

// Add whatever languages you need here.
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));

module.exports = hljs;
