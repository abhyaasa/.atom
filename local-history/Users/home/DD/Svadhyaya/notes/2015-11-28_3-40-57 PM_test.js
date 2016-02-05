#!/usr/bin/env node
// Javascript exploration
'use strict';

var _ = require('underscore');

var a = {x: [], y: 3};
var b = _.mapObject(a, function (val) { return _.clone(val); });
b.x.push(3);
console.log(JSON.stringify(a), JSON.stringify(b));

_.each([1, 2, 3], function(e) { console.log(e); });

console.log(JSON.stringify(_.map([1,2])));

var multiset = function (array) {
    var ms = {};
    array.map(function (value) {
        if (_.has(ms, value)) {
            ms[value] += 1;
        } else {
            ms[value] = 1;
        }
    });
    return ms;
};
var ms = multiset([1,5,5,undefined,4,undefined]);
console.log(JSON.stringify(ms));
_.each(ms, function (value) { console.log(value); });
console.log(_.reduce(ms, function (x, y) { return x + y; }));
console.log(ms[undefined]);
