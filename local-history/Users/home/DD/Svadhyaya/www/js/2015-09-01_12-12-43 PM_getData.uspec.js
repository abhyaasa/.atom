'use strict';

// TODO
describe('getData', function () {
    var scope;

    beforeEach(function () {
        module('utils');
        inject(function ($rootScope) {
            scope = $rootScope.$new();
        });
    });

    xit('should invoke jasmine spy handler with object represented in json file',
        inject(function (getData) {
            var handler = jasmine.createSpy('success');
            getData('test/test.json', handler);
            // FIXME TypeError: $browser.cookies is not a function
            scope.$digest();
            expect(handler).toHaveBeenCalledWith(['data', 'for unit test']);
        }));

    xit('should return object represented in local json file',
        inject(function (getData) {
            var data;
            getData('test/test.json', function (data_) {
                data = data_;
            });
            scope.$digest();
            expect(JSON.stringify(data))
                .toEqual('["data", "for unit test"]');
            // CHECK this error
        }));
});
