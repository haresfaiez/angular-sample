var builtPaths = __karma__.config.builtPaths;

if (! builtPaths)
  throw new Error('Please specify built paths in the Karma configuration file');

var toServeingPath = function(p) { return '/base/'+p;};

Error.stackTraceLimit            = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

builtPaths = builtPaths.map(toServeingPath);

__karma__.loaded = function () { };

// find specs source
function isSpecFile(path) {
  return /\.spec\.(.*\.)?js$/.test(path);
}
// Is a "built" file if is JavaScript file in one of the "built" folders
function isBuiltFile(path) {
  function isJsFile(path) {
    return path.slice(-3) == '.js';
  }

  return isJsFile(path) &&
    builtPaths.reduce(function(keep, bp) {
      return keep || (path.substr(0, bp.length) === bp);
    }, false);
}
var specs = Object.keys(window.__karma__.files).filter(isSpecFile).filter(isBuiltFile);

System.config({
  baseURL: 'base/src',

  map: {
    '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js'
  , '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js'
  , '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js'
  , '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js'
  , '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js'
  , '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js'
  , '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js'
  , '@angular/forms/testing': 'npm:@angular/forms/bundles/forms-testing.umd.js'
  , 'factory/fund/fund.fixture': 'factory/fund/fund.fixture.js'
  , 'factory/opportunity/opportunity.fixture': 'factory/opportunity/opportunity.fixture.js'
  , 'factory/share/share.fixture': 'factory/share/share.fixture.js'
  , 'factory/fund/fake.service': 'factory/fund/fake.service.js'
  , 'factory/share/fake.share.service': 'factory/share/fake.share.service.js'
  , 'factory/opportunity/fake.service': 'factory/opportunity/fake.service.js'
  , 'factory/stub.activated.route': 'factory/stub.activated.route.js'
  , 'factory/fake.http': 'factory/fake.http.js'
  }
});

System.import('systemjs.config.js').then(importSystemJsExtras)
.then(initTestBed)
.then(initTesting);

function importSystemJsExtras(){
  return System
         .import('systemjs.config.extras.js')
         .catch(function(reason) {
           new Error('System.import could not load "systemjs.config.extras.js": ' + reason)
         });
}

function initTestBed(){
  const testModules = ['@angular/core/testing', '@angular/platform-browser-dynamic/testing'];
  const imports = importPromises(testModules);
  return imports.then(function (providers) {
           var coreTesting    = providers[0];
           var browserTesting = providers[1];

           coreTesting.TestBed.initTestEnvironment(
             browserTesting.BrowserDynamicTestingModule,
             browserTesting.platformBrowserDynamicTesting());
         })
}

function importPromises(imports) {
  var toImport = function (moduleName) {
    return System.import(moduleName);
  }
  const specImports = imports.map(toImport);
  return Promise.all(specImports);
}

function initTesting () {
  const importsPromise = importPromises(specs);
  return importsPromise.then(__karma__.start, __karma__.error);
}
