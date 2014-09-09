require.config({
    baseUrl: "../js/",
    //urlArgs: 'cb=' + Math.random(),
    paths: {
        jquery: 'libs/jquery/jquery-1.11.1',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        d3: 'libs/d3/d3',
        d3cloud: 'libs/d3/layouts/d3.layout.cloud',
        jasmine: '/js/libs/jasmine/jasmine',
        'jasmine-html': '/js/libs/jasmine/jasmine-html',
        spec: '../tests/specs/'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        },
        d3: {
            exports: 'd3'
        },
        d3cloud: {
            deps: ['d3'],
            exports: 'd3cloud'
        }
    }
});

require(['underscore', 'jquery', 'jasmine-html','d3','d3cloud'], function(_, $, jasmine,d3,d3cloud){

    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;
    
    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push('../tests/specs/topics.fixture');
    specs.push('../tests/specs/topicModel');
    specs.push('../tests/specs/topicsCollection');
    specs.push('../tests/specs/topicDetailsView');
    specs.push('../tests/specs/topicsCloudView');

    $(function(){
        require(specs, function(){
            jasmineEnv.execute();
        });
    });
    
});