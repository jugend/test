function testSyncMiddlewares() {
    console.log('>> Test Sync Middlewares');

    var middlewares = [
        function() {
            console.log('a')
        },
        function() {
            console.log('b')
        },
        function() {
            console.log('c')
        }
    ];

    var createMiddleware = function(next) {
        return function(callback) {
            return function() {
                callback();
                // Only required if the next is optional for the first call
                if (next) {
                    next();
                }
            }
        }
    }

    var chainedFunction = function() {
        console.log('final call');
    };

    middlewares.reverse().forEach(function(fn) {
        chainedFunction = createMiddleware(chainedFunction)(fn)
    });

    chainedFunction();
}

function testAsyncMiddlewares() {
    console.log('>> Test Async Middlewares');

    var middlewares = [
        function(callback) {
            setTimeout(function() {
                console.log('a');
                callback();
            }, 0);
        },
        function(callback) {
            setTimeout(function() {
                console.log('b');
                callback();
            }, 0);
        },
        function(callback) {
            setTimeout(function() {
                console.log('c')
                callback();
            }, 0);
        }
    ];

    var createMiddleware = function(next) {
        return function(fn) {
            return function() {
                // Only required if the next is optional for the first call
                if (next) {
                  fn(next);
                }
            }
        }
    }

    var chainedFunction = function() {
        console.log('final call');
    };

    middlewares.reverse().forEach(function(fn) {
        chainedFunction = createMiddleware(chainedFunction)(fn)
    });

    chainedFunction();
}

testSyncMiddlewares();
testAsyncMiddlewares();
