require.config({
    //urlArgs: 'cb=' + Math.random(), // Cache-busting
	
    paths: {
		jquery: 'libs/jquery/jquery-1.11.1',
		underscore: 'libs/underscore/underscore',
		backbone: 'libs/backbone/backbone',
        d3: 'libs/d3/d3',
        d3cloud: 'libs/d3/layouts/d3.layout.cloud',
        specs: '../specs/'
	}
});

require([
	'app',
], function(App){
    
    App.initialize();
    
});