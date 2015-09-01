'use strict';

describe('getData', function ($log) {
    beforeEach(module('utils'));
    it('should return object defined in local json file',
        inject(function (getData) {
            getData('test/test.json')
                .success(function (data) {
                    console.log('data: ', data); // should log error
                    expect(JSON.stringify(data))
                        .toEqual('["data", "for unit testxxx"]');
                        // TODO this should error
                });
        }));
    it('should do something if indicated local json file does not exist',
        inject(function (getData) {
            getData('bogus.json')
                .error(function (data, status) {
                    expect('Error: ' + data + status)
                        .toEqual(''); // TODO this should be an error
                });
        }));
});

describe('localStorage', function () {
    beforeEach(module('utils'));
    it('should store and retrieve the same thing',
        inject(function (localStorage) {
            localStorage.set('test key', 'test value');
            expect(localStorage.get('test key')).toEqual('test value');
            expect(localStorage.get('bogus key')).not.toBeDefined();
        }));
});
