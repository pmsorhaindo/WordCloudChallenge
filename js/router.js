// router.js

define([
    'jquery',
    'underscore',
    'backbone',
    'views/topics/cloud',
    'views/topic/details',
    'collections/topics'
], function($, _, Backbone, TopicCloud, TopicDetails, TopicsCollection){

    var AppRouter = Backbone.Router.extend({
        routes:{
            // route details
            "topic/:label": 'details',
            // route return (close) to just cloud
            "cloud": 'cloud',
			// Default
			'*actions': 'defaultAction'
		}
	});

	var initialize = function(){
        var app_router = new AppRouter;
        var topicsList = new TopicsCollection();
        // Grab JSON topics data 
        topicsList.fetch({reset: true});
        topicsList.on("reset", this.render, this);
        
		// Pass details label via param.
		app_router.on('route:details',function(id){ // TODO change to id.
            // Show details view for a selected topic
            console.log('Show details: '+id);
            var model = topicsList.get(id);
            var topicDetailsView = new TopicDetails({el: $("#details"), model: model});
            
		});
        
        app_router.on('route:cloud',function(){
            // Hide details view
            console.log('Close details view.');
            $("#details").html("");
		});
        
        // catch illegal routes.
		app_router.on('route:defaultAction', function(actions) {
			// No matching route - print URL
			console.log('No route:',actions);
		});
        
        // Begin recording history for Router's back functionality
		Backbone.history.start();
        
        // Display Topic Cloud
        var topicCloudView = new TopicCloud({el: $("#cloud"), collection: topicsList});
        topicCloudView.render();
        
	};
    
	return {
		initialize: initialize
	};
    
});