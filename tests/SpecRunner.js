require.config({
  baseUrl: "../js/",
  urlArgs: 'cb=' + Math.random(),
  paths: {
		jquery: 'libs/jquery/jquery-1.11.1',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
        jasmine: '/js/libs/jasmine/jasmine',
        'jasmine-html': '/js/libs/jasmine/jasmine-html',
        spec: '../tests/specs/'
  },
  shim: {
    jasmine: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    }
  }
});

require(['underscore', 'jquery', 'jasmine-html'], function(_, $, jasmine){

  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 1000;

  var htmlReporter = new jasmine.HtmlReporter();

  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var specs = [];

  specs.push('../tests/specs/topicModel');


  $(function(){
    require(specs, function(){
      jasmineEnv.execute();
    });
  });

});