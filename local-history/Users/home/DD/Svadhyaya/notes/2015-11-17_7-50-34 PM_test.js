#!/usr/bin/env node
// Javascript exploration
'use strict';

var f = function () {
    this.foo = 1;
    var g = function () {
        this.foo=2;
    };
    g();
    console.log(this.foo);
};
f();

