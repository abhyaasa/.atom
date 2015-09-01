'use strict';

describe('getData', function ($log) {
    var $rootScope;
    
    beforeEach(module('utils'), function () {
        inject(function ($q, _$rootScope_) {
            $rootScope = _$rootScope_;
        });
    });
    
    it('should return object defined in local json file',
        inject(function ($rootScope, getData) {
            var data = getData('test/test.json');
            expect(JSON.stringify(data))
                // CHECK this error
                .toEqual('["data", "for unit test"]');
        }));
        
    xit('should do something if indicated local json file does not exist',
        // TODO xit
        inject(function ($log, getData) {
            getData('bogus.json', undefined, function (error) {
                $log.error(error);
                expect('Error: ' + error)
                    .toEqual(''); // FIXME this reported error
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
