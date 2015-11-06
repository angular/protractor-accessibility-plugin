#!/usr/bin/env node

var Executor = require('./test_util').Executor;

var passingTests = [
  'node node_modules/protractor/lib/cli.js spec/successConfig.js',
];

var executor = new Executor();

passingTests.forEach(function(passing_test) {
  executor.addCommandlineTest(passing_test)
      .assertExitCodeOnly();
});

/*************************
 *Below are failure tests*
 *************************/

executor.addCommandlineTest(
    'node node_modules/protractor/lib/cli.js spec/failureConfig.js')
    .expectExitCode(1)
    .expectErrors([{
      message: '3 elements failed:'
    },
    {
      message: '1 element failed:'
    },
    {
      message: '1 element failed:'
    }]);

executor.execute();
