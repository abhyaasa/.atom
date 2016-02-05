#!/usr/bin/env node
// Javascript exploration
'use strict';

var _ = require('underscore');

var a = {x: [], y: 3};
var b = _.mapObject(a, function (val) { return _.clone(val); });
b['x'].push(3);
console.log(JSON.stringify(a), JSON.stringify(b));

_.each([1, 2, 3], function(e) { console.log(e); });

console.log(JSON.stringify(_.map([1,2]));
